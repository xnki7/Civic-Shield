import React, { useState, useEffect } from "react";
import axios from "axios";

const AnnouncementCard = ({
  contractProfileManager,
  creatorAddress,
  announcementCID,
}) => {
  const [profile, setProfile] = useState(null);
  const [announcementDetails, setAnnouncementDetails] = useState(null);

  const getProfile = async () => {
    try {
      const tx = await contractProfileManager.getProfile(creatorAddress);
      setProfile(tx);
      console.log(tx);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAnnouncementDetails = async () => {
    try {
      const response = await axios.get(
        `https://ipfs.io/ipfs/${announcementCID}`
      );
      setAnnouncementDetails(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching announcement details:", error);
    }
  };

  const getDesignationText = (designationNumber) => {
    const designations = {
      0: "State Government",
      1: "Police Station",
      2: "Civilian",
      3: "Constable",
      4: "Head Constable",
      5: "Assistant Sub Inspector",
      6: "Sub Inspector",
      7: "Inspector",
      8: "Deputy Superintendent of Police",
      9: "Additional Superintendent of Police",
      10: "Superintendent of Police",
      11: "Senior Superintendent of Police",
      12: "Deputy Inspector General of Police",
      13: "Inspector General of Police",
      14: "Additional Director General of Police",
      15: "Director General of Police",
    };
    return designations[designationNumber] || "Unknown Designation";
  };

  useEffect(() => {
    if (contractProfileManager && creatorAddress) {
      getProfile();
    }
    if (announcementCID) {
      fetchAnnouncementDetails();
    }
  }, [creatorAddress, contractProfileManager, announcementCID]);

  return (
    <div className="AnnouncementCard">
      {announcementDetails && profile && (
        <div>
          <p>Profile Details:</p>
          <img
            src={`https://ipfs.io/ipfs/${profile.profileImgCid}`}
            alt="Profile"
          />
          <p>{profile.name}</p>
          <p>{getDesignationText(profile.designation)}</p>
          <p>Account Address: {creatorAddress}</p>
          <p>Announcement Details:</p>
          <p>Title: {announcementDetails.title}</p>
          <p>Description: {announcementDetails.description}</p>
          {announcementDetails.image && (
            <img
              src={`https://ipfs.io/ipfs/${announcementDetails.image}`}
              alt="Announcement"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default AnnouncementCard;

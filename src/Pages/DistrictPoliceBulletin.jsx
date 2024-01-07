import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import AnnouncementCard from "../Components/AnnouncementCard";

const DistrictPoliceBulletin = ({
  contractProfileManager,
  accountAddress,
  contractAnnouncement,
}) => {
  const [profile, setProfile] = useState("");
  const [districtPoliceAnnouncements, setDistrictPoliceAnnouncements] =
    useState([]);

  const getUserProfile = async (userAddress) => {
    try {
      const tx = await contractProfileManager.getProfile(userAddress);
      setProfile(tx);
    } catch (err) {
      console.log(err);
    }
  };

  const getDistrictPoliceAnnouncements = async () => {
    try {
      const tx = await contractAnnouncement.getDistrictPoliceAnnouncements(
        profile.districtName
      );
      setDistrictPoliceAnnouncements(tx);
      console.log(tx);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (contractProfileManager && accountAddress && contractAnnouncement) {
      getUserProfile(accountAddress);
      getDistrictPoliceAnnouncements();
    }
  }, [contractProfileManager, accountAddress, contractAnnouncement]);
  return (
    <div className="DistrictPoliceBulletin">
      <Navbar />
      {districtPoliceAnnouncements
        ? districtPoliceAnnouncements.map((announcement) => {
            <AnnouncementCard
              contractProfileManager={contractProfileManager}
              creatorAddress={announcement.creator}
              announcementCID={announcement.announcementCID}
            />;
          })
        : null}
    </div>
  );
};

export default DistrictPoliceBulletin;

import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import AnnouncementCard from "../Components/AnnouncementCard";

const DistrictPublicBulletin = ({
  contractProfileManager,
  accountAddress,
  contractAnnouncement,
}) => {
  const [profile, setProfile] = useState("");
  const [districtPublicAnnouncements, setDistrictPublicAnnouncements] =
    useState([]);

  const getUserProfile = async (userAddress) => {
    try {
      const tx = await contractProfileManager.getProfile(userAddress);
      setProfile(tx);
    } catch (err) {
      console.log(err);
    }
  };

  const getDistrictPublicAnnouncements = async () => {
    try {
      const tx = await contractAnnouncement.getDistrictPublicAnnouncements(
        profile.districtName
      );
      setDistrictPublicAnnouncements(tx);
      console.log(tx);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (contractProfileManager && accountAddress && contractAnnouncement) {
      getUserProfile(accountAddress);
      getDistrictPublicAnnouncements();
    }
  }, [contractProfileManager, accountAddress, contractAnnouncement]);
  return (
    <div className="DistrictPublicBulletin">
      <Navbar />
      {districtPublicAnnouncements
        ? districtPublicAnnouncements.map((announcement) => {
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

export default DistrictPublicBulletin;

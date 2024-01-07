import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import AnnouncementCard from "../Components/AnnouncementCard";

const StatePoliceBulletin = ({
  contractProfileManager,
  accountAddress,
  contractAnnouncement,
}) => {
  const [profile, setProfile] = useState("");
  const [statePoliceAnnouncements, setStatePoliceAnnouncements] = useState([]);

  const getUserProfile = async (userAddress) => {
    try {
      const tx = await contractProfileManager.getProfile(userAddress);
      setProfile(tx);
    } catch (err) {
      console.log(err);
    }
  };

  const getStatePoliceAnnouncements = async () => {
    try {
      const tx = await contractAnnouncement.getStatePoliceAnnouncements();
      setStatePoliceAnnouncements(tx);
      console.log(tx);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (contractProfileManager && accountAddress && contractAnnouncement) {
      getUserProfile(accountAddress);
      getStatePoliceAnnouncements();
    }
  }, [contractProfileManager, accountAddress, contractAnnouncement]);
  return (
    <div className="StatePoliceBulletin">
      <Navbar />
      {statePoliceAnnouncements
        ? statePoliceAnnouncements.map((announcement) => {
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

export default StatePoliceBulletin;

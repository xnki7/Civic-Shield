import React from "react";
import { useState, useEffect } from "react";
import AnnouncementForm from "./AnnouncementForm";

const StateBulletin = ({ contractProfileManager, accountAddress }) => {
  const [profile, setProfile] = useState("");
  const [toggle, setToggle] = useState(false);
  const getUserProfile = async () => {
    try {
      const tx = await contractProfileManager.getProfile(accountAddress);
      setProfile(tx);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (contractProfileManager && accountAddress) {
      getUserProfile();
    }
  }, [contractProfileManager, accountAddress]);
  return (
    <div className="StateBulletin">
      <h1>{profile.name}</h1>
      <button
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        Create Announcement
      </button>
      {toggle ? <AnnouncementForm setToggle={setToggle} /> : <></>}
    </div>
  );
};

export default StateBulletin;

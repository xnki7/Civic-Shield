import React from "react";
import { useState, useEffect } from "react";
import AnnouncementForm from "./AnnouncementForm";
import Navbar from "../Components/Navbar";

const StateBulletin = ({
  contractProfileManager,
  accountAddress,
  contractAnnouncement,
}) => {
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
    <div className="StateBulletin bg-[#020B2D] h-[100vh] ">
      <h1>{profile.name}</h1>
      <Navbar/>
      <button className="border-[white] border-solid border-2 rounded-3xl text-[white] px-4 mt-5 ml-5 p-[0.4rem]"
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        Create Announcement
      </button>
      {toggle ? (
        <AnnouncementForm
          profile={profile}
          setToggle={setToggle}
          contractAnnouncement={contractAnnouncement}
        />
      ) : (
        <></>
      )}
      {
        toggle?<div className="absolute w-[100%] h-[100vh] bg-[black]/50 top-[0px]" ></div>:null
      }
    </div>
  );
};

export default StateBulletin;

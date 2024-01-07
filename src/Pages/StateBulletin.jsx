import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AnnouncementForm from "./AnnouncementForm";
import Navbar from "../Components/Navbar";
import AnnouncementCard from "../Components/AnnouncementCard";

const StateBulletin = ({
  contractProfileManager,
  accountAddress,
  contractAnnouncement,
}) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState("");
  const [toggle, setToggle] = useState(false);
  const [statePublicAnnouncements, setStatePublicAnnouncements] = useState([]);

  const getUserProfile = async (userAddress) => {
    try {
      const tx = await contractProfileManager.getProfile(userAddress);
      setProfile(tx);
    } catch (err) {
      console.log(err);
    }
  };

  const getStatePublicAnnouncements = async () => {
    try {
      const tx = await contractAnnouncement.getStatePublicAnnouncements();
      setStatePublicAnnouncements(tx);
      console.log(tx);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (contractProfileManager && accountAddress && contractAnnouncement) {
      getUserProfile(accountAddress);
      getStatePublicAnnouncements();
    }
  }, [contractProfileManager, accountAddress, contractAnnouncement]);

  return (
    <div className="StateBulletin bg-[#020B2D] h-[100vh] ">
      <Navbar />
      <button
        className="border-[white] border-solid border-2 rounded-3xl text-[white] px-4 mt-5 ml-5 p-[0.4rem]"
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        Create Announcement
      </button>
      <button
        onClick={() => {
          navigate("/statePoliceBulletin");
        }}
      >
        State Police Bulletin
      </button>
      <button
        onClick={() => {
          navigate("/districtPublicBulletin");
        }}
      >
        District Public Bulletin
      </button>
      <button
        onClick={() => {
          navigate("/districtPoliceBulletin");
        }}
      >
        District Police Bulletin
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
      {toggle ? (
        <div className="absolute w-[100%] h-[100vh] bg-[black]/50 top-[0px]"></div>
      ) : null}
      {statePublicAnnouncements
        ? statePublicAnnouncements.map((announcement) => {
            return (
              <AnnouncementCard
                contractProfileManager={contractProfileManager}
                creatorAddress={announcement.creator}
                announcementCID={announcement.announcementCID}
              />
            );
          })
        : null}
    </div>
  );
};

export default StateBulletin;

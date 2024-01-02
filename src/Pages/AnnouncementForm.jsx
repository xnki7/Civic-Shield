import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import axios from "axios";
import "./AnnouncementForm.css";

const AnnouncementForm = ({ profile, setToggle, contractAnnouncement }) => {
  const [announcement, setAnnouncement] = useState({
    title: "",
    description: "",
    image: null,
    targetType: "", // State or District
    selectedDistrict: null, // District 1 or District 2
    targetAudience: "", // Police or Public
  });

  useEffect(() => {
    console.log(profile);
    console.log(contractAnnouncement);
  }, []);

  const handleInputChange = (event) => {
    console.log("Input Name:", event.target.name);
    console.log("Input Value:", event.target.value);

    setAnnouncement({
      ...announcement,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setAnnouncement({
      ...announcement,
      image: event.target.files[0],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let imageCID = null;
      if (announcement.image) {
        const formData = new FormData();
        formData.append("file", announcement.image);

        const imageUploadResponse = await axios.post(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          formData,
          {
            headers: {
              pinata_api_key: "0b0a6943fbb0f894d636",
              pinata_secret_api_key:
                "d1995551c2dbcca4cb335f681b8f149d2ffb28c14c9803ec929d09d4a8ce4caf",
            },
          }
        );

        imageCID = imageUploadResponse.data.IpfsHash;
      }

      const announcementData = {
        title: announcement.title,
        description: announcement.description,
        image: imageCID,
        targetAudience: announcement.targetAudience,
        selectedDistrict: announcement.selectedDistrict,
      };

      const announcementUploadResponse = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        announcementData,
        {
          headers: {
            pinata_api_key: "0b0a6943fbb0f894d636",
            pinata_secret_api_key:
              "d1995551c2dbcca4cb335f681b8f149d2ffb28c14c9803ec929d09d4a8ce4caf",
          },
        }
      );
      console.log(announcementUploadResponse.data.IpfsHash);
      console.log(announcement.targetAudience);
      console.log(announcement.targetType);
      if (announcement.targetAudience == "statePublic") {
        const tx = await contractAnnouncement.createStatePublicAnnouncement(
          announcementUploadResponse.data.IpfsHash
        );
        await tx.wait();
      } else if (announcement.targetAudience == "statePolice") {
        const tx = await contractAnnouncement.createStatePoliceAnnouncement(
          announcementUploadResponse.data.IpfsHash
        );
        await tx.wait();
      } else if (announcement.targetAudience == "districtPublic") {
        const tx = await contractAnnouncement.createDistrictPublicAnnouncement(
          announcementUploadResponse.data.IpfsHash,
          announcement.selectedDistrict
        );
        await tx.wait();
      } else if (announcement.targetAudience == "districtPolice") {
        const tx = await contractAnnouncement.createDistrictPoliceAnnouncement(
          announcementUploadResponse.data.IpfsHash,
          announcement.selectedDistrict
        );
        await tx.wait();
      }

      setAnnouncement({
        title: "",
        description: "",
        image: null,
        targetType: "",
        selectedDistrict: null,
        targetAudience: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="AnnouncementForm">
      {contractAnnouncement ? (
        <>
          <IoCloseSharp onClick={() => setToggle(false)} />
          <h1>Create an Announcement</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={announcement.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={announcement.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="image">Upload Image:</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleFileChange}
              />
            </div>
            <div>
              <label htmlFor="targetType">Announcement For:</label>
              <select
                id="targetType"
                name="targetType"
                value={announcement.targetType}
                onChange={handleInputChange}
              >
                <option value="">Select Target Type</option>
                <option value="state">State</option>
                <option value="district">District</option>
              </select>
            </div>
            {announcement.targetType === "district" && (
              <div>
                <label htmlFor="selectedDistrict">Select District:</label>
                <select
                  id="selectedDistrict"
                  name="selectedDistrict"
                  value={announcement.selectedDistrict}
                  onChange={handleInputChange}
                >
                  <option value="">Select District</option>
                  <option value="District1">District 1</option>
                  <option value="District2">District 2</option>
                </select>
              </div>
            )}
            <div>
              <label htmlFor="targetAudience">Send To:</label>
              <select
                id="targetAudience"
                name="targetAudience"
                value={announcement.targetAudience}
                onChange={handleInputChange}
              >
                {announcement.targetType === "state" ? (
                  <>
                    <option value="">Select Target Audience</option>
                    <option value="statePublic">State Public</option>
                    <option value="statePolice">State Police</option>
                  </>
                ) : announcement.targetType === "district" &&
                  announcement.selectedDistrict ? (
                  <>
                    <option value="">Select Target Audience</option>
                    <option value="districtPublic">District Public</option>
                    <option value="districtPolice">District Police</option>
                  </>
                ) : null}
              </select>
            </div>

            <button type="submit">Submit Announcement</button>
          </form>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AnnouncementForm;

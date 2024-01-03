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
  const [imgshow, setimgshow] = useState(null);

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
    const imageUrl = URL.createObjectURL(event.target.files[0]);
    setimgshow(imageUrl);
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
    <div className="AnnouncementForm min-h-[70%] w-[37%]  rounded-lg p-[10px] ">
      <div className="overlay"></div>
      {contractAnnouncement ? (

        <>
          <IoCloseSharp className="absolute left-[92%] text-[25px] " onClick={() => setToggle(false)} />
          <h1 className="text-[1.2rem] text-black font-semibold ml-[25%] " >Create an Announcement</h1>
          <form className="flex flex-col gap-[30px] pt-4  " onSubmit={handleSubmit}>
            <div className=" m-auto " >
              <label htmlFor="image">Upload Image:</label>
 
             <div  >
               {
                imgshow?
                <div>
                <input className=""
                type="file"
                id="image"
                name="image"
                onChange={handleFileChange}
              />
                </div>
                :<input className=""
                type="file"
                id="image"
                name="image"
                onChange={handleFileChange}
              />
               }
             </div>
            </div>
            <div className="w-[70%] m-auto " >
              <label className="font-semibold" htmlFor="title">Title :</label>
              <input className=" ml-2 w-[84%] border-b-2 border-solid border-[black] "
                type="text"
                id="title"
                name="title"
                value={announcement.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="w-[70%] m-auto " >
              <label className="font-semibold  " htmlFor="description">Description :</label>
              <textarea className="ml-1 w-[70%] border-b-2 border-solid border-[black] border "
                id="description"
                name="description"
                value={announcement.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="w-[70%] m-auto " >
              <select className="ml-2 w-[97%] border-1 p-1 border-solid border-[black] "
                id="targetType"
                name="targetType"
                value={announcement.targetType}
                onChange={handleInputChange}
              >
                <option value="">Announcement For </option>
                <option value="state">State</option>
                <option value="district">District</option>
              </select>
            </div>
            {announcement.targetType === "district" && (
              <div className="w-[70%] m-auto " >
                <select className="ml-2 w-[97%] border-1 p-1 border-solid border-[black] "
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

            <button className="bg-[#020B2D] w-[20%] m-auto text-[white]  py-1 rounded-xl  " type="submit">Create</button>
          </form>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AnnouncementForm;

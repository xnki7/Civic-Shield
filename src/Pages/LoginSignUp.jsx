import React from "react";
import { useState } from "react";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Styles from "./LoginSignUp.module.css";
import Navbar from "../Components/Navbar";

const LoginSignUp = ({
  contractProfileManager,
  setAccountAddress,
  setIsProfileCreated,
  setIsConnected,
  isConnected,
  isProfileCreated,
}) => {
  const [imagePreview, setImagePreview] = useState(null);

  const [role, setRole] = useState("");
  const [image, setImage] = useState(null);
  const [district, setDistrict] = useState("");
  const [designation, setDesignation] = useState("");
  const [fullName, setFullName] = useState("");
  const [idNumber, setIdNumber] = useState("");

  const navigate = useNavigate();
  const account = useAccount({
    onConnect({ address }) {
      setIsConnected(true);
      setAccountAddress(address);
      getIsProfileCreated(address);
      console.log("Connected", { address });
    },
  });

  const getIsProfileCreated = async (address) => {
    const tx = await contractProfileManager.profileExists(address);
    setIsProfileCreated(tx);
    if (tx === true) {
      navigate("/statebulletin");
    }
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setDesignation("");
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setImage(file);
    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
    console.log(file);
  };

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
  };

  const handleDesignationChange = (e) => {
    setDesignation(e.target.value);
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleIdNumberChange = (e) => {
    setIdNumber(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let enumValue = convertRoleToEnum(role, designation);

    try {
      let imageCID = "QmbWt4Fyggz6dWEvvGFW6TjSSyL4TLo2FfBKmC7MWD1r6n";

      if (image) {
        const formData = new FormData();
        formData.append("file", image);

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

      const tx = await contractProfileManager.createProfile(
        fullName,
        idNumber,
        enumValue,
        district,
        imageCID
      );
      await tx.wait();
      alert("Profile created successfully!");
    } catch (error) {
      console.error("Error creating profile: ", error);
    }
  };

  const convertRoleToEnum = (role, designation) => {
    switch (role) {
      case "stateGovernment":
        return 0;
      case "civilian":
        return 2;
      case "policeStation":
        return 1;
      case "policeOfficial":
        return handlePoliceOfficialDesignation(designation);
      default:
        return -1;
    }
  };

  const handlePoliceOfficialDesignation = (designation) => {
    switch (designation) {
      case "constable":
        return 3;
      case "headConstable":
        return 4;
      case "assistantSubInspector":
        return 5;
      case "subInspector":
        return 6;
      case "inspector":
        return 7;
      case "deputySuperintendentOfPolice":
        return 8;
      case "additionalSuperintendentOfPolice":
        return 9;
      case "superintendentOfPolice":
        return 10;
      case "seniorSuperintendentOfPolice":
        return 11;
      case "deputyInspectorGeneralOfPolice":
        return 12;
      case "inspectorGeneralOfPolice":
        return 13;
      case "additionalDirectorGeneralOfPolice":
        return 14;
      case "directorGeneralOfPolice":
        return 15;
      default:
        return -1;
    }
  };
  
  return (
    <div className="LoginSignUp">
      <Navbar />
      <div className={Styles.container}>
        {isProfileCreated == false && isConnected ? (
          <form className={Styles.form} onSubmit={handleFormSubmit}>
            <div className=" flex flex-col w-[40%] ">
              <div className=" min-w-[80%] min-h-[360px] m-auto text-center border-[white] border-solid border-[1px] pt-4  rounded-2xl bg-[#D9D9D9] " >
                <label>
                {/* Profile Picture: */}
                {imagePreview ? (
                  
                  <>
                  <img 
                className="rounded-3xl max-w-[220px] h-[250px] m-auto "
                    src={imagePreview}
                    alt="Image Preview"
                    // style={{ maxWidth: "100%", maxHeight: "200px" }}
                  />
                  <input className="cursor-pointer mt-4 m-auto "
                    type="file"
                    name="profilePicture"
                    accept="image/*"
                    onChange={handleImageUpload}
                  /></>

                ) : (
                  <input className="cursor-pointer mt-[100px] ml-[50px] "
                    type="file"
                    name="profilePicture"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                )}
              </label>
              </div>
             
            </div>

            <div className={Styles.formRight}>
              <label className="text-[white]" >
 
                <input className="text-[white] bg-[#020B2D] border-b-2  my-5 p-[2px]  w-[70%]"  placeholder="Full Name"
                  type="text"
                  name="fullName"
                  onChange={handleFullNameChange}
                />
              </label>
              <label>
                Role
                <select className="bg-[#D9D9D9] rounded-lg ml-3 p-1 w-[60%] " name="role" onChange={handleRoleChange}>
                  <option value="">Select a role</option>
                  <option value="stateGovernment">State Government</option>
                  <option value="civilian">Civilian</option>
                  <option value="policeStation">
                    District's Police Station
                  </option>
                  <option value="policeOfficial">Police Official</option>
                </select>
              </label>

              {role === "civilian" && (
                <>
                  <label>
                    
                    <input className="border-b-2 bg-[#020B2D] my-5 w-[70%] p-[2px] text-[white] " placeholder="Adhaar ID"
                      type="text"
                      name="aadharId"
                      onChange={handleIdNumberChange}
                    />
                  </label>
                  <label  >
                    District:
                    <select className="bg-[#D9D9D9] rounded-lg ml-3 p-1 w-[56%]" name="district" onChange={handleDistrictChange}>
                      <option value="">Select a District</option>
                      <option value="District1">District 1</option>
                      <option value="District2">District 2</option>
                    </select>
                  </label>
                </>
              )}
              {(role === "policeStation" || role === "policeOfficial") && (
                <>
                  <label>
                    District:
                    <select className="bg-[#D9D9D9] rounded-lg ml-3 p-1 my-[52px] w-[56%]" name="district" onChange={handleDesignationChange}>
                      <option value="">Select a District</option>
                      <option value="District1">District 1</option>
                      <option value="District2">District 2</option>
                    </select>
                  </label>
                </>
              )}
              {role === "policeStation" && (
                <label>
                  
                  <input placeholder="Station Name" className="text-[white] bg-[#020B2D] p-[2px] border-b-2 mb-3 w-[70%]" type="text" name="stationName" />
                </label>
              )}
              {role === "policeOfficial" && (
                <>
                  <label>
                   
                    <select className="bg-[#D9D9D9] rounded-lg mb-5 ml-3 p-1 w-[68.5%]"
                      name="designation"
                      onChange={handleDesignationChange}
                    >
                      <option value="">Select Official's Designation</option>
                      <option value="constable">Constable</option>
                      <option value="headConstable">Head Constable</option>
                      <option value="assistantSubInspector">
                        Assistant Sub-Inspector
                      </option>
                      <option value="subInspector">Sub-Inspector</option>
                      <option value="inspector">Inspector</option>
                      <option value="deputySuperintendentOfPolice">
                        Deputy Superintendent of Police (Dy. SP)
                      </option>
                      <option value="additionalSuperintendentOfPolice">
                        Additional Superintendent of Police
                      </option>
                      <option value="superintendentOfPolice">
                        Superintendent of Police
                      </option>
                      <option value="seniorSuperintendentOfPolice">
                        Senior Superintendent of Police
                      </option>
                      <option value="deputyInspectorGeneralOfPolice">
                        Deputy Inspector General of Police
                      </option>
                      <option value="inspectorGeneralOfPolice">
                        Inspector-General of Police (IGP)
                      </option>
                      <option value="additionalDirectorGeneralOfPolice">
                        Additional Director General of Police (ADG)
                      </option>
                      <option value="directorGeneralOfPolice">
                        Director-General of Police (DGP)
                      </option>
                    </select>
                  </label>
                  <label>
                    
                    <input className="text-[white] bg-[#020B2D] p-[2px] border-b-2 my-2 w-[70%]"
                    placeholder="ID No."
                      type="text"
                      name="idNo"
                      onChange={handleIdNumberChange}
                    />
                  </label>
                </>
              )}
               <button className={Styles.submitBtn} type="submit">
                Submit
              </button>
            </div>
          </form>
        ) : (
          <ConnectButton />
        )}
      </div>
    </div>
  );
};

export default LoginSignUp;

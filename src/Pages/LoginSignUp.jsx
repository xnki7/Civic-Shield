import React from "react";
import { useState } from "react";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const LoginSignUp = ({
  contractProfileManager,
  setAccountAddress,
  setIsProfileCreated,
  setIsConnected,
  isConnected,
  isProfileCreated,
}) => {
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
              pinata_api_key: "370bbf2277c5335106ec",
              pinata_secret_api_key:
                "b0fd3c6405d7d0204c6a2b5d4886791e968be02ce52972363d0868c0eab26a8e",
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
      {isProfileCreated == false && isConnected ? (
        <form onSubmit={handleFormSubmit}>
          <label>
            Profile Picture:
            <input
              type="file"
              name="profilePicture"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
          <label>
            Full Name:
            <input
              type="text"
              name="fullName"
              onChange={handleFullNameChange}
            />
          </label>
          <label>
            Role:
            <select name="role" onChange={handleRoleChange}>
              <option value="">Select a role</option>
              <option value="stateGovernment">State Government</option>
              <option value="civilian">Civilian</option>
              <option value="policeStation">District's Police Station</option>
              <option value="policeOfficial">Police Official</option>
            </select>
          </label>
          {role === "civilian" && (
            <>
              <label>
                Aadhar ID:
                <input
                  type="text"
                  name="aadharId"
                  onChange={handleIdNumberChange}
                />
              </label>
              <label>
                District:
                <select name="district" onChange={handleDistrictChange}>
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
                <select name="district" onChange={handleDesignationChange}>
                  <option value="">Select a District</option>
                  <option value="District1">District 1</option>
                  <option value="District2">District 2</option>
                </select>
              </label>
            </>
          )}
          {role === "policeStation" && (
            <label>
              Station Name:
              <input type="text" name="stationName" />
            </label>
          )}
          {role === "policeOfficial" && (
            <>
              <label>
                Official's Designation:
                <select name="designation" onChange={handleDesignationChange}>
                  <option value="">Select Designation</option>
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
                ID No.
                <input
                  type="text"
                  name="idNo"
                  onChange={handleIdNumberChange}
                />
              </label>
            </>
          )}
          <button type="submit">Submit</button>
        </form>
      ) : (
        <ConnectButton />
      )}
    </div>
  );
};

export default LoginSignUp;

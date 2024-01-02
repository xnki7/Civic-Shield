import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import "./AnnouncementForm.css";

const AnnouncementForm = ({ setToggle }) => {
  const [announcement, setAnnouncement] = useState({
    title: "",
    description: "",
    image: null,
    targetAudience: "state", // default to state public
  });

  const handleInputChange = (event) => {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit logic goes here
    console.log(announcement);
  };

  return (
    <div className="AnnouncementForm">
      <IoCloseSharp
        onClick={() => {
          setToggle(false);
        }}
      />
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
          <label htmlFor="targetAudience">Send To:</label>
          <select
            id="targetAudience"
            name="targetAudience"
            value={announcement.targetAudience}
            onChange={handleInputChange}
          >
            <option value="state">State Public</option>
            <option value="district">District Public</option>
          </select>
        </div>
        <button type="submit">Submit Announcement</button>
      </form>
    </div>
  );
};

export default AnnouncementForm;

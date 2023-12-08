import React, { useState } from "react";
import classes from "@/pages/events/add-event.module.css";
import axios from "axios";
import { API_MONGODB_URL } from "@/config";

const AddEventForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loc, setLoc] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    // Create a FormData object
    const formData = new FormData(event.currentTarget);
  
    // Set additional form data
    formData.set("title", title);
    formData.set("desc", desc);
    formData.set("loc", loc);
    formData.set("date", date);
    formData.set("image", image);
  
    // Log the form data before sending the request
    console.log("Form Data:", formData);
  
    try {
      setLoading(true);
  
      // Send POST request to your MongoDB API endpoint
      const response = await axios.post(`${API_MONGODB_URL}/events`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log("Event added successfully:", response.data);
  
      // Reset the form or navigate to another page if needed
      setTitle("");
      setDesc("");
      setLoc("");
      setDate("");
      setImage("");
    } catch (error) {
      console.error("Error adding event:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className={`${classes.form} ${loading ? classes.loading : ""}`}>
      <h2>Add Event</h2>
      <form className={classes.container} onSubmit={handleFormSubmit}>
        <label className="label">
          Title:
          <input
            className={classes.input}
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className="label">
          Description:
          <textarea
            className={classes.textarea}
            name="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </label>
        <label className="label">
          Location:
          <input
            className={classes.input}
            type="text"
            name="loc"
            value={loc}
            onChange={(e) => setLoc(e.target.value)}
          />
        </label>
        <label className="label">
          Date:
          <input
            className={classes.input}
            type="text"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label className="label">
          Image:
          <input
            className={classes.input}
            type="file"
            name="image"
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
        <button className={classes.button} type="submit">
          {loading ? "Adding Event..." : "Add Event"}
        </button>
      </form>
    </div>
  );
};

export default AddEventForm;

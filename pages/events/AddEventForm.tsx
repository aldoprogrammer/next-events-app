import React, { useState } from "react";
import classes from "@/pages/events/add-event.module.css";
import axios from "axios";
import { API_MONGODB_URL } from "@/config";
import { useRouter } from "next/router";

const AddEventForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loc, setLoc] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState<File | null>(null); // Track the selected file
  const router = useRouter();

  const [post, setPost] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    image: '',
    isFeatured: true,
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Get the first file selected by the user
    const file = event.target.files?.[0];
    setImage(file);
  };

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      // Check if an image is selected
      if (image) {
        // Use FormData to send a file in the request
        const formData = new FormData();
        formData.append("image", image);

        // Upload the image
        const uploadResponse = await axios.post('public/images', formData);

        // Use the URL of the uploaded image in your post data
        setPost({ ...post, image: uploadResponse.data.url });
      }

      // Now you can proceed with the rest of your data
      const response = await axios.post(`${API_MONGODB_URL}/events`, post);

      if (response.status === 200 || response.status === 201) {
        // Data creation successful
        console.log('Data created successfully:', response.data);
        alert('New Event Created');
        router.push('/events');
      } else {
        // Data creation failed
        throw new Error('Failed to create data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  

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
            onChange={handleInput}
          />
        </label>
        <label className="label">
          Description:
          <textarea
            className={classes.textarea}
            name="description"
            onChange={handleInput}
          />
        </label>
        <label className="label">
          Location:
          <input
            className={classes.input}
            type="text"
            name="location"
            onChange={handleInput}
          />
        </label>
        <label className="label">
          Date:
          <input
            className={classes.input}
            type="date"
            name="date"
            onChange={handleInput}
          />
        </label>
        <label className="label">
          Image:
          <input
            className={classes.input}
            type="file"
            name="image"
            onChange={handleImageChange}
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
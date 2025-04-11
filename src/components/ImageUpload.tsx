import React, { useState, useRef } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';

export const ImageUpload = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const fileInputRef = useRef(null); // Create a ref for the file input
//@ts-ignore
  const handleImageChange = (e) => {
    const image = e.target.files[0];
    if (image) {
      uploadImage(image);
    }
  };
//@ts-ignore
  const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append('image', image); // Use 'image' as the key to match your backend

    try {
      setLoading(true);
      // Send the image to your backend
      const response = await axios.post(`${BACKEND_URL}/api/v1/blog/upload`, formData, {
        headers: {
            Authorization: localStorage.getItem("token"),
          'Content-Type': 'multipart/form-data',

        },
      });

      // Assuming the backend returns the image URL
      const uploadedImageUrl = response.data; // Adjust based on your backend response
      setImageUrl(uploadedImageUrl);
      localStorage.setItem("url", uploadedImageUrl);
      setLoading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    //@ts-ignore
    fileInputRef.current.click(); // Trigger the file input click
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white">
      <input 
        type="file" 
        onChange={handleImageChange} 
        ref={fileInputRef} 
        className="hidden" // Hide the file input
        accept="image/*" // Accept only image files
      />
      <button 
        onClick={handleButtonClick} 
        className="bg-blue-700 text-white py-2.5 px-4 rounded-lg hover:bg-green-500 transition duration-200 w-full"
      >
        {loading ? 'Uploading...' : 'Select Image'}
      </button>
     {imageUrl && <img src={imageUrl} alt="Uploaded" className="mt-2 rounded-lg shadow-md" />}
    </div>
  );
};


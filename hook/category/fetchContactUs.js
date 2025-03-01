// fetchContactUs.js
import { useState } from "react";
import axios from "axios";
import BASE_URL from "../apiConfig";

const fetchContactUs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const postTrip = async (contactData) => {
    setIsLoading(true);

    try {
      const formData = new FormData();

      // Append name, email, subject, and message fields
      formData.append("name", contactData.name);
      formData.append("email", contactData.email);
      formData.append("subject", contactData.subject);
      formData.append("message", contactData.message);

    
      contactData.images.forEach((image, index) => {
        formData.append(`image${index}`, image);
      });

      const response = await axios.post(
       `${BASE_URL}/contact-us`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-API-KEY": "DISCOVERJO91427",
          },
        }
      );

      setIsLoading(false);
      return response.data;
    } catch (error) {
      setError(error);
      setIsLoading(false);
      throw error;
    }
  };

  return { postTrip, isLoading, error };
};

export default fetchContactUs;

// fetchContactUs.js
import { useState } from "react";
import axios from "axios";

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
        "http://rehletna-jo.com/api/en/contact-us",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", 
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

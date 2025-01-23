import { useState, useContext } from "react";
import axios from "axios";
import BASE_URL from "./apiConfig"; // Adjust this to your actual API base URL
import { AuthContext } from "../store/auth-context";

const useUpdateProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const authCtx = useContext(AuthContext);

  const updateProfile = async (userData, token) => {
    setIsLoading(true);
    const formData = new FormData();

    for (const key in userData) {
      if (userData[key] !== undefined) {
        if (key === "tags_id" && Array.isArray(userData[key])) {
          userData[key].forEach((id) => formData.append("tags_id[]", id));
        } else if (key === "image" && userData[key]) {
          const { uri, type, name } = userData[key];
          formData.append(key, { uri, name, type });
        } else {
          formData.append(key, userData[key]);
        }
      }
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/profile/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            "X-API-KEY": "DISCOVERJO91427",
          },
        }
      );

      setIsLoading(false);
      return response.data;
    } catch (error) {
      setError(error);
      setIsLoading(false);
      console.error("API Error:", error);
      throw error;
    }
  };

  return { updateProfile, isLoading, error };
};

export default useUpdateProfile;

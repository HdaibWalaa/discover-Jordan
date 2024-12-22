import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../apiConfig";
import { AuthContext } from "../../store/auth-context"; // Import AuthContext

const fetchEventDetails = (id, language) => {
  const [eventDetails, setEventDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const authCtx = useContext(AuthContext); // Access the AuthContext to get the token

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/event/${id}`, {
        headers: {
          "Content-Language": language,
          Authorization: `Bearer ${authCtx.token}`, // Send the token in the request headers
        },
      });
      setEventDetails(response.data.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data initially or when id/language changes
  useEffect(() => {
    fetchData();
  }, [id, language, authCtx.token]); // Ensure the token is available before making the request

  const refetch = () => {
    fetchData();
  };

  return { eventDetails, isLoading, error, refetch };
};

export default fetchEventDetails;

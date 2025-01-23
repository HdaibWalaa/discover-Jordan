import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../apiConfig";

const fetchVolunteerDetails = (id, language) => {
  const [volunteerDetails, setVolunteerDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/volunteering/${id}`, {
          headers: {
            "Content-Language": language,
            "X-API-KEY": "DISCOVERJO91427",
          },
        });
        setVolunteerDetails(response.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {};
  }, [id, language]);

  const refetch = () => {
    fetchData();
  };

  return { volunteerDetails, isLoading, error, refetch };
};

export default fetchVolunteerDetails;

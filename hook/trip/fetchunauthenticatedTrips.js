import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../apiConfig";

const fetchTrips = (language, token) => {
  const [tripData, setTripData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    const url = token ? `${BASE_URL}/trip` : `${BASE_URL}/all/trips`;

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Language": language,
          ...(token && { Authorization: `Bearer ${token}` }), // Add token if available
        },
      });
      setTripData(response.data.data.trips);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [language, token]);

  return { tripData, isLoading, error };
};

export default fetchTrips;

import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../apiConfig";

const useFetchTrips = (token) => {
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/trip`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-API-KEY": "DISCOVERJO91427",
        },
      });
      setTrips(response.data.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  return { trips, isLoading, error };
};

export default useFetchTrips;

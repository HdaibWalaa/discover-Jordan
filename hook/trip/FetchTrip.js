import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import BASE_URL from "../apiConfig";

const FetchTrip = (tripId, token, language) => {
  const [tripDetails, setTripDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTripDetails = useCallback(async () => {
    if (!tripId || !token) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BASE_URL}/trip/details/${tripId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Language": language, 
          "X-API-KEY": "DISCOVERJO91427",
        },
      });

      if (response.status === 200) {
        setTripDetails(response.data.data);
      } else {
        setError(new Error("Failed to fetch trip details"));
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "An error occurred while fetching trip details"
      );
    } finally {
      setIsLoading(false);
    }
  }, [tripId, token, language]);

  useEffect(() => {
    fetchTripDetails();
  }, [fetchTripDetails]);

  return { tripDetails, isLoading, error, refetchTrip: fetchTripDetails };
};

export default FetchTrip; 














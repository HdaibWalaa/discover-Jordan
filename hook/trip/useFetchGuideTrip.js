import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../apiConfig";

const useFetchGuideTrip = (tripId, language = "en") => {
  const [GuideTripDetails, setGuideTripDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTripDetails = async () => {
      console.log("Fetching trip details for tripId:", tripId);

      try {
        const response = await axios.get(
          `${BASE_URL}/user/guide/trips/show/${tripId}`,
          {
            headers: {
              "Content-Language": language,
              Accept: "application/json",
              "X-API-KEY": "DISCOVERJO91427",
            },
          }
        );

        console.log("API Response:", response.data);

        if (response.data.status === 200) {
          setGuideTripDetails(response.data.data); // Set the trip details
          console.log("Guide Trip Details set:", response.data.data);
        } else {
          setError(
            new Error(response.data.msg || "Failed to fetch trip details")
          );
        }
      } catch (err) {
        setError(err);
        console.error("Error fetching trip details:", err);
      } finally {
        setIsLoading(false);
        console.log("Loading completed");
      }
    };

    if (tripId) {
      fetchTripDetails();
    }
  }, [tripId, language]);

  return { GuideTripDetails, isLoading, error };
};

export default useFetchGuideTrip;

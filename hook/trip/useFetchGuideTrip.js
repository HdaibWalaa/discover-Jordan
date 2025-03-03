import { useState, useEffect, useContext } from "react";
import axios from "axios";
import BASE_URL from "../apiConfig";
import { AuthContext } from "../../store/auth-context";

const useFetchGuideTrip = (tripId, language = "en") => {
  const [GuideTripDetails, setGuideTripDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchTripDetails = async () => {
      console.log("Fetching trip details for tripId:", tripId);
      if (!tripId) {
        setError(new Error("Trip ID is required"));
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${BASE_URL}/user/guide/trips/show/${tripId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Language": language,
              Accept: "application/json",
              "X-API-KEY": "DISCOVERJO91427",
            },
          }
        );

        console.log("API Response:", response.data);

        if (response.data.status === 200) {
          const tripData = response.data.data;

          if (!tripData.gallery || !Array.isArray(tripData.gallery)) {
            tripData.gallery = [];
          }

          setGuideTripDetails(tripData);
          console.log("Guide Trip Details set:", tripData);
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

    if (tripId && token) {
      fetchTripDetails();
    } else if (tripId && !token) {
      console.warn(
        "Authentication token is missing. User-specific features may not work."
      );
      fetchTripDetails();
    }
  }, [tripId, language, token]);

  return { GuideTripDetails, isLoading, error };
};

export default useFetchGuideTrip;

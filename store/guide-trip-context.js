import React, { useState, createContext } from "react";
import axios from "axios";
import BASE_URL from "../hook/apiConfig";

export const GuideTripContext = createContext();

export const GuideTripProvider = ({ children }) => {
  const [guideTrips, setGuideTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGuideTrips = async (token, language) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/user/guide/trips`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Language": language,
          "X-API-KEY": "DISCOVERJO91427",
        },
      });
      setGuideTrips(response.data.data.trips);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const addGuideTrip = (newTrip) => {
    setGuideTrips((prevTrips) => [newTrip, ...prevTrips]);
  };

  return (
    <GuideTripContext.Provider
      value={{ guideTrips, isLoading, error, fetchGuideTrips, addGuideTrip }}
    >
      {children}
    </GuideTripContext.Provider>
  );
};

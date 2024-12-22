import React, { useState, createContext } from "react";
import axios from "axios";
import BASE_URL from "../hook/apiConfig";

export const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTrips = async (token, language) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/trip`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Language": language,
        },
      });
      setTrips(response.data.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const addTrip = (newTrip) => {
    setTrips((prevTrips) => [newTrip, ...prevTrips]);
  };

  return (
    <TripContext.Provider
      value={{ trips, isLoading, error, fetchTrips, addTrip }}
    >
      {children}
    </TripContext.Provider>
  );
};

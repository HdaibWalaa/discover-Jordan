import React, { useState, createContext } from "react";
import axios from "axios";
import BASE_URL from "../hook/apiConfig";

export const GuideTripContext = createContext();

export const GuideTripProvider = ({ children }) => {
  const [guideTrips, setGuideTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    nextPageUrl: null,
    prevPageUrl: null,
    total: 0,
  });

  const fetchGuideTrips = async (token, language = "en", page = 1) => {
    setIsLoading(true);
    setError(null); // Clear previous errors

    try {
      const response = await axios.get(`${BASE_URL}/user/guide/trips`, {
        params: { page },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Language": language || "en", // Default to English if language is undefined
          "X-API-KEY": "DISCOVERJO91427",
          Accept: "application/json", // Add Accept header for proper content negotiation
        },
      });

      // Check if response is successful and has expected structure
      if (response.data && response.data.data && response.data.data.trips) {
        // Set the trips data
        setGuideTrips(response.data.data.trips);

        // Extract pagination data safely
        const paginationData = response.data.data.pagination || {};

        // Set pagination data with defaults for missing fields
        setPagination({
          currentPage: page,
          totalPages: Math.ceil(paginationData.total / 10), // Assuming 10 items per page
          nextPageUrl: paginationData.next_page_url || null,
          prevPageUrl: paginationData.prev_page_url || null,
          total: paginationData.total || 0,
        });
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Error fetching guide trips:", err);
      setError(
        err.response?.data?.message || err.message || "An error occurred"
      );

      // Keep existing data in case of error
      // Don't update guideTrips state
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNextPage = async (token, language) => {
    if (!pagination.nextPageUrl || isLoading) return;
    await fetchGuideTrips(token, language, pagination.currentPage + 1);
  };

  const fetchPrevPage = async (token, language) => {
    if (!pagination.prevPageUrl || isLoading) return;
    await fetchGuideTrips(token, language, pagination.currentPage - 1);
  };

  // Function to load more trips (for infinite scrolling)
  const loadMoreTrips = async (token, language) => {
    if (!pagination.nextPageUrl || isLoading) return;

    setIsLoading(true);
    try {
      const nextPage = pagination.currentPage + 1;

      // Use base URL with page parameter instead of full next URL
      // This avoids issues with potentially malformed URLs in the response
      const response = await axios.get(`${BASE_URL}/user/guide/trips`, {
        params: { page: nextPage },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Language": language || "en",
          "X-API-KEY": "DISCOVERJO91427",
          Accept: "application/json",
        },
      });

      // Check response structure
      if (response.data && response.data.data && response.data.data.trips) {
        // Append new trips to existing trips
        setGuideTrips((prevTrips) => [
          ...prevTrips,
          ...response.data.data.trips,
        ]);

        // Extract pagination data safely
        const paginationData = response.data.data.pagination || {};

        // Update pagination
        setPagination({
          currentPage: nextPage,
          totalPages: Math.ceil(paginationData.total / 10),
          nextPageUrl: paginationData.next_page_url || null,
          prevPageUrl: paginationData.prev_page_url || null,
          total: paginationData.total || 0,
        });
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Error loading more trips:", err);
      setError(
        err.response?.data?.message || err.message || "An error occurred"
      );
      // Don't update state on error
    } finally {
      setIsLoading(false);
    }
  };

  const addGuideTrip = (newTrip) => {
    if (!newTrip) return; // Validate input

    setGuideTrips((prevTrips) => {
      // Check if trip already exists to avoid duplicates
      const exists = prevTrips.some((trip) => trip.id === newTrip.id);
      if (exists) {
        return prevTrips.map((trip) =>
          trip.id === newTrip.id ? { ...trip, ...newTrip } : trip
        );
      }
      // Add new trip at the beginning
      return [newTrip, ...prevTrips];
    });
  };

  const updateGuideTrip = (updatedTrip) => {
    if (!updatedTrip || !updatedTrip.id) return;

    setGuideTrips((prevTrips) =>
      prevTrips.map((trip) =>
        trip.id === updatedTrip.id ? { ...trip, ...updatedTrip } : trip
      )
    );
  };

  const deleteGuideTrip = (tripId) => {
    if (!tripId) return;

    setGuideTrips((prevTrips) =>
      prevTrips.filter((trip) => trip.id !== tripId)
    );
  };

  const toggleFavorite = (tripId) => {
    if (!tripId) return;

    setGuideTrips((prevTrips) =>
      prevTrips.map((trip) =>
        trip.id === tripId ? { ...trip, favorite: !trip.favorite } : trip
      )
    );
  };

  return (
    <GuideTripContext.Provider
      value={{
        guideTrips,
        setGuideTrips, // Export the setter for direct access if needed
        isLoading,
        error,
        pagination,
        fetchGuideTrips,
        fetchNextPage,
        fetchPrevPage,
        loadMoreTrips,
        addGuideTrip,
        updateGuideTrip, // Added new function for updating
        deleteGuideTrip, // Added new function for deleting
        toggleFavorite,
      }}
    >
      {children}
    </GuideTripContext.Provider>
  );
};

export default GuideTripProvider;

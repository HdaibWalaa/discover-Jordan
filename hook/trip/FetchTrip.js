import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../apiConfig";

const FetchTrip = (tripId, token, language) => {
  const [tripDetails, setTripDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTripDetails = async () => {
      console.log("Fetching trip details with language:", language);

      try {
        const response = await axios.get(`${BASE_URL}/trip/details/${tripId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Language": language,
          },
        });
        setTripDetails(response.data.data);
      } catch (err) {
        setError(err);
        console.error("Error fetching trip details:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTripDetails();
  }, [tripId, token, language]);

  const joinTrip = async () => {
    setIsLoading(true);
    console.log("Joining trip with language:", language);

    try {
      const response = await axios.post(
        `${BASE_URL}/trip/join/${tripId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Accept-Language": language || "en",
          },
        }
      );
      return { success: true, message: "You joined the trip successfully!" };
    } catch (err) {
      if (err.response && err.response.status === 400) {
        return { success: false, message: err.response.data.msg[0] };
      } else {
        return { success: false, message: "Failed to join the trip." };
      }
    } finally {
      setIsLoading(false);
    }
  };

const deleteTrip = async () => {
  try {
    const response = await axios.delete(`${BASE_URL}/trip/delete/${tripId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Accept-Language": language || "en",
      },
    });

    if (response.status === 200) {
      return {
        success: true,
        message: response.data.msg || "Trip deleted successfully!",
      };
    } else {
      console.error(`Unexpected status code: ${response.status}`);
      return { success: false, message: "Failed to delete the trip." };
    }
  } catch (err) {
    if (err.response) {
      console.error(
        `Error deleting trip: ${err.response.status} - ${err.response.data}`
      );
    } else {
      console.error("Error deleting trip:", err.message);
    }
    return { success: false, message: "Failed to delete the trip." };
  }
};


const editTrip = async (updatedTripData) => {
  try {
    console.log("Sending updated trip data:", updatedTripData);

    const response = await axios.post(
      `${BASE_URL}/trip/update/${tripId}`,
      updatedTripData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    console.log("API Response:", response.data);

    if (response.status === 200) {
      setTripDetails(response.data.data); // Update the trip details after editing
      return { success: true, message: "Trip updated successfully!" };
    } else {
      console.error("Unexpected status code:", response.status);
      return { success: false, message: "Failed to update the trip." };
    }
  } catch (err) {
    if (err.response) {
      console.error(
        "Error updating trip:",
        err.response.status,
        err.response.data
      );
      return {
        success: false,
        message: err.response.data.message || "Failed to update the trip.",
      };
    } else {
      console.error("Error updating trip:", err.message);
      return {
        success: false,
        message: "Failed to update the trip due to network error.",
      };
    }
  }
};



  return { tripDetails, isLoading, error, joinTrip, deleteTrip, editTrip };
};

export default FetchTrip;

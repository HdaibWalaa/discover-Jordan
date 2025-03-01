import axios from "axios";
import BASE_URL from "../apiConfig";

const API_KEY = "DISCOVERJO91427";

export const addReview = async (tripId, token, rating, comment) => {
  try {
    const payload = { rating: parseInt(rating), comment: comment.trim() };
    console.log("Payload being sent:", payload);

    const response = await axios.post(
      `${BASE_URL}/trip/add/review/${tripId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-API-KEY": API_KEY,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error adding review:",
      error.response?.data || error.message
    );
    throw error;
  }
};


export const editReview = async (reviewId, token, updatedContent) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/trip/update/review/${reviewId}`,
      { content: updatedContent },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-API-KEY": API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error editing review:", error);
    throw error;
  }
};

export const deleteReview = async (reviewId, token) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/trip/delete/review/${reviewId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "X-API-KEY": API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};

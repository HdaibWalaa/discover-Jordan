import axios from "axios";
import BASE_URL from "../apiConfig";

const API_KEY = "DISCOVERJO91427";

export const addReview = async (placeId, token, rating, comment) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/place/add/review/${placeId}`,
      { rating, comment },
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
    console.error("Error adding review:", error);
    throw error;
  }
};

export const editReview = async (reviewId, token, updatedContent) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/place/update/review/${reviewId}`,
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
      `${BASE_URL}/place/delete/review/${reviewId}`,
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

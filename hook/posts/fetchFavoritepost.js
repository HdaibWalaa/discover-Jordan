import axios from "axios";
import BASE_URL from "../apiConfig";

export const addFavorite = async (postId, token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/post/favorite/${postId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding favorite:", error.message);
    throw error;
  }
};

export const deleteFavorite = async (postId, token) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/post/favorite/${postId}/delete`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting favorite:", error.message);
    throw error;
  }
};

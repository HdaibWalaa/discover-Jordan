import axios from "axios";
import BASE_URL from "../hook/apiConfig"; // Adjust the path as per your project structure

// Fetch following API function
export const fetchFollowingApi = async (token, userId) => {
  try {
    // Log the userId to ensure it's being passed correctly
    console.log("Fetching following users for userId:", userId);

    const response = await axios.get(
      `${BASE_URL}/follow/followings/${userId}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "X-API-KEY": "DISCOVERJO91427", // Include the Bearer token for authentication
        },
      }
    );

    // Return the data
    return response.data;
  } catch (error) {
    throw error;
  }
};

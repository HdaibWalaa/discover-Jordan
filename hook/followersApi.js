import axios from "axios";
import BASE_URL from "../hook/apiConfig"; // Adjust the path as per your project structure

// Fetch followers API function
export const fetchFollowersApi = async (token, userId) => {
  try {
    // Log the userId to ensure it's being passed correctly
    console.log("Fetching followers for userId:", userId);

    const response = await axios.get(`${BASE_URL}/follow/followers/${userId}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`, // Include the Bearer token for authentication
      },
    });

    // Return the data
    return response.data;
  } catch (error) {
    throw error;
  }
};

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import BASE_URL from "../apiConfig";

// Modified to accept token as a parameter
const fetchUserAdminPlan = async (language, token = null, pageNum = 1) => {
  try {
    // If token is not passed as parameter, try to get it from AsyncStorage
    if (!token) {
      token = await AsyncStorage.getItem("authToken");
      console.log(
        "Using token from AsyncStorage:",
        token ? "Found" : "Not found"
      );
    } else {
      console.log("Using token passed as parameter");
    }

    // If still no token, throw error
    if (!token) {
      throw new Error("Authentication token is missing. Please login again.");
    }

    // Make request with token in Authorization header
    const response = await axios.get(`${BASE_URL}/plan`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Language": language || "en",
        "X-API-KEY": "DISCOVERJO91427",
        Accept: "application/json",
      },
    });

    if (!response.data || !Array.isArray(response.data.data)) {
      console.log("Invalid response structure:", response.data);
      return []; // Return empty array instead of throwing error
    }

   return response.data.data;
  } catch (error) {
    // Enhanced error logging
    if (error.response) {
      console.error("Server error:", error.response.status);
      console.error("Error data:", JSON.stringify(error.response.data));
    } else if (error.request) {
      console.error("Network error - no response received");
    } else {
      console.error("Error setting up request:", error.message);
    }

    // Rethrow error but with a cleaner message
    throw new Error(
      error.response?.data?.message || error.message || "Failed to fetch plans"
    );
  }
};

export default fetchUserAdminPlan;

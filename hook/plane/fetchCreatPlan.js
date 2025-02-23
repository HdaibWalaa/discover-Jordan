import axios from "axios";
import BASE_URL from "../apiConfig";

const fetchCreatPlan = async (planData, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/plan/create`, planData, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "X-API-KEY": "DISCOVERJO91427",
      },
    });

    if (!response.data?.id) {
      return {
        error: true,
        msg: response.data?.msg || "Missing plan ID in response",
      };
    }

    return response.data;
  } catch (error) {
    let errorMsg = "An unexpected error occurred";

    if (error.response) {
      // Handle validation errors array
      if (Array.isArray(error.response.data)) {
        errorMsg = error.response.data
          .map((err) => err.replace("Error: ", ""))
          .join("\n");
      } else {
        errorMsg =
          error.response.data?.message ||
          error.response.data?.msg ||
          `Server error: ${error.response.status}`;
      }
    } else if (error.request) {
      errorMsg = "No response from server. Check your internet connection.";
    } else {
      errorMsg = error.message;
    }

    throw new Error(errorMsg);
  }
};


export default fetchCreatPlan;

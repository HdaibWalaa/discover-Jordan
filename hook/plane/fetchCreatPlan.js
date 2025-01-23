import axios from "axios";
import BASE_URL from "../apiConfig";

const fetchCreatPlan = async (planData, token) => {
  console.log("Sending plan data to API:", planData); // Log the plan data
  try {
    const response = await axios.post(`${BASE_URL}/plan/create`, planData, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "X-API-KEY": "DISCOVERJO91427",
      },
    });

    console.log("API Response:", response.data); // Log the response from API
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error creating plan:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    throw error;
  }
};

export default fetchCreatPlan;

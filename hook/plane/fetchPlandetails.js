import axios from "axios";
import BASE_URL from "../apiConfig";

const fetchPlanDetails = async (id, token, language) => {
  try {
    if (!id) throw new Error("Plan ID is missing.");
    if (!token) throw new Error("Token is missing.");

    console.log("Fetching Plan Details:", { id, token, language });

    const response = await axios.get(`${BASE_URL}/plan/show/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-API-KEY": "DISCOVERJO91427",
        Accept: "application/json",
        "Content-Language": language,
      },
    });

    console.log("API Response:", response.data);
    return response.data.data; // Adjust based on your API response structure
  } catch (error) {
    if (error.response) {
      console.error("API Error Response:", error.response.data);
    } else {
      console.error("Error Fetching Plan Details:", error.message);
    }
    throw error;
  }
};

export default fetchPlanDetails; 

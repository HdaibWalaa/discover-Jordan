import axios from "axios";
import BASE_URL from "../apiConfig";

const fetchPlans = async (language, pageNum = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/all/plans?page=${pageNum}`, {
      headers: {
        "Content-Language": language,
        "X-API-KEY": "DISCOVERJO91427",
      },
    });
    return response.data.data.plans;
  } catch (error) {
    console.error("Error fetching plans:", error);
    throw error;
  }
};

export default fetchPlans;

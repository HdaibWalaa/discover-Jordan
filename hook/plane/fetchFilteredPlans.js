import axios from "axios";
import BASE_URL from "../apiConfig";

const fetchFilteredPlans = async (
  language,
  numberOfDays = "",
  regionId = ""
) => {
  try {
    const response = await axios.get(`${BASE_URL}/plan/filter`, {
      params: {
        number_of_days: numberOfDays,
        region_id: regionId,
      },
      headers: {
        "Content-Language": language,
      },
    });
    return response.data.data || []; // Ensure we return an empty array if no data
  } catch (error) {
    console.error("Error fetching filtered plans:", error);
    throw error;
  }
};

export default fetchFilteredPlans;

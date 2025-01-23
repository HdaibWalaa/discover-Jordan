import axios from "axios";
import BASE_URL from "../apiConfig";

const fetchPersonalTrips = async (token, language) => {
  try {
    const response = await axios.get(`${BASE_URL}/trip/private`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Language": language,
        "X-API-KEY": "DISCOVERJO91427",
      },
    });
    if (response.data.status === 200) {
      return response.data.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    }
  } catch (error) {
    console.error("Error fetching trips:", error);
    return [];
  }
};

export default fetchPersonalTrips;

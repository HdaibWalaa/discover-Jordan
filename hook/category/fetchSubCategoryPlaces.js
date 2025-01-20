import axios from "axios";
import BASE_URL from "../apiConfig";

const fetchSubCategoryPlaces = async (
  subCategoryId,
  language,
  pageNum = 1,
  userLatitude,
  userLongitude,
  token // Accept token here
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/places/subcategory/${subCategoryId}?page=${pageNum}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Use token here
          "Content-Language": language,
          "X-API-KEY": "DISCOVERJO91427",
        },
        params: {
          lat: userLatitude,
          lng: userLongitude,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching subcategory places:", error);
    throw error;
  }
};

export default fetchSubCategoryPlaces;

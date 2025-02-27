import axios from "axios";
import BASE_URL from "../hook/apiConfig";

// Unified response handler
const handleResponse = (response) => {
  // Handle different API response structures
  return (
    response?.data?.data?.data || // For paginated responses
    response?.data?.data || // For nested data
    response?.data || // For direct arrays
    []
  ); // Fallback
};

export const searchAll = async (query, language) => {
  try {
    const response = await axios.get(`${BASE_URL}/all/search`, {
      params: { query },
      headers: { "Content-Language": language, "X-API-KEY": "DISCOVERJO91427" },
    });
    return response.data?.data || {};
  } catch (error) {
    console.error("All search error:", error);
    return {};
  }
};

export const searchPlaces = async (query = "", language) => {
  try {
    const response = await axios.get(`${BASE_URL}/all/places/search`, {
      params: { query },
      headers: { "Content-Language": language, "X-API-KEY": "DISCOVERJO91427" },
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Error fetching places:", error);
    return [];
  }
};

// Update all other search functions similarly:
export const searchTrips = async (query, language) => {
  try {
    const response = await axios.get(`${BASE_URL}/all/trip/search`, {
      params: { query },
      headers: { "Content-Language": language, "X-API-KEY": "DISCOVERJO91427" },
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Error fetching trips:", error);
    return [];
  }
};

export const searchPlans = async (query, language) => {
  try {
    const response = await axios.get(`${BASE_URL}/all/plan/search`, {
      params: { query },
      headers: { "Content-Language": language, "X-API-KEY": "DISCOVERJO91427" },
    });
    return response.data?.data?.data || [];
  } catch (error) {
    console.error("Error fetching plans:", error);
    return [];
  }
};

export const searchUsers = async (query, language) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/search`, {
      params: { query },
      headers: { "Content-Language": language, "X-API-KEY": "DISCOVERJO91427" },
    });
    return response.data?.data?.data || [];
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const searchPopularPlaces = async (query, language) => {
  try {
    const response = await axios.get(`${BASE_URL}/popular/places/search`, {
      params: { query },
      headers: { "Content-Language": language, "X-API-KEY": "DISCOVERJO91427" },
    });
    return response.data?.data?.data || [];
  } catch (error) {
    console.error("Error fetching popular places:", error);
    return [];
  }
};

export const searchTopTenPlaces = async (query, language) => {
  try {
    const response = await axios.get(`${BASE_URL}/top-ten/places/search`, {
      params: { query },
      headers: { "Content-Language": language, "X-API-KEY": "DISCOVERJO91427" },
    });
    return response.data?.data?.data || [];
  } catch (error) {
    console.error("Error fetching top ten places:", error);
    return [];
  }
};

export const searchEvents = async (query, language) => {
  try {
    const response = await axios.get(`${BASE_URL}/all/event/search`, {
      params: { query },
      headers: { "Content-Language": language, "X-API-KEY": "DISCOVERJO91427" },
    });
    return response.data?.data?.data || [];
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

export const searchVolunteering = async (query, language) => {
  try {
    const response = await axios.get(`${BASE_URL}/all/volunteering/search`, {
      params: { query },
      headers: { "Content-Language": language, "X-API-KEY": "DISCOVERJO91427" },
    });
    return response.data?.data?.data || [];
  } catch (error) {
    console.error("Error fetching volunteering:", error);
    return [];
  }
};

export const searchCategories = async (query, language) => {
  try {
    const response = await axios.get(`${BASE_URL}/categories/search`, {
      params: { query },
      headers: { "Content-Language": language, "X-API-KEY": "DISCOVERJO91427" },
    });
    return response.data?.data?.data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const searchGuideTrips = async (query, language) => {
  try {
    const response = await axios.get(`${BASE_URL}/all/guide-trip/search`, {
      params: { query },
      headers: { "Content-Language": language, "X-API-KEY": "DISCOVERJO91427" },
    });
    return response.data?.data?.data || [];
  } catch (error) {
    console.error("Error fetching guide trips:", error);
    return [];
  }
};

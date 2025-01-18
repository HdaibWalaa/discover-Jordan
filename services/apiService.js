import axios from "axios";
import BASE_URL from "../hook/apiConfig";

// Function to search for places
export const searchPlaces = async (query, lat, lng, language) => {
  try {
    const response = await axios.get(`${BASE_URL}/all/places/search`, {
      params: { query, lat, lng },
      headers: { "Content-Language": language },
    });
    return response.data.data.places || []; // Return an empty array if no places
  } catch (error) {
    console.error("Error fetching places:", error);
    throw error;
  }
};

// Function to search for trips
export const searchTrips = async (query, language) => {
  try {
    const response = await axios.get(`${BASE_URL}/all/trip/search`, {
      params: { query },
      headers: { "Content-Language": language },
    });
    return response.data.data.trips || []; // Return an empty array if no trips
  } catch (error) {
    console.error("Error fetching trips:", error);
    throw error;
  }
};

// Function to search for plans
export const searchPlans = async (query, language) => {
  try {
    const response = await axios.get(`${BASE_URL}/all/plan/search`, {
      params: { query },
      headers: { "Content-Language": language },
    });
    return response.data.data.plans || []; // Return an empty array if no plans
  } catch (error) {
    console.error("Error fetching plans:", error);
    throw error;
  }
};

// Function to search for users
export const searchUsers = async (query, language) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/search`, {
      params: { query },
      headers: { "Content-Language": language },
    });
    return response.data.data.users || []; // Return an empty array if no users
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Function to search for popular places
export const searchPopularPlaces = async (query, language) => {
  try {
    const response = await axios.get(`${BASE_URL}/popular/places/search`, {
      params: { query },
      headers: { "Content-Language": language },
    });
    return response.data.data || []; // Return an empty array if no popular places
  } catch (error) {
    console.error("Error fetching popular places:", error);
    throw error;
  }
};

// Function to search for top ten places
export const searchTopTenPlaces = async (query, language) => {
  try {
    const response = await axios.get(`${BASE_URL}/top-ten/places/search`, {
      params: { query },
      headers: { "Content-Language": language },
    });
    return response.data.data || []; // Return an empty array if no top ten places
  } catch (error) {
    console.error("Error fetching top ten places:", error);
    throw error;
  }
};

// Function to search for events
export const searchEvents = async (query, language) => {
  try {
    const response = await axios.get(`${BASE_URL}/all/event/search`, {
      params: { query },
      headers: { "Content-Language": language },
    });
    return response.data.data.events || []; // Return an empty array if no events
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

// Function to search for volunteering opportunities
export const searchVolunteering = async (query, language) => {
  try {
    const response = await axios.get(`${BASE_URL}/all/volunteering/search`, {
      params: { query },
      headers: { "Content-Language": language },
    });
    return response.data.data.volunteering || []; // Return an empty array if no volunteering opportunities
  } catch (error) {
    console.error("Error fetching volunteering opportunities:", error);
    throw error;
  }
};

// Function to search for categories
export const searchCategories = async (query, language) => {
  try {
    const response = await axios.get(`${BASE_URL}/categories/search`, {
      params: { query },
      headers: { "Content-Language": language },
    });
    return response.data.data || []; // Return an empty array if no categories
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// Function to search for guide trips
export const searchGuideTrips = async (query, language) => {
  try {
    const response = await axios.get(`${BASE_URL}/all/guide-trip/search`, {
      params: { query },
      headers: { "Content-Language": language },
    });
    return response.data.data.trips || []; // Return an empty array if no guide trips
  } catch (error) {
    console.error("Error fetching guide trips:", error);
    throw error;
  }
};

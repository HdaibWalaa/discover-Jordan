import axios from "axios";
import BASE_URL from "../apiConfig";

/**
 * Fetch the list of subscribers for a specific guide trip.
 * @param {number} tripId - The ID of the guide trip.
 * @param {string} token - The authorization token.
 * @returns {Promise<Array>} - A promise that resolves to the list of subscribers.
 */
export const fetchGuideTripSubscribers = async (tripId, token) => {
  try {
    console.log(`Making API request to fetch subscribers for trip ${tripId}`);
    console.log(`API URL: ${BASE_URL}/user/guide-trip/subscription/${tripId}`);

    // Ensure tripId is a valid number
    if (!tripId || isNaN(Number(tripId))) {
      throw new Error(`Invalid trip ID: ${tripId}`);
    }

    const response = await axios.get(
      `${BASE_URL}/user/guide-trip/subscription/${tripId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "X-API-KEY": "DISCOVERJO91427",
        },
        timeout: 10000, // 10 second timeout
      }
    );

    console.log("API Response status:", response.status);
    console.log(
      "API Response data structure:",
      JSON.stringify(response.data, null, 2).substring(0, 500) + "..."
    );

    // Check if response data has the expected structure
    if (!response.data || !response.data.data) {
      console.error("Unexpected API response structure:", response.data);
      return []; // Return empty array instead of throwing error
    }

    return response.data.data;
  } catch (error) {
    console.error("Error fetching subscribers:", error);

    // Log more detailed error information
    if (error.response) {
      console.error("Error response status:", error.response.status);
      console.error("Error response data:", error.response.data);
    }

    // Provide a more descriptive error message
    const errorMessage =
      error.response?.data?.msg ||
      "Failed to fetch subscribers. Please check your connection and try again.";

    throw new Error(errorMessage);
  }
};

/**
 * Delete a subscriber from a guide trip.
 * @param {number} tripId - The ID of the guide trip.
 * @param {string} phoneNumber - The phone number of the subscriber to delete.
 * @param {string} token - The authorization token.
 * @returns {Promise<void>}
 */
export const deleteGuideTripSubscriber = async (tripId, phoneNumber, token) => {
  try {
    console.log(
      `Deleting subscriber with phone ${phoneNumber} from trip ${tripId}`
    );

    if (!phoneNumber) {
      throw new Error("Phone number is required for deletion");
    }

    await axios.delete(
      `${BASE_URL}/user/guide-trip/subscription/${tripId}/delete`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "X-API-KEY": "DISCOVERJO91427",
          "Content-Type": "application/json",
        },
        data: { phone_number: phoneNumber },
        timeout: 10000, // 10 second timeout
      }
    );

    console.log("Subscriber deleted successfully");
  } catch (error) {
    console.error("Error deleting subscriber:", error);

    if (error.response) {
      console.error("Error response status:", error.response.status);
      console.error("Error response data:", error.response.data);
    }

    const errorMessage =
      error.response?.data?.msg ||
      "Failed to delete subscriber. Please try again.";

    throw new Error(errorMessage);
  }
};

/**
 * Update the list of subscribers for a guide trip.
 * @param {number} tripId - The ID of the guide trip.
 * @param {Array} subscribers - The updated list of subscribers.
 * @param {string} token - The authorization token.
 * @returns {Promise<void>}
 */
export const updateGuideTripSubscribers = async (
  tripId,
  subscribers,
  token
) => {
  try {
    console.log(`Updating subscribers for trip ${tripId}`);
    console.log("Subscribers data:", JSON.stringify(subscribers));

    await axios.post(
      `${BASE_URL}/user/guide-trip/subscription/${tripId}/update`,
      { subscribers },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "X-API-KEY": "DISCOVERJO91427",
          "Content-Type": "application/json",
        },
        timeout: 10000, // 10 second timeout
      }
    );

    console.log("Subscribers updated successfully");
  } catch (error) {
    console.error("Error updating subscribers:", error);

    if (error.response) {
      console.error("Error response status:", error.response.status);
      console.error("Error response data:", error.response.data);
    }

    const errorMessage =
      error.response?.data?.msg ||
      "Failed to update subscribers. Please try again.";

    throw new Error(errorMessage);
  }
};

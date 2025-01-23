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
    const response = await axios.get(
      `${BASE_URL}/user/guide-trip/subscription/${tripId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-API-KEY": "DISCOVERJO91427",
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    throw new Error("Failed to fetch subscribers.");
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
    await axios.delete(`${BASE_URL}/user/guide-trip/delete/${tripId}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { phone_number: phoneNumber },
    });
  } catch (error) {
    console.error("Error deleting subscriber:", error);
    throw new Error("Failed to delete subscriber.");
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
    await axios.post(
      `${BASE_URL}/user/guide-trip/update`,
      { guide_trip_id: tripId, subscribers },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    console.error("Error updating subscribers:", error);
    throw new Error("Failed to update subscribers.");
  }
};

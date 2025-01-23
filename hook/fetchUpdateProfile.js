import axios from "axios";
import BASE_URL from "../hook/apiConfig";

export async function getUserProfile(token) {
  const url = `${BASE_URL}/user/profile`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Language": "en",
        "X-API-KEY": "DISCOVERJO91427",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error occurred while fetching profile:", error.message);
    throw error;
  }
}

export async function updateUserProfile(data, token) {
  const url = `${BASE_URL}/profile/update`;
  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Language": "en",
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error occurred while updating profile:", error.message);
    throw error;
  }
}

export async function setUserLocation(data, token) {
  const url = `${BASE_URL}/user/set-location`;
  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error occurred while setting location:", error.message);
    throw error;
  }
}

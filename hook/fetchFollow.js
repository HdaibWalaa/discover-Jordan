import axios from "axios";

const BASE_URL = "https://rehletna-jo.com/journey/public/api";

export const getFollowers = async (token, userId) => {
  const response = await axios.get(`${BASE_URL}/follow/followers/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Language": en,
    },
  });
  return response.data;
};

export const getFollowings = async (token, userId) => {
  const response = await axios.get(`${BASE_URL}/follow/followings/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Language": en,
    },
  });
  return response.data;
};

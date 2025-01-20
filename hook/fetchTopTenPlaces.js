import { useState, useEffect, useContext } from "react";
import axios from "axios";
import BASE_URL from "./apiConfig";
import { AuthContext } from "../store/auth-context";

const fetchTopTenPlaces = (language) => {
  const [topTenData, setTopTenData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const fetchData = async () => {
    setIsLoading(true);

    try {
      // Log the token for debugging
      console.log("User token being sent:", token);

      const response = await axios.get(`${BASE_URL}/top-ten-places`, {
        headers: {
          "Content-Language": language,
          "X-API-KEY": "DISCOVERJO91427",
          Authorization: `Bearer ${token}`,
        },
      });
      setTopTenData(response.data.data);
    } catch (error) {
      console.error("Error fetching top ten places:", error); // Log the error
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [language]);

  return { topTenData, isLoading, error };
};

export default fetchTopTenPlaces;

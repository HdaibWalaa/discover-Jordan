import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "./apiConfig";

const fetchTopTenPlaces = (language) => {
  const [topTenData, setTopTenData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/top-ten-places`, {
        headers: {
          "Content-Language": language,
        },
      });
      setTopTenData(response.data.data);
    } catch (error) {
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

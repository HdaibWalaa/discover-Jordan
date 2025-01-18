import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "./apiConfig";

const fetchPopularPlaces = (language, userLocation) => {
  const [popularData, setPopularData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`${BASE_URL}/popular/places`, {
        params: {
          lat: userLocation?.latitude, // Send the latitude
          lng: userLocation?.longitude, // Send the longitude
        },
        headers: {
          "Content-Language": language,
          "X-API-KEY": "DISCOVERJO91427",
        },
      });

      setPopularData(response.data.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userLocation) {
      fetchData();
    }
  }, [language, userLocation]);

  return { popularData, isLoading, error };
};

export default fetchPopularPlaces;

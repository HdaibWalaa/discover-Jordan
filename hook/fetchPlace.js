import { useState, useEffect, useContext } from "react";
import axios from "axios";
import BASE_URL from "./apiConfig";
import { AuthContext } from "../store/auth-context";

const fetchPlace = (id, language, userLatitude, userLongitude) => {
  const [placeData, setPlaceData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const fetchData = async () => {
    setIsLoading(true);

    try {
      // Construct the URL with lat and lng as query parameters
      const url = `${BASE_URL}/place/${id}?lat=${userLatitude}&lng=${userLongitude}`;

      const response = await axios.get(url, {
        headers: {
          "Content-Language": language,
          Authorization: `Bearer ${token}`,
        },
      });

      setPlaceData(response.data.data);
      console.log("Place Data:", response.data.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = () => {
    fetchData();
  };

  useEffect(() => {
    if (userLatitude && userLongitude) {
      fetchData();
    }
  }, [id, language, userLatitude, userLongitude]);

  return { placeData, isLoading, error, refetch };
};

export default fetchPlace;

import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../apiConfig";

const fetchAllGuideTrips = (language) => {
  const [guidTripData, setGuidTripData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    const url = `${BASE_URL}/user/guide/trips`;

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Language": language,
        },
      });
      if (response.data && response.data.data && response.data.data.trips) {
        setGuidTripData(response.data.data.trips);
      } else {
        setGuidTripData([]);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [language]);

  return { guidTripData, isLoading, error };
};

export default fetchAllGuideTrips;

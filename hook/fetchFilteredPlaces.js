import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "./apiConfig";

const fetchFilteredPlaces = (filterParams, page) => {
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/places/filter`, {
          params: { ...filterParams, page },
        });
        setFilteredPlaces(response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [filterParams, page]);

  return { filteredPlaces, isLoading, error };
};

export default fetchFilteredPlaces;

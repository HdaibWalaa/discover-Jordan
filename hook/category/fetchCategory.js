import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../apiConfig";

const fetchCategory = (language) => {
  const [categoryData, setCategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/all-categories`, {
        headers: {
          "Content-Language": language,
          "X-API-KEY": "DISCOVERJO91427",
        },
      });
      setCategoryData(response.data.data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const shuffleData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/shuffle/all-categories`, {
        headers: {
          "Content-Language": language,
          "X-API-KEY": "DISCOVERJO91427",
        },
      });
      setCategoryData(response.data.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [language]);

  return { categoryData, isLoading, error, shuffleData };
};

export default fetchCategory;

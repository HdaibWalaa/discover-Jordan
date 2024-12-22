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
        },
      });
      setCategoryData(response.data.data);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [language]);

  return { categoryData, isLoading, error };
};

export default fetchCategory;

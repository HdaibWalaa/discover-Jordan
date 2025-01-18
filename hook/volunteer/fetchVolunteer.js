import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../apiConfig";

const fetchVolunteer = (language) => {
  const [volunteerData, setVolunteerData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nextPageUrl, setNextPageUrl] = useState(null);

  const fetchData = async (url = `${BASE_URL}/all/volunteering`) => {
    setIsLoading(true);
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Language": language,
          "X-API-KEY": "DISCOVERJO91427", 
        },
      });
      if (response?.data?.data) {
        setVolunteerData(response.data.data.volunteering || []);
        setNextPageUrl(response.data.data.pagination?.next_page_url || null);
      } else {
        setVolunteerData([]);
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

  return {
    volunteerData,
    isLoading,
    error,
    fetchData,
    nextPageUrl,
  };
};

export default fetchVolunteer;

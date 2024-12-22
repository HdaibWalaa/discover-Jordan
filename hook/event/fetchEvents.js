import { useState, useEffect, useContext } from "react";
import axios from "axios";
import BASE_URL from "../apiConfig";
import { AuthContext } from "../../store/auth-context"; // Import AuthContext

const fetchEvents = (language) => {
  const [eventData, setEventData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const authCtx = useContext(AuthContext); // Access the authentication context

  const fetchData = async (url = `${BASE_URL}/all/events`, date) => {
    if (!authCtx.token) return; // Ensure token exists before making the API call

    setIsLoading(true);
    try {
      const fetchUrl = date ? `${BASE_URL}/date/events?date=${date}` : url;
      const response = await axios.get(fetchUrl, {
        headers: {
          "Content-Language": language,
          Authorization: `Bearer ${authCtx.token}`, // Send the user token
        },
      });
      setEventData(response.data.data.events);
      setNextPageUrl(response.data.data.pagination.next_page_url);
      setPrevPageUrl(response.data.data.pagination.prev_page_url);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data on initial load
  }, [language, authCtx.token]); // Add token dependency to refetch on token change

  return {
    eventData,
    isLoading,
    error,
    fetchData,
    nextPageUrl,
    prevPageUrl,
  };
};

export default fetchEvents;

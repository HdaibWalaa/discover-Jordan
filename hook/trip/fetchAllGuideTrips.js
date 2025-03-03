import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import BASE_URL from "../apiConfig";

const fetchAllGuideTrips = (language) => {
  const [guidTripData, setGuidTripData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    nextPageUrl: null,
    prevPageUrl: null,
    total: 0,
  });

  const fetchData = useCallback(
    async (page = 1) => {
      const url = `${BASE_URL}/user/guide/trips`;

      setIsLoading(true);
      try {
        const response = await axios.get(url, {
          params: { page },
          headers: {
            "Content-Language": language,
            "X-API-KEY": "DISCOVERJO91427",
          },
        });

        if (response.data && response.data.data && response.data.data.trips) {
          setGuidTripData(response.data.data.trips);

          // Set pagination data
          setPagination({
            currentPage: page,
            totalPages: Math.ceil(response.data.data.pagination.total / 10), // Assuming 10 items per page
            nextPageUrl: response.data.data.pagination.next_page_url,
            prevPageUrl: response.data.data.pagination.prev_page_url,
            total: response.data.data.pagination.total,
          });
        } else {
          setGuidTripData([]);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [language]
  );

  const loadMoreTrips = useCallback(async () => {
    if (!pagination.nextPageUrl || isLoading) return;

    try {
      const response = await axios.get(pagination.nextPageUrl, {
        headers: {
          "Content-Language": language,
          "X-API-KEY": "DISCOVERJO91427",
        },
      });

      if (response.data && response.data.data && response.data.data.trips) {
        // Append new trips to existing ones
        setGuidTripData((prevTrips) => [
          ...prevTrips,
          ...response.data.data.trips,
        ]);

        // Update pagination
        setPagination({
          currentPage: pagination.currentPage + 1,
          totalPages: Math.ceil(response.data.data.pagination.total / 10),
          nextPageUrl: response.data.data.pagination.next_page_url,
          prevPageUrl: response.data.data.pagination.prev_page_url,
          total: response.data.data.pagination.total,
        });
      }
    } catch (error) {
      setError(error);
    }
  }, [pagination.nextPageUrl, pagination.currentPage, isLoading, language]);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    guidTripData,
    isLoading,
    error,
    pagination,
    fetchData,
    loadMoreTrips,
  };
};

export default fetchAllGuideTrips;

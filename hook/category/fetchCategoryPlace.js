import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../apiConfig";

const fetchCategoryPlace = (id, language, userLatitude, userLongitude) => {
  const [categoryPlaces, setCategoryPlaces] = useState({
    places: [],
    sub_category: [],
    pagination: {},
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchData = async (pageNum = 1) => {
    setIsLoading(true);

    try {
      console.log("Language in fetchCategoryPlace:", language); // Log language here
      const res = await axios.get(
        `${BASE_URL}/places/category/${id}?page=${pageNum}`,
        {
          headers: {
            "Content-Language": language,
            "X-API-KEY":"DISCOVERJO91427",
          },
          params: {
            lat: userLatitude, // Sending the user's latitude
            lng: userLongitude, // Sending the user's longitude
          },
        }
      );

      setCategoryPlaces((prevData) => ({
        ...res.data.data,
        places: [...prevData.places, ...res.data.data.places],
      }));
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userLatitude && userLongitude) {
      setCategoryPlaces({ places: [], sub_category: [], pagination: {} });
      setPage(1);
      fetchData();
    }
  }, [id, language, userLatitude, userLongitude]);

  const loadMoreData = () => {
    if (categoryPlaces.pagination.next_page_url && !isLoading) {
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        fetchData(nextPage);
        return nextPage;
      });
    }
  };

  return { categoryPlaces, isLoading, error, loadMoreData };
};

export default fetchCategoryPlace;

import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../apiConfig";

const fetchCategoryPlace = (
  id,
  language,
  userLatitude,
  userLongitude,
  token
) => {
  const [categoryPlaces, setCategoryPlaces] = useState({
    places: [],
    sub_categories: [],
    pagination: {},
    name: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchData = async (pageNum = 1) => {
    setIsLoading(true);

    try {
      const res = await axios.get(
        `${BASE_URL}/places/category/${id}?page=${pageNum}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use token here
            "Content-Language": language,
            "X-API-KEY": "DISCOVERJO91427",
          },
          params: {
            lat: userLatitude,
            lng: userLongitude,
          },
        }
      );

      setCategoryPlaces((prevData) => ({
        ...prevData,
        places: [...prevData.places, ...res.data.data.places],
        sub_categories: res.data.data.sub_categories,
        pagination: res.data.data.pagination,
        name: res.data.data.category.name,
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
      setCategoryPlaces({
        places: [],
        sub_categories: [],
        pagination: {},
        name: "",
      });
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

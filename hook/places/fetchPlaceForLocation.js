import { useState } from "react";
import axios from "axios";
import BASE_URL from "../apiConfig";

const useFetchPlaceForLocation = () => {
  const [places, setPlaces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPlaces = async ({
    area,
    categoriesId,
    subcategoriesId,
    userLocation,
  }) => {
    if (!area || !categoriesId || !userLocation.lat || !userLocation.lng) {
      setError("All fields are required, including location.");
      return;
    }

    const params = {
      area,
      categories_id: JSON.stringify([parseInt(categoriesId)]),
      subcategories_id: JSON.stringify([parseInt(subcategoriesId)]),
      lat: userLocation.lat,
      lng: userLocation.lng,
    };

    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/user/current-location/places`,
        {
          headers: {
            "X-API-KEY": "DISCOVERJO91427",
            "Content-Language": "en",
          },
          params,
        }
      );
      setPlaces(response.data.data || []);
      if (response.data.data.length === 0) {
        setError(`No places found within ${area} km.`);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "An error occurred while fetching places."
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/categories/search`, {
        headers: {
          "X-API-KEY": "DISCOVERJO91427",
          "Content-Language": "en",
        },
      });
      setCategories(response.data.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "An error occurred while fetching categories."
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchSubcategories = async (selectedCategories) => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/list/subcategories`, {
        headers: {
          "X-API-KEY": "DISCOVERJO91427",
          "Content-Language": "en",
        },
        params: {
          categories: JSON.stringify(selectedCategories),
        },
      });
      setSubcategories(response.data.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "An error occurred while fetching subcategories."
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    places,
    categories,
    subcategories,
    loading,
    error,
    fetchPlaces,
    fetchCategories,
    fetchSubcategories,
  };
};

export default useFetchPlaceForLocation;

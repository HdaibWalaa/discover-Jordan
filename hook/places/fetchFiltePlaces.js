import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../apiConfig";

const useFetchFilterPlaces = () => {
  const [places, setPlaces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [regions, setRegions] = useState([]);
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /** ✅ Fetch Places Based on Filters **/
  const fetchPlaces = async ({
    region,
    categoriesId = [],
    subcategoriesId = [],
    featuresId = [],
    minCost = 0,
    maxCost = 9999,
    minRate = 0,
    maxRate = 5,
  }) => {
    if (!region || !categoriesId.length) {
      setError("Region and at least one category are required.");
      return;
    }

    const params = {
      region_id: region,
      categories_id: JSON.stringify(categoriesId),
      subcategories_id: JSON.stringify(subcategoriesId),
      features_id: JSON.stringify(featuresId),
      min_cost: minCost,
      max_cost: maxCost,
      min_rate: minRate,
      max_rate: maxRate,
    };

    console.log("Fetching places with:", params);

    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/places/filter`, {
        headers: { "X-API-KEY": "DISCOVERJO91427", "Content-Language": "en" },
        params,
      });

      setPlaces(response.data.data.places || []);
      if (!response.data.data.places?.length) {
        setError("No places found for the selected filters.");
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

  /** ✅ Fetch Categories **/
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/categories/search`, {
        headers: { "X-API-KEY": "DISCOVERJO91427", "Content-Language": "en" },
      });
      setCategories(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching categories.");
    } finally {
      setLoading(false);
    }
  };

  /** ✅ Fetch Subcategories **/
  const fetchSubcategories = async (selectedCategories = []) => {
    if (!selectedCategories.length) return;

    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/list/subcategories`, {
        headers: { "X-API-KEY": "DISCOVERJO91427", "Content-Language": "en" },
        params: { categories: JSON.stringify(selectedCategories) },
      });
      setSubcategories(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching subcategories.");
    } finally {
      setLoading(false);
    }
  };

  /** ✅ Fetch Regions **/
  const fetchRegions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/all/regions`, {
        headers: { "X-API-KEY": "DISCOVERJO91427", "Content-Language": "en" },
      });
      setRegions(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching regions.");
    } finally {
      setLoading(false);
    }
  };

  /** ✅ Fetch Features **/
  const fetchFeatures = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/all/features`, {
        headers: { "X-API-KEY": "DISCOVERJO91427", "Content-Language": "en" },
      });
      setFeatures(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching features.");
    } finally {
      setLoading(false);
    }
  };

  return {
    places,
    categories,
    subcategories,
    regions,
    features,
    loading,
    error,
    fetchPlaces,
    fetchCategories,
    fetchSubcategories,
    fetchRegions,
    fetchFeatures,
  };
};

export default useFetchFilterPlaces;

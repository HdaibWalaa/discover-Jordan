import { useState, useEffect, useContext } from "react";
import axios from "axios";
import BASE_URL from "../apiConfig";
import { AuthContext } from "../../store/auth-context";
const fetchsearch = async (query, language) => {
  try {
    const response = await axios.get(`${BASE_URL}/all/search`, {
      params: { query },
      headers: { "Content-Language": language, "X-API-KEY": "DISCOVERJO91427" },
    });
    return response.data?.data || {};
  } catch (error) {
    console.error("All search error:", error);
    return {};
  }
};

export default fetchsearch;

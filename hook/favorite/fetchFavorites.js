import { useState, useEffect, useContext } from "react";
import axios from "axios";
import BASE_URL from "../apiConfig";
import { AuthContext } from "../../store/auth-context";

const API_URL = `${BASE_URL}/user/all/favorite`;

const useFetchFavorites = (language) => {
  const { token } = useContext(AuthContext);
  const [favorites, setFavorites] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!token) {
        setError("User is not authenticated.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(API_URL, {
          headers: {
            "X-API-KEY": "DISCOVERJO91427",
            "Content-Language": language, 
            Authorization: `Bearer ${token}`, 
          },
        });
        setFavorites(response.data.data);
      } catch (err) {
        setError("Failed to fetch favorites.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [token, language]); 

  return { favorites, loading, error };
};

export default useFetchFavorites;

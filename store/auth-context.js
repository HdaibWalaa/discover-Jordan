import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserProfile } from "../util/auth";

export const AuthContext = createContext({
  token: null,
  user: null, // Store user object, including is_guide
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const authenticate = async (token) => {
    try {
      setToken(token);

      // Fetch the user profile using the token
      const userProfile = await getUserProfile(token);
      if (userProfile && userProfile.data) {
        setUser(userProfile.data); // Set user object, including is_guide
        await AsyncStorage.multiSet([
          ["token", token],
          ["user", JSON.stringify(userProfile.data)],
        ]);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    await AsyncStorage.clear();
  };

  useEffect(() => {
    const fetchAuthData = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      const storedUser = await AsyncStorage.getItem("user");

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    };

    fetchAuthData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        authenticate,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

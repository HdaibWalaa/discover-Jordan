import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserProfile } from "../util/auth";

export const AuthContext = React.createContext({
  token: null,
  userId: null,
  firstLogin: null, // Track first login status
  isAuthenticated: false,
  authenticate: (token, firstLogin) => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [firstLogin, setFirstLogin] = useState(null); // State for first login

  const authenticate = async (token, isFirstLogin) => {
    setToken(token);
    setFirstLogin(isFirstLogin);
    AsyncStorage.setItem("token", token);
    AsyncStorage.setItem("firstLogin", isFirstLogin.toString());

    try {
      const userProfile = await getUserProfile(token);
      setUserId(userProfile.data.id);
      AsyncStorage.setItem("userId", userProfile.data.id.toString());
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };


  const logout = () => {
    setToken(null);
    setUserId(null);
    setFirstLogin(null);
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("userId");
    AsyncStorage.removeItem("firstLogin");
  };

  useEffect(() => {
    const fetchAuthData = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      const storedFirstLogin = await AsyncStorage.getItem("firstLogin");
      const storedUserId = await AsyncStorage.getItem("userId");

      if (storedToken) {
        setToken(storedToken);
        setFirstLogin(storedFirstLogin === "true");
        setUserId(storedUserId);
      }
    };

    fetchAuthData();
  }, []);

  const contextValue = {
    token,
    userId,
    firstLogin,
    isAuthenticated: !!token,
    authenticate,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;

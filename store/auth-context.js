import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserProfile } from "../util/auth";

export const AuthContext = React.createContext({
  token: null,
  userId: null,
  firstLogin: null,
  verifiedEmail: null,
  isAuthenticated: false,
  authenticate: (token, firstLogin, verifiedEmail) => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [firstLogin, setFirstLogin] = useState(null);
  const [verifiedEmail, setVerifiedEmail] = useState(null);

  const authenticate = async (token, isFirstLogin, isVerifiedEmail) => {
    try {
      setToken(token);
      setFirstLogin(!!isFirstLogin); // Ensure boolean value
      setVerifiedEmail(!!isVerifiedEmail); // Ensure boolean value

      // Save data to AsyncStorage
      await AsyncStorage.multiSet([
        ["token", token],
        ["firstLogin", (!!isFirstLogin).toString()],
        ["verifiedEmail", (!!isVerifiedEmail).toString()],
      ]);

      // Fetch user profile
      const userProfile = await getUserProfile(token);
      if (userProfile && userProfile.data && userProfile.data.id) {
        setUserId(userProfile.data.id);
        await AsyncStorage.setItem("userId", userProfile.data.id.toString());
      } else {
        throw new Error("Invalid user profile data");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  const logout = async () => {
    try {
      setToken(null);
      setUserId(null);
      setFirstLogin(null);
      setVerifiedEmail(null);

      // Remove all stored keys
      await AsyncStorage.multiRemove([
        "token",
        "userId",
        "firstLogin",
        "verifiedEmail",
      ]);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        const storedFirstLogin = await AsyncStorage.getItem("firstLogin");
        const storedUserId = await AsyncStorage.getItem("userId");
        const storedVerifiedEmail = await AsyncStorage.getItem("verifiedEmail");

        if (storedToken) {
          setToken(storedToken);
          setFirstLogin(storedFirstLogin === "true");
          setVerifiedEmail(storedVerifiedEmail === "true");
          setUserId(storedUserId);
        }
      } catch (error) {
        console.error("Error fetching authentication data:", error);
      }
    };

    fetchAuthData();
  }, []);

  const contextValue = {
    token,
    userId,
    firstLogin,
    verifiedEmail,
    isAuthenticated: !!token,
    authenticate,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;

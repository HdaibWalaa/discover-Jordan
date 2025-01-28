import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { COLORS } from "../../constants/theme";

// Create the Theme Context
const ThemeContext = createContext();

// Theme Provider
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Load theme preference from AsyncStorage
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem("themeMode");
      if (savedTheme !== null) {
        setIsDarkMode(savedTheme === "dark");
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    await AsyncStorage.setItem("themeMode", newMode ? "dark" : "light"); // Save the theme mode to AsyncStorage
  };

  const theme = {
    mode: isDarkMode ? "dark" : "light",
    backgroundColor: isDarkMode ? COLORS.black : COLORS.white,
    textColor: isDarkMode ? COLORS.white : COLORS.black,
    cardBackground: isDarkMode ? COLORS.dark : COLORS.lightGrey,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

// Custom Hook to Use Theme
export const useTheme = () => useContext(ThemeContext);

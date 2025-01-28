import React, { createContext, useContext, useState, useEffect } from "react";
import { Platform, NativeModules } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import translations from "../../translations/translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    // Check AsyncStorage for saved language
    const loadLanguage = async () => {
      const storedLanguage = await AsyncStorage.getItem("appLanguage");
      if (storedLanguage) {
        setLanguage(storedLanguage);
      } else {
        const deviceLanguage =
          Platform.OS === "ios"
            ? NativeModules.SettingsManager.settings.AppleLocale ||
              NativeModules.SettingsManager.settings.AppleLanguages[0]
            : NativeModules.I18nManager.localeIdentifier;

        const defaultLanguage = deviceLanguage.includes("_")
          ? deviceLanguage.split("_")[0]
          : deviceLanguage.split("-")[0];

        setLanguage(defaultLanguage || "en");
      }
    };

    loadLanguage();
  }, []);

  const toggleLanguage = async () => {
    const newLanguage = language === "en" ? "ar" : "en";
    setLanguage(newLanguage);
    await AsyncStorage.setItem("appLanguage", newLanguage); // Save language to AsyncStorage
  };

  return (
    <LanguageContext.Provider
      value={{ language, toggleLanguage, translations: translations[language] }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

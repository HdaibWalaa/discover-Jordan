import { Platform, NativeModules } from "react-native";

const getAppLang = async () => {
  let language = "en"; // Default language

  // Get device locale based on platform
  if (Platform.OS === "ios") {
    // For iOS, use SettingsManager to get device language
    const appleLocale =
      NativeModules.SettingsManager?.settings?.AppleLocale ||
      NativeModules.SettingsManager?.settings?.AppleLanguages[0];
    language = appleLocale.includes("en") ? "en" : "er"; // Check if language is English or Arabic
  } else if (Platform.OS === "android") {
    // For Android, use I18nManager to get device language
    const localeIdentifier = NativeModules.I18nManager.localeIdentifier;
    language = localeIdentifier.includes("en") ? "en" : "er"; // Check if language is English or Arabic
  }

  return language;
};

export default getAppLang;

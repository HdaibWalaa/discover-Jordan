import React from 'react';
import { Button, Platform, NativeModules } from 'react-native';

const LanguageSwitchButton = ({ language, setLanguage }) => {
  // Function to toggle language
  const toggleLanguage = () => {
    const deviceLang =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0]
        : NativeModules.I18nManager.localeIdentifier;

    let lang = deviceLang.includes('_')
      ? deviceLang.split('_')[0]
      : deviceLang.split('-')[0];

    lang = lang || 'en';
    setLanguage(lang === 'en' ? 'ar' : 'en');
  };

  // Determine the button text based on the current language
  const buttonText = language === 'en' ? 'عربي' : 'English';

  return (
    <Button
      title={buttonText}
      onPress={toggleLanguage}
    />
  );
};

export default LanguageSwitchButton;


//        <Button title={language === "en" ? "عربي" : "English"} onPress={toggleLanguage} />
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FilterButton from "./Filter";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTheme } from "../../store/context/ThemeContext";
import { useLanguage } from "../../store/context/LanguageContext";
import { COLORS } from "../../constants/theme";

const SearchBar = () => {
  const navigation = useNavigation();
  const { translations } = useLanguage();
  const { mode } = useTheme();
  const isDarkMode = mode === "dark";
  const texts = [
    translations.Plans.toUpperCase(),
    translations.trips.toUpperCase(),
    translations.places.toUpperCase(),
    translations.events.toUpperCase(),
    translations.volunteers.toUpperCase(),
    translations.Jordan.toUpperCase(),
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const handleSearchPress = () => {
    navigation.navigate("Search", {
      transitionConfig: {
        animation: "timing",
        config: {
          duration: 500,
        },
      },
    });
  };

  return (
    <TouchableOpacity
      style={[
        styles.searchContainer,
        {
          backgroundColor: isDarkMode ? COLORS.lightGrey : COLORS.white,
        },
      ]}
      onPress={handleSearchPress}
    >
      <Image
        source={require("../../assets/images/icons/Search1.png")}
        style={{ tintColor: isDarkMode ? COLORS.black : COLORS.black }}
      />
      <Text
        style={[
          styles.searchInput,
          { color: isDarkMode ? COLORS.black : COLORS.black },
        ]}
      >
        {translations.Discover} {texts[currentIndex]}
      </Text>
      <FilterButton />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 24,
    justifyContent: "space-between",
    width: wp(90),
    height: hp(6),
    paddingHorizontal: wp(3),
    borderRadius: hp(2),
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    position: "absolute",
    top: hp(16),
    left: wp(5),
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: wp(3),
    borderRadius: hp(2),
  },
});

export default SearchBar;

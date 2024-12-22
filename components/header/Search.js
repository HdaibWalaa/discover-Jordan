import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FilterButton from "./Filter";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const SearchBar = () => {
  const navigation = useNavigation();

  const texts = [" plan", " trip", " place", " event", " volunteer"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 1000);

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
      style={styles.searchContainer}
      onPress={handleSearchPress}
    >
      <Image source={require("../../assets/images/icons/Search1.png")} />
      <Text style={styles.searchInput}>DISCOVER{texts[currentIndex]}</Text>
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
    backgroundColor: "#FFFFFF",
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
    backgroundColor: "#fff",
    paddingHorizontal: wp(3),
    borderRadius: hp(2),
  },
});

export default SearchBar;

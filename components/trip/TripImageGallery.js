import React, { useState } from "react";
import { StyleSheet, View, Image, FlatList, Dimensions ,Text} from "react-native";
import { COLORS } from "../../constants/theme";
import { useLanguage } from "../../store/context/LanguageContext";
import translations from "../../translations/translations";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const TripImageGallery = ({ tripDetails }) => {
  const { language } = useLanguage();
  const t = translations[language]; 

  const [currentIndex, setCurrentIndex] = useState(0);
  const screenWidth = wp("100%");

  if (
    !tripDetails ||
    !tripDetails.place_gallery ||
    tripDetails.place_gallery.length === 0
  ) {
    return (
      <View style={styles.noImagesContainer}>
        <Image
          source={require("../../assets/images/default/defaultpost.png")}
          style={styles.noImage}
        />
        <Text style={styles.noImagesText}>{t.noImagesAvailable}</Text>
      </View>
    );
  }

  const onScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);

    setCurrentIndex(roundIndex);
  };

  return (
    <View style={styles.galleryContainer}>
      <FlatList
        horizontal
        data={tripDetails.place_gallery}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={[styles.image, { width: screenWidth - wp("10%") }]}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={onScroll}
        scrollEventThrottle={16}
      />
      <View style={styles.paginationContainer}>
        {tripDetails.place_gallery.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentIndex
                ? styles.paginationDotActive
                : styles.paginationDotInactive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default TripImageGallery;

const styles = StyleSheet.create({
  galleryContainer: {
    alignItems: "center",
    top: hp(-3),
  },
  image: {
    height: hp("25%"),
    resizeMode: "cover",
    borderRadius: wp("4%"),
    marginHorizontal: wp("5%"),
  },
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp("1.5%"),
  },
  paginationDot: {
    width: wp("2.5%"),
    height: wp("2.5%"),
    borderRadius: wp("1.25%"),
    marginHorizontal: wp("1%"),
  },
  paginationDotActive: {
    backgroundColor: COLORS.secondary,
    width: wp("6%"),
  },
  paginationDotInactive: {
    backgroundColor: COLORS.lightBlue,
  },
  noImagesContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp(5),
  },
  noImage: {
    width: wp(40),
    height: hp(20),
    resizeMode: "contain",
  },
  noImagesText: {
    marginTop: hp(2),
    color: COLORS.gray,
    fontSize: 16,
  },
});

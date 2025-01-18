import React, { useState } from "react";
import { StyleSheet, View, Image, FlatList, Dimensions } from "react-native";
import { COLORS } from "../../constants/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const TripImageGallery = ({ tripDetails }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const screenWidth = wp("100%");

  if (
    !tripDetails ||
    !tripDetails.place_gallery ||
    tripDetails.place_gallery.length === 0
  ) {
    return null;
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
            style={[
              styles.image,
              { width: screenWidth - wp("10%") },
            ]}
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
    height: hp("25%"), // 25% of screen height
    resizeMode: "cover",
    borderRadius: wp("4%"), // 4% of screen width
    marginHorizontal: wp("5%"), // 2% of screen width
  },
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp("1.5%"), // 1.5% of screen height
  },
  paginationDot: {
    width: wp("2.5%"), // 2.5% of screen width
    height: wp("2.5%"), // 2.5% of screen width (same as width to make it circular)
    borderRadius: wp("1.25%"), // Half of width to make it circular
    marginHorizontal: wp("1%"), // 1% of screen width
  },
  paginationDotActive: {
    backgroundColor: COLORS.secondary,
    width: wp("7%"), // 5% of screen width for the active dot
  },
  paginationDotInactive: {
    backgroundColor: COLORS.lightBlue,
  },
});

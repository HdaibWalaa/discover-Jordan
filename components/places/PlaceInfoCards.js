import React from "react";
import { StyleSheet, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Distance from "./Distance";
import PriceLevel from "./PriceLevel";
import Rating from "./Rating";
import Weather from "./Weather";

const PlaceInfoCards = ({ distance, priceLevel, rating, weather }) => {
  return (
    <View style={styles.container}>
      <Distance distance={distance} />
      {priceLevel !== -1 && <PriceLevel priceLevel={priceLevel} />}
      <Rating rating={rating} />
      <Weather weather={weather} />
    </View>
  );
};

export default PlaceInfoCards;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp("2%"),
  },
});

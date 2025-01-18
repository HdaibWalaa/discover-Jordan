import React from "react";
import { View, Image, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const PriceLevel = ({ priceLevel }) => {
  if (priceLevel === -1) {
    return null; // Do not render if price level is -1
  }

  const icons = [];
  for (let i = 0; i < priceLevel; i++) {
    icons.push(
      <Image
        key={i}
        source={require("../../assets/images/icons/dollar.png")}
        style={styles.icon}
        resizeMode="contain"
      />
    );
  }

  return <View style={styles.card}>{icons}</View>;
};

export default PriceLevel;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: hp("9%"),
    width: wp("25%"),
    borderRadius: wp("3%"),
    backgroundColor: "#F6F6F6",
    marginHorizontal: wp("1%"),
    flexDirection: "row",
  },
  icon: {
    height: hp("2.5%"),
    width: hp("2.5%"),
    marginBottom: hp("0.5%"),
  },
});

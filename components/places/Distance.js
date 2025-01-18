import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { SIZES, COLORS } from "../../constants/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ReusableText from "../Reusable/ReusableText";

const Distance = ({ distance }) => {
  // Ensure the distance is a number and limit it to 2 decimal places
  const formattedDistance = distance ? parseFloat(distance).toFixed(2) : "N/A";

  return (
    <View style={styles.card}>
      <Image
        source={require("../../assets/images/icons/distance.png")}
        style={styles.icon}
        resizeMode="contain"
      />
      <ReusableText
        text={`${formattedDistance} KM`}
        family={"SemiBold"}
        size={wp("3%")}
        color={COLORS.black}
      />
    </View>
  );
};

export default Distance;

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
  },
  icon: {
    height: hp("2.5%"),
    width: hp("2.5%"),
    marginBottom: hp("1%"),
  },
});

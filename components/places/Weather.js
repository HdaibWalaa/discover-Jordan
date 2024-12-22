import React from "react";
import { View, Image, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SIZES, COLORS } from "../../constants/theme";
import ReusableText from "../Reusable/ReusableText";

const Weather = ({ weather }) => {
  // Format the weather to show only the first digit after the decimal
  const formattedWeather = weather ? weather.toFixed(0) : "N/A";

  return (
    <View style={styles.card}>
      <Image
        source={require("../../assets/images/icons/weather.png")}
        style={styles.icon}
        resizeMode="contain"
      />
      <ReusableText
        text={`${formattedWeather}°C`}
        family={"SemiBold"}
        size={wp("3%")}
        color={COLORS.black}
      />
    </View>
  );
};

export default Weather;

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

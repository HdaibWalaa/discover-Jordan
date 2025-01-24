import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SIZES } from "../../constants/theme";

const ReusableBtn = ({
  onPress,
  btnText,
  textColor = "#000", // Default color
  width = 90, // Default width in percentage
  backgroundColor = "#fff", // Default background color
  borderWidth = 0, // Default border width
  borderColor = "transparent", // Default border color
  height = 6, // Default height in percentage
}) => {
  // Validate that width and height are numbers
  const validWidth = isNaN(width) ? 90 : width; // Default to 90% if NaN
  const validHeight = isNaN(height) ? 6 : height; // Default to 6% if NaN

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.btnStyle(
        validWidth,
        backgroundColor,
        borderWidth,
        borderColor,
        validHeight
      )}
    >
      <Text style={styles.btnText(textColor)}>{btnText}</Text>
    </TouchableOpacity>
  );
};

export default ReusableBtn;

const styles = StyleSheet.create({
  btnText: (textColor) => ({
    fontFamily: "Medium",
    fontSize: wp(4.5), // Dynamically sized text
    color: textColor,
  }),
  btnStyle: (width, backgroundColor, borderWidth, borderColor, height) => ({
    width: wp(width), // Responsive width
    backgroundColor: backgroundColor,
    alignItems: "center",
    justifyContent: "center",
    height: hp(height), // Responsive height
    borderRadius: SIZES.xSmall,
    borderColor: borderColor,
    borderWidth: borderWidth,
  }),
});

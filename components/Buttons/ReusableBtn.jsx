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
  textColor,
  width,
  backgroundColor,
  borderWidth,
  borderColor,
  height, // New height prop for dynamic control
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.btnStyle(
        width,
        backgroundColor,
        borderWidth,
        borderColor,
        height
      )}
    >
      <Text style={styles.btnText(textColor)}>{btnText}</Text>
    </TouchableOpacity>
  );
};

export default ReusableBtn;

const styles = StyleSheet.create({
  btnText: (textColor) => ({
    fontFamily: "medium",
    fontSize: wp(4.5), // Dynamically sized text
    color: textColor,
  }),
  btnStyle: (width, backgroundColor, borderWidth, borderColor, height) => ({
    width: wp(width), // Responsive width
    backgroundColor: backgroundColor,
    alignItems: "center",
    justifyContent: "center",
    height: hp(height || 6), // Responsive height with default value
    borderRadius:SIZES.xSmall,
    borderColor: borderColor,
    borderWidth: borderWidth,
  }),
});

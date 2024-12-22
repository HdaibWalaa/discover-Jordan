import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, SIZES } from "../../../constants/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ReusableText from "../../Reusable/ReusableText";

const PlanDayNightNum = ({ numberOfDays }) => {
  const nights = numberOfDays > 1 ? numberOfDays - 1 : 0; // Calculate nights
  const days = numberOfDays; // Number of days

  return (
    <View style={styles.container}>
      <ReusableText
        text={`${nights}N / ${days}D`}
        family={"Medium"}
        size={SIZES.large}
        color={COLORS.white}
        align={"center"}
      />
    </View>
  );
};

export default PlanDayNightNum;

const styles = StyleSheet.create({
  container: {
    backgroundColor:COLORS.secondary, // Background color
    paddingVertical: hp(0.5), // Vertical padding for height
    paddingHorizontal: wp(3), // Horizontal padding for width
    borderRadius: wp(2), // Rounded corners
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start", // So that the width adjusts according to the content
  },
  text: {
    color: COLORS.white, // White text color
    fontSize: SIZES.medium, // Adjust font size
    fontWeight: "bold", // Bold text
  },
});

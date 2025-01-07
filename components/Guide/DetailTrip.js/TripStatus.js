import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, TEXT } from "../../../constants/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const TripStatus = ({ status }) => {
  // Determine status text and background color
  const isActive = status === 1;
  const statusText = isActive ? "Active" : "Inactive";
  const statusColor = isActive ? COLORS.green : COLORS.red; // Background color

  return (
    <View style={[styles.statusContainer, { backgroundColor: statusColor }]}>
      <Text style={styles.statusText}>{statusText}</Text>
    </View>
  );
};

export default TripStatus;

const styles = StyleSheet.create({
  statusContainer: {
    paddingHorizontal: wp("4%"),
    paddingVertical: hp("0.5%"),
    borderRadius: wp("5%"),
  },
  statusText: {
    fontSize: TEXT.small,
    color: COLORS.white,
    fontWeight: "bold",
  },
});

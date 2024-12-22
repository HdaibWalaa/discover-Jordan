import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants/theme";
import ReusableText from "../../Reusable/ReusableText";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const EventStatus = ({ status }) => {
  // Determine if the status is active or inactive
  const isActive = status === 1;

  return (
    <View
      style={[
        styles.statusContainer,
        isActive ? styles.active : styles.inactive,
      ]}
    >
      <ReusableText
        text={isActive ? "Active" : "Inactive"}
        family={"Bold"}
        size={wp("5%")}
        color={COLORS.white}
        align={"center"}
        style={[
          styles.statusText,
          isActive ? styles.activeText : styles.inactiveText,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  statusContainer: {
    paddingVertical: 6, // Adjusted for more precise padding
    paddingHorizontal: 16,
    borderRadius: 20, // Fully rounded corners
    alignSelf: "flex-start",
    backgroundColor: "transparent", // Make the background transparent by default
  },
  active: {
    backgroundColor: "#2DE78D", // Use the specific green color from your image
  },
  inactive: {
    backgroundColor: "#FF4D4D", // Use a red color for inactive status
  },
  statusText: {
    fontSize: 14, // Adjust font size
    fontWeight: "bold", // Keep bold for visibility
    textAlign: "center", // Center text within the button
  },
  activeText: {
    color: "#FFFFFF", // White text for Active status
  },
  inactiveText: {
    color: "#FFFFFF", // White text for Inactive status
  },
});

export default EventStatus;

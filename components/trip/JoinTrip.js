import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { COLORS } from "../../constants/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

const JoinTrip = ({ handleJoinTrip, isTripActive, isUserJoined }) => {
  const navigation = useNavigation();

  const handleButtonPress = () => {
    if (isUserJoined) {
      // Navigate to the chat screen
      navigation.navigate("ChatScreen"); // Update this with the correct route name for your chat screen
    } else {
      // Call the function to join the trip
      handleJoinTrip();
    }
  };

  return (
    <View style={styles.joinContainer}>
      <TouchableOpacity
        style={[styles.joinButton, !isTripActive && styles.joinButtonDisabled]}
        onPress={handleButtonPress}
        disabled={!isTripActive && !isUserJoined}
      >
        <Text style={styles.joinButtonText}>
          {isUserJoined ? "Group chat" : "JOIN"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.iconButton, !isTripActive && styles.joinButtonDisabled]}
        onPress={handleButtonPress}
        disabled={!isTripActive && !isUserJoined}
      >
        <Image
          source={require("../../assets/images/icons/sendrtip.png")}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default JoinTrip;

const styles = StyleSheet.create({
  joinContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp("2%"), // Responsive margin top
    paddingHorizontal: wp("2%"), // Responsive horizontal padding
  },
  joinButton: {
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    paddingVertical: hp("2%"), // Responsive vertical padding
    paddingHorizontal: wp("10%"), // Responsive horizontal padding
    borderRadius: wp("4%"), // Responsive border radius
    alignItems: "center",
    justifyContent: "center",
    flex: 1, // Adjust width to take up available space
    marginRight: wp("2%"), // Responsive margin between buttons
    borderColor: COLORS.lightGrey,
  },
  iconButton: {
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: COLORS.lightGrey,
    padding: hp("2%"), // Responsive padding
    borderRadius: wp("4%"), // Responsive border radius
    alignItems: "center",
    justifyContent: "center",
  },
  joinButtonText: {
    fontSize: wp("4.5%"), // Responsive font size
    color: COLORS.black,
    fontWeight: "Medium",
  },
  icon: {
    width: wp("6%"), // Responsive icon width
    height: wp("6%"), // Responsive icon height
    tintColor: COLORS.black, // Keep the icon color consistent
  },
  joinButtonDisabled: {
    backgroundColor: COLORS.grey, // Adjust the color for the disabled state
  },
});

import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constants/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function JoinTrip({
  tripId,
  token,
  isTripActive,
  isUserJoined,
  isRequestPending,
  isCreator, // New prop for creator
  handleJoinTrip,
}) {
  const navigation = useNavigation();

  const handleButtonPress = () => {
    // Navigate to chat if user is joined or is the creator
    if (isUserJoined || isCreator) {
      navigation.navigate("ChatScreen", {
        tripId: tripId,
        userToken: token,
      });
    } else {
      // Call join logic for non-joined users
      handleJoinTrip();
    }
  };

  if (!isTripActive) {
    return null;
  }

  // Show "Group Chat" for joined users or the creator
  if (isUserJoined || isCreator) {
    return (
      <View style={styles.joinContainer}>
        <TouchableOpacity style={styles.joinButton} onPress={handleButtonPress}>
          <Text style={styles.joinButtonText}>Group Chat</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Show "Request Pending" for users with pending requests
  if (isRequestPending) {
    return (
      <View style={styles.joinContainer}>
        <TouchableOpacity
          style={[styles.joinButton, styles.pendingButton]}
          disabled
        >
          <Text style={styles.joinButtonText}>Request Pending</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Show "JOIN" for non-joined users
  return (
    <View style={styles.joinContainer}>
      <TouchableOpacity style={styles.joinButton} onPress={handleButtonPress}>
        <Text style={styles.joinButtonText}>JOIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  joinContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp("2%"),
  },
  joinButton: {
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    paddingVertical: hp("2%"),
    paddingHorizontal: wp("10%"),
    borderRadius: wp("4%"),
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginRight: wp("2%"),
    borderColor: COLORS.lightGrey,
  },
  joinButtonText: {
    fontSize: wp("4.5%"),
    color: COLORS.black,
    fontWeight: "600",
  },
  pendingButton: {
    backgroundColor: "#ccc",
  },
});

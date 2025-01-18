// JoinTrip.js
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
  handleJoinTrip, // optional if you do a server call
}) {
  const navigation = useNavigation();

 const handleButtonPress = () => {
   if (isUserJoined) {
     // Navigate to chat if joined
     navigation.navigate("ChatScreen", {
       tripId: tripId,
       userToken: token,
     });
   } else {
     // Call join logic when user is not joined
     handleJoinTrip();
   }
 };


  if (!isTripActive) {
    return null;
  }

  // Already joined => "Group Chat"
  if (isUserJoined) {
    return (
      <View style={styles.joinContainer}>
        <TouchableOpacity style={styles.joinButton} onPress={handleButtonPress}>
          <Text style={styles.joinButtonText}>Group Chat</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Request is pending
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

  // Not joined => "JOIN"
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

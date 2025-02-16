import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { COLORS } from "../../constants/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import BASE_URL from "../../hook/apiConfig";
import { AuthContext } from "../../store/auth-context";

export default function JoinTrip({
  tripId,
  isTripActive,
  isUserJoined,
  isRequestPending,
  isCreator,
  handleJoinTrip,
  updateTripStatus,
}) {
  const { token } = useContext(AuthContext);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleButtonPress = async () => {
    if (isUserJoined || isCreator) {
      navigation.navigate("ChatScreen", {
        tripId: tripId,
        userToken: token,
      });
      return;
    }

    // ✅ Join trip API call
    try {
      setLoading(true);
      const response = await axios.post(
        `${BASE_URL}/trip/join/${tripId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "X-API-KEY": "DISCOVERJO91427",
          },
        }
      );

      if (response.status === 200) {
        Alert.alert("Success", "Your request to join the trip has been sent.");

      
        updateTripStatus(true);
      } else {
        Alert.alert("Error", "Failed to send join request.");
      }
    } catch (error) {
      console.error(
        "Error joining trip:",
        error.response?.data || error.message
      );
      Alert.alert("Error", "Something went wrong while joining the trip.");
    } finally {
      setLoading(false);
    }
  };

  if (!isTripActive) {
    return null;
  }

  return (
    <View style={styles.joinContainer}>
      <TouchableOpacity
        style={[
          styles.joinButton,
          isUserJoined || isCreator ? styles.chatButton : null,
          isRequestPending ? styles.pendingButton : null,
        ]}
        onPress={handleButtonPress}
        disabled={loading || isRequestPending}
      >
        {loading ? (
          <ActivityIndicator size="small" color={COLORS.white} />
        ) : (
          <Text style={styles.joinButtonText}>
            {isUserJoined || isCreator
              ? "Group Chat"
              : isRequestPending
              ? "Request Pending"
              : "JOIN"}
          </Text>
        )}
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

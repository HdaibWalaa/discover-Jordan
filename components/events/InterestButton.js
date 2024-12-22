import React, { useContext, useState } from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import ReusableBtn from "../Buttons/ReusableBtn";
import { COLORS } from "../../constants/theme";
import { AuthContext } from "../../store/auth-context"; // Assuming you have AuthContext to get the token
import BASE_URL from "../../hook/apiConfig"; // Assuming this is where your API base URL is stored

const InterestButton = ({ eventId, interestedUsers = [] }) => {
  const [isInterested, setIsInterested] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext); // Get auth token if required for API calls

  // Check if the user is already interested
  useState(() => {
    const currentUser = authCtx?.profile?.data?.id; // Assuming user ID is in profile context
    if (interestedUsers.some((user) => user.id === currentUser)) {
      setIsInterested(true);
    }
  }, [interestedUsers, authCtx?.profile?.data?.id]);

  // Toggle interest status
  const handleInterestToggle = async () => {
    if (!authCtx.token) {
      Alert.alert("Error", "You need to be logged in to mark interest.");
      navigation.navigate("Login");
      return;
    }

    const url = `${BASE_URL}/event/${
      isInterested ? "disinterest" : "interest"
    }/${eventId}`;
    setLoading(true);

    try {
      const response = await axios({
        method: isInterested ? "DELETE" : "POST",
        url,
        headers: {
          Authorization: `Bearer ${authCtx.token}`, // Add auth token if required
          Accept: "application/json",
        },
      });

      // Toggle local state to reflect interest status
      setIsInterested(!isInterested);
    } catch (error) {
      console.error("Error updating interest status:", error);
      Alert.alert(
        "Error",
        `There was a problem updating your interest status: ${
          error.response?.data?.message || "Please try again later."
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="small" color={COLORS.primary} />
      ) : (
        <ReusableBtn
          onPress={handleInterestToggle}
          btnText={
            isInterested ? "Remove Interest" : "Interest".toLocaleUpperCase()
          }
          backgroundColor={COLORS.primary}
          width={294}
          borderColor={COLORS.primary}
          borderWidth={0}
          textColor={COLORS.black}
        />
      )}
    </View>
  );
};

export default InterestButton;

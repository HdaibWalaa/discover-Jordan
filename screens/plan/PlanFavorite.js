import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Alert, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import BASE_URL from "../../hook/apiConfig";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const PlanFavorite = ({
  planId,
  initialFavorite = false,
  token,
  onToggle,
  iconColor = "black",
  size = 24,
  bgColor = "white",
  width,
  height,
}) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Update local state if the prop changes
    setIsFavorite(initialFavorite);
  }, [initialFavorite]);

  const handleFavoriteToggle = async () => {
    if (!planId) {
      console.error("❌ No plan ID provided for favorite toggle");
      Alert.alert("Error", "Plan ID is missing.");
      return;
    }

    // Get token from props or AsyncStorage
    let userToken = token;
    if (!userToken) {
      console.log("🔹 Trying to get token from AsyncStorage...");
      userToken = await AsyncStorage.getItem("authToken");
    }

    if (!userToken) {
      console.error("❌ No authentication token found");
      Alert.alert("Error", "You need to be logged in to favorite plans.");
      return;
    }

    setIsLoading(true);

    // Optimistic UI update
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);

    // Determine API endpoint based on action (add or remove favorite)
    const url = isFavorite
      ? `${BASE_URL}/plan/favorite/${planId}/delete`
      : `${BASE_URL}/plan/favorite/${planId}`;
    const method = isFavorite ? "DELETE" : "POST";

    console.log(`🔹 API Request:
      ➤ URL: ${url}
      ➤ Method: ${method}
      ➤ Plan ID: ${planId}
      ➤ Action: ${isFavorite ? "Remove from" : "Add to"} favorites`);

    try {
      const response = await axios({
        method,
        url,
        headers: {
          Authorization: `Bearer ${userToken}`,
          Accept: "application/json",
          "X-API-KEY": "DISCOVERJO91427",
        },
      });

      console.log(
        `✅ ${isFavorite ? "Removed from" : "Added to"} favorites:`,
        response.data
      );

      // Call the onToggle callback if provided
      if (onToggle) {
        onToggle(newFavoriteState);
      }
    } catch (error) {
      console.error("❌ Error toggling favorite:", error);

      // Log detailed error information
      if (error.response) {
        console.error("❌ Server Response:", error.response.data);
        console.error("❌ Status Code:", error.response.status);
      }

      // Revert UI change on error
      setIsFavorite(!newFavoriteState);

      // Show error message
      Alert.alert(
        "Error",
        error.response?.data?.msg ||
          "Failed to update favorites. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleFavoriteToggle}
      disabled={isLoading}
      style={[
        styles.favoriteButton,
        {
          backgroundColor: bgColor,
          width: width || wp("10%"),
          height: height || hp("5%"),
        },
      ]}
    >
      <Ionicons
        name={isFavorite ? "heart" : "heart-outline"}
        size={size}
        color={isFavorite ? "red" : iconColor}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  favoriteButton: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PlanFavorite;

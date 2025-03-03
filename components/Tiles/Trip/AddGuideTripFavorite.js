// File path: src/components/Tiles/Trip/AddGuideTripFavorite.js
// This will be the single source of truth for this component

import React, { useState, useContext, useEffect } from "react";
import { TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import axios from "axios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AuthContext } from "../../../store/auth-context";
import BASE_URL from "../../../hook/apiConfig";

const AddGuideTripFavorite = ({
  tripId,
  isFavoritedInitially = false,
  size = 24,
  style, // Add style prop to allow custom styling
  backgroundColor, // Optional prop for custom background color
}) => {
  const { token } = useContext(AuthContext);
  // Ensure isFavoritedInitially is properly converted to boolean
  const [isFavorited, setIsFavorited] = useState(Boolean(isFavoritedInitially));

  // Debug log to verify initialization
  useEffect(() => {
    console.log(
      `Trip ${tripId} favorite initialized as: ${isFavoritedInitially} (${typeof isFavoritedInitially})`
    );
  }, []);

  // Update state when prop changes
  useEffect(() => {
    console.log(
      `Favorite prop changed for trip ${tripId}: ${isFavoritedInitially}`
    );
    setIsFavorited(Boolean(isFavoritedInitially));
  }, [isFavoritedInitially, tripId]);

  const handleFavoriteToggle = async () => {
    try {
      if (!tripId) {
        console.error("No tripId provided to AddGuideTripFavorite");
        return;
      }

      // Toggle state immediately for better UX
      const newFavoriteState = !isFavorited;
      setIsFavorited(newFavoriteState);
      console.log(
        `Toggling favorite for trip ${tripId} to: ${newFavoriteState}`
      );

      // Prepare headers
      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "X-API-KEY": "DISCOVERJO91427",
        "Content-Type": "application/json",
      };

      // Set timeout to prevent hanging request
      const timeoutConfig = {
        timeout: 10000, // 10 second timeout
      };

      if (!newFavoriteState) {
        // Remove from favorites
        console.log(`Removing trip ${tripId} from favorites (API call)`);
        await axios.delete(
          `${BASE_URL}/user/guide-trip/favorite/${tripId}/delete`,
          {
            headers,
            ...timeoutConfig,
          }
        );
        console.log(`Successfully removed trip ${tripId} from favorites`);
      } else {
        // Add to favorites
        console.log(`Adding trip ${tripId} to favorites (API call)`);
        await axios.post(
          `${BASE_URL}/user/guide-trip/favorite/${tripId}`,
          {}, // Empty object, not null
          {
            headers,
            ...timeoutConfig,
          }
        );
        console.log(`Successfully added trip ${tripId} to favorites`);
      }
    } catch (error) {
      console.error(`Favorite toggle error for trip ${tripId}:`, error);

      if (error.message.includes("Network Error")) {
        // For network errors, keep the UI state but show a message
        Alert.alert(
          "Network Error",
          "Could not update favorite status. Please check your connection.",
          [{ text: "OK" }],
          { cancelable: true }
        );
        return;
      }

      // For other errors, revert the UI state
      setIsFavorited(!isFavorited);

      // Show error message from API or default
      const errorMessage =
        error.response?.data?.msg || "Failed to update favorite status.";
      Alert.alert("Error", errorMessage);
    }
  };

  // Create a merged style combining the default and custom styles
  const containerStyle = [
    styles.favoriteIcon,
    // Apply custom background color if provided
    backgroundColor && { backgroundColor },
    // Apply any additional custom styles
    style,
  ];

  // Render heart icon based on favorite state
  return (
    <TouchableOpacity onPress={handleFavoriteToggle} style={containerStyle}>
      <Image
        source={
          isFavorited
            ? require("../../../assets/images/icons/heart-filled.png")
            : require("../../../assets/images/icons/heart.png")
        }
        style={{
          width: size,
          height: size,
          tintColor: isFavorited ? "red" : "black",
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  favoriteIcon: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp("3%"),
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Default background color
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddGuideTripFavorite;

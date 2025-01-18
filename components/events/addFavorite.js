import React, { useContext, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { AuthContext } from "../../store/auth-context"; // Ensure AuthContext provides the token
import BASE_URL from "../../hook/apiConfig";

const AddFavorite = ({
  favorite = false,
  eventId,
  iconColor = "black",
  bgColor = "rgba(0, 0, 0, 0.7)",
  size = 20,
  width = 33,
  height = 33,
  refresh = () => {}, // Add default no-op function to avoid errors if not passed
  style,
}) => {
  const [isFavorite, setIsFavorite] = useState(favorite);
  const [loading, setLoading] = useState(false);
  const authCtx = useContext(AuthContext); // Get authentication context

  const toggleFavorite = async () => {
    if (!authCtx.token) return; // Ensure token is available

    setLoading(true); // Show loading spinner while request is being made

    try {
      const url = `${BASE_URL}/event/favorite/${eventId}${
        isFavorite ? "/delete" : ""
      }`; // Use delete endpoint if favorite, else add

      const method = isFavorite ? "DELETE" : "POST"; // Determine method based on current favorite status

      await axios({
        method,
        url,
        headers: {
          Authorization: `Bearer ${authCtx.token}`, // Send the user token
          Accept: "application/json",
        },
      });

      // Toggle favorite status and refresh UI if needed
      setIsFavorite(!isFavorite);
      refresh(); // Call refresh (refetch) to reload data, or do nothing if not passed
    } catch (error) {
      console.error("Error updating favorite status:", error);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <TouchableOpacity onPress={toggleFavorite} style={style} disabled={loading}>
      <View
        style={[
          styles.favoriteIcon,
          { backgroundColor: bgColor, width, height },
        ]}
      >
        {loading ? (
          <ActivityIndicator size="small" color={iconColor} />
        ) : (
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={size}
            color={isFavorite ? "red" : iconColor}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  favoriteIcon: {
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddFavorite;

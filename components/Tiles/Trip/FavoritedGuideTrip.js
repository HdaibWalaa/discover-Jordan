import React, { useState, useContext } from "react";
import { TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import axios from "axios";
import { AuthContext } from "../../../store/auth-context"; // Import AuthContext
import BASE_URL from "../../../hook/apiConfig";
import { COLORS } from "../../../constants/theme";

const FavoritedGuideTrip = ({ tripId, favorite, onFavoriteToggle }) => {
  const { token } = useContext(AuthContext); // Retrieve token from context
  const [isFavorite, setIsFavorite] = useState(favorite); // Local state for favorite status

  const toggleFavorite = async () => {
    try {
      const url = isFavorite
        ? `${BASE_URL}/user/guide-trip/favorite/${tripId}/delete`
        : `${BASE_URL}/user/guide-trip/favorite/${tripId}`;

      const method = isFavorite ? "delete" : "post"; // Decide the method based on current state

      console.log("Request Method:", method);
      console.log("Request URL:", url);

      const response = await axios({
        method,
        url,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        data: {}, // Include empty object for POST request body
      });

      setIsFavorite(!isFavorite); // Update local favorite state
      onFavoriteToggle(tripId, !isFavorite); // Notify parent component
      Alert.alert("Success", response.data.msg);
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        Alert.alert(
          "Error",
          error.response.data.message || "Failed to toggle favorite status."
        );
      } else {
        console.error("Error toggling favorite:", error);
        Alert.alert("Error", "Failed to toggle favorite status.");
      }
    }
  };

  return (
    <TouchableOpacity style={styles.favoriteIcon} onPress={toggleFavorite}>
      <Image
        source={require("../../../assets/images/icons/heart.png")}
        style={[styles.icon, { tintColor: isFavorite ? "red" : "black" }]}
      />
    </TouchableOpacity>
  );
};

export default FavoritedGuideTrip;

const styles = StyleSheet.create({
  favoriteIcon: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

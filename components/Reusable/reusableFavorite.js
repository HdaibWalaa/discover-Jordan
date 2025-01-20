import React, { useContext } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { AuthContext } from "../../store/auth-context";
import BASE_URL from "../../hook/apiConfig";

const ReusableFavorite = ({
  favorite = false,
  iconColor = "black",
  bgColor = "rgba(255, 255, 255, 0.7)",
  size = 20,
  width = 33,
  height = 33,
  placeId,
  refresh,
  style,
  onToggle,
}) => {
  const authCtx = useContext(AuthContext);
  const token = authCtx?.token;

  const handleFavoriteToggle = async () => {
    if (!token) {
      console.error("No authentication token found.");
      return;
    }

    const url = favorite
      ? `${BASE_URL}/favorite/place/${placeId}/delete`
      : `${BASE_URL}/favorite/place/${placeId}`;
    const method = favorite ? "DELETE" : "POST";

    try {
      console.log("Request URL:", url);
      console.log("Request Method:", method);
      console.log("Authorization Token:", token);

      await axios({
        method,
        url,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      // Update UI immediately
      if (onToggle) {
        onToggle();
      }

      if (refresh) {
        refresh(); // Optional: Refresh parent data
      }
    } catch (error) {
      const errorMessage = error.response?.data?.msg || error.message;

      if (
        error.response?.status === 400 &&
        errorMessage === "لقد قمت بالفعل بإضافة هذا إلى المفضلة."
      ) {
        console.log("Already added to favorites; updating UI locally.");
        if (onToggle) {
          onToggle(); // Update UI even if the item is already in favorites
        }
      } else {
        console.error("Error toggling favorite status:", errorMessage);
      }
    }
  };

  return (
    <TouchableOpacity onPress={handleFavoriteToggle} style={style}>
      <View
        style={[
          styles.favoriteIcon,
          { backgroundColor: bgColor, width, height },
        ]}
      >
        <Ionicons
          name={favorite ? "heart" : "heart-outline"}
          size={size}
          color={favorite ? "red" : iconColor}
        />
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

export default ReusableFavorite;

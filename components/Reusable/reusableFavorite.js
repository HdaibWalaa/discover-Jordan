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
}) => {
  const authCtx = useContext(AuthContext);

  const handleFavoriteToggle = async () => {
    if (!authCtx.token) {
      console.error("No authentication token found.");
      return;
    }

    try {
      const url = favorite
        ? `${BASE_URL}/favorite/place/${placeId}/delete`
        : `${BASE_URL}/favorite/place/${placeId}`;
      const method = favorite ? "DELETE" : "POST";

      await axios({
        method,
        url,
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
          Accept: "application/json",
        },
      });

      if (refresh) {
        refresh(); // Refresh parent data to reflect favorite status
      }
    } catch (error) {
      console.error("Error toggling favorite status:", error);
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

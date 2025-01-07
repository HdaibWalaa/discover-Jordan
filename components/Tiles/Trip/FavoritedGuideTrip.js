import React, { useState, useContext } from "react";
import { TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import axios from "axios";
import { AuthContext } from "../../../store/auth-context";
import BASE_URL from "../../../hook/apiConfig";
import { COLORS } from "../../../constants/theme";

const FavoritedGuideTrip = ({
  tripId,
  favorite,
  onFavoriteToggle,
  size = 30,
}) => {
  const { token } = useContext(AuthContext);
  const [isFavorite, setIsFavorite] = useState(favorite);

  const toggleFavorite = async () => {
    try {
      const url = isFavorite
        ? `${BASE_URL}/user/guide-trip/favorite/${tripId}/delete`
        : `${BASE_URL}/user/guide-trip/favorite/${tripId}`;

      const method = isFavorite ? "delete" : "post";

      const response = await axios({
        method,
        url,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        data: {},
      });

      setIsFavorite(!isFavorite);
      onFavoriteToggle(tripId, !isFavorite);
      Alert.alert("Success", response.data.msg);
    } catch (error) {
      if (error.response) {
        Alert.alert(
          "Error",
          error.response.data.message || "Failed to toggle favorite status."
        );
      } else {
        Alert.alert("Error", "Failed to toggle favorite status.");
      }
    }
  };

  return (
    <TouchableOpacity
      style={[styles.favoriteIcon, { width: size, height: size }]}
      onPress={toggleFavorite}
    >
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
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

import React, { useState, useContext } from "react";
import { TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import axios from "axios";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AuthContext } from "../../../store/auth-context"; 
import BASE_URL from "../../../hook/apiConfig"; 

const AddTripFavorite = ({ tripId, isFavoritedInitially, size = 24 }) => {
  const { token } = useContext(AuthContext); // Get the user token from AuthContext
  const [isFavorited, setIsFavorited] = useState(isFavoritedInitially);

  const handleFavoriteToggle = async () => {
    try {
      if (isFavorited) {
        // Send DELETE request to remove favorite
        await axios.delete(`${BASE_URL}/trip/favorite/${tripId}/delete`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        Alert.alert("Success", "Trip removed from favorites.");
      } else {
        // Send POST request to add favorite
        await axios.post(`${BASE_URL}/trip/favorite/${tripId}`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        Alert.alert("Success", "Trip added to favorites.");
      }
      setIsFavorited(!isFavorited); // Toggle the favorite status locally
    } catch (error) {
      Alert.alert("Error", "Failed to update favorite status.");
      console.error("Favorite error: ", error);
    }
  };

  return (
    <TouchableOpacity onPress={handleFavoriteToggle} style={styles.favoriteIcon}>
      <Image
        source={require("../../../assets/images/icons/heart.png")}
        style={{
          width: size,
          height: size,
          tintColor: isFavorited ? "red" : "black", // Set red if favorited, black otherwise
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
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    marginBottom: hp("1%"),
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddTripFavorite;

import React, { useContext } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  Image,
  Text,
} from "react-native";
import { AuthContext } from "../../store/auth-context";
import axios from "axios";
import { COLORS } from "../../constants/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const AddToVisitedButton = ({ placeId, visited, refreshProfile }) => {
  const authCtx = useContext(AuthContext);

  const handleAddPlace = async () => {
    try {
      await axios.post(
        `https://dashboard.discoverjo.com/api/visited/place/${placeId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authCtx.token}`,
            Accept: "application/json",
          },
        }
      );
      refreshProfile();
      Alert.alert("Success", "Place added to visited places.");
    } catch (error) {
      Alert.alert("Error", "Unable to add the place.");
    }
  };

  const handleRemovePlace = async () => {
    try {
      await axios.delete(
        `https://dashboard.discoverjo.com/api/visited/place/${placeId}/delete`,
        {
          headers: {
            Authorization: `Bearer ${authCtx.token}`,
            Accept: "application/json",
          },
        }
      );
      refreshProfile();
      Alert.alert("Success", "Place removed from visited places.");
    } catch (error) {
      Alert.alert("Error", "Unable to remove the place.");
    }
  };

  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={visited ? handleRemovePlace : handleAddPlace}
    >
      <Text style={styles.buttonText}>
        {visited ? "Remove from Visited Places" : "Add to Visited Places"}
      </Text>
    </TouchableOpacity>
  );
};

export default AddToVisitedButton;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: COLORS.lightGrey,
    padding: hp("2%"), // Responsive padding
    borderRadius: wp("4%"), // Responsive border radius
    alignItems: "center",
    justifyContent: "center",
    marginRight: wp(2),
    width: wp("60%"), // Adjust the width as needed
  },
  buttonText: {
    fontSize: wp("4.5%"), // Responsive font size
    color: COLORS.black,
    fontWeight: "Medium",
  },
});

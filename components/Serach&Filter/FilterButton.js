import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

const PlaceFilter = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.placefilter}>
      <Image
        source={require("../../assets/images/icons/placefilter.png")}
        style={styles.filterIcon}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default PlaceFilter;

const styles = StyleSheet.create({
  placefilter: {
    width: 40,
    height: 40,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCD22820",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  filterIcon: {
    width: 25,
    height: 25,
  },
});

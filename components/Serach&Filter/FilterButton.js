import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

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
    padding: 10,
  },
  filterIcon: {
    width: 25,
    height: 25,
  },
});

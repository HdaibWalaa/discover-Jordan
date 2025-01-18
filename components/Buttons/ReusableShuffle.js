import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

const ReusableShuffle = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.shuffleButton}>
      <Image
        source={require("../../assets/images/icons/shuffle.png")} // Verify this path is correct
        style={styles.shuffleIcon}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default ReusableShuffle;

const styles = StyleSheet.create({
  shuffleButton: {
    padding: 10,
  },
  shuffleIcon: {
    width: 25,
    height: 25,
  },
});

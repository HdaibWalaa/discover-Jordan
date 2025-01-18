import { StyleSheet, Image } from "react-native";
import React from "react";

const NetworkImage = ({ source, width, height, radius }) => {
  const isValidUri =
    source && typeof source === "string" && source.trim() !== "";

  return (
    <Image
      source={
        isValidUri
          ? { uri: source }
          : require("../../assets/images/default/defaultpost.png")
      }
      style={styles.image(width, height, radius)}
    />
  );
};

export default NetworkImage;

const styles = StyleSheet.create({
  image: (width, height, radius) => ({
    width: width,
    height: height,
    borderRadius: radius,
    resizeMode: "cover",
  }),
});

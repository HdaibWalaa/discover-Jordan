import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";

const RusableWhite = ({ children }) => {
  return (
    <ImageBackground
      source={require("../../assets/images/white.png")}
      style={styles.container}
    >
      <View style={styles.content}>{children}</View>
    </ImageBackground>
  );
};

export default RusableWhite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    top: -20,
  },
  content: {
    flex: 1,
  },
});

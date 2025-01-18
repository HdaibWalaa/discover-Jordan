import { StyleSheet, View, ImageBackground } from "react-native";
import React from "react";

const TripBackground = ({ children }) => {
  return (
    <ImageBackground
      source={require("../../assets/images/tripbackground.png")}
      style={styles.container}
    >
      <View style={styles.content}>{children}</View>
    </ImageBackground>
  );
};

export default TripBackground;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
});

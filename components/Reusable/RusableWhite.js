import React from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import { useTheme } from "../../store/context/ThemeContext";

const RusableWhite = ({ children }) => {
  const { mode } = useTheme();

  return mode === "dark" ? (
    <ImageBackground
      source={require("../../assets/images/DarkModeVisitorHomePage.png")}
      style={styles.darkContainer}
    >
      <View style={styles.content}>{children}</View>
    </ImageBackground>
  ) : (
    <ImageBackground
      source={require("../../assets/images/white.png")}
      style={styles.lightContainer}
    >
      <View style={styles.content}>{children}</View>
    </ImageBackground>
  );
};

export default RusableWhite;

const styles = StyleSheet.create({
  darkContainer: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
   
  },
  lightContainer: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    top: -20,
  },
  content: {
    flex: 1,
  },
});

import { StyleSheet, View, ImageBackground } from "react-native";
import React from "react";
import { COLORS } from "../../constants/theme";
import { useTheme } from "../../store/context/ThemeContext";

const ReusableBackground = ({ children }) => {
  const { mode } = useTheme();

  return (
    <ImageBackground
      source={require("../../assets/images/background.png")}
      style={[
        styles.container,
        { backgroundColor: mode === "dark" ? COLORS.navey : COLORS.white },
      ]}
    >
      <View style={styles.content}>{children}</View>
    </ImageBackground>
  );
};

export default ReusableBackground;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    top: -20,
    backgroundColor:COLORS.white,
  },
  content: {
    flex: 1,
  },
});

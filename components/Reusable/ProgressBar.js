import React from "react";
import { StyleSheet, View, Animated } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import HeightSpacer from "./HeightSpacer";
import { SIZES, COLORS } from "../../constants/theme";

const ProgressBar = ({ progress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <Animated.View
            style={[
              styles.progressIndicator,
              {
                width: progress.interpolate({
                  inputRange: [0, 100],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
          />
        </View>
        <HeightSpacer height={40} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center", 
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressBar: {
    flex: 1,
    height: 10,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  },
  progressIndicator: {
    height: "100%",
    backgroundColor:COLORS.primary,
    borderRadius: 5,
  },
  iconContainer: {
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 50,
    padding: 5,
    marginRight: 10,
  },
});

export default ProgressBar;

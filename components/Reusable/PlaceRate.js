import React from "react";
import { TouchableOpacity, StyleSheet, Image, View } from "react-native";
import { COLORS } from "../../constants/theme";
import ReusableText from "./ReusableText";

const PlaceRate = ({ size = 24, color = "black", onPress, rating }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.background}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/images/icons/ranking.png")}
            style={{
              width: 22,
              height: 22,
              tintColor: COLORS.black,
            }}
          />
        </View>
        <View style={styles.textContainer}>
          {/* Use toFixed(1) to show only one decimal place */}
          <ReusableText
            text={rating ? rating.toFixed(1) : "N/A"} // Round to 1 decimal place
            family={"SemiBold"}
            size={15}
            color={COLORS.black}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  background: {
    width: 44,
    height: 44,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PlaceRate;

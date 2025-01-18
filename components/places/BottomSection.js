import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AddToVisitedButton from "../../components/places/AddToVisitedButton";
import { COLORS } from "../../constants/theme";

const BottomSection = ({
  favorite,
  placeId,
  visited,
  refresh,
  handleDirectionPress,
}) => {
  return (
    <View style={styles.bottomSection}>
      <AddToVisitedButton
        placeId={placeId}
        visited={visited}
        refreshProfile={refresh}
      />
      <TouchableOpacity
        onPress={handleDirectionPress}
        style={styles.directionButton}
      >
        <View style={styles.directionButtonContent}>
          <Image
            source={require("../../assets/images/icons/sendrtip.png")}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BottomSection;

const styles = StyleSheet.create({
  bottomSection: {
    flexDirection: "row",
    paddingVertical: wp(3),
    justifyContent: "center",
  },

  directionButton: {
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: COLORS.lightGrey,
    padding: hp("2%"), // Responsive padding
    borderRadius: wp("4%"), // Responsive border radius
    alignItems: "center",
    justifyContent: "center",
  },
  directionButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: wp("6%"), // Responsive icon width
    height: wp("6%"), // Responsive icon height
    tintColor: COLORS.black, // Keep the icon color consistent
  },
});

import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { COLORS } from "../../constants/theme";

const ReusableRegionLocation = ({
  region,
  textColor = COLORS.gray,
  iconColor = COLORS.dark,
}) => {
  return (
    <View style={styles.regionContainer}>
      <Image
        source={require("../../assets/images/icons/location.png")}
        style={[styles.markerImage, { tintColor: iconColor }]}
      />
      <Text style={[styles.region, { color: textColor }]}>{region}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  regionContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: wp(1),
  },
  markerImage: {
    width: wp(4),
    height: wp(4),
    marginRight: wp(1),
  },
  region: {
    fontSize: wp(4),
    fontFamily: "Medium",
  },
});

export default ReusableRegionLocation;

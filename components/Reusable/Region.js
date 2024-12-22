import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { COLORS } from "../../constants/theme";

const Region = ({ region }) => {
  return (
    <View style={styles.regionContainer}>
      <Image
        source={require("../../assets/images/icons/location.png")}
        style={styles.markerImage}
      />
      <Text style={styles.region}>{region}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  regionContainer: {
    flexDirection: "row",
    alignItems: "left",
    padding: wp(1),
    right:wp(2),
  },
  markerImage: {
    width: wp(5),
    height: wp(5),
    marginRight: wp(1),
    tintColor: COLORS.white,
  },
  region: {
    color: "white",
    fontSize: wp(4),
    fontFamily: "Bold",
  },
});

export default Region;

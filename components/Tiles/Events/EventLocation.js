import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { COLORS } from "../../../constants/theme";

const EventLocation = ({ region }) => {
  return (
    <View style={styles.regionContainer}>
      <Image
        source={require("../../../assets/images/icons/location.png")}
        style={styles.markerImage}
      />
      <Text style={styles.region}>{region}</Text>
    </View>
  );
};

export default EventLocation;

const styles = StyleSheet.create({
  regionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  markerImage: {
    width: wp(3),
    height: wp(3),
    marginRight: wp(1),
    tintColor: COLORS.dark,
  },
  region: {
    color: COLORS.gray,
    fontSize: wp(3),
    fontFamily: "Medium",
  },
});

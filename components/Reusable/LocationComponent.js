import React from "react";
import { Text, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "../../constants/theme";
import { Fontisto } from "@expo/vector-icons";

const LocationComponent = ({ location }) => {
  return (
    <View style={styles.regionContainer}>
      <Fontisto style={styles.markerImage} name="map-marker-alt" size={22} />
      <Text style={styles.region}>{location}</Text>
    </View>
  );
};

const styles = {
  regionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  markerImage: {
    marginRight: wp(1),
    color: COLORS.black,
  },
  region: {
    color: COLORS.black,
    fontSize: wp(5),
    fontFamily: "Medium",
  },
};

export default LocationComponent;

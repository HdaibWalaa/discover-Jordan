import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const LocationComponent = ({ location, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.locationContainer, { width: wp(60) }]}>
        <View style={styles.locationRow}>
          <Text style={[styles.currentLocationText, { fontSize: wp(3.5) }]}>
            Current Location
          </Text>

          <View style={styles.iconWrapper}>
            <AntDesign name="down" style={[styles.icon, { fontSize: wp(3) }]} />
          </View>
        </View>

        <Text style={[styles.locationText, { fontSize: wp(4) }]}>
          {location}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  locationContainer: {
    marginLeft: wp(5),
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  currentLocationText: {
    fontFamily: "Black",
    fontWeight: "400",
    lineHeight: wp(4),
    letterSpacing: 0.5,
    textAlign: "left",
    color: "#5A5A5A",
  },
  iconWrapper: {
    marginLeft: wp(0.7),
  },
  icon: {
    color: "#5A5A5A",
  },
  locationText: {
    textTransform: "uppercase",
    fontFamily: "SemiBold",
    lineHeight: wp(4.5),
    letterSpacing: 0.1,
    textAlign: "left",
    color: "#000000",
    width: wp(50),
    height: wp(4.5),
    top: wp(1.2),
  },
});

export default LocationComponent;

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "../../constants/theme";
import PriceComponent from "./PriceComponent";
import UserComponent from "./UserComponent";
import LocationComponent from "./LocationComponent";

const Card = ({ trip }) => {
  return (
    <View style={[styles.container, styles.responsiveContainer]}>
      <View style={styles.row}>
        <Text style={styles.tripName}>{trip.name}</Text>
        <PriceComponent price={trip.price} />
      </View>
      <UserComponent
        users={trip.users_number}
        attendanceNumber={trip.attendance_number}
      />
      <LocationComponent location={trip.location} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp("4%"),
    paddingVertical: hp("2%"),
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp("1%"),
  },
  tripName: {
    flex: 1,
    fontFamily: "SemiBold",
    color: COLORS.black,
    fontSize: wp("4.5%"),
    lineHeight: wp("6%"),
  },
  responsiveContainer: {
    width: wp("63%"),
    height: hp("20%"),
    position: "absolute",
    top: hp("20%"),
    left: wp("5%"),
  },
});

export default Card;

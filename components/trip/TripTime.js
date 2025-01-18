import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ReusableText from "../Reusable/ReusableText";

const TripTime = ({ tripDetails }) => {
  return (
    <View style={styles.dateTimeContainer}>
      <View style={styles.dateTimeItem}>
        <Image
          source={require("../../assets/images/icons/calendar.png")}
          style={styles.placeIcon}
        />
        <ReusableText
          text={tripDetails.date}
          family={"Medium"}
          size={TEXT.medium}
          color={COLORS.dark}
          style={styles.titleText}
        />
      </View>
      <View style={styles.dateTime}>
        <Image
          source={require("../../assets/images/icons/clock.png")}
          style={styles.placeIcon}
        />
        <ReusableText
          text={tripDetails.time}
          family={"Medium"}
          size={TEXT.medium}
          color={COLORS.dark}
          style={styles.titleText}
        />
      </View>
    </View>
  );
};

export default TripTime;

const styles = StyleSheet.create({
  dateTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  dateTimeItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  dateTime: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 155,
  },
  placeIcon: {
    width: wp(2),
    height: hp(2),
    padding: wp(2),
    marginRight: 8,
  },
});

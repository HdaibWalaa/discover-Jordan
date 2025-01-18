import React from "react";
import { Text, View, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const DateComponent = ({ date }) => {


  const [year, month, day] = date.split("-");

  const monthName = new Date(`${year}-${month}-01`).toLocaleString("en-US", {
    month: "long",
  });

  const monthAbbr = monthName.substring(0, 3);

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.dayText}> {day.padStart(2, "0")} </Text>
        <Text style={styles.monthText}> {monthAbbr} </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
  },
  dateContainer: {
    width: wp(14),
    height: wp(13),
    borderRadius: wp("4%"),
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    marginBottom: hp("1%"),
    justifyContent: "center",
    alignItems: "center",
  },
  dayText: {
    fontFamily: "SemiBold",
    fontSize: wp("5"),
    lineHeight: wp("6%"),
    letterSpacing: 0,
    textAlign: "center",
    color: "black",
  },
  monthText: {
    fontFamily: "Medium",
    fontSize: wp("4"),
    lineHeight: wp("4"),
    letterSpacing: 0,
    textAlign: "center",
    color: "black",
  },
});

export default DateComponent;

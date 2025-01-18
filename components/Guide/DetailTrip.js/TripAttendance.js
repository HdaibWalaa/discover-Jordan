import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, TEXT } from "../../../constants/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const TripAttendance = ({ maxAttendance, joinRequests }) => {
  const joinedCount = joinRequests.length;
  const percentage =
    maxAttendance > 0 ? ((joinedCount / maxAttendance) * 100).toFixed(0) : 0; // Handle zero division case

  return (
    <View style={styles.container}>
      {/* Attendance Count */}
      <View style={styles.attendanceInfo}>
        <Text style={styles.attendanceText}>
          <Text
            style={styles.boldText}
          >{`${joinedCount} / ${maxAttendance}`}</Text>{" "}
          Attendance
        </Text>
        <Text style={styles.percentageText}>{`${percentage}%`}</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: `${percentage}%` }]} />
      </View>
    </View>
  );
};

export default TripAttendance;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp("5%"),
    marginVertical: hp("2%"),
  },
  attendanceInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp("1%"),
  },
  attendanceText: {
    fontSize: TEXT.small,
    color: COLORS.gray,
  },
  boldText: {
    fontWeight: "bold",
    color: COLORS.dark,
  },
  percentageText: {
    fontSize: TEXT.small,
    color: COLORS.dark,
  },
  progressBarBackground: {
    width: "100%",
    height: hp("1.5%"),
    backgroundColor: COLORS.lightGray,
    borderRadius: hp("1%"),
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: COLORS.primary, // Ensure yellow is a distinct color
    borderRadius: hp("1%"),
  },
});

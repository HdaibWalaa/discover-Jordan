import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { COLORS, TEXT } from "../../../constants/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const GuideDate = ({
  start_datetime,
  end_datetime,
  price,
  maxAttendance,
  joinRequests = [], // ✅ Default to an empty array if undefined
}) => {
  // Format date and time
  const startDate = new Date(start_datetime).toLocaleDateString("en-GB");
  const endDate = new Date(end_datetime).toLocaleDateString("en-GB");
  const startTime = new Date(start_datetime).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const endTime = new Date(end_datetime).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  // Attendance info
  const joinedCount = joinRequests?.length ?? 0; // ✅ Safe check using optional chaining

  return (
    <View style={styles.container}>
      {/* Date Section */}
      <View style={styles.section}>
        <Image
          source={require("../../../assets/images/icons/calendar.png")}
          style={styles.icon}
        />
        <Text style={styles.text}>{`${startDate} - ${endDate}`}</Text>
      </View>

      {/* Time Section */}
      <View style={styles.section}>
        <Image
          source={require("../../../assets/images/icons/clock.png")}
          style={styles.icon}
        />
        <Text style={styles.text}>{`${startTime} - ${endTime}`}</Text>
      </View>

      {/* Price Section */}
      <View style={[styles.section, styles.priceSection]}>
        <Image
          source={require("../../../assets/images/icons/wallet.png")}
          style={styles.icon}
        />
        <Text style={styles.text}>{`${price} JOD`}</Text>
      </View>

      {/* Attendance Section */}
      <View style={styles.Attendancesection}>
        <Image
          source={require("../../../assets/images/icons/capacity.png")}
          style={styles.Attendanceicon}
        />
        <Text style={styles.text}>{`${maxAttendance} Attendees`}</Text>
      </View>
    </View>
  );
};


export default GuideDate;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: wp("6%"),
    marginVertical: hp("-1%"),
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("1%"),
  },
  Attendancesection: {
    flexDirection: "row",
    alignItems: "center",
    top: -12,
  },
  icon: {
    width: wp("5%"),
    height: wp("5%"),
    resizeMode: "contain",
  },
  Attendanceicon: {
    width: wp("5%"),
    height: wp("5%"),
    resizeMode: "contain",
  },
  text: {
    fontSize: TEXT.small,
    color: COLORS.dark,
    marginLeft: wp("1%"),
  },
  priceSection: {
    marginBottom: hp("2%"),
  },
});

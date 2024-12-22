import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// Utility function to format time
const formatTime = (time) => {
  let [hours, minutes] = time.split(":");
  hours = parseInt(hours, 10);
  const suffix = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format
  minutes = parseInt(minutes, 10) ? `:${minutes}` : ""; // Display minutes only if not 00
  return `${hours}${minutes} ${suffix}`;
};

const OpeningHours = ({ openingHours }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (!openingHours || openingHours.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No opening hours available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.OpeningHour} onPress={toggleExpanded}>
        <Text style={styles.title}>Opening Hours</Text>
      </TouchableOpacity>
      <View style={styles.hourRow}>
        <Image
          source={require("../../assets/images/icons/clock.png")}
          style={styles.icon}
          resizeMode="contain"
        />
        <Text style={styles.hourText}>
          ({openingHours[0].day_of_week}){" "}
          {formatTime(openingHours[0].opening_time)} -{" "}
          {formatTime(openingHours[0].closing_time)}
        </Text>
        <AntDesign
          name={isExpanded ? "up" : "down"}
          size={wp("4%")}
          color={COLORS.gray}
          style={styles.iconToggle}
          onPress={toggleExpanded}
        />
      </View>
      {isExpanded &&
        openingHours.slice(1).map((hour, index) => (
          <View key={index} style={styles.hourRow}>
            <Image
              source={require("../../assets/images/icons/clock.png")}
              style={styles.icon}
              resizeMode="contain"
            />
            <Text style={styles.hourText}>
              ({hour.day_of_week}) {formatTime(hour.opening_time)} -{" "}
              {formatTime(hour.closing_time)}
            </Text>
          </View>
        ))}
    </View>
  );
};

export default OpeningHours;

const styles = StyleSheet.create({
  container: {
    marginVertical: hp("2%"),
    marginHorizontal: wp("2%"),
  },
  title: {
    fontFamily: "SemiBold",
    fontSize: wp("4%"),
    color: COLORS.black,
    marginRight: wp("2%"),
  },
  hourRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("1%"),
  },
  icon: {
    width: wp("5%"),
    height: wp("5%"),
    marginRight: wp("2%"),
  },
  hourText: {
    fontSize: wp("4%"),
    color: COLORS.gray,
    flex: 1,
  },
  OpeningHour: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: hp("1%"),
  },
  iconToggle: {
    marginLeft: wp("2%"),
    marginRight:wp(22)
  },
});

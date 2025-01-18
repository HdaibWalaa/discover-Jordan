import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { COLORS, TEXT, SIZES } from "../../../constants/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FontAwesome } from "@expo/vector-icons"; // Import star icon
import TripStatus from "./TripStatus";

const GuideInfo = ({ guide, status }) => {
  return (
    <View style={styles.container}>
      {/* Left Section: Guide Info */}
      <View style={styles.leftSection}>
        <Image source={{ uri: guide.guide_avatar }} style={styles.avatar} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{guide.guide_username}</Text>
          <Text style={styles.phone}>{guide.guide_phone_number}</Text>
        </View>
      </View>

      {/* Right Section: Rating */}
      <View style={styles.ButtomHeader}>
        <TripStatus status={status} />
        <View style={styles.rightSection}>
          {[...Array(5)].map((_, index) => (
            <FontAwesome
              key={index}
              name="star"
              size={16}
              color={index < guide.guide_rating ? COLORS.primary : COLORS.gray}
              style={styles.star}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default GuideInfo;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: wp("4%"),
    elevation: 1,
    marginBottom: hp("1%"),
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
   
  },
  avatar: {
    width: wp("12%"),
    height: wp("12%"),
    borderRadius: wp("6%"),
    marginRight: wp("3%"),
  },
  infoContainer: {
    justifyContent: "center",
  },
  name: {
    fontSize: TEXT.medium,
    fontWeight: "bold",
    color: COLORS.black,
  },
  phone: {
    fontSize: TEXT.small,
    color: COLORS.gray,
    marginTop: hp("0.2%"),
  },
  rightSection: {
    flexDirection: "row",
    marginTop: hp("1.2%"),
  },
  star: {
    marginHorizontal: wp("0.3%"),
  },
  ButtomHeader: {
    flexDirection: "column", // Arrange items vertically
    alignItems: "center", // Center items horizontally
    justifyContent: "center", // Center items vertically
    marginBottom: hp("-1%"),
  },
});

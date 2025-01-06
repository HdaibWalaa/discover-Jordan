import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"; // Import responsive functions
import { COLORS, SIZES, TEXT } from "../../../constants/theme";
import ReusableText from "../../Reusable/ReusableText";

// Paths to the images
const heartImage = require("../../../assets/images/icons/heart.png");
const pinImage = require("../../../assets/images/icons/pin.png");
const walletImage = require("../../../assets/images/icons/money.png");
const placeholderImage = require("../../../assets/images/icons/money.png"); // Define placeholder image

const AllGuideCard = ({ item, isFirst }) => {
  const capitalize = (str) =>
    str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  const navigation = useNavigation();
  const users = item.users || [];

  return (
    <TouchableOpacity
      style={[styles.tripCard, isFirst ? styles.firstTripCard : null]}
      onPress={() =>
        navigation.navigate("GuideTripDetails", { tripId: item.id })
      }
    >
      <View style={styles.rowContainer}>
        <Image
          source={item.image ? { uri: item.image } : placeholderImage}
          style={styles.image}
          onError={() => {
            console.warn("Failed to load image, using fallback.");
          }}
        />
        <View style={styles.cardContent}>
          <View style={styles.header}>
            <ReusableText
              text={capitalize(item.name)}
              family={"Bold"}
              size={SIZES.large}
              color={COLORS.black}
            />
            <TouchableOpacity style={styles.heartContainer}>
              <Image source={heartImage} style={styles.heartIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Image source={pinImage} style={[styles.icon, styles.grayTint]} />
              <ReusableText
                text={item.location || "Unknown Location"}
                family="Medium"
                size={TEXT.small}
                color={COLORS.lightGreen}
              />
            </View>
            <View style={styles.detailItem}>
              <Image
                source={walletImage}
                style={[styles.icon, styles.grayTint]}
              />
              <ReusableText
                text={`${item.price || 0} JOD`}
                family="Medium"
                size={TEXT.small}
                color={COLORS.lightGreen}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.attendanceContainer}>
        <View style={styles.avatars}>
          {users.slice(0, 3).map((user, index) => (
            <Image
              key={index}
              source={{ uri: user.avatar }}
              style={[styles.avatar, { marginLeft: index > 0 ? -10 : 0 }]}
            />
          ))}
        </View>
        {users.length > 3 && (
          <Text style={styles.moreAttendees}>+{users.length - 3}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default AllGuideCard;

const styles = StyleSheet.create({
  tripCard: {
    marginBottom: hp("2%"),
    backgroundColor: COLORS.primary,
    borderRadius: wp("4%"),
    overflow: "hidden",
    paddingVertical: hp("1%"),
    paddingHorizontal: wp("3%"),
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  firstTripCard: {
    marginTop: hp("-2%"),
    borderRadius: wp("4%"),
    backgroundColor: COLORS.primary,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: wp("24%"),
    height: wp("24%"),
    borderRadius: wp("2%"),
    marginBottom: hp("-1%"),
  },
  cardContent: {
    flex: 1,
    paddingLeft: wp("3%"),
    justifyContent: "center",
  },
  grayTint: {
    tintColor: COLORS.lightGreen,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heartContainer: {
    padding: wp("2%"),
  },
  heartIcon: {
    width: wp("6%"),
    height: wp("6%"),
  },
  detailsContainer: {
    marginTop: hp("1%"),
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("0.5%"),
  },
  icon: {
    width: wp("4.5%"),
    height: wp("4.5%"),
    marginRight: wp("2%"),
  },
  attendanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp("1.5%"),
  },
  avatars: {
    flexDirection: "row",
  },
  avatar: {
    width: wp("6%"),
    height: wp("6%"),
    borderRadius: wp("3%"),
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  moreAttendees: {
    fontSize: wp("3.5%"),
    color: COLORS.black,
    marginLeft: wp("2%"),
  },
});

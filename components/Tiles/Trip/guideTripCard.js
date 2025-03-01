import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS, TEXT } from "../../../constants/theme";
import FavoritedGuideTrip from "./FavoritedGuideTrip";

const GuideTripCard = ({ item, onPress, margin }) => {
  // Calculate attendance percentage
  const attendancePercentage =
    (item.number_of_request / item.max_attendance) * 100;

  // Format date
  const tripDate = new Date(item.start_time);
  const day = tripDate.getDate();
  const month = tripDate.toLocaleString("en", { month: "short" }).toUpperCase();

  return (
    <TouchableOpacity
      style={[styles.tripCard, margin && { marginRight: margin }]}
      onPress={onPress}
    >
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.cardImage}
        imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
        resizeMode="cover"
      >
        <View style={styles.topSection}>
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{day}</Text>
            <Text style={styles.monthText}>{month}</Text>
          </View>
          <FavoritedGuideTrip
            tripId={item.id}
            favorite={item.favorite}
            onFavoriteToggle={(id, status) => {
              console.log(`Trip ${id} favorite status changed to ${status}`);
            }}
          />
        </View>
      </ImageBackground>

      <View style={styles.detailsSection}>
        <View style={styles.priceRow}>
          <Image
            source={require("../../../assets/images/icons/walletTrip.png")}
            style={styles.walletIcon}
          />
          <Text style={styles.priceText}>{item.price} JOD</Text>
        </View>

        <Text style={styles.tripName} numberOfLines={1} ellipsizeMode="tail">
          {item.name}
        </Text>

        <View style={styles.guideInfoRow}>
          <View style={styles.guideContainer}>
            <Image source={{ uri: item.guide_avatar }} style={styles.avatar} />
            <Text style={styles.guideUsername}>{item.guide_username}</Text>
          </View>

          {/* Display guide rating */}
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{item.guide_rating}</Text>
            <Image
              source={require("../../../assets/images/icons/star.png")}
              style={styles.starIcon}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GuideTripCard;

const styles = StyleSheet.create({
  tripCard: {
    width: wp("70%"),
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: COLORS.white,
   
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardImage: {
    width: "100%",
    height: hp("18%"),
    
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: wp("3%"),
  },
  dateContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 8,
    padding: wp("2%"),
    alignItems: "center",
    minWidth: wp("12%"),
  },
  dateText: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    color: COLORS.black,
  },
  monthText: {
    fontSize: wp("3%"),
    fontWeight: "500",
    color: COLORS.gray,
    marginTop: 2,
  },
  detailsSection: {
    padding: wp("4%"),
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("0.8%"),
  },
  walletIcon: {
    width: wp("4%"),
    height: wp("4%"),
    marginRight: 4,
  },
  priceText: {
    fontSize: wp("3.8%"),
    color: COLORS.black,
    fontWeight: "bold",
  },
  tripName: {
    fontSize: wp("4.5%"),
    fontWeight: "bold",
    color: COLORS.black,
    marginBottom: hp("1.5%"),
  },
  guideInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp("1.5%"),
  },
  guideContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: wp("8%"),
    height: wp("8%"),
    borderRadius: wp("4%"),
    marginRight: wp("2%"),
  },
  guideUsername: {
    fontSize: wp("3.5%"),
    color: COLORS.gray,
    fontWeight: "500",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary || "#FFD700",
    paddingHorizontal: wp("2%"),
    paddingVertical: hp("0.5%"),
    borderRadius: 12,
  },
  ratingText: {
    fontSize: wp("3.5%"),
    fontWeight: "bold",
    color: COLORS.white,
    marginRight: 4,
  },
  starIcon: {
    width: wp("3.5%"),
    height: wp("3.5%"),
  },
  attendanceContainer: {
    marginTop: hp("1%"),
  },
  attendanceText: {
    fontSize: wp("3.2%"),
    color: COLORS.gray,
    marginBottom: 4,
  },
  progressBarContainer: {
    height: hp("1%"),
    backgroundColor: "#ECECEC",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: COLORS.primary || "#4CAF50",
    borderRadius: 10,
  },
});

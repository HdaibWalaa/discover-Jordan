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
import { COLORS, TEXT, SIZES } from "../../../constants/theme";
import ReusableText from "../../Reusable/ReusableText";
import AddGuideTripFavorite from "./AddGuideTripFavorite";
import { useNavigation } from "@react-navigation/native";


const defaultTripImage = require("../../../assets/images/default/defaulttrip.jpeg");

const GuideTripCard = ({ item, margin }) => {
  const navigation = useNavigation();
  const attendancePercentage =
    (item.number_of_request / item.max_attendance) * 100;

  const tripDate = new Date(item.start_time);
  const day = tripDate.getDate();
  const month = tripDate.toLocaleString("en", { month: "short" }).toUpperCase();

  const handlePress = () => {
    navigation.navigate("GuideTripDetails", { tripId: item.id });
  };

  return (
    <TouchableOpacity
      style={[styles.tripCard, margin && { marginRight: margin }]}
      onPress={handlePress}
    >
      <ImageBackground
        source={item.image ? { uri: item.image } : defaultTripImage}
        style={styles.cardImage}
        imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
        resizeMode="cover"
      >
        <View style={styles.topSection}>
          <View style={styles.dateContainer}>
            <ReusableText
              text={day.toString()}
              family={"Bold"}
              size={SIZES.large}
              color={COLORS.black}
              style={styles.dateText}
            />
            <ReusableText
              text={month}
              family={"Bold"}
              size={SIZES.small}
              color={COLORS.gray}
              style={styles.monthText}
            />
          </View>
          <AddGuideTripFavorite
            tripId={item.id}
            isFavoritedInitially={item.favorite}
            size={20}
          />
        </View>
      </ImageBackground>

      <View style={styles.detailsSection}>
        {/* Name and status in the same row */}
        <View style={styles.nameStatusRow}>
          <View style={styles.nameContainer}>
            <ReusableText
              text={item.name}
              family={"Bold"}
              size={SIZES.large}
              color={COLORS.black}
              style={styles.tripName}
              numberOfLines={2}
              ellipsizeMode="tail"
            />
          </View>

          {/* Status indicator */}
          {item.status !== undefined && (
            <View style={styles.statusContainer}>
              <View
                style={[
                  styles.statusIndicator,
                  {
                    backgroundColor:
                      item.status === 1 ? COLORS.primary : COLORS.gray,
                  },
                ]}
              />
              <ReusableText
                text={item.status === 1 ? "Available" : "Not Available"}
                family={"Regular"}
                size={SIZES.small}
                color={item.status === 1 ? COLORS.primary : COLORS.gray}
              />
            </View>
          )}
        </View>

        <View style={styles.priceRow}>
          <Image
            source={require("../../../assets/images/icons/walletTrip.png")}
            style={styles.walletIcon}
          />
          <ReusableText
            text={`${item.price} JOD`}
            family={"Bold"}
            size={SIZES.medium}
            color={COLORS.black}
            style={styles.priceText}
          />
          <ReusableText
            text={"/per person"}
            family={"Bold"}
            size={SIZES.small}
            color={COLORS.gray}
            style={styles.perPersonText}
          />
        </View>

        <View style={styles.guideInfoRow}>
          <View style={styles.guideContainer}>
            <Image source={{ uri: item.guide_avatar }} style={styles.avatar} />
            <ReusableText
              text={item.guide_username}
              family={"Bold"}
              size={SIZES.medium}
              color={COLORS.gray}
              style={styles.guideUsername}
            />
          </View>

          {/* Display guide rating */}
          <View style={styles.ratingContainer}>
            <Image
              source={require("../../../assets/images/icons/star.png")}
              style={styles.starIcon}
            />
            <ReusableText
              text={item.guide_rating.toString()}
              family={"Bold"}
              size={SIZES.medium}
              color={COLORS.black}
              style={styles.ratingText}
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: hp("0.3%") },
    shadowOpacity: 0.1,
    shadowRadius: wp("1%"),
    elevation: 5,
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
  detailsSection: {
    padding: wp("4%"),
  },
  nameStatusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: hp("1%"),
  },
  nameContainer: {
    flex: 1,
    marginRight: wp("2%"),
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 2,
  },
  statusIndicator: {
    width: wp("2%"),
    height: wp("2%"),
    borderRadius: wp("1%"),
    marginRight: wp("1%"),
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("1.5%"),
  },
  walletIcon: {
    width: wp("4%"),
    height: wp("4%"),
    marginRight: 4,
  },
  perPersonText: {
    marginLeft: 3,
  },
  guideInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp("2%"),
    paddingVertical: hp("0.5%"),
    borderRadius: 12,
  },
  starIcon: {
    width: wp("4%"),
    height: wp("4%"),
    marginRight: 4,
  },
});

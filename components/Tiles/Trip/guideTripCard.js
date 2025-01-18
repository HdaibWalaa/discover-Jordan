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
import { ProgressBar } from "react-native-paper";
import { COLORS, TEXT } from "../../../constants/theme";
import FavoritedGuideTrip from "./FavoritedGuideTrip";

const GuideTripCard = ({ item, onPress }) => {
  // Calculate attendance percentage
  const attendancePercentage =
    (item.number_of_request / item.max_attendance) * 100;

  return (
    <TouchableOpacity style={styles.tripCard} onPress={onPress}>
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.cardImage}
        imageStyle={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
        resizeMode="cover"
      >
        <View style={styles.topSection}>
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>
              {new Date(item.start_time).getDate()}
            </Text>
            <Text style={styles.monthText}>
              {new Date(item.start_time)
                .toLocaleString("en", { month: "short" })
                .toUpperCase()}
            </Text>
          </View>
          <FavoritedGuideTrip
            tripId={item.id} // Correctly pass the tripId
            favorite={item.favorite}
            onFavoriteToggle={(id, status) => {
              console.log(`Trip ${id} favorite status changed to ${status}`);
            }}
          />
        </View>
      </ImageBackground>

      <View style={styles.detailsSection}>
        <View style={styles.priceRow}>
          <Text style={styles.priceText}>
            <Image
              source={require("../../../assets/images/icons/walletTrip.png")}
              style={styles.icon}
            />{" "}
            {item.price} JOD
          </Text>
        </View>
        <Text style={styles.tripName}>{item.name}</Text>

        <View style={styles.attendanceRow}>
          <Text style={styles.attendanceText}>
            {item.number_of_request} person / {item.max_attendance} Person
          </Text>
          <Image source={{ uri: item.guide_avatar }} style={styles.avatar} />
        </View>
        <ProgressBar
          progress={attendancePercentage / 100}
          color={COLORS.primary}
          style={styles.progressBar}
        />
      </View>
    </TouchableOpacity>
  );
};

export default GuideTripCard;

const styles = StyleSheet.create({
  tripCard: {
    width: wp("75%"),
    borderRadius: 10,
    marginHorizontal: wp("2%"),
    overflow: "hidden",
    backgroundColor: COLORS.white,
    elevation: 3,
  },
  cardImage: {
    width: "100%",
    height: hp("20%"),
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: wp("3%"),
  },
  dateContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 8,
    paddingVertical: hp("0.5%"),
    paddingHorizontal: wp("2%"),
    alignItems: "center",
  },
  dateText: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    color: COLORS.black,
  },
  monthText: {
    fontSize: wp("3%"),
    color: COLORS.gray,
  },
  detailsSection: {
    padding: wp("4%"),
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("1%"),
  },
  priceText: {
    fontSize: wp("4%"),
    color: COLORS.black,
    fontWeight: "bold",
  },
  icon: {
    width: wp("5%"),
    height: wp("5%"),
  },
  tripName: {
    fontSize: wp("4.5%"),
    fontWeight: "bold",
    color: COLORS.black,
    marginBottom: hp("1%"),
  },
  attendanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  attendanceText: {
    fontSize: wp("3.5%"),
    color: COLORS.gray,
  },
  avatar: {
    width: wp("8%"),
    height: wp("8%"),
    borderRadius: wp("4%"),
  },
  progressBar: {
    height: hp("1%"),
    borderRadius: 5,
    marginTop: hp("1%"),
    backgroundColor: COLORS.lightGray,
  },
});

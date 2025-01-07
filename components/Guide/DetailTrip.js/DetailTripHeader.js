import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { SIZES, COLORS, TEXT } from "../../../constants/theme";
import GoBack from "../../Buttons/GoBack";
import ReusableText from "../../Reusable/ReusableText";
import ReusableRegionLocation from "../../Reusable/ReusableRegionLocation";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import FavoritedGuideTrip from "../../Tiles/Trip/FavoritedGuideTrip";
import TripStatus from "./TripStatus";

const DetailTripHeader = ({ tripDetails,status }) => {
  return (
    <View style={styles.header}>
      <View style={styles.TopHeader}>
        <GoBack style={styles.goBack} />
        <View style={styles.rightButtonsContainer}>
          <FavoritedGuideTrip
            tripId={tripDetails.id} // Correctly pass the tripId
            favorite={tripDetails.favorite}
            size={20}
            onFavoriteToggle={(id, status) => {
              console.log(`Trip ${id} favorite status changed to ${status}`);
            }}
          />
        </View>
      </View>
      <View style={styles.ButtomHeader}>
        
        <ReusableText
          text={tripDetails.name.toUpperCase()}
          family={"Medium"}
          size={TEXT.large}
          color={COLORS.dark}
          style={styles.titleText}
        />
      </View>
    </View>
  );
};

export default DetailTripHeader;

const styles = StyleSheet.create({
  header: {
    paddingTop: hp("5%"),
    paddingHorizontal: wp("5%"),
  },
  TopHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp("5%"),
    paddingVertical: hp("3%"),
  },
  goBack: {
    padding: wp("1.5%"),
    borderColor: COLORS.dark,
    borderRadius: wp("3%"),
    borderWidth: 1,
  },
  ButtomHeader: {
    alignItems: "center",
    marginBottom: hp("2%"),
    top: hp(-2),
  },
  titleText: {
    textAlign: "center",
  },
  rightButtonsContainer: {
    padding: wp("1.4%"),
    borderColor: COLORS.dark,
    borderRadius: wp("3%"),
    borderWidth: 1,
    right: wp("-70%"),
     backgroundColor: "white",
    padding: wp(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: hp(0.5),
    },
    shadowOpacity: 0.1,
    shadowRadius: hp(0.5),
    elevation: 3, // For Android shadow effect
  },
});

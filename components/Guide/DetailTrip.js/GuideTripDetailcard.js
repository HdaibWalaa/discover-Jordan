import React from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import GalleryTrip from "./GalleryTrip";
import DetailTripHeader from "./DetailTripHeader";
import GuideInfo from "./GuideInfo";
import GuideDate from "./GuideDate";
import TripAttendance from "./TripAttendance";
import ReusableText from "../../Reusable/ReusableText";
import { COLORS, TEXT,SIZES } from "../../../constants/theme";

const GuideTripDetailCard = ({ trip }) => {
  return (
    <View style={styles.card}>
      {/* Header Section */}
      <DetailTripHeader tripDetails={trip} isCreator={true} />

      {/* Gallery Section */}
      <GalleryTrip gallery={trip.gallery} />

      {/* Guide Info Section */}
      <GuideInfo
        guide={{
          guide_avatar: trip.guide_avatar,
          guide_username: trip.guide_username,
          guide_phone_number: trip.guide_phone_number,
          guide_rating: trip.guide_rating,
        }}
        status={trip.status}
      />

      {/* Trip Date Section */}
      <GuideDate
        start_datetime={trip.start_datetime}
        end_datetime={trip.end_datetime}
        price={trip.price}
      />

      {/* Trip Attendance Section */}
      <TripAttendance
        maxAttendance={trip.max_attendance}
        joinRequests={trip.join_request}
      />

      {/* Trip Description Section */}
      <View style={[styles.descriptionSection, { gap: 5 }]}>
        <ReusableText
          text={"Description".toLocaleUpperCase()}
          family={"Medium"}
          size={TEXT.medium}
          color={COLORS.dark}
          style={styles.titleText}
        />
        <ReusableText
          text={trip.description}
          family={"Regular"}
          size={TEXT.small}
          color={COLORS.gray}
          style={styles.subTitleText}
        />
      </View>
    </View>
  );
};

export default GuideTripDetailCard;

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: COLORS.white,
    marginBottom: 110,
  },
  descriptionSection: {
    paddingHorizontal: wp("4%"),
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.base,
  },
});

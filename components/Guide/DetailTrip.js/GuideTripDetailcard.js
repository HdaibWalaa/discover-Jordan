import React, { useContext, useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import axios from "axios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import GalleryTrip from "./GalleryTrip";
import DetailTripHeader from "./DetailTripHeader";
import GuideInfo from "./GuideInfo";
import GuideDate from "./GuideDate";
import TripTabs from "./TripTabs";
import ReusableText from "../../Reusable/ReusableText";
import GuideTripJoin from "./GuideTripJoin";
import AddReview from "./Review/AddReview";
import { COLORS, TEXT, SIZES } from "../../../constants/theme";
import { AuthContext } from "../../../store/auth-context";


const GuideTripDetailCard = ({ trip }) => {
  const { token } = useContext(AuthContext);
  const [reviewList, setReviewList] = useState(trip.reviews || []);

  // Validate gallery data to ensure it's an array
  const galleryData = Array.isArray(trip.gallery) ? trip.gallery : [];

  return (
    <View style={styles.card}>
      {/* Header Section */}
      <DetailTripHeader tripDetails={trip} isCreator={true} />

      {/* Gallery Section */}
      <GalleryTrip gallery={galleryData} />

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
          text={trip.description || "No description available."}
          family={"Regular"}
          size={TEXT.small}
          color={COLORS.gray}
          style={styles.subTitleText}
        />
      </View>

      {/* Trip Tabs Section */}
      <TripTabs trip={trip} />

      {/* Conditionally Render Join Section or AddReview Component */}
      {trip.status === 0 ? (
        <AddReview trip={trip} token={token} />
      ) : (
        <GuideTripJoin trip={trip} token={token} />
      )}
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
    paddingVertical: hp("1.5%"),
  },
  titleText: {
    fontWeight: "bold",
  },
  subTitleText: {
    lineHeight: 20,
  },
});

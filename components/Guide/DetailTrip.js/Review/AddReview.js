import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Alert } from "react-native";
import ReusableText from "../../../Reusable/ReusableText";
import { COLORS, TEXT } from "../../../../constants/theme";
import addIcon from "../../../../assets/images/icons/message-add.png";
import goIcon from "../../../../assets/images/icons/Iconly.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ReviewList from "../Review/ReviewList"; // Import ReviewList
import GuideTripReview from "../Review/GuideTripReview"; // Import GuideTripReview
import { BASE_URL } from "../../../../hook/PostApi"; // Ensure correct import of BASE_URL

const AddReview = ({ trip, token }) => {
  const [reviewList, setReviewList] = useState(trip.reviews || []);
  const [showReviewList, setShowReviewList] = useState(false); // Manage ReviewList visibility
  const [showGuideTripReview, setShowGuideTripReview] = useState(false); // Manage GuideTripReview visibility

  // Function to handle adding a new review
  const handleReviewAdded = (newReview) => {
    setReviewList([...reviewList, newReview]);
    setShowGuideTripReview(false); // Hide GuideTripReview after adding a review
  };

  // Function to handle liking/disliking a review
  const handleLikeDislikeReview = async (reviewId, type) => {
    try {
      const response = await fetch(
        `${BASE_URL}/user/guide-trip/review/${type}/${reviewId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "X-API-KEY": "DISCOVERJO91427",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert("Error", errorData.message || "Failed to process request.");
        return;
      }

      Alert.alert(
        "Success",
        `${type === "like" ? "Liked" : "Disliked"} review.`
      );
    } catch (error) {
      console.error(`Error ${type}ing review:`, error);
      Alert.alert("Error", "Network error: Unable to connect to the server.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.textContainer}>
          <ReusableText
            text={"Reviewers' Recommendations"}
            family={"Bold"}
            size={TEXT.large}
            color={COLORS.dark}
            align={"left"}
            width={"50%"}
          />
        </View>
        <View style={styles.buttonsContainer}>
          {/* Add Button */}
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setShowGuideTripReview((prev) => !prev)} // Toggle GuideTripReview visibility
          >
            <Image source={addIcon} style={styles.icon} />
          </TouchableOpacity>

          {/* Go Button */}
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setShowReviewList((prev) => !prev)} // Toggle ReviewList visibility
          >
            <Image source={goIcon} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      {/* Conditionally Render ReviewList */}
      {showReviewList && (
        <ReviewList
          reviews={reviewList}
          handleLikeDislikeReview={handleLikeDislikeReview}
        />
      )}

      {/* Conditionally Render GuideTripReview */}
      {showGuideTripReview && (
        <GuideTripReview
          tripId={trip.id}
          token={token}
          onReviewAdded={handleReviewAdded}
        />
      )}
    </View>
  );
};

export default AddReview;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
    marginTop: hp("1.5%"),
    marginBottom: hp("1%"),
  },
  textContainer: {
    width: wp("50%"),
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 6,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  icon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
});

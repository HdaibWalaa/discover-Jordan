import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { COLORS, TEXT, SIZES } from "../../constants/theme";
import addIcon from "../../assets/images/icons/message-add.png";
import downArrowIcon from "../../assets/images/icons/down-arrow.png"; // Replace with the correct down arrow icon
import BASE_URL from "../../hook/apiConfig";
import ReusableText from "../Reusable/ReusableText";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ReviewsSection = ({ reviews, placeId, token }) => {
  const [reviewList, setReviewList] = useState(reviews || []);
  const [showAddReview, setShowAddReview] = useState(false);
  const [showReviews, setShowReviews] = useState(true); // State to toggle reviews visibility
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleAddReview = async () => {
    if (!rating || !comment) {
      Alert.alert("Error", "Please provide a rating and comment.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/place/add/review/${placeId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-API-KEY": "DISCOVERJO91427",
        },
        body: JSON.stringify({ rating, comment }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert("Error", errorData.msg || "Failed to add review.");
        return;
      }

      const newReview = await response.json();
      setReviewList([...reviewList, newReview]);
      setShowAddReview(false);
      setRating(0);
      setComment("");
    } catch (error) {
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
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setShowAddReview((prev) => !prev)}
          >
            <Image source={addIcon} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setShowReviews((prev) => !prev)}
          >
            <Image source={downArrowIcon} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      {showAddReview && (
        <View style={styles.addReviewContainer}>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setRating(star)}
                style={styles.starButton}
              >
                <Text
                  style={[styles.star, rating >= star && styles.filledStar]}
                >
                  ★
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            style={styles.commentInput}
            placeholder="Type your comment..."
            value={comment}
            onChangeText={setComment}
            multiline
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleAddReview}
          >
            <Text style={styles.submitButtonText}>Publish</Text>
          </TouchableOpacity>
        </View>
      )}

      {showReviews ? (
        <FlatList
          data={reviewList}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : index.toString()
          } // Use index as a fallback
          renderItem={({ item }) => (
            <View style={styles.reviewContainer}>
              <View style={styles.header}>
                {item.avatar ? (
                  <Image source={{ uri: item.avatar }} style={styles.avatar} />
                ) : (
                  <View style={styles.placeholderAvatar} />
                )}
                <Text style={styles.username}>{item.username}</Text>
              </View>
              <Text style={styles.comment}>{item.comment}</Text>
              <Text style={styles.rating}>Rating: {item.rating}/5</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noReviewsText}>No reviews to show.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp("5%"),
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
  addReviewContainer: {
    marginVertical: SIZES.medium,
    padding: SIZES.medium,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: SIZES.small,
  },
  starButton: {
    marginHorizontal: 5,
  },
  star: {
    fontSize: 30,
    color: COLORS.gray,
  },
  filledStar: {
    color: COLORS.secondary,
  },
  commentInput: {
    height: 80,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: SIZES.small,
    padding: SIZES.small,
    textAlignVertical: "top",
    marginBottom: SIZES.small,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.small,
    borderRadius: SIZES.small,
    alignItems: "center",
  },
  submitButtonText: {
    color: COLORS.white,
    fontFamily: "Bold",
  },
  reviewContainer: {
    padding: SIZES.small,
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.small,
    marginBottom: SIZES.small,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SIZES.small,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: SIZES.small,
  },
  placeholderAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.gray,
    marginRight: SIZES.small,
  },
  username: {
    fontSize: TEXT.medium,
    fontFamily: "SemiBold",
    color: COLORS.black,
  },
  comment: {
    fontSize: TEXT.small,
    fontFamily: "Regular",
    color: COLORS.gray,
    marginBottom: SIZES.small,
  },
  rating: {
    fontSize: TEXT.small,
    fontFamily: "SemiBold",
    color: COLORS.secondary,
  },
  noReviewsText: {
    textAlign: "center",
    color: COLORS.gray,
    fontSize: TEXT.medium,
    marginVertical: SIZES.medium,
  },
});

export default ReviewsSection;

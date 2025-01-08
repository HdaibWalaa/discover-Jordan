import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from "react-native";
import { COLORS, TEXT, SIZES } from "../../../constants/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AuthContext } from "../../../store/auth-context";
import axios from "axios";

const GuideTripReview = ({ tripId, reviews }) => {
  const { token } = useContext(AuthContext);
  const [userReview, setUserReview] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewList, setReviewList] = useState(reviews);
  const [isEditing, setIsEditing] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);

  const handleAddOrUpdateReview = async () => {
    if (!userReview || rating === 0) {
      Alert.alert("Error", "Please enter a review and select a rating.");
      return;
    }

    const formData = new FormData();
    formData.append("rating", rating);
    formData.append("comment", userReview);

    try {
      if (isEditing) {
        await axios.post(
          `https://dashboard.discoverjo.com/api/user/guide-trip/update/review/${tripId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        Alert.alert("Success", "Review updated successfully.");
      } else {
        await axios.post(
          `https://dashboard.discoverjo.com/api/user/guide-trip/add/review/${tripId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        Alert.alert("Success", "Review added successfully.");
      }

      setUserReview("");
      setRating(0);
      setIsEditing(false);
      setReviewList([
        ...reviewList,
        {
          id: new Date().getTime(),
          username: "You",
          comment: userReview,
          rating,
          avatar: "https://dashboard.discoverjo.com//media/default-avatar.png",
          created_at: "Just now",
          review_likes: { total_likes: 0 },
          review_dislikes: { total_disliked: 0 },
        },
      ]);
    } catch (error) {
      console.error("Error adding/updating review:", error);
      Alert.alert("Error", "Failed to add/update review.");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(
        `https://dashboard.discoverjo.com/api/user/guide-trip/delete/review/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      setReviewList(reviewList.filter((review) => review.id !== reviewId));
      Alert.alert("Success", "Review deleted successfully.");
    } catch (error) {
      console.error("Error deleting review:", error);
      Alert.alert("Error", "Failed to delete review.");
    }
  };

  const handleLikeDislikeReview = async (reviewId, type) => {
    try {
      await axios.post(
        `https://dashboard.discoverjo.com/api/user/guide-trip/review/${type}/${reviewId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      Alert.alert(
        "Success",
        `${type === "like" ? "Liked" : "Disliked"} review.`
      );
    } catch (error) {
      console.error(`Error ${type}ing review:`, error);
      Alert.alert("Error", `Failed to ${type} review.`);
    }
  };

  const handleEditReview = (review) => {
    setUserReview(review.comment);
    setRating(review.rating);
    setIsEditing(true);
    setEditingReviewId(review.id);
  };

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.date}>{item.created_at}</Text>
        </View>
        <Text style={styles.rating}>{"★".repeat(item.rating)}</Text>
      </View>
      <Text style={styles.comment}>{item.comment}</Text>
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => handleLikeDislikeReview(item.id, "like")}
        >
          <Text>👍 {item.review_likes.total_likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleLikeDislikeReview(item.id, "dislike")}
        >
          <Text>👎 {item.review_dislikes.total_disliked}</Text>
        </TouchableOpacity>
        {item.username === "You" && (
          <>
            <TouchableOpacity onPress={() => handleEditReview(item)}>
              <Text>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteReview(item.id)}>
              <Text>Delete</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={reviewList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderReviewItem}
        contentContainerStyle={styles.reviewList}
      />

      <View style={styles.addReviewSection}>
        <Text style={styles.addReviewTitle}>
          {isEditing ? "Edit Your Review" : "Add a Review"}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Type your comment..."
          value={userReview}
          onChangeText={setUserReview}
        />
        <View style={styles.ratingInput}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => setRating(star)}
              style={styles.starButton}
            >
              <Text style={{ color: star <= rating ? "gold" : "gray" }}>★</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={styles.publishButton}
          onPress={handleAddOrUpdateReview}
        >
          <Text style={styles.publishButtonText}>
            {isEditing ? "Update" : "Publish"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GuideTripReview;

const styles = StyleSheet.create({
  container: {
    padding: wp("5%"),
    backgroundColor: COLORS.white,
    borderRadius: SIZES.base,
  },
  reviewItem: {
    marginBottom: hp("2%"),
    padding: wp("4%"),
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.base,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: wp("10%"),
    height: wp("10%"),
    borderRadius: wp("5%"),
    marginRight: wp("3%"),
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: TEXT.medium,
    fontWeight: "bold",
  },
  date: {
    fontSize: TEXT.small,
    color: COLORS.gray,
  },
  rating: {
    fontSize: TEXT.medium,
    color: "gold",
  },
  comment: {
    marginVertical: hp("1%"),
    fontSize: TEXT.small,
    color: COLORS.dark,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  addReviewSection: {
    marginTop: hp("3%"),
    padding: wp("4%"),
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.base,
  },
  addReviewTitle: {
    fontSize: TEXT.medium,
    fontWeight: "bold",
    marginBottom: hp("1%"),
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: SIZES.base,
    padding: wp("3%"),
    marginBottom: hp("1%"),
  },
  ratingInput: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: hp("2%"),
  },
  starButton: {
    padding: wp("1%"),
  },
  publishButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: hp("1.5%"),
    borderRadius: SIZES.base,
    alignItems: "center",
  },
  publishButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
});

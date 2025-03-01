import React, { useState, useEffect, useContext } from "react";
import {
  View,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  Text,
} from "react-native";
import addIcon from "../../../assets/images/icons/message-add.png";
import editIcon from "../../../assets/images/icons/edit-text.png";
import deleteIcon from "../../../assets/images/icons/close.png";
import downArrowIcon from "../../../assets/images/icons/down-arrow.png";
import ReusableText from "../../Reusable/ReusableText";
import ReusableBtn from "../../Buttons/ReusableBtn";
import {
  addReview,
  editReview,
  deleteReview,
} from "../../../hook/trip/fetchTripsReview";
import styles from "./DetailsReviewStyles";
import FiveStar from "../../Reusable/FiveStar";
import { COLORS, TEXT } from "../../../constants/theme";
import { AuthContext } from "../../../store/auth-context";
import { ReviewContext } from "../../../store/context/ReviewContext";
import { getUserProfile } from "../../../util/auth";

const DetailsReview = ({ placeId, token, reviewsData }) => {
  const { addReviewToContext, editReviewInContext, deleteReviewFromContext } =
    useContext(ReviewContext);
  const [showAddReview, setShowAddReview] = useState(false);
  const [showReviews, setShowReviews] = useState(true);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState(reviewsData || []);
  const [username, setUsername] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [editingReview, setEditingReview] = useState(null);
  const authCtx = useContext(AuthContext);

  // Fetch user details for review
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const profileData = await getUserProfile(authCtx.token);
        setUsername(profileData?.data?.username || "Anonymous User");
        setUserAvatar(profileData?.data?.avatar || null);
      } catch (error) {
        console.error("Error fetching user data:", error);
        Alert.alert("Error", "Could not fetch user data.");
      }
    };

    fetchUserData();
  }, [authCtx.token]);

  // Add a new review
  const handleAddReview = async () => {
    if (!rating || !comment.trim()) {
      Alert.alert("Error", "Please provide a rating and comment.");
      return;
    }

    try {
      const newReview = await addReview(placeId, token, rating, comment);
      setReviews((prevReviews) => [newReview, ...prevReviews]); // Update UI
      addReviewToContext(placeId, newReview);
      setShowAddReview(false);
      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Error adding review:", error);
      Alert.alert("Error", "Failed to add review. Please try again.");
    }
  };

  // Edit a review
  const handleEditReview = async () => {
    if (!editingReview || !comment.trim()) return;

    try {
      await editReview(editingReview.id, token, comment);
      setReviews((prev) =>
        prev.map((review) =>
          review.id === editingReview.id
            ? { ...review, comment, rating }
            : review
        )
      );
      editReviewInContext(placeId, editingReview.id, comment, rating);
      setEditingReview(null);
      setComment("");
      setRating(0);
    } catch (error) {
      console.error("Error editing review:", error);
      Alert.alert("Error", "Failed to edit review.");
    }
  };

  // Delete a review
  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId, token);
      setReviews((prev) => prev.filter((review) => review.id !== reviewId));
      deleteReviewFromContext(placeId, reviewId);
    } catch (error) {
      console.error("Error deleting review:", error);
      Alert.alert("Error", "Failed to delete review.");
    }
  };

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewHeader}>
        <View style={styles.profileDetailsWrapper}>
          <Image
            source={
              item.avatar
                ? { uri: item.avatar }
                : require("../../../assets/images/icons/usernametrip.png")
            }
            style={styles.reviewAvatar}
          />
          <View style={styles.profileDetails}>
            <ReusableText
              text={item.username || "Anonymous User"}
              family="semiBold"
              size={TEXT.large}
              color={COLORS.black}
            />
            <ReusableText
              text={item.created_at || "Just now"}
              family="semiBold"
              size={TEXT.small}
              color={COLORS.lightGrey}
              style={styles.createdAt}
            />
          </View>
        </View>
        {item.username === username && (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              onPress={() => {
                setEditingReview(item);
                setComment(item.comment);
                setRating(item.rating);
                setShowAddReview(true);
              }}
            >
              <Image source={editIcon} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteReview(item.id)}>
              <Image source={deleteIcon} style={styles.icon} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.reviewRating}>
        <FiveStar rating={item.rating || 0} />
      </View>
      <View>
        <ReusableText
          text={item.comment || "No review provided."}
          family="Medium"
          size={TEXT.medium}
          color={COLORS.black}
          style={styles.comment}
        />
      </View>
      <View style={styles.divider} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ReusableText
          text="Reviewers' Recommendations"
          family="Bold"
          size={TEXT.large}
          color={COLORS.dark}
          align="left"
          width="50%"
          style={styles.textContainer}
        />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => {
              setShowAddReview(true);
              setEditingReview(null);
              setComment("");
              setRating(0);
            }}
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
          <View style={styles.addHeader}>
            <View style={styles.userInfo}>
              <Image
                source={
                  userAvatar
                    ? { uri: userAvatar }
                    : require("../../../assets/images/icons/usernametrip.png")
                }
                style={styles.avatar}
              />
              <Text style={styles.userName}>{username}</Text>
            </View>
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
          </View>
          <TextInput
            placeholder="Type your comment..."
            style={styles.inputWrapper}
            placeholderTextColor={COLORS.gray}
            multiline
            value={comment}
            onChangeText={setComment}
          />
          <ReusableBtn
            btnText={editingReview ? "UPDATE" : "PUBLISH"}
            backgroundColor={COLORS.primary}
            width={90}
            height={6}
            borderColor={COLORS.primary}
            borderWidth={0}
            textColor={COLORS.black}
            onPress={editingReview ? handleEditReview : handleAddReview}
          />
        </View>
      )}

      {showReviews && (
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderReviewItem}
        />
      )}
    </View>
  );
};

export default DetailsReview;

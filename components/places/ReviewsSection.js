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
import addIcon from "../../assets/images/icons/message-add.png";
import downArrowIcon from "../../assets/images/icons/down-arrow.png";
import { getUserProfile } from "../../util/auth";
import ReusableText from "../Reusable/ReusableText";
import ReusableBtn from "../Buttons/ReusableBtn";
import {
  addReview,
  editReview,
  deleteReview,
} from "../../hook/places/fetchReview";
import styles from "./ReviewsSectionStyles";
import FiveStar from "../Reusable/FiveStar";
import { COLORS, TEXT } from "../../constants/theme";
import { AuthContext } from "../../store/auth-context";
import { ReviewContext } from "../../store/context/ReviewContext";

const ReviewsSection = ({ placeId, token, reviewsData }) => {
  const { addReviewToContext, editReviewInContext, deleteReviewFromContext } =
    useContext(ReviewContext);
  const [showAddReview, setShowAddReview] = useState(false);
  const [showReviews, setShowReviews] = useState(true);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState(reviewsData || []);
  const [username, setUsername] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const authCtx = useContext(AuthContext);

  // Fetch user details for the review
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

  // Handle adding a new review
  const handleAddReview = async () => {
    if (!rating || !comment.trim()) {
      Alert.alert("Error", "Please provide a rating and comment.");
      return;
    }

    try {
      // Call API to add the review
      const newReview = await addReview(placeId, token, rating, comment);

      // Update the local reviews list and context
      setReviews((prevReviews) => [newReview, ...prevReviews]);
      addReviewToContext(placeId, newReview);

      // Reset the form
      setShowAddReview(false);
      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Error adding review:", error);
      Alert.alert("Error", "Failed to add review. Please try again.");
    }
  };

  // Render each review item
  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewHeader}>
        <View style={styles.profileDetailsWrapper}>
          <Image
            source={
              item.avatar
                ? { uri: item.avatar }
                : require("../../assets/images/icons/usernametrip.png")
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
      {/* Header Section */}
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

      {/* Add Review Section */}
      {showAddReview && (
        <View style={styles.addReviewContainer}>
          <View style={styles.addHeader}>
            <View style={styles.userInfo}>
              <Image
                source={
                  userAvatar
                    ? { uri: userAvatar }
                    : require("../../assets/images/icons/usernametrip.png")
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
            btnText="PUBLISH"
            backgroundColor={COLORS.primary}
            width={90}
            height={6}
            borderColor={COLORS.primary}
            borderWidth={0}
            textColor={COLORS.black}
            onPress={handleAddReview}
          />
        </View>
      )}

      {/* Reviews List Section */}
      {showReviews &&
        (reviews.length > 0 ? (
          <FlatList
            data={reviews}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderReviewItem}
          />
        ) : (
          <View style={styles.noReviewsContainer}>
            <ReusableText
              text="No reviews yet. Be the first to add one!"
              family="Medium"
              size={TEXT.medium}
              color={COLORS.lightGrey}
              align="center"
            />
          </View>
        ))}
    </View>
  );
};

export default ReviewsSection;

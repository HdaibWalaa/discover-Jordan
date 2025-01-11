import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import styles from "./GuideTripReviewStyles";
import { COLORS } from "../../../../constants/theme";
import likeIcon from "../../../../assets/images/icons/like.png";
import likeActiveIcon from "../../../../assets/images/icons/like(active).png";
import dislikeIcon from "../../../../assets/images/icons/like.png";
import dislikeActiveIcon from "../../../../assets/images/icons/like(active).png";

const ReviewList = ({ reviews, handleLikeDislikeReview }) => {
  const [likedReviews, setLikedReviews] = useState({});
  const [dislikedReviews, setDislikedReviews] = useState({});

  const toggleLike = (reviewId) => {
    const newLikeStatus = !likedReviews[reviewId];
    setLikedReviews((prev) => ({
      ...prev,
      [reviewId]: newLikeStatus,
    }));

    if (dislikedReviews[reviewId]) {
      setDislikedReviews((prev) => ({
        ...prev,
        [reviewId]: false,
      }));
    }

    handleLikeDislikeReview(reviewId, "like", newLikeStatus);
  };

  const toggleDislike = (reviewId) => {
    const newDislikeStatus = !dislikedReviews[reviewId];
    setDislikedReviews((prev) => ({
      ...prev,
      [reviewId]: newDislikeStatus,
    }));

    if (likedReviews[reviewId]) {
      setLikedReviews((prev) => ({
        ...prev,
        [reviewId]: false,
      }));
    }

    handleLikeDislikeReview(reviewId, "dislike", newDislikeStatus);
  };

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewItem}>
      {/* Header Section */}
      <View style={styles.reviewHeader}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.date}>{item.created_at}</Text>
        </View>

        {/* Star Rating Section */}
        <View style={styles.ratingStars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Text
              key={star}
              style={[
                styles.star,
                { color: star <= item.rating ? "gold" : COLORS.gray },
              ]}
            >
              ★
            </Text>
          ))}
        </View>
      </View>

      {/* Comment Section */}
      <Text style={styles.comment}>{item.comment}</Text>

      {/* Actions Section */}
      <View style={styles.actions}>
        {/* Like Button */}
        <TouchableOpacity onPress={() => toggleLike(item.id)}>
          <Image
            source={likedReviews[item.id] ? likeActiveIcon : likeIcon}
            style={styles.actionIcon}
          />
          <Text style={styles.actionText}>{item.review_likes.total_likes}</Text>
        </TouchableOpacity>

        {/* Dislike Button */}
        <TouchableOpacity onPress={() => toggleDislike(item.id)}>
          <Image
            source={dislikedReviews[item.id] ? dislikeActiveIcon : dislikeIcon}
            style={[styles.actionIcon, { transform: [{ rotate: "180deg" }] }]}
          />
          <Text style={styles.actionText}>
            {item.review_dislikes.total_disliked}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderReviewItem}
      contentContainerStyle={styles.reviewList}
    />
  );
};

export default ReviewList;

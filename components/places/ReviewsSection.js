import React, { useState, useEffect, useContext } from "react";
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
import downArrowIcon from "../../assets/images/icons/down-arrow.png";
import BASE_URL from "../../hook/apiConfig";
import ReusableText from "../Reusable/ReusableText";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { AuthContext } from "../../store/auth-context";
import { getUserProfile } from "../../util/auth";
import ReusableBtn from "../Buttons/ReusableBtn";

const ReviewsSection = ({ reviews, placeId, token }) => {
  const [reviewList, setReviewList] = useState(reviews || []);
  const [showAddReview, setShowAddReview] = useState(false);
  const [showReviews, setShowReviews] = useState(true);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [username, setUsername] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const profileData = await getUserProfile(authCtx.token);
        setUsername(profileData.data.username || "Discover Jordan");
        setUserAvatar(profileData.data.avatar || null);
      } catch (error) {
        console.error("Error fetching user data:", error);
        Alert.alert("Error", "Could not fetch user data.");
      }
    };

    fetchUserData();
  }, [authCtx.token]);

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

  const renderStars = () => (
    <View style={styles.ratingContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => setRating(star)}
          style={styles.starButton}
        >
          <Text style={[styles.star, rating >= star && styles.filledStar]}>
            ★
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ReusableText
          text={"Reviewers' Recommendations"}
          family={"Bold"}
          size={TEXT.large}
          color={COLORS.dark}
          align={"left"}
          width={"50%"}
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
            {renderStars()}
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Type your comment..."
              style={styles.commentBox}
              placeholderTextColor={COLORS.gray}
              multiline
              value={comment}
              onChangeText={setComment}
            />
          </View>
          <ReusableBtn
            btnText={"PUBLISH"}
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

      {showReviews && (
        <FlatList
          data={reviewList}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : index.toString()
          }
          renderItem={({ item }) => (
            <View style={styles.reviewContainer}>
              <View style={styles.header}>
                <Image
                  source={
                    item.avatar
                      ? { uri: item.avatar }
                      : require("../../assets/images/icons/usernametrip.png")
                  }
                  style={styles.avatar}
                />
                <Text style={styles.username}>
                  {item.username || "Anonymous"}
                </Text>
              </View>
              <Text style={styles.comment}>{item.comment}</Text>
              <Text style={styles.rating}>Rating: {item.rating}/5</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.medium,
    paddingHorizontal: wp("5%"),
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    marginTop: SIZES.medium,
  },
  addHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SIZES.small,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: SIZES.small,
  },
  userName: {
    fontSize: TEXT.medium,
    fontFamily: "SemiBold",
    color: COLORS.black,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: SIZES.small,
  },
  starButton: {
    marginHorizontal: 3,
  },
  star: {
    fontSize: 25,
    color: COLORS.gray,
  },
  filledStar: {
    color: COLORS.primary,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#8D8D8D",
    borderStyle: "solid",
    paddingVertical: SIZES.small,
    marginBottom: SIZES.medium,
  },
  reviewContainer: {
    marginBottom: SIZES.medium,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SIZES.small,
  },
  username: {
    fontSize: TEXT.medium,
    fontFamily: "SemiBold",
    color: COLORS.black,
  },
  comment: {
    fontSize: TEXT.small,
    color: COLORS.gray,
  },
  rating: {
    fontSize: TEXT.small,
    color: COLORS.secondary,
  },
});

export default ReviewsSection;

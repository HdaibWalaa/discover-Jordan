import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import useFetchGuideTrip from "../../hook/trip/useFetchGuideTrip";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "../../hook/apiConfig";

const GuideTripDetails = ({ route }) => {
  const { tripId } = route.params;
  const { GuideTripDetails, isLoading, error } = useFetchGuideTrip(tripId);

  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    // Fetch token from AsyncStorage
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      setToken(storedToken);
    };
    fetchToken();
  }, []);

  // Add review
  const handleAddReview = async () => {
    if (!rating || !comment) {
      Alert.alert("Error", "Please provide both rating and comment.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("rating", parseInt(rating, 10)); // Ensure rating is a number
      formData.append("comment", comment);

      console.log("Submitting review:", {
        rating: parseInt(rating, 10),
        comment,
      });

      const response = await axios.post(
        `${BASE_URL}/user/guide-trip/add/review/${tripId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      Alert.alert("Success", "Review added successfully!");
      setReviews([...reviews, { id: response.data.id, rating, comment }]); // Update reviews list locally
      setRating("");
      setComment("");
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        Alert.alert(
          "Error",
          error.response.data.message || "Failed to add review."
        );
      } else {
        console.error("Error adding review:", error);
        Alert.alert("Error", "Failed to add review.");
      }
    }
  };

  // Delete review
  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(
        `${BASE_URL}/user/guide-trip/delete/review/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      Alert.alert("Success", "Review deleted successfully!");
      setReviews(reviews.filter((review) => review.id !== reviewId));
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        Alert.alert(
          "Error",
          error.response.data.message || "Failed to delete review."
        );
      } else {
        console.error("Error deleting review:", error);
        Alert.alert("Error", "Failed to delete review.");
      }
    }
  };

  // Like/Dislike review
  const handleLikeDislikeReview = async (reviewId, action) => {
    try {
      await axios.post(
        `${BASE_URL}/user/guide-trip/review/${action}/${reviewId}`,
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
        `${action === "like" ? "Liked" : "Disliked"} review!`
      );
    } catch (error) {
      if (error.response) {
        console.error(`Error ${action}ing review:`, error.response.data);
        Alert.alert(
          "Error",
          error.response.data.message || `Failed to ${action} review.`
        );
      } else {
        console.error(`Error ${action}ing review:`, error);
        Alert.alert("Error", `Failed to ${action} review.`);
      }
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  if (!GuideTripDetails) {
    return (
      <View style={styles.centered}>
        <Text>No trip details available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{GuideTripDetails.name}</Text>
      <Text style={styles.description}>{GuideTripDetails.description}</Text>
      <Text style={styles.info}>
        Start Date: {GuideTripDetails.start_datetime}
      </Text>
      <Text style={styles.info}>End Date: {GuideTripDetails.end_datetime}</Text>
      <Text style={styles.info}>Price: {GuideTripDetails.price} JOD</Text>
      <Text style={styles.info}>
        Max Attendance: {GuideTripDetails.max_attendance}
      </Text>
      <Text style={styles.info}>
        Guide: {GuideTripDetails.guide_username} (
        {GuideTripDetails.guide_phone_number})
      </Text>

      <Text style={styles.subtitle}>Activities:</Text>
      <FlatList
        data={GuideTripDetails.activities}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.listItem}>• {item}</Text>}
      />

      <Text style={styles.subtitle}>Reviews:</Text>
      <FlatList
        data={reviews}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.reviewItem}>
            <Text style={styles.listItem}>
              {item.rating}★ - {item.comment}
            </Text>
            <View style={styles.reviewActions}>
              <TouchableOpacity
                onPress={() => handleLikeDislikeReview(item.id, "like")}
              >
                <Text style={styles.likeButton}>Like</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleLikeDislikeReview(item.id, "dislike")}
              >
                <Text style={styles.dislikeButton}>Dislike</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteReview(item.id)}>
                <Text style={styles.deleteButton}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Text style={styles.subtitle}>Add a Review:</Text>
      <TextInput
        style={styles.input}
        placeholder="Rating (1-5)"
        keyboardType="numeric"
        value={rating}
        onChangeText={setRating}
      />
      <TextInput
        style={styles.input}
        placeholder="Comment"
        value={comment}
        onChangeText={setComment}
      />
      <Button title="Add Review" onPress={handleAddReview} />
    </View>
  );
};

export default GuideTripDetails;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "gray",
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  listItem: {
    fontSize: 16,
    marginLeft: 10,
  },
  reviewItem: {
    marginBottom: 10,
  },
  reviewActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  likeButton: {
    color: "green",
  },
  dislikeButton: {
    color: "red",
  },
  deleteButton: {
    color: "orange",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

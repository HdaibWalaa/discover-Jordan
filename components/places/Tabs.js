import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ReviewsTab = ({ reviews }) => {
  return (
    <View style={styles.container}>
      {reviews && reviews.length > 0 ? (
        reviews.map((review) => (
          <View key={review.id} style={styles.reviewContainer}>
            <Text>{review.comment}</Text>
            <Text>Rating: {review.rating}</Text>
          </View>
        ))
      ) : (
        <Text>No reviews available.</Text>
      )}
    </View>
  );
};

const PostsTab = ({ posts }) => {
  return (
    <View style={styles.container}>
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <View key={post.id} style={styles.postContainer}>
            <Text>{post.content}</Text>
          </View>
        ))
      ) : (
        <Text>No posts available.</Text>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",

  },
  reviewContainer: {
    backgroundColor: "red",
  },
  postContainer: {
    backgroundColor: "red",
  },
});

export { ReviewsTab, PostsTab };

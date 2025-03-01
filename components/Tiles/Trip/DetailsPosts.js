import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import axios from "axios";
import { COLORS, TEXT, SIZES } from "../../../constants/theme";
import BASE_URL from "../../../hook/apiConfig";

const DetailsPosts = ({ posts, token }) => {
  const [updatedPosts, setUpdatedPosts] = useState(posts);

const toggleFavorite = async (postId, isFavorite) => {
  const endpoint = isFavorite
    ? `${BASE_URL}/post/favorite/${postId}/delete`
    : `${BASE_URL}/post/favorite/${postId}`;

  console.log("Endpoint:", endpoint);
  console.log("Token:", token);

  try {
    await axios({
      method: isFavorite ? "DELETE" : "POST",
      url: endpoint,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    setUpdatedPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, favorite: !isFavorite } : post
      )
    );
  } catch (error) {
    console.error(
      "Error updating favorite status:",
      error.response?.data || error.message
    );
    Alert.alert(
      "Error",
      error.response?.data?.message || "Failed to update favorite status."
    );
  }
};


  if (!updatedPosts || updatedPosts.length === 0) {
    return <Text style={styles.emptyText}>No posts yet.</Text>;
  }

  return (
    <View>
      <FlatList
        data={updatedPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* User Info */}
            <View style={styles.userInfo}>
              <Image
                source={
                  item.user.image
                    ? { uri: item.user.image }
                    : require("../../../assets/images/icons/usernametrip.png")
                }
                style={styles.avatar}
              />
              <View style={styles.userDetails}>
                <Text style={styles.username}>{item.user.username}</Text>
                <Text style={styles.timestamp}>{item.created_at}</Text>
              </View>
              {/* Options & Favorite */}
              <View style={styles.options}>
                <TouchableOpacity
                  onPress={() => toggleFavorite(item.id, item.favorite)}
                >
                  <Image
                    source={
                      item.favorite
                        ? require("../../../assets/images/icons/heart-filled.png") // Red-filled heart icon
                        : require("../../../assets/images/icons/heart-outline.png") // Gray-outlined heart icon
                    }
                    style={styles.icon}
                  />
                </TouchableOpacity>

                {/* <TouchableOpacity>
                  <Image
                    source={require("../../assets/images/icons/more.png")}
                    style={styles.icon}
                  />
                </TouchableOpacity> */}
              </View>
            </View>

            {/* Post Title and Content */}
            <Text style={styles.postTitle}>{item.name}</Text>
            <Text style={styles.postContent}>{item.content}</Text>

            {/* Images/Carousel */}
            {item.images.length > 0 && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.carousel}
              >
                {item.images.map((image) => (
                  <Image
                    key={image.id}
                    source={{ uri: image.url }}
                    style={styles.postImage}
                  />
                ))}
              </ScrollView>
            )}

            {/* Post Actions */}
            <View style={styles.actions}>
              <TouchableOpacity style={styles.actionButton}>
                <Image
                  source={require("../../../assets/images/icons/like.png")}
                  style={styles.actionIcon}
                />
                <Text style={styles.actionText}>
                  {item.post_likes.total_likes} Likes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Image
                  source={require("../../../assets/images/icons/comment.png")}
                  style={styles.actionIcon}
                />
                <Text style={styles.actionText}>
                  {item.comments.length} Comments
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: SIZES.medium,
    marginHorizontal: SIZES.small,
    padding: SIZES.medium,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userInfo: {
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
  userDetails: {
    flex: 1,
  },
  username: {
    fontSize: TEXT.medium,
    fontFamily: "SemiBold",
    color: COLORS.black,
  },
  timestamp: {
    fontSize: TEXT.small,
    fontFamily: "Regular",
    color: COLORS.gray,
  },
  options: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: SIZES.small,
  },
  postTitle: {
    fontSize: TEXT.large,
    fontFamily: "Bold",
    color: COLORS.black,
    marginBottom: SIZES.xSmall,
  },
  postContent: {
    fontSize: TEXT.medium,
    fontFamily: "Regular",
    color: COLORS.gray,
    marginBottom: SIZES.small,
  },
  carousel: {
    marginVertical: SIZES.small,
  },
  postImage: {
    width: 300,
    height: 200,
    borderRadius: SIZES.small,
    marginRight: SIZES.small,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: SIZES.small,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionIcon: {
    width: 20,
    height: 20,
    marginRight: SIZES.xSmall,
  },
  actionText: {
    fontSize: TEXT.small,
    fontFamily: "Regular",
    color: COLORS.black,
  },
  emptyText: {
    fontSize: TEXT.medium,
    fontFamily: "Regular",
    color: COLORS.gray,
    textAlign: "center",
    marginTop: SIZES.medium,
  },
  icon: {
    width: 25, 
    height: 25, 
    right:10,
  },
});

export default DetailsPosts;
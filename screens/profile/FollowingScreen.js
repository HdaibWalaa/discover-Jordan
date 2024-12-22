import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { AuthContext } from "../../store/auth-context";
import { fetchFollowingApi } from "../../hook/followingApi"; // API function for fetching following users
import styles from "./FollowingScreenStyles"; // Style file for this screen

const FollowingScreen = () => {
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const userId = authCtx.userId;

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const responseData = await fetchFollowingApi(token, userId); // Fetch following users
        if (responseData?.data?.length > 0) {
          setFollowing(responseData.data);
        } else {
          Alert.alert("No Following", "You are not following anyone yet.");
        }
      } catch (error) {
        Alert.alert("Error", "Failed to load following users.");
      } finally {
        setLoading(false);
      }
    };
    fetchFollowing();
  }, [token, userId]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

const renderFollowing = ({ item }) => {
  const userId = item.following_id || item.follower_id; // Use follower_id if following_id is missing

  if (!userId) {
    console.warn("Missing user ID for item", item);
    return null; // Skip rendering if there's no valid user ID
  }

  return (
    <View style={styles.userContainer}>
      <Image
        source={{ uri: item.following_image || item.follower_image }}
        style={styles.avatar}
      />
      <View style={styles.info}>
        <Text style={styles.name}>
          {item.following_name || item.follower_name}
        </Text>
        <Text style={styles.posts}>{item.posts_count || 0} Posts</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
          {item.status === 1 ? "Unfollow" : "Follow"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

  return (
    <FlatList
      data={following}
      renderItem={renderFollowing}
      keyExtractor={
        (item) =>
          item.following_id
            ? item.following_id.toString()
            : String(Math.random()) // Safeguard for keyExtractor
      }
      contentContainerStyle={styles.container}
    />
  );
};

export default FollowingScreen;

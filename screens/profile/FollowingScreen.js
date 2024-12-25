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
import BASE_URL from "../../hook/apiConfig";

const FollowingScreen = () => {
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const userId = authCtx.userId;

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const responseData = await fetchFollowingApi(token, userId);
        setFollowing(responseData?.data || []);
      } catch (error) {
        Alert.alert("Error", "Failed to load following users.");
      } finally {
        setLoading(false);
      }
    };
    fetchFollowing();
  }, [token, userId]);

  const handleUnfollow = async (followingId) => {
    try {
      await axios.delete(`{BASE_URL}/follow/delete/${followingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFollowing(
        following.filter((item) => item.following_id !== followingId)
      );
      Alert.alert("Success", "Unfollowed successfully.");
    } catch (error) {
      Alert.alert("Error", "Failed to unfollow the user.");
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  const renderFollowing = ({ item }) => (
    <View style={styles.userContainer}>
      <Image source={{ uri: item.following_image }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.following_name}</Text>
        <Text style={styles.posts}>{item.posts_count || 0} Posts</Text>
      </View>
      <TouchableOpacity
        style={styles.unfollowButton}
        onPress={() => handleUnfollow(item.following_id)}
      >
        <Text style={styles.buttonText}>Unfollow</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={following}
      renderItem={renderFollowing}
      keyExtractor={(item, index) =>
        item.following_id ? item.following_id.toString() : `temp-${index}`
      } // Use index as a fallback key
      contentContainerStyle={styles.container}
    />
  );
};

export default FollowingScreen;



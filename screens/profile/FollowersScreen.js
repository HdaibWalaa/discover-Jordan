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
import { fetchFollowersApi } from "../../hook/followersApi";
import axios from "axios";
import styles from "./FollowingScreenStyles"; 

const FollowersScreen = () => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const userId = authCtx.userId;

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const responseData = await fetchFollowersApi(token, userId);
        setFollowers(responseData?.data || []);
      } catch (error) {
        Alert.alert("Error", "Failed to load followers.");
      } finally {
        setLoading(false);
      }
    };
    fetchFollowers();
  }, [token, userId]);

  const handleFollow = async (followerId) => {
    try {
      await axios.post(
        "https://dashboard.rehletna-jo.com/api/follow/create",
        { following_id: followerId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Alert.alert("Success", "You are now following this user.");
    } catch (error) {
      Alert.alert("Error", "Failed to follow the user.");
    }
  };

  const handleDelete = async (followerId) => {
    try {
      await axios.delete(
        `https://joureny.zaytunatreasures.com/api/follow/delete/${followerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFollowers(followers.filter((item) => item.follower_id !== followerId));
      Alert.alert("Success", "Follower removed.");
    } catch (error) {
      Alert.alert("Error", "Failed to remove the follower.");
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  const renderFollower = ({ item }) => (
    <View style={styles.userContainer}>
      <Image source={{ uri: item.follower_image }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.follower_name}</Text>
        <Text style={styles.posts}>{item.posts_count || 0} Posts</Text>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.followButton}
          onPress={() => handleFollow(item.follower_id)}
        >
          <Text style={styles.buttonText}>Follow</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.follower_id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={followers}
      renderItem={renderFollower}
      keyExtractor={(item) => item.follower_id.toString()}
      contentContainerStyle={styles.container}
    />
  );
};

export default FollowersScreen;

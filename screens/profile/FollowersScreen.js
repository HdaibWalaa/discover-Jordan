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
import styles from "./FollowingScreenStyles"; // Create your own style file for this screen

const FollowersScreen = () => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const userId = authCtx.userId;

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const responseData = await fetchFollowersApi(token, userId); // Fetch followers
        if (responseData?.data?.length > 0) {
          setFollowers(responseData.data);
        } else {
          Alert.alert("No Followers", "You have no followers yet.");
        }
      } catch (error) {
        Alert.alert("Error", "Failed to load followers.");
      } finally {
        setLoading(false);
      }
    };
    fetchFollowers();
  }, [token, userId]);

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
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Follow</Text>
      </TouchableOpacity>
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

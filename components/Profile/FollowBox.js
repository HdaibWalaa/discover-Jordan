import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { AuthContext } from "../../store/auth-context";
import { getFollowers, getFollowings } from "../../hook/fetchFollow";
import FollowListModal from "./FollowListModa";

const FollowBox = ({ profile }) => {
  const authCtx = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalData, setModalData] = useState([]);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    fetchFollowerCount();
    fetchFollowingCount();
  }, []);

  const fetchFollowerCount = async () => {
    try {
      const response = await getFollowers(authCtx.token, profile.id);
      setFollowerCount(response.data.length);
    } catch (error) {
      Alert.alert("Error", "An error occurred while fetching the followers.");
    }
  };

  const fetchFollowingCount = async () => {
    try {
      const response = await getFollowings(authCtx.token, profile.id);
      setFollowingCount(response.data.length);
    } catch (error) {
      Alert.alert("Error", "An error occurred while fetching the followings.");
    }
  };

  const fetchFollowers = async () => {
    try {
      const response = await getFollowers(authCtx.token, profile.id);
      setModalTitle("Followers");
      setModalData(
        response.data.map((follower) => ({
          id: follower.follower_id,
          name: follower.follower_name,
          avatar:
            follower.follower_image ||
            "https://example.com/path/to/default/avatar.jpg",
          posts: follower.posts || 0,
        }))
      );
      setModalVisible(true);
    } catch (error) {
      Alert.alert("Error", "An error occurred while fetching the followers.");
    }
  };

  const fetchFollowings = async () => {
    try {
      const response = await getFollowings(authCtx.token, profile.id);
      setModalTitle("Following");
      setModalData(
        response.data.map((following) => ({
          id: following.follower_id,
          name: following.follower_name,
          avatar:
            following.follower_image ||
            "https://example.com/path/to/default/avatar.jpg",
          posts: following.posts || 0,
        }))
      );
      setModalVisible(true);
    } catch (error) {
      Alert.alert("Error", "An error occurred while fetching the followings.");
    }
  };

  return (
    <View style={styles.followContainer}>
      <TouchableOpacity style={styles.followBox} onPress={fetchFollowers}>
        <Text style={styles.followCount}>{followerCount}</Text>
        <Text style={styles.followLabel}>Followers</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.followBox} onPress={fetchFollowings}>
        <Text style={styles.followCount}>{followingCount}</Text>
        <Text style={styles.followLabel}>Following</Text>
      </TouchableOpacity>
      <FollowListModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        data={modalData}
        title={modalTitle}
      />
    </View>
  );
};

export default FollowBox;

const styles = StyleSheet.create({
  followContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  followBox: {
    alignItems: "center",
  },
  followCount: {
    fontSize: 24,
    fontWeight: "bold",
  },
  followLabel: {
    fontSize: 16,
    color: "gray",
  },
});

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import { FancyAlert } from "react-native-expo-fancy-alerts";
import axios from "axios";
import { COLORS } from "../../constants/theme";
import styles from "./followersModal.style";
import BASE_URL from "../../hook/apiConfig";

const FollowersModal = ({ isVisible, onClose, token, userId }) => {
  const [followers, setFollowers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Fetch followers
  const fetchFollowers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${BASE_URL}/follow/followers/requests/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 && response.data.data) {
        setFollowers(response.data.data);
      } else {
        setFollowers([]);
        Alert.alert("Info", "No followers found.");
      }
    } catch (error) {
      console.error("Error fetching followers:", error);
      Alert.alert(
        "Error",
        error.response?.data?.msg ||
          "An error occurred while fetching followers."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Accept follow request
  const handleAcceptRequest = async (followerId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/follow/accept/following-request/${followerId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setAlertMessage("Follow request accepted.");
        setAlertVisible(true);
        setFollowers((prev) =>
          prev.filter((follower) => follower.follower_id !== followerId)
        );
      }
    } catch (error) {
      console.error("Error accepting request:", error);
      Alert.alert("Error", "Failed to accept follow request.");
    }
  };

  // Reject follow request
  const handleRejectRequest = async (followerId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/follow/unaccepted/following-request/${followerId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setAlertMessage("Follow request rejected.");
        setAlertVisible(true);
        setFollowers((prev) =>
          prev.filter((follower) => follower.follower_id !== followerId)
        );
      }
    } catch (error) {
      console.error("Error rejecting request:", error);
      Alert.alert("Error", "Failed to reject follow request.");
    }
  };

  useEffect(() => {
    if (isVisible) {
      fetchFollowers();
    }
  }, [isVisible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Followers</Text>
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : followers.length > 0 ? (
            followers.map((follower) => (
              <View key={follower.follower_id} style={styles.followerItem}>
                <Image
                  source={{
                    uri:
                      follower.follower_image ||
                      "https://via.placeholder.com/50",
                  }}
                  style={styles.followerImage}
                />
                <Text style={styles.followerName}>
                  {follower.follower_name}
                </Text>
                <View style={styles.actions}>
                  <TouchableOpacity
                    style={styles.acceptButton}
                    onPress={() => handleAcceptRequest(follower.follower_id)}
                  >
                    <Text style={styles.buttonText}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.rejectButton}
                    onPress={() => handleRejectRequest(follower.follower_id)}
                  >
                    <Text style={styles.buttonText}>Reject</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <Text style={{ marginTop: 20 }}>No followers found.</Text>
          )}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Fancy Alert */}
      <FancyAlert
        visible={alertVisible}
        icon={
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: COLORS.primary,
              borderRadius: 50,
              width: "100%",
            }}
          >
            <Text style={{ color: "white", fontSize: 24 }}>🎉</Text>
          </View>
        }
        style={{ backgroundColor: "white" }}
      >
        <Text style={{ marginTop: -16, marginBottom: 32, textAlign: "center" }}>
          {alertMessage}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.primary,
            padding: 10,
            borderRadius: 5,
            marginTop: 10,
          }}
          onPress={() => setAlertVisible(false)}
        >
          <Text style={{ color: "white", fontSize: 16 }}>OK</Text>
        </TouchableOpacity>
      </FancyAlert>
    </Modal>
  );
};

export default FollowersModal;

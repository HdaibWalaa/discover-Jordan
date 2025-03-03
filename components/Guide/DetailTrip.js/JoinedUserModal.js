import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import { COLORS, TEXT, SIZES } from "../../../constants/theme";
import { AuthContext } from "../../../store/auth-context";
import BASE_URL from "../../../hook/apiConfig";
import ReusableText from "../../Reusable/ReusableText";

const JoinedUserModal = ({ isVisible, onClose, tripId }) => {
  const [joinRequests, setJoinRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingId, setProcessingId] = useState(null); // To track which request is being processed
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (isVisible && tripId) {
      fetchJoinRequests();
    }
  }, [isVisible, tripId]);

  const fetchJoinRequests = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${BASE_URL}/guide/join/requests/list/${tripId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-API-KEY": "DISCOVERJO91427",
            Accept: "application/json",
          },
          timeout: 15000, // 15 second timeout
        }
      );

      if (response.data && response.data.status === 200) {
        setJoinRequests(response.data.data);
      } else {
        throw new Error(response.data?.msg || "Failed to fetch join requests");
      }
    } catch (error) {
      console.error("Error fetching join requests:", error);

      // Provide a user-friendly error message based on the type of error
      if (error.message.includes("Network Error")) {
        setError(
          "Network connection error. Please check your internet connection."
        );
      } else if (error.code === "ECONNABORTED") {
        setError("Request timed out. The server took too long to respond.");
      } else if (error.response?.status === 401) {
        setError("Authentication error. Please log in again.");
      } else if (error.response?.status === 403) {
        setError("You don't have permission to view this data.");
      } else if (error.response?.status === 404) {
        setError("The requested data could not be found.");
      } else if (error.response?.status >= 500) {
        setError("Server error. Please try again later.");
      } else {
        setError(error.message || "An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (requestId, newStatus) => {
    // Don't allow updating requests that are already approved or rejected
    const request = joinRequests.find((req) => req.id === requestId);
    if (request && request.status !== 0) {
      Alert.alert("Cannot Update", "This request has already been processed.", [
        { text: "OK" },
      ]);
      return;
    }

    setProcessingId(requestId);

    try {
      // Determine the correct endpoint based on the new status
      let endpoint;
      if (newStatus === 1) {
        // Approve/confirm request
        endpoint = `${BASE_URL}/guide/change/join/request/confirmed/${requestId}`;
      } else if (newStatus === 2) {
        // Reject/cancel request
        endpoint = `${BASE_URL}/guide/change/join/request/canceled/${requestId}`;
      } else {
        throw new Error("Invalid status");
      }

      // Use PUT method as specified in the API documentation
      const response = await axios.put(
        endpoint,
        {}, // Empty body as we're just changing status
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-API-KEY": "DISCOVERJO91427",
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          timeout: 10000, // 10 second timeout
        }
      );

      if (response.data && response.data.status === 200) {
        // Update the local state to reflect the change
        setJoinRequests((prevRequests) =>
          prevRequests.map((req) =>
            req.id === requestId ? { ...req, status: newStatus } : req
          )
        );

        Alert.alert(
          "Success",
          `Request has been ${newStatus === 1 ? "approved" : "rejected"}.`,
          [{ text: "OK" }]
        );
      } else {
        throw new Error(
          response.data?.msg || "Failed to update request status"
        );
      }
    } catch (error) {
      console.error("Error updating request status:", error);

      let errorMessage = "Failed to update request status";

      if (error.message.includes("Network Error")) {
        errorMessage =
          "Network connection error. Please check your internet connection.";
      } else if (error.code === "ECONNABORTED") {
        errorMessage =
          "Request timed out. The server took too long to respond.";
      } else if (error.response?.data?.msg) {
        errorMessage = error.response.data.msg;
      }

      Alert.alert("Error", errorMessage, [{ text: "OK" }]);
    } finally {
      setProcessingId(null);
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return "Pending";
      case 1:
        return "Approved";
      case 2:
        return "Rejected";
      default:
        return "Unknown";
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.userItem}>
      <View style={styles.userInfo}>
        <ReusableText
          text={`${item.first_name} ${item.last_name}`}
          family="Medium"
          size={TEXT.medium}
          color={COLORS.dark}
        />
        <ReusableText
          text={`Age: ${item.age}`}
          family="Regular"
          size={TEXT.small}
          color={COLORS.gray}
        />
        <ReusableText
          text={`Phone: ${item.phone_number}`}
          family="Regular"
          size={TEXT.small}
          color={COLORS.gray}
        />
      </View>

      <View style={styles.actionContainer}>
        {/* Status badge */}
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                item.status === 0
                  ? COLORS.amber
                  : item.status === 1
                  ? COLORS.green
                  : COLORS.red,
            },
          ]}
        >
          <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
        </View>

        {/* Only show action buttons for pending requests */}
        {item.status === 0 && (
          <View style={styles.actionButtons}>
            {processingId === item.id ? (
              <ActivityIndicator size="small" color={COLORS.primary} />
            ) : (
              <>
                <TouchableOpacity
                  style={[styles.actionButton, styles.approveButton]}
                  onPress={() => handleUpdateStatus(item.id, 1)}
                >
                  <Text style={styles.actionButtonText}>✓</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.rejectButton]}
                  onPress={() => handleUpdateStatus(item.id, 2)}
                >
                  <Text style={styles.actionButtonText}>✗</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
      </View>
    </View>
  );

  const renderErrorView = () => (
    <View style={styles.centered}>
      <ReusableText
        text={error}
        family="Regular"
        size={TEXT.small}
        color={COLORS.red}
      />
      <TouchableOpacity
        style={[styles.refreshButton, { marginTop: 20 }]}
        onPress={fetchJoinRequests}
      >
        <Text style={styles.refreshButtonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <ReusableText
              text="Join Requests"
              family="Medium"
              size={TEXT.large}
              color={COLORS.dark}
            />
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <View style={styles.centered}>
              <ActivityIndicator size="large" color={COLORS.primary} />
              <ReusableText
                text="Loading join requests..."
                family="Regular"
                size={TEXT.small}
                color={COLORS.gray}
                style={{ marginTop: 10 }}
              />
            </View>
          ) : error ? (
            renderErrorView()
          ) : joinRequests.length === 0 ? (
            <View style={styles.centered}>
              <ReusableText
                text="No join requests found"
                family="Regular"
                size={TEXT.small}
                color={COLORS.gray}
              />
            </View>
          ) : (
            <FlatList
              data={joinRequests}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.list}
              showsVerticalScrollIndicator={false}
            />
          )}

          {!loading && !error && joinRequests.length > 0 && (
            <TouchableOpacity
              style={styles.refreshButton}
              onPress={fetchJoinRequests}
            >
              <Text style={styles.refreshButtonText}>Refresh</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: wp("90%"),
    maxHeight: hp("70%"),
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    paddingHorizontal: wp("5%"),
    paddingVertical: hp("3%"),
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp("2%"),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    paddingBottom: hp("1%"),
  },
  closeButton: {
    width: wp("8%"),
    height: wp("8%"),
    borderRadius: wp("4%"),
    backgroundColor: COLORS.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 24,
    color: COLORS.dark,
    fontWeight: "bold",
  },
  centered: {
    paddingVertical: hp("10%"),
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    paddingBottom: hp("2%"),
  },
  userItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: hp("1.5%"),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  userInfo: {
    flex: 1,
  },
  actionContainer: {
    alignItems: "flex-end",
  },
  statusBadge: {
    paddingHorizontal: wp("3%"),
    paddingVertical: hp("0.5%"),
    borderRadius: SIZES.radius,
    marginBottom: hp("1%"),
  },
  statusText: {
    color: COLORS.white,
    fontFamily: "Medium",
    fontSize: TEXT.small,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 5,
  },
  actionButton: {
    width: wp("8%"),
    height: wp("8%"),
    borderRadius: wp("4%"),
    justifyContent: "center",
    alignItems: "center",
  },
  approveButton: {
    backgroundColor: COLORS.green,
  },
  rejectButton: {
    backgroundColor: COLORS.red,
  },
  actionButtonText: {
    color: COLORS.white,
    fontFamily: "Bold",
    fontSize: TEXT.medium,
  },
  refreshButton: {
    marginTop: hp("2%"),
    backgroundColor: COLORS.primary,
    paddingVertical: hp("1%"),
    paddingHorizontal: wp("4%"),
    borderRadius: SIZES.radius,
    alignSelf: "center",
  },
  refreshButtonText: {
    color: COLORS.white,
    fontFamily: "Medium",
    fontSize: TEXT.small,
  },
});

export default JoinedUserModal;

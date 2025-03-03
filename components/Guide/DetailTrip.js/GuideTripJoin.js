import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import TripJoinForm from "./TripJoinForm";
import { COLORS, TEXT, SIZES } from "../../../constants/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  fetchGuideTripSubscribers,
  deleteGuideTripSubscriber,
  updateGuideTripSubscribers,
} from "../../../hook/trip/fetchGuidTripUser";
import { BASE_URL } from "../../../hook/PostApi";

const GuideTripJoin = ({ trip, token }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [subscribersModalVisible, setSubscribersModalVisible] = useState(false);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasJoined, setHasJoined] = useState(false);
  const [checkingJoinStatus, setCheckingJoinStatus] = useState(true);

  // Check if the user has already joined this trip
  useEffect(() => {
    checkJoinStatus();
  }, [trip.id]);

  const checkJoinStatus = async () => {
    setCheckingJoinStatus(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/user/guide-trip/check-joined/${trip.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "X-API-KEY": "DISCOVERJO91427",
          },
        }
      );

      // Response should indicate if the user has joined this trip
      setHasJoined(response.data.has_joined === true);
      console.log(
        `User has ${response.data.has_joined ? "" : "not "}joined trip ${
          trip.id
        }`
      );
    } catch (error) {
      console.log("Error checking join status:", error);
      // If we can't determine, assume not joined
      setHasJoined(false);
    } finally {
      setCheckingJoinStatus(false);
    }
  };

  const handleJoinSuccess = () => {
    Alert.alert("Success", "You have successfully joined the trip.");
    setModalVisible(false);
    setHasJoined(true); // Update state to show subscribers button
  };

  const fetchSubscribers = async () => {
    if (!hasJoined) {
      Alert.alert(
        "Not Joined",
        "You need to join this trip first to see subscribers.",
        [{ text: "OK" }]
      );
      return;
    }

    setLoading(true);
    setError(null);
    try {
      console.log(`Fetching subscribers for trip ID: ${trip.id}`);

      const fetchedSubscribers = await fetchGuideTripSubscribers(
        trip.id,
        token
      );

      console.log(
        `Successfully fetched ${fetchedSubscribers?.length || 0} subscribers`
      );
      setSubscribers(fetchedSubscribers || []);
      setSubscribersModalVisible(true);
    } catch (error) {
      console.error("Error in fetchSubscribers:", error);

      // If the error is about not joining, update the hasJoined state
      if (error.message?.includes("did not join")) {
        setHasJoined(false);
        Alert.alert(
          "Not Joined",
          "You need to join this trip first to see subscribers.",
          [{ text: "OK" }]
        );
      } else {
        setError(error.message || "Failed to fetch subscribers");
        Alert.alert(
          "Error Fetching Subscribers",
          error.message ||
            "Could not retrieve subscribers. Please try again later.",
          [{ text: "OK" }]
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSubscriber = async (phoneNumber) => {
    try {
      Alert.alert(
        "Confirm Deletion",
        "Are you sure you want to delete this subscriber?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            onPress: async () => {
              setLoading(true);
              try {
                await deleteGuideTripSubscriber(trip.id, phoneNumber, token);

                // Update local state after successful deletion
                setSubscribers((prev) =>
                  prev.filter(
                    (subscriber) => subscriber.phone_number !== phoneNumber
                  )
                );

                Alert.alert("Success", "Subscriber deleted successfully.");
              } catch (error) {
                Alert.alert(
                  "Error",
                  error.message || "Failed to delete subscriber"
                );
              } finally {
                setLoading(false);
              }
            },
            style: "destructive",
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        "Error",
        error.message || "Failed to process deletion request"
      );
    }
  };

  const handleEditSubscriber = (subscriber) => {
    // Placeholder for edit functionality
    Alert.alert(
      "Edit Subscriber",
      `Edit functionality for ${subscriber.first_name} ${subscriber.last_name} is not implemented yet.`,
      [{ text: "OK" }]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.bottomSection}>
        {/* Join Trip Button - either "Join Trip" or "Joined" based on status */}
        {!hasJoined ? (
          // Not joined yet - show Join Trip button
          <TouchableOpacity
            style={[styles.joinButton, { width: wp("90%") }]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.joinButtonText}>Join Trip</Text>
          </TouchableOpacity>
        ) : (
          // Already joined - show Joined button and Subscribers button
          <>
            <TouchableOpacity
              style={[styles.joinedButton, { width: wp("70%") }]}
              onPress={() => setModalVisible(true)}
            >
              <View style={styles.joinedButtonContent}>
                <Image
                  source={require("../../../assets/images/icons/mark.png")}
                  style={styles.checkIcon}
                  resizeMode="contain"
                />
                <Text style={styles.joinedButtonText}>Joined</Text>
              </View>
            </TouchableOpacity>

            {/* View Subscribers Button - Only show if already joined */}
            <TouchableOpacity
              style={styles.directionButton}
              onPress={fetchSubscribers}
              disabled={loading}
            >
              <View style={styles.directionButtonContent}>
                {loading ? (
                  <ActivityIndicator size="small" color={COLORS.black} />
                ) : (
                  <Image
                    source={require("../../../assets/images/icons/followers.png")}
                    style={styles.icon}
                    resizeMode="contain"
                  />
                )}
              </View>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Join Trip Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Image
                source={require("../../../assets/images/icons/close.png")}
                style={styles.closeIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>

            {hasJoined ? (
              // If already joined, show a different content in modal
              <View style={styles.alreadyJoinedContainer}>
                <Image
                  source={require("../../../assets/images/icons/mark.png")}
                  style={styles.largeCheckIcon}
                  resizeMode="contain"
                />
                <Text style={styles.alreadyJoinedText}>
                  You have already joined this trip!
                </Text>
                <Text style={styles.alreadyJoinedSubtext}>
                  You can view subscribers or add more people by completing the
                  form again.
                </Text>

                <TouchableOpacity
                  style={styles.viewSubscribersButton}
                  onPress={() => {
                    setModalVisible(false);
                    fetchSubscribers();
                  }}
                >
                  <Text style={styles.viewSubscribersText}>
                    View Subscribers
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.joinButton, { marginTop: hp("2%") }]}
                  onPress={() => {
                    // Show the form anyway to add more subscribers
                    setModalVisible(false);
                    setTimeout(() => setModalVisible(true), 300);
                  }}
                >
                  <Text style={styles.joinButtonText}>Add More People</Text>
                </TouchableOpacity>
              </View>
            ) : (
              // If not joined, show the join form
              <TripJoinForm
                guideTripId={trip.id}
                token={token}
                onJoinSuccess={handleJoinSuccess}
              />
            )}
          </View>
        </View>
      </Modal>

      {/* Subscribers List Modal */}
      <Modal
        visible={subscribersModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSubscribersModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSubscribersModalVisible(false)}
            >
              <Image
                source={require("../../../assets/images/icons/close.png")}
                style={styles.closeIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Subscribers</Text>

            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={styles.loadingText}>Loading subscribers...</Text>
              </View>
            ) : error ? (
              <View style={styles.errorContainer}>
                <Image
                  source={require("../../../assets/images/icons/mark.png")}
                  style={styles.errorIcon}
                  resizeMode="contain"
                />
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity
                  style={styles.retryButton}
                  onPress={fetchSubscribers}
                >
                  <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
              </View>
            ) : subscribers.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Image
                  source={require("../../../assets/images/icons/followers.png")}
                  style={styles.emptyIcon}
                  resizeMode="contain"
                />
                <Text style={styles.emptyListText}>
                  No subscribers found for this trip.
                </Text>
              </View>
            ) : (
              <FlatList
                data={subscribers}
                keyExtractor={(item, index) =>
                  `${item.phone_number || index}-${index}`
                }
                renderItem={({ item }) => (
                  <View style={styles.subscriberItem}>
                    {/* Name */}
                    <View style={styles.subscriberDetail}>
                      <Image
                        source={require("../../../assets/images/icons/usernametrip.png")}
                        style={styles.detailIcon}
                        resizeMode="contain"
                      />
                      <Text style={styles.subscriberText}>
                        {item.first_name} {item.last_name}
                      </Text>
                    </View>

                    {/* Age */}
                    <View style={styles.subscriberDetail}>
                      <Image
                        source={require("../../../assets/images/icons/datecalender.png")}
                        style={styles.detailIcon}
                        resizeMode="contain"
                      />
                      <Text style={styles.subscriberText}>
                        {item.age} years old
                      </Text>
                    </View>

                    {/* Phone Number */}
                    <View style={styles.subscriberDetail}>
                      <Image
                        source={require("../../../assets/images/icons/telephone.png")}
                        style={styles.detailIcon}
                        resizeMode="contain"
                      />
                      <Text style={styles.subscriberText}>
                        {item.phone_number}
                      </Text>
                    </View>

                    {/* Buttons for Edit and Delete */}
                    <View style={styles.buttonGroup}>
                      <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => handleEditSubscriber(item)}
                      >
                        <Text style={styles.buttonText}>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() =>
                          handleDeleteSubscriber(item.phone_number)
                        }
                      >
                        <Text style={styles.buttonText}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                contentContainerStyle={styles.listContainer}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default GuideTripJoin;

const styles = StyleSheet.create({
  container: {
    marginTop: hp("2%"),
  },
  bottomSection: {
    flexDirection: "row",
    paddingVertical: wp(3),
    justifyContent: "center",
  },
  joinButton: {
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: COLORS.lightGrey,
    padding: hp("2%"),
    borderRadius: wp("4%"),
    alignItems: "center",
    justifyContent: "center",
    marginRight: wp(2),
    width: wp("70%"),
  },
  joinButtonText: {
    fontSize: wp("4.5%"),
    color: COLORS.black,
    fontWeight: "Medium",
  },
  joinedButton: {
    backgroundColor: COLORS.lightGreen || "#90EE90", // Light green color
    borderWidth: 2,
    borderColor: COLORS.lightGrey,
    padding: hp("2%"),
    borderRadius: wp("4%"),
    alignItems: "center",
    justifyContent: "center",
    marginRight: wp(2),
  },
  joinedButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  joinedButtonText: {
    fontSize: wp("4.5%"),
    color: COLORS.black,
    fontWeight: "Medium",
    marginLeft: wp("2%"),
  },
  checkIcon: {
    width: wp("5%"),
    height: wp("5%"),
    tintColor: COLORS.black,
  },
  directionButton: {
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: COLORS.lightGrey,
    padding: hp("2%"),
    borderRadius: wp("4%"),
    alignItems: "center",
    justifyContent: "center",
  },
  directionButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: wp("7%"),
    height: wp("7%"),
  },
  icon: {
    width: wp("7%"),
    height: wp("7%"),
    tintColor: COLORS.black,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: wp("90%"),
    padding: wp("5%"),
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small,
    position: "relative",
    maxHeight: hp("80%"),
  },
  alreadyJoinedContainer: {
    alignItems: "center",
    padding: wp("5%"),
  },
  largeCheckIcon: {
    width: wp("20%"),
    height: wp("20%"),
    tintColor: COLORS.lightGreen || "#90EE90",
    marginBottom: hp("2%"),
  },
  alreadyJoinedText: {
    fontSize: wp("5%"),
    fontFamily: "Bold",
    color: COLORS.black,
    textAlign: "center",
    marginBottom: hp("1%"),
  },
  alreadyJoinedSubtext: {
    fontSize: wp("3.5%"),
    fontFamily: "Regular",
    color: COLORS.gray,
    textAlign: "center",
    marginBottom: hp("3%"),
  },
  viewSubscribersButton: {
    backgroundColor: COLORS.primary,
    padding: hp("1.5%"),
    borderRadius: wp("4%"),
    width: wp("70%"),
    alignItems: "center",
  },
  viewSubscribersText: {
    fontSize: wp("4%"),
    color: COLORS.black,
    fontWeight: "Medium",
  },
  listContainer: {
    paddingBottom: hp("2%"),
  },
  modalTitle: {
    fontSize: TEXT.large,
    fontWeight: "bold",
    marginBottom: hp("2%"),
    textAlign: "center",
    marginTop: hp("1%"),
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: hp("4%"),
  },
  loadingText: {
    marginTop: hp("1%"),
    color: COLORS.gray,
    fontSize: TEXT.medium,
  },
  errorContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: hp("4%"),
  },
  errorIcon: {
    width: wp("15%"),
    height: wp("15%"),
    tintColor: COLORS.red,
    marginBottom: hp("2%"),
  },
  errorText: {
    textAlign: "center",
    color: COLORS.gray,
    fontSize: TEXT.medium,
    marginBottom: hp("2%"),
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: hp("1%"),
    paddingHorizontal: wp("4%"),
    borderRadius: SIZES.small,
  },
  retryButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: hp("4%"),
  },
  emptyIcon: {
    width: wp("15%"),
    height: wp("15%"),
    tintColor: COLORS.gray,
    marginBottom: hp("2%"),
  },
  emptyListText: {
    textAlign: "center",
    color: COLORS.gray,
    fontSize: TEXT.medium,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: hp("1%"),
  },
  editButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: hp("1%"),
    paddingHorizontal: wp("4%"),
    borderRadius: SIZES.small,
    marginRight: wp("2%"),
  },
  deleteButton: {
    backgroundColor: COLORS.red,
    paddingVertical: hp("1%"),
    paddingHorizontal: wp("2%"),
    borderRadius: SIZES.small,
  },
  buttonText: {
    color: COLORS.white,
    fontFamily: "Bold",
    fontSize: TEXT.small,
  },
  closeButton: {
    position: "absolute",
    top: wp("2%"),
    right: wp("2%"),
    padding: wp("2%"),
    zIndex: 1,
  },
  closeIcon: {
    width: wp("5%"),
    height: wp("5%"),
    tintColor: COLORS.black,
  },
  subscriberDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("1%"),
  },
  subscriberText: {
    fontSize: TEXT.medium,
    color: COLORS.black,
    marginLeft: wp("2%"),
    fontFamily: "Regular",
  },
  detailIcon: {
    width: wp("5%"),
    height: wp("5%"),
    tintColor: COLORS.black,
  },
  subscriberItem: {
    padding: wp("4%"),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
    marginBottom: hp("1%"),
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.base,
  },
});

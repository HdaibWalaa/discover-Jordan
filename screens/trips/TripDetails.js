import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  Alert,
  TouchableOpacity,
  Modal, // Import Modal
  FlatList, // Import FlatList to render the list of user requests
  StyleSheet,
} from "react-native";
import axios from "axios"; // Import axios for API requests
import { AuthContext } from "../../store/auth-context";
import FetchTrip from "../../hook/trip/FetchTrip";
import { getUserProfile } from "../../util/auth";
import styles from "./TripDetailsStyles";
import TripBackground from "../../components/trip/TripBackground";
import DetailsHeader from "../../components/trip/DetailsHeader";
import TripImageGallery from "../../components/trip/TripImageGallery";
import TripStatus from "../../components/trip/TripStatus";
import TripTime from "../../components/trip/TripTime";
import ReusableText from "../../components/Reusable/ReusableText";
import { COLORS, SIZES } from "../../constants/theme";
import TripUser from "../../components/trip/TripUser";
import TripTags from "../../components/trip/TripTags";
import TripInfo from "../../components/trip/TripInfo";
import JoinTrip from "../../components/trip/JoinTrip";
import { MenuProvider } from "react-native-popup-menu";
import HeightSpacer from "../../components/Reusable/HeightSpacer";
import BASE_URL from "../../hook/apiConfig";

const TripDetails = ({ route, navigation }) => {
  const { tripId } = route.params;
  const { token } = useContext(AuthContext);

  const { tripDetails, isLoading, error, joinTrip, deleteTrip, editTrip } =
    FetchTrip(tripId, token);

  const [isCreator, setIsCreator] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  const [userHasJoined, setUserHasJoined] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // Declare modal state
  const [userRequests, setUserRequests] = useState([]); // State to hold user requests

  useEffect(() => {
    const checkIfCreator = async () => {
      try {
        const profile = await getUserProfile(token);
        if (profile.data.id === tripDetails?.creator_id) {
          setIsCreator(true);
        }

        if (
          tripDetails?.attendances.some((att) => att.id === profile.data.id)
        ) {
          setUserHasJoined(true);
        }

        // Set user requests
        setUserRequests(tripDetails?.users_request || []);
      } catch (err) {
        console.error("Error checking if user is creator:", err);
      }
    };

    if (tripDetails) {
      checkIfCreator();
    }
  }, [tripDetails, token]);

  const handleJoinTrip = async () => {
    const result = await joinTrip();
    if (result.success) {
      setUserHasJoined(true);
    }
    Alert.alert(result.success ? "Success" : "Error", result.message);
  };

  const handleEditTrip = () => {
    navigation.navigate("EditTrip", { tripDetails });
  };

  const handleDeleteTrip = () => {
    Alert.alert(
      "Delete Trip",
      "Are you sure you want to delete this trip?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteTrip().then((result) => {
              Alert.alert(result.success ? "Success" : "Error", result.message);
              if (result.success) {
                navigation.navigate("AllTrip"); // Navigate back to the AllTrip screen
              }
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

const handleAccept = async (userId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/trip/user/accept`, // Ensure BASE_URL is correct
      {
        trip_id: tripId,
        user_id: userId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure token is correct
          Accept: "application/json",
        },
      }
    );
    if (response.status === 200) {
      Alert.alert("Success", `User ID: ${userId} accepted!`);
    }
  } catch (error) {
    Alert.alert("Error", "Failed to accept user request.");
    console.error(error);
  }
};


  const handleReject = async (userId) => {
    try {
      const response = await axios.post(
       ` ${BASE_URL}/trip/user/cancel`, 
        {
          trip_id: tripId,
          user_id: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      if (response.status === 200) {
        Alert.alert("Success", `User ID: ${userId} rejected!`);
        // Optionally, refresh the requests
      }
    } catch (error) {
      Alert.alert("Error", "Failed to reject user request.");
      console.error(error);
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color={COLORS.primary} />;
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  const isTripActive = new Date(tripDetails.date) >= new Date();
  const isTripEnd = new Date(tripDetails.date) <= new Date();

  return (
    <MenuProvider>
      <TripBackground>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <DetailsHeader
            tripDetails={tripDetails}
            isCreator={isCreator}
            onEdit={handleEditTrip}
            onDelete={handleDeleteTrip}
            onHandPress={() => setModalVisible(true)} // Show modal when hand is pressed
          />
          <TripImageGallery tripDetails={tripDetails} />
          <View style={styles.detailsContainer}>
            <TripStatus tripDetails={tripDetails} />
            <TripTime tripDetails={tripDetails} />
            <TripUser tripDetails={tripDetails} />
            <View style={styles.descriptionContainer}>
              <ReusableText
                text={"Description"}
                family={"SemiBold"}
                size={SIZES.large}
                color={COLORS.black}
              />
              <ReusableText
                text={tripDetails.description}
                family={"Regular"}
                size={SIZES.medium}
                color={COLORS.gray}
              />
            </View>
            <TripTags tripDetails={tripDetails} />
            <TripInfo tripDetails={tripDetails} />

            {/* Conditionally render the Join, Edit, and Delete buttons */}
            {isTripActive && (
              <JoinTrip
                handleJoinTrip={handleJoinTrip}
                isTripActive={isTripActive}
                isUserJoined={userHasJoined}
              />
            )}
            <HeightSpacer height={100} />

            {/* Conditionally render the tabs only if the trip has ended */}
            {isTripEnd && (
              <View style={styles.tabsContainer}>
                <TouchableOpacity
                  style={[
                    styles.tab,
                    activeTab === "posts" && styles.activeTab,
                  ]}
                  onPress={() => setActiveTab("posts")}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === "posts" && styles.activeTabText,
                    ]}
                  >
                    Posts
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.tab,
                    activeTab === "reviews" && styles.activeTab,
                  ]}
                  onPress={() => setActiveTab("reviews")}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === "reviews" && styles.activeTabText,
                    ]}
                  >
                    Reviews
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {isTripEnd && activeTab === "posts" && (
              <View style={styles.tabContent}>
                <Text>Posts Content Here</Text>
              </View>
            )}
            {isTripEnd && activeTab === "reviews" && (
              <View style={styles.tabContent}>
                <Text>Reviews Content Here</Text>
              </View>
            )}
          </View>

          {/* Modal to show user requests */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)} // Close modal
          >
            <View style={modalStyles.centeredView}>
              <View style={modalStyles.modalView}>
                <Text style={modalStyles.modalTitle}>New Requests</Text>
                <FlatList
                  data={userRequests}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <View style={modalStyles.requestItem}>
                      <Image
                        source={
                          item.image
                            ? { uri: item.image }
                            : require("../../assets/images/icons/guestProfile.png")
                        }
                        style={modalStyles.userImage}
                      />
                      <View style={modalStyles.userInfo}>
                        <Text style={modalStyles.userName}>
                          {item.username}
                        </Text>
                        <Text style={modalStyles.userEmail}>{item.email}</Text>
                      </View>
                      <TouchableOpacity
                        style={modalStyles.acceptButton}
                        onPress={() => handleAccept(item.id)}
                      >
                        <Text style={modalStyles.acceptButtonText}>✔</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={modalStyles.rejectButton}
                        onPress={() => handleReject(item.id)}
                      >
                        <Text style={modalStyles.rejectButtonText}>✖</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={modalStyles.closeButton}
                >
                  <Text style={modalStyles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </TripBackground>
    </MenuProvider>
  );
};

// Modal Styles for user requests
const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  requestItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 14,
    color: "#888",
  },
  acceptButton: {
    backgroundColor: "#fcd228",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  acceptButtonText: {
    fontSize: 18,
    color: "black",
  },
  rejectButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 10,
  },
  rejectButtonText: {
    fontSize: 18,
    color: "white",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 18,
  },
});

export default TripDetails;

import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  Alert,
  TouchableOpacity,
  Modal,
  Platform,
  NativeModules,
} from "react-native";
import axios from "axios";
import { AuthContext } from "../../store/auth-context";
import FetchTrip from "../../hook/trip/FetchTrip";
import { getUserProfile } from "../../util/auth";
import styles from "./TripDetailsStyles";
import TripBackground from "../../components/trip/TripBackground";
import DetailsHeader from "../../components/trip/DetailsHeader";
import TripImageGallery from "../../components/trip/TripImageGallery";
import TripStatus from "../../components/trip/TripStatus";
import TripTime from "../../components/trip/TripTime";
import RequestsModal from "../../components/trip/RequestsModal";
import ReusableText from "../../components/Reusable/ReusableText";
import { COLORS, SIZES } from "../../constants/theme";
import TripUser from "../../components/trip/TripUser";
import TripTags from "../../components/trip/TripTags";
import TripInfo from "../../components/trip/TripInfo";
import JoinTrip from "../../components/trip/JoinTrip";
import { MenuProvider } from "react-native-popup-menu";
import HeightSpacer from "../../components/Reusable/HeightSpacer";
import BASE_URL from "../../hook/apiConfig";
import { useLanguage } from "../../store/context/LanguageContext";
import translations from "../../translations/translations";
import AwesomeAlert from "react-native-awesome-alerts";

const TripDetails = ({ route, navigation }) => {
  const { tripId } = route.params;
  const { token } = useContext(AuthContext);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");


  const { language: userPreferredLanguage } = useLanguage(); // 🌍 Get user's selected language from the app

  // ✅ Get device language (fallback if user hasn’t changed it in the app)
  const deviceLanguage =
    Platform.OS === "ios"
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;

  let systemLanguage = deviceLanguage.includes("_")
    ? deviceLanguage.split("_")[0]
    : deviceLanguage.split("-")[0];

  systemLanguage = systemLanguage || "en";

  // ✅ Final language choice (app preference > system default)
  const finalLanguage = userPreferredLanguage || systemLanguage;

  const localizedText = translations[finalLanguage] || translations["en"];
  // Fetch hook for trip details
 const { tripDetails, isLoading, error, joinTrip, deleteTrip, editTrip } =
   FetchTrip(tripId, token, finalLanguage); 

  // Local states for user status
  const [isCreator, setIsCreator] = useState(false);
  const [isUserJoined, setIsUserJoined] = useState(false);
  const [isRequestPending, setIsRequestPending] = useState(false);

  // State for requests modal
  const [modalVisible, setModalVisible] = useState(false);
  const [userRequests, setUserRequests] = useState([]);


  const [activeTab, setActiveTab] = useState("posts");

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const profile = await getUserProfile(token);
        const userId = profile.data.id;

        if (userId === tripDetails?.creator_id) {
          setIsCreator(true);
        }

        const inAttendances = tripDetails?.attendances.some(
          (att) => att.id === userId
        );
        setIsUserJoined(!!inAttendances);

        const inRequests = tripDetails?.users_request.some(
          (req) => req.id === userId
        );
        setIsRequestPending(inRequests && !inAttendances);

        const filteredRequests = (tripDetails?.users_request || []).filter(
          (user) => user.status === 0
        );
        setUserRequests(filteredRequests);
      } catch (err) {
        console.error("Error checking user status:", err);
      }
    };

    if (tripDetails) {
      checkUserStatus();
    }
  }, [tripDetails, token]);

const handleJoinTrip = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/trip/join/${tripId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "X-API-KEY": "DISCOVERJO91427",
          "Content-Language": finalLanguage,
        },
      }
    );

    if (response.status === 200) {
      Alert.alert(localizedText.success, localizedText.joinSuccess);
      setIsRequestPending(true);
    }
  } catch (error) {
    console.error("Error joining trip:", error.response?.data || error.message);

    let errorMsg = localizedText.joinError; // Default message

    if (error.response && error.response.data && error.response.data.msg) {
      const messages = error.response.data.msg;
      if (Array.isArray(messages)) {
        errorMsg = messages.join("\n"); // ✅ Show multiple messages correctly
      } else if (typeof messages === "string") {
        errorMsg = messages;
      }
    }

    setAlertMessage(errorMsg);
    setAlertVisible(true);
  }
};



  if (isLoading) {
    return <ActivityIndicator size="large" color={COLORS.primary} />;
  }
  if (error) {
    return (
      <View style={styles.centered}>
        <Text>
          {localizedText.error}: {error.message}
        </Text>
      </View>
    );
  }

  // **Handle user tapping "LEAVE" button**
  const handleLeaveTrip = async () => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/trip/join/cancel/${tripId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "X-API-KEY": "DISCOVERJO91427",
          },
        }
      );

      if (response.status === 200) {
        Alert.alert("Success", "You have left the trip.");
        setIsUserJoined(false);
        setIsRequestPending(false);
      }
    } catch (err) {
      console.log("Error leaving trip:", err.message);
      if (err.response) {
        console.log("Error response data:", err.response.data);
        console.log("Error response status:", err.response.status);
      }
      Alert.alert("Error", "Could not leave the trip.");
    }
  };

  // Edit trip
  const handleEditTrip = () => {
    navigation.navigate("EditTrip", { tripDetails });
  };

  // Delete trip
  const handleDeleteTrip = () => {
    Alert.alert("Delete Trip", "Are you sure you want to delete this trip?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          deleteTrip().then((result) => {
            Alert.alert(result.success ? "Success" : "Error", result.message);
            if (result.success) {
              navigation.navigate("AllTrip");
            }
          });
        },
      },
    ]);
  };

  // Accept user request
  const handleAccept = async (userId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/trip/user/accept`,
        {
          trip_id: tripId,
          user_id: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "X-API-KEY": "DISCOVERJO91427",
          },
        }
      );
      if (response.status === 200) {
        Alert.alert("Success", `User ID: ${userId} accepted!`);
        const updatedRequests = userRequests.filter((u) => u.id !== userId);
        setUserRequests(updatedRequests);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to accept user request.");
      console.error(error);
    }
  };

  // Reject user request
  const handleReject = async (userId) => {
    try {
      const response = await axios.post(
        // Note tripId is in the URL
        `${BASE_URL}/trip/user/cancel/${tripId}`,
        // Possibly empty body or { user_id: userId } if needed
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "X-API-KEY": "DISCOVERJO91427",
          },
        }
      );
      if (response.status === 200) {
        Alert.alert("Success", `User ID: ${userId} rejected!`);
        const updatedRequests = userRequests.filter((u) => u.id !== userId);
        setUserRequests(updatedRequests);
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

  // Check if trip is active or ended
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
            onHandPress={() => setModalVisible(true)}
            onEdit={handleEditTrip}
            onDelete={handleDeleteTrip}
            onLeaveTrip={handleLeaveTrip}
            isUserJoined={isUserJoined}
          />

          {/* Image Gallery */}
          <TripImageGallery tripDetails={tripDetails} />

          {/* Main Content */}
          <View style={styles.detailsContainer}>
            <TripStatus tripDetails={tripDetails} />
            <TripTime tripDetails={tripDetails} />
            <TripUser tripDetails={tripDetails} />

            {/* Description */}
            <View style={styles.descriptionContainer}>
              <ReusableText
                text="Description"
                family="SemiBold"
                size={SIZES.large}
                color={COLORS.black}
              />
              <ReusableText
                text={tripDetails.description}
                family="Regular"
                size={SIZES.medium}
                color={COLORS.gray}
              />
            </View>

            <TripTags tripDetails={tripDetails} />
            <TripInfo tripDetails={tripDetails} />

            {isTripActive && (
              <JoinTrip
                handleJoinTrip={handleJoinTrip}
                isTripActive={isTripActive}
                isUserJoined={isUserJoined}
                isRequestPending={isRequestPending}
                isCreator={isCreator}
                tripId={tripId}
                token={token}
                updateTripStatus={setIsRequestPending}
              />
            )}
            <HeightSpacer height={100} />

            {/* Example: show tabs if trip ended */}
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

          {/* Creator-only requests modal */}
          <RequestsModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            userRequests={userRequests}
            handleAccept={handleAccept}
            handleReject={handleReject}
          />
        </ScrollView>
      </TripBackground>
      <AwesomeAlert
        show={alertVisible}
        showProgress={false}
        title={localizedText.error}
        message={alertMessage} 
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor={COLORS.primary}
        onConfirmPressed={() => setAlertVisible(false)}
      />
    </MenuProvider>
  );
};

export default TripDetails;

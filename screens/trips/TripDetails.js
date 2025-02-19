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
import DetailsReview from "../../components/Tiles/Trip/DetailsReview";
import DetailsPosts from "../../components/Tiles/Trip/DetailsPosts";

const TripDetails = ({ route, navigation }) => {
    const authCtx = useContext(AuthContext);
  const { tripId } = route.params;
  const { token } = useContext(AuthContext);
  const { language } = useLanguage();
  const t = translations[language];
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isCreator, setIsCreator] = useState(false);
  const [isUserJoined, setIsUserJoined] = useState(false);
  const [isRequestPending, setIsRequestPending] = useState(false);
  const [userRequests, setUserRequests] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  const [navigateToEdit, setNavigateToEdit] = useState(false);
  const localizedText = translations[finalLanguage] || translations["en"];
  const finalLanguage = userPreferredLanguage || systemLanguage;
  const { language: userPreferredLanguage } = useLanguage();
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0);
  const { tripDetails, isLoading, error, joinTrip, deleteTrip, editTrip } =
    FetchTrip(tripId, token, language);
  const deviceLanguage =
    Platform.OS === "ios"
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;

  let systemLanguage = deviceLanguage.includes("_")
    ? deviceLanguage.split("_")[0]
    : deviceLanguage.split("-")[0];

  systemLanguage = systemLanguage || "en";
  useEffect(() => {
    if (tripDetails) {
      setPendingRequestsCount(
        tripDetails?.users_request?.filter((user) => user.status === 0).length
      );
    }
  }, [tripDetails]);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const profile = await getUserProfile(token);
        const userId = profile.data.id;

        setIsCreator(userId === tripDetails?.creator_id);
        setIsUserJoined(
          tripDetails?.attendances?.some((att) => att.id === userId)
        );
        setIsRequestPending(
          tripDetails?.users_request?.some((req) => req.id === userId) &&
            !tripDetails?.attendances?.some((att) => att.id === userId)
        );

        setUserRequests(
          tripDetails?.users_request?.filter((user) => user.status === 0) || []
        );
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
            "Content-Language": language,
          },
        }
      );

      if (response.status === 200) {
        Alert.alert(localizedText.success, localizedText.joinSuccess);
        setIsRequestPending(true);
      }
    } catch (error) {
      console.error(
        "Error joining trip:",
        error.response?.data || error.message
      );

      let errorMsg = localizedText.joinError;
      if (error.response?.data?.msg) {
        errorMsg = Array.isArray(error.response.data.msg)
          ? error.response.data.msg.join("\n")
          : error.response.data.msg;
      }

      setAlertMessage(errorMsg);
      setAlertVisible(true);
    }
  };

  const handleAccept = async (userId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/trip/user/accept`,
        { trip_id: tripId, user_id: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "X-API-KEY": "DISCOVERJO91427",
          },
        }
      );

      if (response.status === 200) {
        Alert.alert(t.success, `${t.userAccepted}: ${userId}`);

        // ✅ Update state dynamically without refresh
        setUserRequests((prev) => prev.filter((u) => u.id !== userId));
        setPendingRequestsCount((prev) => Math.max(prev - 1, 0));
      }
    } catch (error) {
      Alert.alert(t.error, t.failedToAccept);
    }
  };

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
  setModalVisible(false); // Close modal
  navigation.navigate("EditTrip", { tripDetails });
};


  // ✅ useEffect watches `navigateToEdit` and ensures the modal is closed before navigating
  useEffect(() => {
    if (!modalVisible && navigateToEdit) {
      setNavigateToEdit(false);
      navigation.navigate("EditTrip", { tripDetails });
    }
  }, [modalVisible, navigateToEdit]);

  // Delete trip
  const handleDeleteTrip = async () => {
    Alert.alert("Delete Trip", "Are you sure you want to delete this trip?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const response = await axios.delete(
              `${BASE_URL}/trip/delete/${tripId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  Accept: "application/json",
                  "X-API-KEY": "DISCOVERJO91427",
                },
              }
            );

            if (response.status === 200) {
              Alert.alert("Success", "Trip deleted successfully!");

              // ✅ Close modal before navigating
              setModalVisible(false);

              // ✅ Navigate back after delete
              navigation.navigate("AllTrip");
            }
          } catch (error) {
            Alert.alert("Error", "Failed to delete the trip.");
            console.error(
              "Error deleting trip:",
              error.response?.data || error.message
            );
          }
        },
      },
    ]);
  };

  const handleReject = async (userId) => {
    try {
      const response = await axios.post(
        // Check if API needs DELETE instead
        `${BASE_URL}/trip/user/cancel/${tripId}`, // Ensure correct endpoint
        { user_id: userId }, // Some APIs require the ID in the body
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

        // ✅ Update UI dynamically without refresh
        setUserRequests((prev) => prev.filter((u) => u.id !== userId));
        setPendingRequestsCount((prev) => Math.max(prev - 1, 0)); // Ensure count never goes negative
      }
    } catch (error) {
      console.error(
        "Error rejecting user:",
        error.response?.data || error.message
      );

      let errorMsg = "Failed to reject user request.";
      if (error.response?.data?.msg) {
        errorMsg = Array.isArray(error.response.data.msg)
          ? error.response.data.msg.join("\n")
          : error.response.data.msg;
      }

      Alert.alert("Error", errorMsg);
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
            pendingRequestsCount={pendingRequestsCount}
            setPendingRequestsCount={setPendingRequestsCount}
          />
          {/* Image Gallery */}
          <TripImageGallery tripDetails={tripDetails} />
          {/* Main Content */}
          <View style={styles.detailsContainer}>
            <TripStatus tripDetails={tripDetails} />
            <TripTime tripDetails={tripDetails} />
            <TripUser tripDetails={tripDetails} tripId={tripId} />

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
                 <DetailsPosts posts={tripDetails.posts} token={authCtx.token} />
              </View>
            )}
            {isTripEnd && activeTab === "reviews" && (
              <View style={styles.tabContent}>
               <DetailsReview
              reviewsData={tripDetails.reviews} 
              placeId={tripDetails.id}
              token={authCtx.token}
            />
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

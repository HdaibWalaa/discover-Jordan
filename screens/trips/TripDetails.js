import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  FlatList,
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
  const { token } = authCtx;
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
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0);

  const { tripDetails, isLoading, error } = FetchTrip(tripId, token, language);

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

  const isTripActive = new Date(tripDetails?.date) >= new Date();
  const isTripEnd = new Date(tripDetails?.date) <= new Date();

  if (isLoading) {
    return <ActivityIndicator size="large" color={COLORS.primary} />;
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>
          {t.error}: {error.message}
        </Text>
      </View>
    );
  }
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

  return (
    <MenuProvider>
      <TripBackground>
        <FlatList
          data={[]} 
          keyExtractor={() => "dummy"} 
          ListHeaderComponent={
            <>
              <DetailsHeader
                tripDetails={tripDetails}
                isCreator={isCreator}
                onHandPress={() => setModalVisible(true)}
                isUserJoined={isUserJoined}
                pendingRequestsCount={pendingRequestsCount}
                setPendingRequestsCount={setPendingRequestsCount}
                onLeaveTrip={handleLeaveTrip}
              />
              <TripImageGallery tripDetails={tripDetails} />
              <View style={styles.detailsContainer}>
                <TripStatus tripDetails={tripDetails} />
                <TripTime tripDetails={tripDetails} />
                <TripUser tripDetails={tripDetails} tripId={tripId} />

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
                    handleJoinTrip={() => {}}
                    isTripActive={isTripActive}
                    isUserJoined={isUserJoined}
                    isRequestPending={isRequestPending}
                    isCreator={isCreator}
                    tripId={tripId}
                    token={token}
                    updateTripStatus={setIsRequestPending}
                  />
                )}
              </View>

              <HeightSpacer height={70} />

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
            </>
          }
          ListFooterComponent={
            <>
              {isTripEnd && activeTab === "posts" && (
                <DetailsPosts posts={tripDetails.posts} token={authCtx.token} />
              )}
              {isTripEnd && activeTab === "reviews" && (
                <DetailsReview
                  reviewsData={tripDetails.reviews}
                  placeId={tripDetails.id}
                  token={authCtx.token}
                />
              )}
              <RequestsModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                userRequests={userRequests}
                handleAccept={() => {}}
                handleReject={() => {}}
              />
            </>
          }
        />
      </TripBackground>

      <AwesomeAlert
        show={alertVisible}
        title={t.error}
        message={alertMessage}
        closeOnTouchOutside={true}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor={COLORS.primary}
        onConfirmPressed={() => setAlertVisible(false)}
      />
    </MenuProvider>
  );
};

export default TripDetails;

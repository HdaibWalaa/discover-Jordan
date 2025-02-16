import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  NativeModules,
} from "react-native";
import axios from "axios";
import reusable from "../../components/Reusable/reusable.style";
import { AuthContext } from "../../store/auth-context";
import { TripContext } from "../../store/trip-context";
import AllTripCard from "../../components/Tiles/Trip/AllTripCard";
import { COLORS, TEXT } from "../../constants/theme";
import { Video } from "expo-av";
import { ReusableText, ReusableBackground } from "../../components";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from "@react-navigation/native";
import TripInvitationsModal from "./TripInvitationsModal";
import styles from "./AllTrip.styles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import BASE_URL from "../../hook/apiConfig";
import { useLanguage } from "../../store/context/LanguageContext";
import translations from "../../translations/translations";

const AllTrip = () => {
  const { language } = useLanguage(); 
  const localizedText = translations[language] || translations["en"]; 

  const { token } = useContext(AuthContext);
  const { trips, isLoading, error, fetchTrips } = useContext(TripContext);
  const navigation = useNavigation();
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [invitationCount, setInvitationCount] = useState(0);

  useEffect(() => {
    if (token) {
      fetchTrips(token, language);
      fetchInvitationCount();
    }
  }, [token, language]);

  useEffect(() => {
    if (selectedDate) {
      setFilteredTrips(trips.filter((trip) => trip.date === selectedDate));
    } else {
      setFilteredTrips(trips);
    }
  }, [selectedDate, trips]);

  const handleConfirm = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    setSelectedDate(formattedDate);
    setDatePickerVisibility(false);
    fetchTrips(token, language, formattedDate);
  };

  const fetchInvitationCount = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/trip/invitations`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "X-API-KEY": "DISCOVERJO91427",
          "Content-Language": language, 
        },
      });

      if (response.status === 200 && Array.isArray(response.data.data)) {
        setInvitationCount(response.data.data.length);
      } else {
        setInvitationCount(0);
      }
    } catch (error) {
      console.error("Error fetching invitation count:", error.message);
      setInvitationCount(0);
    }
  };

  return (
    <ReusableBackground>
      <SafeAreaView style={[reusable.container, styles.safeArea]}>
        <View style={{ gap: 30 }}>
          <View style={reusable.header1}>
            <View style={styles.headerTextContainer}>
              <ReusableText
                text={localizedText.pickYourTrip}
                family="Bold"
                size={TEXT.large}
                color={COLORS.black}
              />
            </View>
            <View style={styles.createButtonsWrapper}>
              <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
                <View style={styles.createButtonContent}>
                  <Image
                    source={require("../../assets/images/icons/datecalender.png")}
                    style={styles.dateIcon}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("CreatTrip")}
              >
                <View style={styles.createButtonContent}>
                  <Image
                    source={require("../../assets/images/icons/creattripnew.png")}
                    style={styles.dateIcon}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                {invitationCount > 0 && (
                  <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{invitationCount}</Text>
                  </View>
                )}
                <View style={styles.createButtonContent}>
                  <Image
                    source={require("../../assets/images/icons/invitTrips.png")}
                    style={styles.dateIcon}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {filteredTrips.length > 0 ? (
            <FlatList
              data={filteredTrips}
              ListFooterComponent={<View style={{ height: hp(30) }} />}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item, index }) => (
                <AllTripCard item={item} isFirst={index === 0} />
              )}
              contentContainerStyle={styles.listContainer}
            />
          ) : (
            <View style={styles.noDataContainer}>
              <Video
                source={require("../../assets/images/videos/nodata.mp4")}
                style={styles.noDataVideo}
                resizeMode="contain"
                shouldPlay
                isLooping
              />
              <Text style={styles.noDataText}>
                {localizedText.noTripsFound}
              </Text>
            </View>
          )}

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={() => setDatePickerVisibility(false)}
          />

          <TripInvitationsModal
            token={token}
            visible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            updateInvitationCount={setInvitationCount}
          />
        </View>
      </SafeAreaView>
    </ReusableBackground>
  );
};

export default AllTrip;

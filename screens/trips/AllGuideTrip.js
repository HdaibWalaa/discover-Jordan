import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import reusable from "../../components/Reusable/reusable.style";
import { AuthContext } from "../../store/auth-context";
import { GuideTripContext } from "../../store/guide-trip-context";
import AllGuideCard from "../../components/Tiles/Trip/AllGuideCard";
import { COLORS, TEXT } from "../../constants/theme";
import { Video } from "expo-av";
import { ReusableText, ReusableBackground } from "../../components";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useLanguage } from "../../store/context/LanguageContext";
import translations from "../../translations/translations";
import styles from "./AllGuideTrip.style";

const AllGuideTrip = ({ route }) => {
  const { language } = useLanguage();
  const localizedText = translations[language] || translations["en"];

  const { token, user } = useContext(AuthContext);
  const {
    guideTrips,
    setGuideTrips, // Assuming your context has this setter function
    isLoading,
    error,
    pagination,
    fetchGuideTrips,
    loadMoreTrips,
  } = useContext(GuideTripContext);

  const navigation = useNavigation();
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Extract deletedTripId from route params if it exists
  const deletedTripId = route?.params?.deletedTripId;
  const timestamp = route?.params?.timestamp;

  // This effect runs when the component mounts or when route params change
  useEffect(() => {
    if (token) {
      // If we have a deletedTripId, first update the local state to remove the deleted trip
      if (deletedTripId && guideTrips.length > 0) {
        const updatedTrips = guideTrips.filter(
          (trip) => trip.id.toString() !== deletedTripId.toString()
        );

        // Update the context with filtered trips
        if (updatedTrips.length !== guideTrips.length) {
          setGuideTrips(updatedTrips);
        }
      }

      // Then fetch fresh data from the server
      fetchGuideTrips(token, language);
    }
  }, [token, deletedTripId, timestamp, language]);

  // This effect updates filtered trips when selected date or guide trips change
  useEffect(() => {
    if (selectedDate) {
      // Filter trips based on the selected date
      const formattedDate = selectedDate.split("T")[0];
      setFilteredTrips(
        guideTrips.filter(
          (trip) => trip.start_time.split(" ")[0] === formattedDate
        )
      );
    } else {
      setFilteredTrips(guideTrips);
    }
  }, [selectedDate, guideTrips]);

  // Also refresh on screen focus to ensure up-to-date data
  useFocusEffect(
    React.useCallback(() => {
      if (token) {
        fetchGuideTrips(token, language);
      }
    }, [token, language])
  );

  const handleConfirm = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    setSelectedDate(formattedDate);
    setDatePickerVisibility(false);
  };

  const handleLoadMore = async () => {
    if (!pagination.nextPageUrl || isLoading || isLoadingMore) return;

    setIsLoadingMore(true);
    await loadMoreTrips(token, language);
    setIsLoadingMore(false);
  };

  const renderFooter = () => {
    if (!isLoadingMore) return <View style={{ height: hp(15) }} />;

    return (
      <View style={styles.centered}>
        <ActivityIndicator size="small" color={COLORS.primary} />
        <Text style={styles.noDataText}>Loading more trips...</Text>
      </View>
    );
  };

  // Clear date filter
  const clearDateFilter = () => {
    setSelectedDate(null);
  };

  // Check if user is a guide (is_guide === 1)
  const isUserGuide = user && user.is_guide === 1;

  return (
    <ReusableBackground>
      <SafeAreaView style={[reusable.container, styles.safeArea]}>
        <View style={{ gap: 0 }}>
          <View style={reusable.header1}>
            <View style={styles.headerTextContainer}>
              <ReusableText
                text={localizedText.pickYourGuideTrip || "Pick Your Trip"}
                family="Bold"
                size={TEXT.large}
                color={COLORS.black}
              />

              {selectedDate && (
                <TouchableOpacity
                  onPress={clearDateFilter}
                  style={styles.clearFilterButton}
                >
                  <Text style={styles.clearFilterText}>
                    {localizedText.clearFilter || "Clear filter"}
                  </Text>
                </TouchableOpacity>
              )}
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

              {/* Only show Create Guide Trip button if user is a guide */}
              {isUserGuide && (
                <TouchableOpacity
                  onPress={() => navigation.navigate("CreateGuideTrip")}
                >
                  <View style={styles.createButtonContent}>
                    <Image
                      source={require("../../assets/images/icons/creattripnew.png")}
                      style={styles.dateIcon}
                    />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {isLoading && !isLoadingMore ? (
            <View style={styles.centered}>
              <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
          ) : filteredTrips.length > 0 ? (
            <FlatList
              data={filteredTrips}
              ListFooterComponent={renderFooter}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item, index }) => (
                <AllGuideCard item={item} isFirst={index === 0} />
              )}
              contentContainerStyle={styles.listContainer}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.5}
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
                {localizedText.noTripFound || "No trips found"}
              </Text>
            </View>
          )}

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={() => setDatePickerVisibility(false)}
          />
        </View>
      </SafeAreaView>
    </ReusableBackground>
  );
};

export default AllGuideTrip;

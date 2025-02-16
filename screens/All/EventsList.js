import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  Platform,
  NativeModules,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import reusable from "../../components/Reusable/reusable.style";
import moment from "moment";
import { Video } from "expo-av"; 
import AllEventCard from "../../components/Tiles/Events/AllEventCard";
import fetchEvents from "../../hook/event/fetchEvents";
import { ReusableBackground, ReusableText } from "../../components";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import BASE_URL from "../../hook/apiConfig";
import CalendarButton from "../../components/Buttons/calenderButton";

const EventsList = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const deviceLanguage =
    Platform.OS === "ios"
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;

  let language = deviceLanguage.includes("_")
    ? deviceLanguage.split("_")[0]
    : deviceLanguage.split("-")[0];

  language = language || "en";

  const { eventData, isLoading, error, fetchData, nextPageUrl } =
    fetchEvents(language);

  const [fetchingMore, setFetchingMore] = useState(false);

  useEffect(() => {
    fetchData(); // Initial fetch
  }, [language]);

  const handleLoadMore = async () => {
    if (nextPageUrl && !fetchingMore) {
      setFetchingMore(true);
      await fetchData(nextPageUrl);
      setFetchingMore(false);
    }
  };

  const handleConfirm = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    setSelectedDate(formattedDate);
    fetchData(`${BASE_URL}/date/events?date=${formattedDate}`);
    setDatePickerVisibility(false);
  };

  if (isLoading && eventData.length === 0) {
    return <ActivityIndicator color="black" size={60} />;
  }

  if (error) {
    return (
      <View>
        <Text>Error occurred: {error.message}</Text>
      </View>
    );
  }

  return (
    <ReusableBackground>
      <SafeAreaView style={reusable.container}>
        <View style={[reusable.header1, { marginBottom: 30 }]}>
          <View style={{ width: 150 }}>
            <ReusableText
              text={"Events".toLocaleUpperCase()}
              family={"semiBold"}
              size={TEXT.large}
              color={COLORS.black}
              style={{ letterSpacing: 1 }}
            />
          </View>
          <CalendarButton onPress={() => setDatePickerVisibility(true)} />
        </View>

        {eventData.length > 0 ? (
          <FlatList
            data={eventData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <AllEventCard item={item} />}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<View style={{ height: 70 }} />}
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
              No Events activities on this date.
            </Text>
          </View>
        )}

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={() => setDatePickerVisibility(false)}
        />
      </SafeAreaView>
    </ReusableBackground>
  );
};

export default EventsList;

const styles = StyleSheet.create({
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataVideo: {
    width: 300,
    height: 200,
  },
  noDataText: {
    marginTop: 20,
    fontSize: TEXT.large,
    color: COLORS.gray,
  },
});

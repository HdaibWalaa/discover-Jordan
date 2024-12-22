import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Text,
  Image,
  NativeModules,
  Platform,
} from "react-native";
import React, { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { SafeAreaView } from "react-native-safe-area-context";
import { Video } from "expo-av"; // Import Video from expo-av
import { COLORS, TEXT } from "../../constants/theme";
import reusable from "../../components/Reusable/reusable.style";
import { ReusableBackground, ReusableText } from "../../components";
import VolunteeringCard from "../../components/Tiles/Volunteer/VolunteeringCard";
import fetchVolunteer from "../../hook/volunteer/fetchVolunteer";
import CalendarButton from "../../components/Buttons/calenderButton";
import BASE_URL from "../../hook/apiConfig";

const VolunteerList = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // Get device language
  const deviceLanguage =
    Platform.OS === "ios"
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;

  // Extract language code
  let language = deviceLanguage.includes("_")
    ? deviceLanguage.split("_")[0]
    : deviceLanguage.split("-")[0];

  // Set default language to "en" if extraction fails
  language = language || "en";

  const { volunteerData, isLoading, error, fetchData } =
    fetchVolunteer(language);

  const handleConfirm = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    setSelectedDate(formattedDate);
    fetchData(`${BASE_URL}/date/volunteering?date=${formattedDate}`);
    setDatePickerVisibility(false);
  };

  if (isLoading) {
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
              text={"Volunteer".toLocaleUpperCase()}
              family={"semiBold"}
              size={TEXT.large}
              color={COLORS.black}
              style={{ letterSpacing: 1 }}
            />
          </View>
          <CalendarButton onPress={() => setDatePickerVisibility(true)} />
        </View>

        {volunteerData.length > 0 ? (
          <FlatList
            data={volunteerData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <VolunteeringCard item={item} />}
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
              No volunteer activities on this date.
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

export default VolunteerList;

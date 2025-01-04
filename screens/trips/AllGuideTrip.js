import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  NativeModules,
} from "react-native";
import reusable from "../../components/Reusable/reusable.style";
import { AuthContext } from "../../store/auth-context";
import { GuideTripContext } from "../../store/guide-trip-context";
import AllTripCard from "../../components/Tiles/Trip/AllTripCard";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import { ReusableText, ReusableBackground } from "../../components";
import { useNavigation } from "@react-navigation/native";
import DateSelector from "../../components/Tiles/Trip/DateSelector";

const AllGuidetrip = () => {
  const capitalize = (str) =>
    str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  const { token } = useContext(AuthContext);
  const { guideTrips, isLoading, error, fetchGuideTrips } =
    useContext(GuideTripContext);
  const navigation = useNavigation();
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0] // Default to today's date
  );
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  // Get device language
  const deviceLanguage =
    Platform.OS === "ios"
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;

  const language = deviceLanguage.includes("_")
    ? deviceLanguage.split("_")[0]
    : deviceLanguage.split("-")[0];

  // Fetch guide trips when the token or language changes
  useEffect(() => {
    if (token) {
      fetchGuideTrips(token, language);
    }
  }, [token, language]);

  // Update filtered trips when selected date or guide trips change
  useEffect(() => {
    if (selectedDate) {
      const tripsOnSelectedDate = guideTrips.filter(
        (trip) =>
          trip &&
          trip.start_time &&
          trip.start_time.split(" ")[0] === selectedDate
      );

      setFilteredTrips(tripsOnSelectedDate);
    } else {
      setFilteredTrips([]);
    }
  }, [selectedDate, guideTrips]);

  // Set the selected date to the first of the month when the user changes the month
  useEffect(() => {
    const firstDayOfMonth = `${selectedMonth.getFullYear()}-${(
      selectedMonth.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-01`;
    setSelectedDate(firstDayOfMonth);
  }, [selectedMonth]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <ReusableBackground>
      <SafeAreaView style={[reusable.container, styles.safeArea]}>
        <View style={{ gap: 30 }}>
          <View style={reusable.header1}>
            <View style={styles.headerTextContainer}>
              <ReusableText
                text={capitalize("Pick your perfect trip day")}
                family="Bold"
                size={TEXT.large}
                color={COLORS.black}
              />
            </View>

            <View style={styles.createButtonContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate("CreatTrip")}
              >
                <View style={styles.createButtonContent}>
                  <Image
                    source={require("../../assets/images/icons/creat.png")}
                    style={styles.createIcon}
                  />
                  <ReusableText
                    text={capitalize("create")}
                    family="SemiBold"
                    size={SIZES.small}
                    color={COLORS.black}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <DateSelector
            selectedMonth={selectedMonth}
            selectedDate={selectedDate}
            onChangeMonth={setSelectedMonth}
            onSelectDate={setSelectedDate}
          />
          {filteredTrips.length > 0 ? (
            <FlatList
              data={filteredTrips}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) =>
                item.id ? item.id.toString() : index.toString()
              }
              renderItem={({ item, index }) => (
                <AllTripCard item={item} isFirst={index === 0} />
              )}
              contentContainerStyle={styles.listContainer}
            />
          ) : (
            <View style={styles.centeredMessage}>
              <Text style={styles.noTripText}>
                There are no trips for this day. Please choose another day.
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </ReusableBackground>
  );
};

export default AllGuidetrip;

const styles = StyleSheet.create({
  safeArea: {
    marginTop: 50,
  },
  headerTextContainer: {
    width: 170,
  },
  createButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  createButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.gray,
    overflow: "hidden",
    marginLeft: 3,
    marginRight: 5,
    backgroundColor: COLORS.white,
  },
  createIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
    transform: [{ rotate: "90deg" }],
  },
  listContainer: {
    paddingVertical: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredMessage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noTripText: {
    fontSize: TEXT.medium,
    color: COLORS.black,
    textAlign: "center",
  },
});

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
import { TripContext } from "../../store/trip-context";
import AllTripCard from "../../components/Tiles/Trip/AllTripCard";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import { ReusableText, ReusableBackground } from "../../components";
import { useNavigation } from "@react-navigation/native";
import DateSelector from "../../components/Tiles/Trip/DateSelector";

const AllTrip = () => {
  // Utility function for capitalizing strings
  const capitalize = (str) =>
    str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  // Contexts for authentication and trips
  const { token } = useContext(AuthContext);
  const { trips, isLoading, error, fetchTrips } = useContext(TripContext);

  // Navigation instance
  const navigation = useNavigation();

  // Local states for filtered trips and date selection
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date()); // Initialize to the current month

  // Get device language
  const deviceLanguage =
    Platform.OS === "ios"
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;

  const language = deviceLanguage.includes("_")
    ? deviceLanguage.split("_")[0]
    : deviceLanguage.split("-")[0];

  // Fetch trips when the token or language changes
  useEffect(() => {
    if (token) {
      fetchTrips(token, language); // Fetch trips with token and language
    }
  }, [token, language]);

  // Filter trips based on the selected date
  useEffect(() => {
    if (selectedDate) {
      setFilteredTrips(trips.filter((trip) => trip.date === selectedDate));
    } else {
      setFilteredTrips(trips);
    }
  }, [selectedDate, trips]);

  // Loading state
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  // Render the main content
  return (
    <ReusableBackground>
      <SafeAreaView style={[reusable.container, styles.safeArea]}>
        <View style={{ gap: 30 }}>
          {/* Header Section */}
          <View style={reusable.header1}>
            <View style={styles.headerTextContainer}>
              <ReusableText
                text={capitalize("Pick your perfect trip day")}
                family="Bold"
                size={TEXT.large}
                color={COLORS.black}
              />
            </View>

            {/* Create Button */}
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

          {/* Date Selector */}
          <DateSelector
            selectedMonth={selectedMonth} // Pass selectedMonth state
            selectedDate={selectedDate} // Pass selectedDate state
            onChangeMonth={setSelectedMonth} // Update selectedMonth state
            onSelectDate={setSelectedDate} // Update selectedDate state
          />

          {/* Trip List */}
          <FlatList
            data={filteredTrips}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <AllTripCard item={item} isFirst={index === 0} />
            )}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      </SafeAreaView>
    </ReusableBackground>
  );
};

export default AllTrip;

// Styles
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
});

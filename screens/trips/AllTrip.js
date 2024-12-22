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
  const capitalize = (str) =>
    str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  const { token } = useContext(AuthContext);
  const { trips, isLoading, error, fetchTrips } = useContext(TripContext);
  const navigation = useNavigation();
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  // Get device language
  const deviceLanguage =
    Platform.OS === "ios"
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;

  const language = deviceLanguage.includes("_")
    ? deviceLanguage.split("_")[0]
    : deviceLanguage.split("-")[0];

  useEffect(() => {
    if (token) {
      fetchTrips(token, language);  // Pass the language parameter
    }
  }, [token, language]);

  useEffect(() => {
    if (selectedDate) {
      setFilteredTrips(trips.filter((trip) => trip.date === selectedDate));
    } else {
      setFilteredTrips(trips);
    }
  }, [selectedDate, trips]);

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
            dates={Array.from(new Set(trips.map((trip) => trip.date)))}
            onSelectDate={setSelectedDate}
          />
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

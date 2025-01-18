import React from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Platform,
  NativeModules,
  Text,
} from "react-native";
import reusable from "../Reusable/reusable.style";
import ReusableText from "../Reusable/ReusableText";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import ReusableArrow from "../Buttons/ReusableArrow";
import TripCard from "../Tiles/Trip/TripCard";
import fetchunauthenticatedTrips from "../../hook/trip/fetchunauthenticatedTrips";

const Trips = () => {
  const navigation = useNavigation();
  const deviceLanguage =
    Platform.OS === "ios"
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;

  let language = deviceLanguage.includes("_")
    ? deviceLanguage.split("_")[0]
    : deviceLanguage.split("-")[0];

  language = language || "en";
  const { tripData, isLoading, error } = fetchunauthenticatedTrips(language);

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
    <View>
      <View
        style={[reusable.rowWithSpace("space-between"), { paddingBottom: 20 }]}
      >
        <ReusableText
          text={"Trips".toUpperCase()}
          family={"Medium"}
          size={TEXT.large}
          color={COLORS.black}
        />
        <ReusableArrow
          onPress={() => navigation.navigate("AllTrip")}
          size={24}
          color="black"
        />
      </View>
      <View>
        <FlatList
          data={tripData}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ columnGap: SIZES.medium }}
          renderItem={({ item }) => (
            <TripCard
              item={item}
              margin={5}
              onPress={() =>
                navigation.navigate("TripDetails", { tripId: item.id })
              }
            />
          )}
        />
      </View>
    </View>
  );
};

export default Trips;

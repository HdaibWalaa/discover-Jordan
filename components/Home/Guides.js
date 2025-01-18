import React from "react";
import {
  FlatList,
  StyleSheet,
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
import GuideTripCard from "../Tiles/Trip/guideTripCard";
import fetchAllGuideTrips from "../../hook/trip/fetchAllGuideTrips";

const Guides = () => {
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
  const { guidTripData, isLoading, error } = fetchAllGuideTrips(language);

  if (isLoading) {
    return <ActivityIndicator color="black" size={60} />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error occurred: {error.message}</Text>
      </View>
    );
  }

  return (
    <View>
      <View
        style={[reusable.rowWithSpace("space-between"), { paddingBottom: 20 }]}
      >
        <ReusableText
          text={"Guide".toUpperCase()}
          family={"Medium"}
          size={TEXT.large}
          color={COLORS.black}
        />
        <ReusableArrow
          onPress={() => navigation.navigate("AllGuideTrip")}
          size={24}
          color="black"
        />
      </View>
      <FlatList
        data={guidTripData}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ columnGap: SIZES.medium }}
        renderItem={({ item }) => (
          <GuideTripCard
            item={item}
            margin={5}
            onPress={() => {
              navigation.navigate("guideTripDetails", { tripId: item.id });
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: TEXT.medium,
    color: COLORS.red,
  },
});

export default Guides;

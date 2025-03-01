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
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={COLORS.primary} size={60} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error occurred: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
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

      {guidTripData && guidTripData.length > 0 ? (
        <FlatList
          data={guidTripData}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <GuideTripCard
              item={item}
              margin={10}
              onPress={() => {
                navigation.navigate("GuideTripDetails", { tripId: item.id });
              }}
            />
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No guide trips available</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  headerContainer: {
    ...reusable.rowWithSpace("space-between"),
    paddingHorizontal: SIZES.small,
    paddingBottom: 15,
    marginBottom: 5,
  },
  listContainer: {
    paddingLeft: SIZES.small,
    paddingRight: SIZES.small / 2,
    paddingBottom: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  },
  errorContainer: {
    padding: SIZES.medium,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.lightWhite,
    borderRadius: SIZES.small,
    marginHorizontal: SIZES.small,
  },
  errorText: {
    fontSize: TEXT.medium,
    color: COLORS.red,
    textAlign: "center",
  },
  emptyContainer: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: TEXT.medium,
    color: COLORS.gray,
  },
});

export default Guides;

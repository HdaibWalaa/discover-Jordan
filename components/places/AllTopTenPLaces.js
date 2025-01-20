import React, { useContext } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  VirtualizedList,
  Platform,
  NativeModules,
} from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import TopTenPlaceCard from "../Tiles/Places/TopTenPlaceCard";
import HeightSpacer from "../Reusable/HeightSpacer";
import fetchTopTenPlaces from "../../hook/fetchTopTenPlaces";
import { AuthContext } from "../../store/auth-context";

const AllTopTenPlaces = () => {
  const authCtx = useContext(AuthContext); // Get token from context
 
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

  const { topTenData, isLoading, error } = fetchTopTenPlaces(
    language,
    authCtx.token
  ); // Pass token to fetchTopTenPlaces

  // Loading and error handling
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color="black" size={60} />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error occurred: {error.message}</Text>
      </View>
    );
  }

  return (
    <View>
      <HeightSpacer height={SIZES.xLarge} />
      <VirtualizedList
        data={topTenData}
        keyExtractor={(item) => item.place_id.toString()}
        ListFooterComponent={<View style={{ height: 200 }} />}
        showsVerticalScrollIndicator={false}
        getItemCount={(data) => data.length}
        getItem={(data, index) => data[index]}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TopTenPlaceCard item={item} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginVertical: 10,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AllTopTenPlaces;

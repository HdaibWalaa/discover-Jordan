import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Platform,
  NativeModules,
  ActivityIndicator,
  Text,
  Dimensions,
} from "react-native";
import PopularPlaceDetails from "../../components/Tiles/Places/PopularPlaceDetails";
import fetchPopularPlaces from "../../hook/fetchPopularPlaces";
import * as Location from "expo-location";

const { width, height } = Dimensions.get("window");

const AllPopular = () => {
  const deviceLanguage =
    Platform.OS === "ios"
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;

  let language = deviceLanguage.includes("_")
    ? deviceLanguage.split("_")[0]
    : deviceLanguage.split("-")[0];

  language = language || "en";

  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      console.log("User Latitude:", location.coords.latitude);
      console.log("User Longitude:", location.coords.longitude);
    })();
  }, []);

  const { popularData, isLoading, error } = fetchPopularPlaces(
    language,
    userLocation
  );

  if (!userLocation) {
    return <ActivityIndicator color="black" size={60} />;
  }

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

  const renderItem = ({ item }) => {
    return <PopularPlaceDetails item={item} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        data={popularData}
        renderItem={renderItem}
        keyExtractor={(item) => item.place_id.toString()}
        scrollEventThrottle={16}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AllPopular;

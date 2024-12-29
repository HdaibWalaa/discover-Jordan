import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  ActivityIndicator,
  Text,
  Platform,
  NativeModules,
  StyleSheet,
} from "react-native";
import ReusableText from "../Reusable/ReusableText";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import ReusableArrow from "../Buttons/ReusableArrow";
import PopularCard from "../Tiles/Places/PopularCard";
import fetchPopularPlaces from "../../hook/fetchPopularPlaces";
import * as Location from "expo-location";

const Popular = () => {
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

  const [popularPlaces, setPopularPlaces] = useState([]);

  useEffect(() => {
    if (!isLoading && !error) {
      const selectedData = popularData.slice(0, 3);
      setPopularPlaces(selectedData);
    }
  }, [popularData, isLoading, error]);

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
      <View style={styles.rowWithSpace}>
        <ReusableText
          text={"popular places".toUpperCase()}
          family={"Medium"}
          size={TEXT.large}
          color={COLORS.black}
        />
        <ReusableArrow
          onPress={() => navigation.navigate("AllPopular")}
          size={24}
          color="black"
        />
      </View>
      <PopularCard places={popularPlaces} />
    </View>
  );
};

const styles = StyleSheet.create({
  rowWithSpace: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Popular;

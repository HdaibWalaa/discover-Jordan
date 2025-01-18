import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Platform,
  NativeModules,
  Button,
} from "react-native";
import reusable from "../Reusable/reusable.style";
import ReusableText from "../Reusable/ReusableText";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import VolunteerCard from "../Tiles/Volunteer/VolunteerCard";
import fetchVolunteer from "../../hook/volunteer/fetchVolunteer";
import ReusableArrow from "../Buttons/ReusableArrow";
import EventCard from "../Tiles/Events/EventCard";

const Volunteer = () => {
  // Determine device language
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

  const navigation = useNavigation();
  const {
    volunteerData,
    isLoading,
    error,
    fetchData,
    nextPageUrl,
    prevPageUrl,
  } = fetchVolunteer(language);

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
          text={"Volunteer".toUpperCase()}
          family={"Medium"}
          size={TEXT.large}
          color={COLORS.black}
        />

        <ReusableArrow
          onPress={() => navigation.navigate("VolunteerList")}
          size={24}
          color="black"
        />
      </View>

      <FlatList
        data={volunteerData}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ columnGap: SIZES.medium }}
        renderItem={({ item }) => <VolunteerCard item={item} margin={5} />}
      />

      <View style={styles.pagination}>
        {prevPageUrl && (
          <Button title="Previous" onPress={() => fetchData(prevPageUrl)} />
        )}
        {nextPageUrl && (
          <Button title="Next" onPress={() => fetchData(nextPageUrl)} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Volunteer;

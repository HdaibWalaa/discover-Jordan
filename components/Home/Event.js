import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  Platform,
  NativeModules,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import EventCard from "../Tiles/Events/EventCard";
import fetchEvents from "../../hook/event/fetchEvents";
import reusable from "../Reusable/reusable.style";
import ReusableText from "../Reusable/ReusableText";
import ReusableArrow from "../Buttons/ReusableArrow";
import { COLORS, SIZES, TEXT } from "../../constants/theme";

const Event = () => {
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
  const { eventData, isLoading, error, fetchData, nextPageUrl } =
    fetchEvents(language);

  const [fetchingMore, setFetchingMore] = useState(false);

  useEffect(() => {
    fetchData(); // Initial fetch
  }, [language]); // Fetch data when language changes

  const handleLoadMore = async () => {
    if (nextPageUrl && !fetchingMore) {
      setFetchingMore(true);
      await fetchData(nextPageUrl);
      setFetchingMore(false);
    }
  };

  if (isLoading && eventData.length === 0) {
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
          text={"Events".toUpperCase()}
          family={"Medium"}
          size={TEXT.large}
          color={COLORS.black}
        />
        <ReusableArrow
          onPress={() => navigation.navigate("EventsList")}
          size={24}
          color="black"
        />
      </View>

      <FlatList
        data={eventData}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ columnGap: SIZES.medium }}
        renderItem={({ item }) => (
          <EventCard item={item} margin={5} eventId={item.id} />
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          fetchingMore ? <ActivityIndicator size="large" color="black" /> : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Event;

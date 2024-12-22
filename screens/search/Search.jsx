import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Platform,
  NativeModules,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  searchPlaces,
  searchTrips,
  searchPlans,
  searchUsers,
  searchPopularPlaces,
  searchTopTenPlaces,
  searchEvents,
  searchVolunteering,
  searchCategories,
  searchGuideTrips,
} from "../../services/apiService";
import ReusableTile from "../../components/Reusable/ReusableTile";
import styles from "./search.style";
import reusable from "../../components/Reusable/reusable.style";
import { debounce } from "../../util/debounce";
import SearchInput from "../../components/Serach&Filter/SerachInput";
import TypeTabs from "../../components/Serach&Filter/TypeTabs";

const getDeviceLanguage = () => {
  const deviceLanguage =
    Platform.OS === "ios"
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;
  return deviceLanguage.includes("_")
    ? deviceLanguage.split("_")[0]
    : deviceLanguage.split("-")[0];
};

const Search = ({ navigation }) => {
  const [searchKey, setSearchKey] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [results, setResults] = useState({});

  const performSearch = useCallback(
    debounce(async (key) => {
      if (!key.trim()) {
        setResults({});
        return;
      }
      try {
        const responses = await Promise.all([
          searchPlaces(key, 35.852924, 31.849737),
          searchTrips(key),
          searchPlans(key),
          searchUsers(key),
          searchPopularPlaces(key),
          searchTopTenPlaces(key),
          searchEvents(key),
          searchVolunteering(key),
          searchCategories(key),
          searchGuideTrips(key),
        ]);
        const resultsKeys = [
          "places",
          "trips",
          "plans",
          "users",
          "popularPlaces",
          "topTenPlaces",
          "events",
          "volunteering",
          "categories",
          "guideTrips",
        ];
        setResults(
          resultsKeys.reduce((acc, cur, idx) => {
            acc[cur] = responses[idx];
            return acc;
          }, {})
        );
      } catch (error) {
        console.error("Error during search:", error);
        setResults({});
      }
    }, 500),
    []
  );

  useEffect(() => {
    performSearch(searchKey);
  }, [searchKey]);

const renderSection = (title, data) => (
  <>
    {data && data.length > 0 && (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <FlatList
          data={data}
          horizontal
          keyExtractor={(item, index) => {
            const itemId = item.id || item.place_id || `${title}_${index}`; // Ensure unique key
            return itemId.toString(); // Convert to string to avoid warnings
          }}
          renderItem={({ item }) => (
            <ReusableTile
              item={item}
              onPress={() => {
                switch (title) {
                  case "places":
                  case "popularPlaces":
                  case "topTenPlaces":
                    navigation.navigate("PlaceDetails", {
                      id: item.id || item.place_id,
                    });
                    break;
                  case "trips":
                  case "guideTrips":
                    navigation.navigate("TripDetails", { id: item.id });
                    break;
                  case "plans":
                    navigation.navigate("PlanDetails", { id: item.id });
                    break;
                  case "users":
                    navigation.navigate("OtherUserProfile", {
                      userId: item.id,
                    });
                    break;
                  case "events":
                    navigation.navigate("EventsDetails", { id: item.id });
                    break;
                  case "volunteering":
                    navigation.navigate("VolunteerDetails", { id: item.id });
                    break;
                  case "categories":
                    navigation.navigate("CategoryList", {
                      categoryId: item.id,
                    });
                    break;
                  default:
                    console.warn("Unhandled title:", title);
                }
              }}
            />
          )}
        />
      </View>
    )}
  </>
);


  return (
    <SafeAreaView style={reusable.container}>
      <SearchInput
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        placeholder="Search..."
      />
      <TypeTabs selectedType={selectedType} onSelectType={setSelectedType} />

      <ScrollView>
        {Object.entries(results).map(
          ([key, value]) =>
            (selectedType === "all" || selectedType === key) &&
            renderSection(key, value)
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;

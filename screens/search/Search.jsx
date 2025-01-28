import React, { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as api from "../../services/apiService"; // Import all API services
import ReusableTile from "../../components/Reusable/ReusableTile";
import styles from "./search.style";
import reusable from "../../components/Reusable/reusable.style";
import { debounce } from "../../util/debounce";
import SearchInput from "../../components/Serach&Filter/SerachInput";
import TypeTabs from "../../components/Serach&Filter/TypeTabs";
import { useTheme } from "../../store/context/ThemeContext";
import { useLanguage } from "../../store/context/LanguageContext";
import { COLORS } from "../../constants/theme";

const endpoints = [
  { key: "places", fn: api.searchPlaces },
  { key: "trips", fn: api.searchTrips },
  { key: "plans", fn: api.searchPlans },
  { key: "users", fn: api.searchUsers },
  { key: "popularPlaces", fn: api.searchPopularPlaces },
  { key: "topTenPlaces", fn: api.searchTopTenPlaces },
  { key: "events", fn: api.searchEvents },
  { key: "volunteering", fn: api.searchVolunteering },
  { key: "categories", fn: api.searchCategories },
  { key: "guideTrips", fn: api.searchGuideTrips },
];

const Search = ({ navigation }) => {
  const { mode } = useTheme();
  const isDarkMode = mode === "dark";
  const { translations, language } = useLanguage(); // Access language context

  const [searchKey, setSearchKey] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

  const performSearch = useCallback(
    debounce(async (key) => {
      if (!key.trim()) {
        setResults({});
        return;
      }

      setLoading(true); // Show loading indicator
      const allResults = {};

      try {
        const searchPromises = endpoints.map(({ key, fn }) =>
          fn(key === "places" ? key : searchKey, language)
            .then((data) => ({ key, data }))
            .catch((error) => {
              console.error(`Error fetching ${key}:`, error);
              return { key, data: [] }; // Fallback to empty array
            })
        );

        const responses = await Promise.all(searchPromises);

        responses.forEach(({ key, data }) => {
          allResults[key] = data || [];
        });

        setResults(allResults);
      } catch (error) {
        console.error("Error during search:", error);
      } finally {
        setLoading(false); // Hide loading indicator
      }
    }, 500),
    [language]
  );

  useEffect(() => {
    performSearch(searchKey);
  }, [searchKey, language]);

  const renderSection = (title, data) => (
    <>
      {data && data.length > 0 && (
        <View style={styles.sectionContainer}>
          <Text
            style={[
              styles.sectionTitle,
              { color: isDarkMode ? COLORS.white : COLORS.black },
            ]}
          >
            {translations[title] || title} {/* Dynamic title */}
          </Text>
          <FlatList
            data={data}
            horizontal
            keyExtractor={(item) => {
              // Ensure each item has a unique key
              const itemId =
                item.id ||
                item.place_id ||
                `${title}_${item.name || item.title}`;
              return itemId.toString();
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
    <SafeAreaView
      style={[
        reusable.container,
        {
          backgroundColor: isDarkMode
            ? COLORS.darkBackground
            : COLORS.lightBackground,
        },
      ]}
    >
      <SearchInput
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        placeholder={translations.searchPlaceholder} // Dynamic placeholder
      />
      <TypeTabs selectedType={selectedType} onSelectType={setSelectedType} />

      {loading ? (
        <Text style={styles.loadingText}>
          {translations.loading || "Loading..."}
        </Text>
      ) : (
        <ScrollView>
          {Object.entries(results).map(
            ([key, value]) =>
              (selectedType === "all" || selectedType === key) &&
              renderSection(key, value)
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Search;

import React, { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as api from "../../services/apiService";
import ReusableTile from "../../components/Reusable/ReusableTile";
import styles from "./search.style";
import reusable from "../../components/Reusable/reusable.style";
import { debounce } from "../../util/debounce";
import SearchInput from "../../components/Serach&Filter/SerachInput";
import TypeTabs from "../../components/Serach&Filter/TypeTabs";
import { useTheme } from "../../store/context/ThemeContext";
import { useLanguage } from "../../store/context/LanguageContext";
import { COLORS, TEXT } from "../../constants/theme";
import ReusableText from "../../components/Reusable/ReusableText";

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
  // ✅ Ensure Hooks Are Always in the Same Order
  const { mode } = useTheme();
  const isDarkMode = mode === "dark";
  const { translations, language } = useLanguage();
  const [searchKey, setSearchKey] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

  // ✅ Optimize Search Function to Prevent Unnecessary Re-renders
  const performSearch = useCallback(
    debounce(async (key) => {
      if (!key.trim()) {
        setResults({});
        return;
      }

      setLoading(true);
      const allResults = {};

      try {
        const searchPromises = endpoints.map(({ key, fn }) =>
          fn(key, language) // ✅ Pass key directly
            .then((data) => ({ key, data }))
            .catch((error) => {
              console.error(`Error fetching ${key}:`, error);
              return { key, data: [] };
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
        setLoading(false);
      }
    }, 500),
    [language] // ✅ Avoid frequent re-renders
  );

  // ✅ Ensure Hooks Are Called in the Same Order
  useEffect(() => {
    if (searchKey.trim() !== "") {
      performSearch(searchKey);
    }
  }, [searchKey]); // ✅ Only depend on `searchKey`

  const renderSection = (title, data) => (
    <>
      {data && data.length > 0 && (
        <View style={styles.sectionContainer}>
          <ReusableText
            text={translations[title] || title}
            family={"SemiBold"}
            size={TEXT.medium}
            color={isDarkMode ? COLORS.white : COLORS.black}
            style={styles.sectionTitle}
          />
          <FlatList
            data={data}
            horizontal
            keyExtractor={(item, index) =>
              item.id ? item.id.toString() : `${title}_${index}`
            } // ✅ Ensure unique keys
            renderItem={({ item }) => (
              <ReusableTile
                item={item}
                imageUri={
                  item.image || "https://your-default-image-url.com/default.jpg"
                }
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
                      navigation.navigate("TripDetails", { id: item.id });
                      break;
                    case "guideTrips":
                      navigation.navigate("GuideTripDetails", { id: item.id });
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
          backgroundColor: isDarkMode ? COLORS.navey : COLORS.lightBackground,
        },
      ]}
    >
      <SearchInput
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        placeholder={translations.searchPlaceholder}
      />
      <TypeTabs selectedType={selectedType} onSelectType={setSelectedType} />

      {loading ? (
        <Text style={styles.loadingText}>
          <ReusableText
            text={translations.loading || "Loading..."}
            family={"Bold"}
            size={TEXT.large}
            color={COLORS.black}
            style={{ letterSpacing: 1 }}
          />
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

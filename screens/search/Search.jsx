import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { TEXT, COLORS } from "../../constants/theme";
import { useRoute } from "@react-navigation/native";
import { useTheme } from "../../store/context/ThemeContext";
import { useLanguage } from "../../store/context/LanguageContext";
import translations from "../../translations/translations";
import SearchTrips from "../../components/Serach&Filter/SearchTrips";
import SearchPlans from "../../components/Serach&Filter/SearchPlans";
import SearchPlaces from "../../components/Serach&Filter/SearchPlaces";
import SearchEvents from "../../components/Serach&Filter/SearchEvents";
import SearchUseres from "../../components/Serach&Filter/SearchUseres";
import SearchVolunteers from "../../components/Serach&Filter/SearchVolunteers";
import SearchGuideTrips from "../../components/Serach&Filter/SearchGuideTrips";
import { FontAwesome5 } from "react-native-vector-icons";
import axios from "axios";
import BASE_URL from "../../hook/apiConfig";
import { debounce } from "../../util/debounce";
import SearchInput from "../../components/Serach&Filter/SearchInput";
import TypeTabs from "../../components/Serach&Filter/TypeTabs";
import styles from "./search.style";

const Search = () => {
  const { mode } = useTheme();
  const { language } = useLanguage();
  const route = useRoute();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState(1); // Using numeric IDs now
  const [results, setResults] = useState({
    all: [],
    places: [],
    trips: [],
    events: [],
    plans: [],
    volunteering: [],
    guideTrips: [],
    users: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true); // Track first screen load

  const currentLanguage = language || "en";

const performSearch = debounce(async (query) => {
  if (!query.trim()) {
    setResults({
      all: [],
      places: [],
      trips: [],
      events: [],
      plans: [],
      volunteering: [],
      guideTrips: [],
      users: [],
    });
    setSearchPerformed(false);
    return;
  }

  setSearchPerformed(true);
  setFirstLoad(false);
  setLoading(true);

  try {
    const response = await axios.get(`${BASE_URL}/all/search`, {
      params: { query },
      headers: {
        "Content-Language": language,
        "X-API-KEY": "DISCOVERJO91427",
      },
    });

    const usersData = response.data?.data?.users?.data || []; // ✅ Fetch users correctly

    const transformedResults = {
      all: [
        ...(response.data?.data?.places?.data || []),
        ...(response.data?.data?.trips?.data || []),
        ...(response.data?.data?.events?.data || []),
        ...(response.data?.data?.plans?.data || []),
        ...(response.data?.data?.volunteering?.data || []),
        ...(response.data?.data?.guide_trips?.data || []),
        ...usersData, // ✅ Ensure users are included in 'all'
      ],
      places: response.data?.data?.places?.data || [],
      trips: response.data?.data?.trips?.data || [],
      events: response.data?.data?.events?.data || [],
      plans: response.data?.data?.plans?.data || [],
      volunteering: response.data?.data?.volunteering?.data || [],
      guideTrips: response.data?.data?.guide_trips?.data || [],
      users: usersData, // ✅ Fix: Assigning users correctly to the 'users' tab
    };

    setResults(transformedResults);
    setError(null);
  } catch (error) {
    console.error("Search error:", error);
    setError(translations[currentLanguage].searchError || "Search failed");
    setResults({
      all: [],
      places: [],
      trips: [],
      events: [],
      plans: [],
      volunteering: [],
      guideTrips: [],
      users: [],
    });
  } finally {
    setLoading(false);
  }
}, 500);



  useEffect(() => {
    performSearch(searchQuery);
  }, [searchQuery]);

  // Skeleton loader component for a better loading experience
  const SkeletonLoader = () => (
    <View style={styles.skeletonContainer}>
      {[1, 2, 3, 4].map((item) => (
        <View key={item} style={styles.skeletonItem}>
          <View style={styles.skeletonImage} />
          <View style={styles.skeletonContent}>
            <View style={styles.skeletonTitle} />
            <View style={styles.skeletonText} />
            <View style={styles.skeletonText} />
          </View>
        </View>
      ))}
    </View>
  );

  // Empty state component
  const EmptyResultsView = () => (
    <View style={styles.emptyContainer}>
      <FontAwesome5
        name="search"
        size={50}
        color={COLORS.gray}
        style={styles.emptyIcon}
      />
      <Text style={styles.noDataText}>
        {translations[currentLanguage].noResults || "No results found"}
      </Text>
      <Text style={styles.noDataSubText}>
        {translations[currentLanguage].tryDifferentSearch ||
          "Try different search terms"}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SearchInput searchKey={searchQuery} setSearchKey={setSearchQuery} />

      <TypeTabs selectedType={selectedType} onSelectType={setSelectedType} />

      {/* Content container with proper flex */}
      <View style={styles.contentContainer}>
        {loading ? (
          <SkeletonLoader />
        ) : (
          <>
            {error && <Text style={styles.errorText}>{error}</Text>}

            {/* Don't show empty state if it's the first time opening the screen */}
            {!firstLoad && searchPerformed && results.all.length === 0 && (
              <EmptyResultsView />
            )}

            {/* First load welcome message */}
            {firstLoad && (
              <View style={styles.welcomeContainer}>
                <FontAwesome5
                  name="compass"
                  size={60}
                  color={COLORS.primary}
                  style={styles.welcomeIcon}
                />
                <Text style={styles.welcomeText}>
                  {translations[currentLanguage].searchWelcome ||
                    "Search for places, trips, events and more"}
                </Text>
              </View>
            )}

            {/* Search results */}
            {!firstLoad && searchPerformed && results.all.length > 0 && (
              <View style={styles.resultContainer}>
                {selectedType === 1 && <SearchPlaces places={results.all} />}
                {selectedType === 2 && <SearchPlaces places={results.places} />}
                {selectedType === 3 && <SearchTrips trips={results.trips} />}
                {selectedType === 4 && <SearchEvents events={results.events} />}
                {selectedType === 5 && <SearchPlans plans={results.plans} />}
                {selectedType === 6 && (
                  <SearchVolunteers volunteers={results.volunteering} />
                )}
                {selectedType === 7 && (
                  <SearchGuideTrips guideTrips={results.guideTrips} />
                )}
                {selectedType === 8 && (
                  <SearchUseres users={results.users} /> 
                )}
              </View>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default Search;

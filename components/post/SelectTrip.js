import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  Keyboard,
  Platform,
  NativeModules,
} from "react-native";
import axios from "axios";
import { COLORS, TEXT } from "../../constants/theme";
import ReusableText from "../Reusable/ReusableText";
import BASE_URL from "../../hook/apiConfig";

const SelectTrip = ({
  label,
  iconSource,
  iconSource2,
  onValueChange,
  value,
  width = 300,
}) => {
  const [selectedTrip, setSelectedTrip] = useState(value);
  const [searchQuery, setSearchQuery] = useState("");
  const [trips, setTrips] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const deviceLanguage =
    Platform.OS === "ios"
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;

  const language = deviceLanguage.includes("_")
    ? deviceLanguage.split("_")[0]
    : deviceLanguage.split("-")[0];

  const fetchTrips = async (query, page = 1) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/all/trip/search`, {
        params: { query, page },
        headers: { "Content-Language": language },
      });

      if (response.status === 200 && response.data?.data.trips) {
        const newTrips =
          page === 1
            ? response.data.data.trips
            : [...trips, ...response.data.data.trips];
        setTrips(newTrips);
        setNextPageUrl(response.data.data.pagination.next_page_url);
      } else {
        setTrips([]);
      }
    } catch (error) {
      console.error("Error fetching trips:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isDropdownVisible) {
      fetchTrips(searchQuery);
    }
  }, [searchQuery, isDropdownVisible]);

  const loadMoreTrips = () => {
    if (nextPageUrl && !isLoading) {
      setPage(page + 1);
      fetchTrips(searchQuery, page + 1);
    }
  };

  const handleValueChange = (trip) => {
    setSelectedTrip(trip.name);
    setSearchQuery(trip.name);
    setIsDropdownVisible(false);
    Keyboard.dismiss();
    if (onValueChange) {
      onValueChange(trip.id);
    }
  };

  const handleBlur = () => {
    setIsDropdownVisible(false);
  };

  return (
    <View style={[styles.container]}>
      <ReusableText
        text={label}
        family={"Regular"}
        size={TEXT.medium}
        color={COLORS.dark}
      />
      <View style={styles.pickerWrapper}>
        <Image source={iconSource} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Search for a trip..."
          placeholderTextColor={COLORS.gray}
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            setPage(1);
            setIsDropdownVisible(true);
          }}
          onFocus={() => setIsDropdownVisible(true)}
          onBlur={handleBlur}
        />
        <Image source={iconSource2} style={styles.icon2} />
      </View>
      {isDropdownVisible && trips.length > 0 && (
        <FlatList
          data={trips}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleValueChange(item)}>
              <View style={styles.dropdownItem}>
                <Text>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          style={styles.dropdown}
          onEndReached={loadMoreTrips}
          onEndReachedThreshold={0.5}
          ListFooterComponent={isLoading && <Text>Loading more...</Text>}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginLeft: 5,
  },
  pickerWrapper: {
    height: 15,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#8D8D8D",
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 5,
  },
  icon2: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  dropdown: {
    maxHeight: 250,
    borderColor: COLORS.lightGray,
    borderWidth: 1,
    backgroundColor: COLORS.white,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
});

export default SelectTrip;

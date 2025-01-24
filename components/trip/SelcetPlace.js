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

const SelectPlace = ({
  label,
  iconSource,
  iconSource2,
  onValueChange,
  value,
  width = 300,
}) => {
  const [selectedPlace, setSelectedPlace] = useState(value);
  const [searchQuery, setSearchQuery] = useState("");
  const [places, setPlaces] = useState([]);
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

  const fetchPlaces = async (query, page = 1) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/all/places/search`, {
        params: {
          query: query,
          lng: 35.852924,
          lat: 31.849737,
          page: page,
        },
        headers: {
          "Content-Language": language,
          "X-API-KEY": "DISCOVERJO91427", // Set the language header
        },
      });

      if (
        response.status === 200 &&
        response.data &&
        response.data.data.places
      ) {
        const newPlaces =
          page === 1
            ? response.data.data.places
            : [...places, ...response.data.data.places];
        setPlaces(newPlaces);
        setNextPageUrl(response.data.data.pagination.next_page_url);
      } else {
        setPlaces([]);
      }
    } catch (error) {
      console.error("Error fetching places:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isDropdownVisible) {
      fetchPlaces(searchQuery);
    }
  }, [searchQuery, isDropdownVisible]);

  const loadMorePlaces = () => {
    if (nextPageUrl && !isLoading) {
      setPage(page + 1);
      fetchPlaces(searchQuery, page + 1);
    }
  };

  const handleValueChange = (place) => {
    setSelectedPlace(place.name);
    setSearchQuery(place.name);
    setIsDropdownVisible(false);
    Keyboard.dismiss(); // Dismiss the keyboard after selecting a place
    if (onValueChange) {
      onValueChange(place.id);
    }
  };

  const handleBlur = () => {
    setIsDropdownVisible(false); // Hide dropdown when input loses focus
  };

  const pickerWidth = typeof width === "number" ? width : 300;

  return (
    <View style={[styles.container, { width: pickerWidth + 10 }]}>
      <ReusableText
        text={label}
        family={"Regular"}
        size={TEXT.medium}
        color={COLORS.dark} // Set label color to COLORS.dark
      />
      <View style={[styles.pickerWrapper, { width: pickerWidth }]}>
        <Image source={iconSource} style={styles.icon} />
        <TextInput
          style={[pickerSelectStyles.inputIOS]}
          placeholder="Search for a place..."
          placeholderTextColor={COLORS.gray} // Set placeholder color to COLORS.gray
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            setPage(1); // Reset to first page on new search
            setIsDropdownVisible(true); // Show dropdown when user types
          }}
          onFocus={() => setIsDropdownVisible(true)}
          onBlur={handleBlur} // Handle input blur
        />
        <Image source={iconSource2} style={styles.icon2} />
      </View>
      {isDropdownVisible && places.length > 0 && (
        <FlatList
          data={places}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleValueChange(item)}>
              <View style={styles.dropdownItem}>
                <Text>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          style={styles.dropdown}
          onEndReached={loadMorePlaces}
          onEndReachedThreshold={0.5}
          ListFooterComponent={isLoading && <Text>Loading more...</Text>}
          keyboardShouldPersistTaps="handled" // To ensure the dropdown works correctly with the keyboard
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
    height: 35,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#8D8D8D",
    borderStyle: "solid",
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: COLORS.black,
  },
  inputAndroid: {
    flex: 1,
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: COLORS.black,
  },
});

export default SelectPlace;

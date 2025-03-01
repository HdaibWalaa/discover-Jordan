import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  Modal,
  ActivityIndicator,
  Platform,
  NativeModules,
} from "react-native";
import axios from "axios";
import { COLORS, TEXT } from "../../constants/theme";
import ReusableText from "../Reusable/ReusableText";
import BASE_URL from "../../hook/apiConfig";
import { useLanguage } from "../../store/context/LanguageContext";
import translations from "../../translations/translations";

const SelectPlace = ({
  label,
  iconSource,
  iconSource2,
  onValueChange,
  value,
  placeName, // ✅ Default place name from API
  width = 300,
}) => {
  const { language } = useLanguage();
  const localizedText = translations[language] || translations["en"];

  const [selectedPlaceName, setSelectedPlaceName] = useState(placeName || "");
  const [selectedPlaceId, setSelectedPlaceId] = useState(value);
  const [searchQuery, setSearchQuery] = useState("");
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // ✅ Detect device language (fallback to app language)
  const deviceLanguage =
    Platform.OS === "ios"
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;

  let systemLanguage = deviceLanguage.includes("_")
    ? deviceLanguage.split("_")[0]
    : deviceLanguage.split("-")[0];

  systemLanguage = systemLanguage || "en"; // Default to English if undefined
  const selectedLanguage = language || systemLanguage; // Use app-selected or system language

  // ✅ Fetch places from API
  const fetchPlaces = async (query = "") => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/all/places/search`, {
        params: { query, lng: 35.852924, lat: 31.849737 },
        headers: {
          "Content-Language": selectedLanguage,
          "X-API-KEY": "DISCOVERJO91427",
        },
      });

      if (response.status === 200 && response.data?.data?.places) {
        setPlaces(response.data.data.places);
      } else {
        setPlaces([]);
      }
    } catch (error) {
      console.error("Error fetching places:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Fetch places when modal opens (if not already loaded)
  useEffect(() => {
    if (isModalVisible && places.length === 0) {
      fetchPlaces();
    }
  }, [isModalVisible]);

  // ✅ Fetch places dynamically when the search query changes
  useEffect(() => {
    if (searchQuery.length >= 2) {
      fetchPlaces(searchQuery);
    } else if (searchQuery === "") {
      fetchPlaces(); // Reset to default places when cleared
    }
  }, [searchQuery]);

  // ✅ Handle place selection
  const handlePlaceSelect = (place) => {
    setSelectedPlaceName(place.name);
    setSelectedPlaceId(place.id);
    setIsModalVisible(false);
    setSearchQuery(""); // Reset search after selection
    setPlaces([]); // Clear the list

    if (onValueChange) {
      onValueChange(place.id);
    }
  };

  return (
    <View style={[styles.container, { width: width + 10 }]}>
      <ReusableText
        text={localizedText[label] || label}
        family={"Regular"}
        size={TEXT.medium}
        color={COLORS.dark}
      />
      {/* ✅ Click to open the modal */}
      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <View style={[styles.pickerWrapper, { width }]}>
          <Image source={iconSource} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Select a place..."
            placeholderTextColor={COLORS.gray}
            value={selectedPlaceName} // ✅ Show actual place name
            editable={false}
          />
          <Image source={iconSource2} style={styles.icon2} />
        </View>
      </TouchableOpacity>

      {/* ✅ Modal for selecting a place */}
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search places..."
              placeholderTextColor={COLORS.gray}
              value={searchQuery}
              onChangeText={setSearchQuery} // ✅ Search dynamically
            />
            {isLoading ? (
              <ActivityIndicator size="large" color={COLORS.primary} />
            ) : (
              <FlatList
                data={places}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handlePlaceSelect(item)}>
                    <View style={styles.placeItem}>
                      <Text style={styles.placeName}>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginLeft: 5,
  },
  pickerWrapper: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
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
  input: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 10,
    color: COLORS.black,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    maxHeight: "70%",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 15,
  },
  searchInput: {
    fontSize: 16,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    marginBottom: 10,
  },
  placeItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  placeName: {
    fontSize: 16,
    color: COLORS.black,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    borderRadius: 5,
  },
  closeText: {
    color: COLORS.white,
    fontSize: 16,
  },
});

export default SelectPlace;

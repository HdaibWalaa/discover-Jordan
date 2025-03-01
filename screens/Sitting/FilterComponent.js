import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import styles from "./FilterComponent.styles";
import useFetchFilterPlaces from "../../hook/places/fetchFiltePlaces";

const FilterComponent = () => {
  const {
    places,
    categories,
    subcategories,
    regions,
    features,
    fetchPlaces,
    fetchCategories,
    fetchSubcategories,
    fetchRegions,
    fetchFeatures,
  } = useFetchFilterPlaces();

  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [minCost, setMinCost] = useState("");
  const [maxCost, setMaxCost] = useState("");
  const [minRate, setMinRate] = useState("");
  const [maxRate, setMaxRate] = useState("");

  const [showDropdowns, setShowDropdowns] = useState({
    region: false,
    category: false,
    subcategory: false,
    feature: false,
  });

  useEffect(() => {
    fetchCategories();
    fetchRegions();
    fetchFeatures();
  }, []);

  useEffect(() => {
    if (selectedCategories.length > 0) {
      fetchSubcategories(selectedCategories);
    }
  }, [selectedCategories]);

  const toggleSelection = (id, selectedList, setSelectedList) => {
    setSelectedList((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

const handleFilter = async () => {
  try {
    const response = await fetchPlaces({
      region: selectedRegion,
      categoriesId: selectedCategories,
      subcategoriesId: selectedSubcategories,
      featuresId: selectedFeatures,
      minCost: minCost || "",
      maxCost: maxCost || "",
      minRate: minRate || "",
      maxRate: maxRate || "",
    });

    // ✅ Ensure places are retrieved before navigating
    if (response?.places?.length) {
      navigation.navigate("PlacesList", {
        filteredPlaces: response.places,
        isFiltered: true, // ✅ Indicate that filtering was applied
      });
    } else {
      Alert.alert("No Results", "No places found with these filters.");
    }
  } catch (error) {
    console.error("Error filtering places:", error);
    Alert.alert("Error", "Something went wrong while filtering.");
  }
};



  const renderPlaceItem = ({ item }) => (
    <View style={styles.placeCard}>
      <Image source={{ uri: item.image }} style={styles.placeImage} />
      <View style={styles.placeDetailsContainer}>
        <Text style={styles.placeName}>{item.name}</Text>
        <Text style={styles.placeDetails}>
          {item.region} - {item.address}
        </Text>
        <Text style={styles.placeRating}>
          ⭐ {item.rating} ({item.total_ratings} Reviews)
        </Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderPlaceItem}
      ListHeaderComponent={
        <View>
          {/* Region Selection */}
          <TouchableOpacity
            onPress={() =>
              setShowDropdowns({
                ...showDropdowns,
                region: !showDropdowns.region,
              })
            }
            style={styles.dropdown}
          >
            <Text style={styles.dropdownText}>
              {selectedRegion
                ? `Region: ${
                    regions.find((r) => r.id === selectedRegion)?.name
                  }`
                : "Select Region"}
            </Text>
          </TouchableOpacity>
          {showDropdowns.region && (
            <FlatList
              data={regions}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => setSelectedRegion(item.id)}
                >
                  <Text style={styles.dropdownText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          )}

          {/* Category Selection */}
          <TouchableOpacity
            onPress={() =>
              setShowDropdowns({
                ...showDropdowns,
                category: !showDropdowns.category,
              })
            }
            style={styles.dropdown}
          >
            <Text style={styles.dropdownText}>
              {selectedCategories.length > 0
                ? `${selectedCategories.length} Categories Selected`
                : "Select Categories"}
            </Text>
          </TouchableOpacity>
          {showDropdowns.category && (
            <FlatList
              data={categories}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() =>
                    toggleSelection(
                      item.id,
                      selectedCategories,
                      setSelectedCategories
                    )
                  }
                >
                  <Text style={styles.dropdownText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          )}

          {/* Subcategory Selection */}
          <TouchableOpacity
            onPress={() =>
              setShowDropdowns({
                ...showDropdowns,
                subcategory: !showDropdowns.subcategory,
              })
            }
            style={styles.dropdown}
          >
            <Text style={styles.dropdownText}>
              {selectedSubcategories.length > 0
                ? `${selectedSubcategories.length} Subcategories Selected`
                : "Select Subcategories"}
            </Text>
          </TouchableOpacity>
          {showDropdowns.subcategory && (
            <FlatList
              data={subcategories}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() =>
                    toggleSelection(
                      item.id,
                      selectedSubcategories,
                      setSelectedSubcategories
                    )
                  }
                >
                  <Text style={styles.dropdownText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          )}

          {/* Feature Selection */}
          <TouchableOpacity
            onPress={() =>
              setShowDropdowns({
                ...showDropdowns,
                feature: !showDropdowns.feature,
              })
            }
            style={styles.dropdown}
          >
            <Text style={styles.dropdownText}>
              {selectedFeatures.length > 0
                ? `${selectedFeatures.length} Features Selected`
                : "Select Features"}
            </Text>
          </TouchableOpacity>
          {showDropdowns.feature && (
            <FlatList
              data={features}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() =>
                    toggleSelection(
                      item.id,
                      selectedFeatures,
                      setSelectedFeatures
                    )
                  }
                >
                  <Text style={styles.dropdownText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          )}

          {/* Cost & Rating Inputs */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Min Cost"
              keyboardType="numeric"
              value={minCost}
              onChangeText={setMinCost}
            />
            <TextInput
              style={styles.input}
              placeholder="Max Cost"
              keyboardType="numeric"
              value={maxCost}
              onChangeText={setMaxCost}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Min Rate"
              keyboardType="numeric"
              value={minRate}
              onChangeText={setMinRate}
            />
            <TextInput
              style={styles.input}
              placeholder="Max Rate"
              keyboardType="numeric"
              value={maxRate}
              onChangeText={setMaxRate}
            />
          </View>

          {/* Filter Button */}
          <TouchableOpacity onPress={handleFilter} style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Filter</Text>
          </TouchableOpacity>
          {/* ✅ Show "No Places Found" when there are no results */}
          {places.length === 0 && (
            <View style={styles.noPlacesContainer}>
              <Text style={styles.noPlacesText}>No places found</Text>
            </View>
          )}
        </View>
      }
    />
  );
};

export default FilterComponent;

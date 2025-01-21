import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  FlatList,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import styles from "./PlaceForLocation.styles";
import useFetchPlaceForLocation from "../../hook/places/fetchPlaceForLocation";
import { ReusableText } from "../../components";
import { COLORS, TEXT } from "../../constants/theme";
import reusable from "../../components/Reusable/reusable.style";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const PlaceForLocation = () => {
  const navigation = useNavigation();
  const {
    places,
    categories,
    subcategories,
    fetchPlaces,
    fetchCategories,
    fetchSubcategories,
  } = useFetchPlaceForLocation();

  const [area, setArea] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [showCategories, setShowCategories] = useState(false);
  const [showSubcategories, setShowSubcategories] = useState(false);
  const [userLocation, setUserLocation] = useState({
    lat: 31.963158,
    lng: 35.930359,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCategories();
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Error", "Permission to access location was denied.");
          return;
        }
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
      } catch (error) {
        console.error("Error in location or fetching categories:", error);
        Alert.alert("Error", "Something went wrong while fetching data.");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchSubcategories([selectedCategory]).catch((error) => {
        console.error("Error fetching subcategories:", error);
        Alert.alert("Error", "Failed to fetch subcategories.");
      });
    }
  }, [selectedCategory]);

  const handleFetchPlaces = async () => {
    if (!area || !selectedCategory || !selectedSubcategory) {
      Alert.alert("Error", "Please fill in all the fields.");
      return;
    }

    try {
      await fetchPlaces({
        area,
        categoriesId: selectedCategory.toString(),
        subcategoriesId: selectedSubcategory.toString(),
        userLocation,
      });
    } catch (error) {
      console.error("Error fetching places:", error);
      Alert.alert("Error", "Failed to fetch places.");
    }
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.dropdownItem,
        selectedCategory === item.id && styles.selectedItem,
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Image source={{ uri: item.image }} style={styles.dropdownImage} />
      <Text style={styles.dropdownText}>{item.name}</Text>
      {selectedCategory === item.id && <Text style={styles.checkMark}>✔</Text>}
    </TouchableOpacity>
  );

  const renderSubcategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.dropdownItem,
        selectedSubcategory === item.id && styles.selectedItem,
      ]}
      onPress={() => setSelectedSubcategory(item.id)}
    >
      <Image source={{ uri: item.active_image }} style={styles.dropdownImage} />
      <Text style={styles.dropdownText}>{item.name}</Text>
      {selectedSubcategory === item.id && (
        <Text style={styles.checkMark}>✔</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container]}>
      <View style={[reusable.header1]}>
        <View style={{ width: 200 }}>
          <ReusableText
            text={"Show The Places Around You"}
            family={"Bold"}
            size={TEXT.large}
            color={COLORS.black}
            style={{ letterSpacing: 1 }}
          />
        </View>
        <TouchableOpacity
          style={styles.CancelButton}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require("../../assets/images/icons/back.png")}
            style={styles.icon}
            resizeMode="contain"
          />
          <ReusableText
            text={"cancel".toLocaleUpperCase()}
            family={"Bold"}
            size={TEXT.small}
            color={COLORS.black}
            style={{ letterSpacing: 1 }}
          />
        </TouchableOpacity>
      </View>

      <View >
        <TouchableOpacity
          onPress={() => {
            setShowCategories(!showCategories);
            setShowSubcategories(false);
          }}
          style={styles.Catdropdown}
        >
          <View style={styles.dropdownPlaceholder}>
            <ReusableText
              text={
                selectedCategory
                  ? categories.find((cat) => cat.id === selectedCategory)?.name
                  : "Category"
              }
              family={"semiBold"}
              size={TEXT.medium}
              color={COLORS.black}
              align={"center"}
            />
          </View>
        </TouchableOpacity>

        {showCategories && (
          <FlatList
            horizontal
            data={categories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCategory}
            style={styles.dropdownList}
            showsHorizontalScrollIndicator={false}
          />
        )}

        <TouchableOpacity
          onPress={() => {
            setShowSubcategories(!showSubcategories);
            setShowCategories(false);
          }}
          style={styles.Subdropdown}
          disabled={!selectedCategory}
        >
          <View style={styles.dropdownPlaceholder}>
            <ReusableText
              text={
                selectedSubcategory
                  ? subcategories.find((sub) => sub.id === selectedSubcategory)
                      ?.name
                  : "SubCategory"
              }
              family={"semiBold"}
              size={TEXT.medium}
              color={COLORS.black}
              align={"center"}
            />
          </View>
        </TouchableOpacity>

        {showSubcategories && (
          <FlatList
            horizontal
            data={subcategories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderSubcategory}
            style={styles.dropdownList}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter area in km"
        value={area}
        onChangeText={setArea}
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={handleFetchPlaces} style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: userLocation.lat,
          longitude: userLocation.lng,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {places.map((place) => (
          <Marker
            key={place.id}
            coordinate={{
              latitude: parseFloat(place.latitude),
              longitude: parseFloat(place.longitude),
            }}
            title={place.name}
            description={place.region}
          />
        ))}
      </MapView>
    </View>
  );
};

export default PlaceForLocation;

import React, { useEffect, useState, memo, useCallback } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Platform,
  NativeModules,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import fetchCategoryPlace from "../../hook/category/fetchCategoryPlace";
import fetchSubCategoryPlaces from "../../hook/category/fetchSubCategoryPlaces";
import ReusableBackground from "../../components/Reusable/ReusableBackground";
import Subcategory from "../../components/Tiles/category/Subcategory";
import AllPlaces from "../../components/Tiles/Places/AllPlaces";
import { useRoute, useNavigation } from "@react-navigation/native";
import { ReusableText, HeightSpacer } from "../../components";
import { TEXT, COLORS } from "../../constants/theme";
import reusable from "../../components/Reusable/reusable.style";
import * as Location from "expo-location";
import FilterButton from "../../components/Serach&Filter/FilterButton";


const MemoizedSubcategory = memo(Subcategory);
const MemoizedAllPlaces = memo(AllPlaces);

const PlacesList = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [places, setPlaces] = useState([]);
  const [subCategoryPlaces, setSubCategoryPlaces] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [isLoadingSub, setIsLoadingSub] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [categoryName, setCategoryName] = useState(null);

  // Handle location permissions
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  // Get the device language
  const deviceLanguage =
    Platform.OS === "ios"
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;

  let language = deviceLanguage.includes("_")
    ? deviceLanguage.split("_")[0]
    : deviceLanguage.split("-")[0];
  language = language || "en";

  // Fetch places based on category or subcategory
  const { categoryPlaces, isLoading, error, loadMoreData } = fetchCategoryPlace(
    route.params.id,
    language,
    userLocation.latitude,
    userLocation.longitude
  );

  useEffect(() => {
    if (categoryPlaces?.places) {
      if (page === 1) {
        setPlaces(categoryPlaces.places);
        setCategoryName(categoryPlaces.name); // Set category name when first loaded
      } else {
        setPlaces((prevPlaces) => [...prevPlaces, ...categoryPlaces.places]);
      }
    }
  }, [categoryPlaces, page]);

  // Fetch Subcategory Places with Pagination
  const handleSubcategoryPress = async (subcategoryId, pageNum = 1) => {
    setIsLoadingSub(true);
    setSelectedCategory(subcategoryId);
    setPage(1);
    try {
      const { places, pagination, parent } = await fetchSubCategoryPlaces(
        subcategoryId,
        language,
        userLocation.latitude,
        userLocation.longitude,
        pageNum
      );
      setSubCategoryPlaces(places);
      setCategoryName(parent); // Set the category name (parent) when a subcategory is selected
      setPagination(pagination);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingSub(false);
    }
  };

  const handleAllPress = () => {
    setSelectedCategory(null);
    setSubCategoryPlaces(null);
    setPage(1);
    setCategoryName(categoryPlaces.name); // Reset to category name
  };

  // Load more places for both categories and subcategories
  const loadMorePlaces = async () => {
    if (pagination?.next_page_url && !isLoadingMore) {
      setIsLoadingMore(true);
      try {
        const nextPage = page + 1;
        setPage(nextPage);
        if (selectedCategory) {
          const { places: newPlaces } = await fetchSubCategoryPlaces(
            selectedCategory,
            language,
            nextPage,
            userLocation.latitude,
            userLocation.longitude
          );
          setSubCategoryPlaces((prevPlaces) => [...prevPlaces, ...newPlaces]);
        } else {
          loadMoreData(nextPage);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingMore(false);
      }
    }
  };

  const renderSubcategory = useCallback(
    ({ item }) => (
      <MemoizedSubcategory
        item={item}
        onPress={() => handleSubcategoryPress(item.id)}
        selected={selectedCategory === item.id}
      />
    ),
    [selectedCategory]
  );

  const renderAllPlaces = useCallback(
    ({ item }) => <MemoizedAllPlaces item={item} />,
    []
  );

  const getItemLayout = (data, index) => ({
    length: 100,
    offset: 100 * index,
    index,
  });

  return (
    <ReusableBackground>
      <SafeAreaView style={reusable.container}>
        <View>
          <View style={reusable.header1}>
            <View style={{ width: 150 }}>
              {categoryName && (
                <ReusableText
                  text={categoryName || "No Name"}
                  family={"SemiBold"}
                  size={TEXT.large}
                  color={COLORS.black}
                />
              )}
            </View>
            <FilterButton onPress={() => navigation.navigate("PlacesFilter")} />
          </View>
          <HeightSpacer height={20} />
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={handleAllPress}>
              <View
                style={
                  selectedCategory === null
                    ? styles.activeIcon
                    : styles.inactiveIcon
                }
              >
                <Text>All</Text>
              </View>
            </TouchableOpacity>
            {categoryPlaces?.sub_categories && (
              <FlatList
                data={categoryPlaces.sub_categories}
                renderItem={renderSubcategory}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            )}
          </View>
          <HeightSpacer height={10} />
          {isLoadingSub ? (
            <ActivityIndicator size="large" />
          ) : (
            <FlatList
              data={subCategoryPlaces ? subCategoryPlaces : places}
              renderItem={renderAllPlaces}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              numColumns={2}
              ListFooterComponent={
                isLoadingMore ? (
                  <ActivityIndicator size="large" />
                ) : (
                  <View style={{ height: 200 }} />
                )
              }
              showsVerticalScrollIndicator={false}
              onEndReached={loadMorePlaces}
              onEndReachedThreshold={0.5}
              getItemLayout={getItemLayout}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              removeClippedSubviews={true}
              disableVirtualization={false}
              maintainVisibleContentPosition={{
                minIndexForVisible: 0,
              }}
            />
          )}
        </View>
      </SafeAreaView>
    </ReusableBackground>
  );
};

const styles = StyleSheet.create({
  activeIcon: {
    backgroundColor: "#00BCD4",
    padding: 10,
    borderRadius: 20,
  },
  inactiveIcon: {
    backgroundColor: "#E0E0E0",
    padding: 10,
    borderRadius: 20,
  },
});

export default PlacesList;


import React, {
  useEffect,
  useState,
  memo,
  useCallback,
  useContext,
} from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Platform,
  NativeModules,
  Image
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
import { AuthContext } from "../../store/auth-context";

const MemoizedSubcategory = memo(Subcategory);
const MemoizedAllPlaces = memo(AllPlaces);

const PlacesList = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [places, setPlaces] = useState([]);
  const [subCategoryPlaces, setSubCategoryPlaces] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [pagination, setPagination] = useState({});
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [categoryName, setCategoryName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleFilterApply = (filters) => {
    const { categories_id, subcategories_id, area } = filters;

    navigation.navigate("PlaceForLocation", {
      categories_id,
      subcategories_id,
      area,
      lat: userLocation.latitude,
      lng: userLocation.longitude,
    });
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied.");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const deviceLanguage =
    Platform.OS === "ios"
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;

  const language = deviceLanguage.split(/[-_]/)[0] || "en";

  const { categoryPlaces, loadMoreData } = fetchCategoryPlace(
    route.params.id,
    language,
    userLocation.latitude,
    userLocation.longitude,
    token
  );

  useEffect(() => {
    if (categoryPlaces?.places) {
      setPlaces((prevPlaces) =>
        [...prevPlaces, ...categoryPlaces.places].filter(
          (place, index, self) =>
            index === self.findIndex((p) => p.id === place.id)
        )
      );
      setCategoryName(categoryPlaces.name);
      setPagination(categoryPlaces.pagination);
      setIsLoading(false);
    }
  }, [categoryPlaces]);

  const handleSubcategoryPress = async (subCategoryId) => {
    setSelectedSubCategory(subCategoryId);
    setIsLoading(true);

    try {
      const { places, pagination, parent } = await fetchSubCategoryPlaces(
        subCategoryId,
        language,
        1,
        userLocation.latitude,
        userLocation.longitude,
        token
      );
      setSubCategoryPlaces(places);
      setCategoryName(parent || categoryPlaces.name);
      setPagination(pagination);
    } catch (error) {
      console.error("Error fetching subcategory places:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAllPress = () => {
    setSelectedSubCategory(null);
    setSubCategoryPlaces([]);
    setPlaces(categoryPlaces.places);
    setPagination(categoryPlaces.pagination);
    setCategoryName(categoryPlaces.name);
  };

  const loadMorePlaces = async () => {
    if (!pagination.next_page_url || isLoadingMore) return;

    setIsLoadingMore(true);
    try {
      const nextPage = pagination.next_page_url.split("page=")[1].split("&")[0];
      if (selectedSubCategory) {
        const { places: newPlaces } = await fetchSubCategoryPlaces(
          selectedSubCategory,
          language,
          nextPage,
          userLocation.latitude,
          userLocation.longitude,
          token
        );
        setSubCategoryPlaces((prevPlaces) =>
          [...prevPlaces, ...newPlaces].filter(
            (place, index, self) =>
              index === self.findIndex((p) => p.id === place.id)
          )
        );
      } else {
        loadMoreData(nextPage, token);
      }
    } catch (error) {
      console.error("Error loading more places:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const renderSubcategory = useCallback(
    ({ item }) => (
      <MemoizedSubcategory
        item={item}
        isActive={selectedSubCategory === item.id}
        onPress={() => handleSubcategoryPress(item.id)}
      />
    ),
    [selectedSubCategory]
  );

  const renderAllPlaces = useCallback(
    ({ item }) => (
      <MemoizedAllPlaces
        item={item}
        imageUri={item.image || "https://via.placeholder.com/150"}
      />
    ),
    []
  );

  return (
    <ReusableBackground>
      <SafeAreaView style={reusable.container}>
        <View>
          <View style={[reusable.header1, { marginBottom: 20 }]}>
            <View style={{ width: 150 }}>
              <ReusableText
                text={categoryName || "Category"}
                family={"SemiBold"}
                size={TEXT.xLarge}
                color={COLORS.black}
              />
            </View>
            <View style={styles.buttonsContainer}>
              {/* Suggest Place Button */}
              <TouchableOpacity
                style={styles.suggestPlaceButton}
                onPress={() => navigation.navigate("SuggestPlace")}
              >
                <Image
                  source={require("../../assets/images/icons/SuggestPlace.png")}
                  style={styles.buttonIcon}
                />
              </TouchableOpacity>
              {/* Filter Button */}
              <FilterButton
                onPress={() =>
                  navigation.navigate("PlaceForLocation", { token })
                }
              />
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={handleAllPress}>
              <View
                style={
                  selectedSubCategory === null
                    ? styles.activeIcon
                    : styles.inactiveIcon
                }
              >
                <ReusableText
                  text={"All"}
                  family={"SemiBold"}
                  size={TEXT.medium}
                  color={COLORS.black}
                />
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
          {isLoading ? (
            <ActivityIndicator size="large" />
          ) : (
            <FlatList
              data={selectedSubCategory ? subCategoryPlaces : places}
              renderItem={renderAllPlaces}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              numColumns={2}
              ListFooterComponent={
                <View style={{ height: 100 }}>
                  {isLoadingMore && <ActivityIndicator size="large" />}
                </View>
              }
              onEndReached={loadMorePlaces}
              onEndReachedThreshold={0.5}
            />
          )}
        </View>
      </SafeAreaView>
    </ReusableBackground>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    left: 15,
  },
  suggestPlaceButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCD22820",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  buttonIcon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
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

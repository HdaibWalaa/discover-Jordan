import React, { useState, useEffect, useContext } from "react";
import {
  ScrollView,
  Text,
  View,
  Platform,
  NativeModules,
  TouchableOpacity,
  Linking,
  Image,
  Alert,
} from "react-native";
import {
  NetworkImage,
  GoBack,
  ReusableText,
  ReusableRegionLocation,
  RusableWhite,
  HeightSpacer,
} from "../../components/index";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS, SIZES } from "../../constants/theme";
import { useRoute, useNavigation } from "@react-navigation/native";
import fetchPlace from "../../hook/fetchPlace";
import Loader from "../../components/Shimmers/Loader";
import ImageGallery from "../../components/places/imageGallery";
import PlaceStatus from "../../components/places/PlaceStatus";
import PlaceInfoCards from "../../components/places/PlaceInfoCards";
import PlaceFeatures from "../../components/places/PlaceFeatures";
import OpeningHours from "../../components/places/OpeningHoures";
import BottomSection from "../../components/places/BottomSection"; // Import the new component
import axios from "axios";
import * as Location from "expo-location";
import { AuthContext } from "../../store/auth-context";
import styles from "../../components/places/PlaceDetails.styles";
import ImageContainer from "../../components/places/ImageContainer";
import PlaceInfo from "../../components/places/PlaceInfo";

const PlaceDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);

  const deviceLanguage =
    Platform.OS === "ios"
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;

  let language = deviceLanguage.includes("_")
    ? deviceLanguage.split("_")[0]
    : deviceLanguage.split("-")[0];

  language = language || "en";

  const [mainImage, setMainImage] = useState("");
  const [weather, setWeather] = useState(null);
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");

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

      console.log("User Latitude:", location.coords.latitude);
      console.log("User Longitude:", location.coords.longitude);
    })();
  }, []);

  const { placeData, isLoading, error, refetch } = fetchPlace(
    route.params.id,
    language,
    userLocation.latitude,
    userLocation.longitude
  );

  useEffect(() => {
    if (placeData) {
      setMainImage(placeData.image);
    }
  }, [placeData]);

  // Fetch weather based on place's latitude and longitude
  useEffect(() => {
    if (placeData && placeData.latitude && placeData.longitude) {
      const fetchWeather = async () => {
        try {
          const API_KEY = "b601d5067fa04b3b997205706240408";
          const URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${placeData.latitude},${placeData.longitude}&aqi=no`;
          const response = await axios.get(URL);
          setWeather(response.data.current.temp_c);
        } catch (error) {
          console.error("Error fetching weather data: ", error);
        }
      };
      fetchWeather();
    }
  }, [placeData]);

  const formatDescription = (text) => {
    if (!text) return "";

    text = text.replace(/^"|"$/g, "").replace(/^'|'$/g, "");

    text = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

    return text;
  };

  const truncateDescription = (text) => {
    const maxLength = 130;
    if (text.length > maxLength) {
      return `${text.slice(0, maxLength)}... `;
    }
    return text;
  };

  const formattedDescription = formatDescription(placeData?.description || "");

  if (isLoading || !userLocation.latitude || !userLocation.longitude) {
    return <Loader />;
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  if (!placeData) {
    return (
      <View style={{ alignItems: "center", top: 100 }}>
        <Text>Error: Place data not found</Text>
      </View>
    );
  }

  const distance = placeData.distance ? placeData.distance : "N/A"; // Use the distance as is from the API
  const priceLevel =
    placeData.price_level !== null ? placeData.price_level : "N/A";
  const rating =
    placeData.rating !== null ? parseFloat(placeData.rating).toFixed(1) : "N/A";

  const handleDirectionPress = () => {
    if (placeData.google_map_url) {
      Linking.openURL(placeData.google_map_url);
    }
  };

  return (
    <RusableWhite>
      <ImageContainer
        mainImage={mainImage}
        placeData={placeData}
        handleDirectionPress={handleDirectionPress}
        refetch={refetch}
      />
      <ImageGallery images={placeData.gallery} onSelectImage={setMainImage} />

      <ScrollView style={styles.scrollContent}>
        <PlaceInfo placeData={placeData} />
        <View style={styles.contentContainer}>
          <PlaceInfoCards
            distance={distance}
            priceLevel={priceLevel}
            rating={rating}
            weather={weather}
          />
          <OpeningHours openingHours={placeData.opening_hours} />
          <View style={styles.separator} />
          <PlaceFeatures features={placeData.features} />
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === "posts" && styles.activeTab]}
              onPress={() => setActiveTab("posts")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "posts" && styles.activeTabText,
                ]}
              >
                Posts
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === "reviews" && styles.activeTab]}
              onPress={() => setActiveTab("reviews")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "reviews" && styles.activeTabText,
                ]}
              >
                Reviews
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tabContent}>
            {activeTab === "posts" ? (
              <Text>NO POSTS YET</Text>
            ) : (
              <Text>NO REVIEW YET</Text>
            )}
          </View>
          <HeightSpacer height={hp("8%")} />
        </View>
      </ScrollView>

      <BottomSection
        favorite={placeData.favorite}
        placeId={placeData.id}
        visited={placeData.visited}
        refresh={refetch}
      />
    </RusableWhite>
  );
};

export default PlaceDetails;

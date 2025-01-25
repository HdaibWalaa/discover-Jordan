import React, { useContext, useState, useEffect } from "react";
import { View, ImageBackground, StyleSheet, Alert } from "react-native";
import * as Location from "expo-location";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { COLORS } from "../../constants/theme";
import { AuthContext } from "../../store/auth-context";
import SearchBar from "./Search";
import ProfileIcon from "./Profile";
import LocationComponent from "./Location";
import NotificationIcon from "../../navigation/NotificationNavigator";
import SideMenu from "../../navigation/MainStackNavigator";
import { setUserLocation, getUserProfile } from "../../util/auth";
import { useNavigation } from "@react-navigation/native";

// Function to translate city and country names to Arabic
const translateToArabic = (city, country) => {
  const arabicTranslations = {
    "San Francisco": "سان فرانسيسكو",
    "United States of America": "الولايات المتحدة الأمريكية",
  };

  const cityAr = arabicTranslations[city] || city;
  const countryAr = arabicTranslations[country] || country;

  return `${cityAr}، ${countryAr}`;
};

// Header Component
const Header = ({ route }) => {
  const authCtx = useContext(AuthContext);
  const isAuthenticated = authCtx.isAuthenticated;
  const navigation = useNavigation();
  const [userAvatar, setUserAvatar] = useState("");
  const [location, setLocation] = useState("Press to save address");
  let rateLimitTimeout = null;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileData = await getUserProfile(authCtx.token);
        setUserAvatar(profileData.data.avatar);

        const profileAddress = profileData.data.address || null;
        if (profileAddress) {
          setLocation(profileAddress);
        } else {
          const city = profileData.data.city || "Unknown City";
          const country = profileData.data.countryName || "Unknown Country";
          setLocation(`${city}, ${country}`);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (isAuthenticated) {
      fetchUserProfile();
    }
  }, [authCtx.token, isAuthenticated]);

  const handleSetLocation = async () => {
    if (rateLimitTimeout) {
      Alert.alert("Rate Limited", "Please wait a moment and try again.");
      return;
    }

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Required", "Please allow location access.");
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = coords;

      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );
      const data = await response.json();

      const city = data.city || "Unknown City";
      const country = data.countryName || "Unknown Country";

      const sanitizedCountry = country.replace(/\s*\(.*?\)\s*/g, "").trim();
      const addressAr = translateToArabic(city, sanitizedCountry);
      const addressEn = `${city}, ${sanitizedCountry}`;

      setLocation(addressEn);

      await setUserLocation(longitude, latitude, addressAr, addressEn, authCtx.token);

      console.log("Location updated successfully.");
      Alert.alert("Success", "Your location has been updated.");
    } catch (error) {
      if (error.response?.status === 429) {
        const retryAfter = parseInt(error.response.headers["retry-after"], 10) * 1000;
        rateLimitTimeout = setTimeout(() => {
          rateLimitTimeout = null;
        }, retryAfter);
        Alert.alert("Rate Limited", `Please wait ${retryAfter / 1000} seconds.`);
      } else {
        console.error("Error updating location:", error.message);
        Alert.alert("Error", "Unable to update location.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <ImageBackground
          source={require("../../assets/images/header1.png")}
          style={styles.headerImage}
          imageStyle={{ resizeMode: "cover" }}
        >
          <View style={styles.TopHeader}>
            <View style={styles.LeftRow}>
              <SideMenu onPress={() => console.log("Menu pressed")} />
              <LocationComponent location={location} onPress={handleSetLocation} />
            </View>
            <View style={styles.RightRow}>
              {isAuthenticated && (
                <NotificationIcon
                  onPress={() => navigation.navigate("Notification")}
                />
              )}
              <ProfileIcon
                avatar={userAvatar}
                onPress={() => navigation.navigate("Profile")}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
      <SearchBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  headerWrapper: {
    borderBottomLeftRadius: hp(3.5),
    borderBottomRightRadius: hp(3.5),
    overflow: "hidden",
    width: "100%",
  },
  headerImage: {
    width: "100%",
    height: hp(20),
  },
  TopHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(7),
    paddingTop: hp(8),
  },
  LeftRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  RightRow: {
    flexDirection: "row",
    alignItems: "center",
    right: wp(9),
    top: hp(0.5),
  },
});

export default Header;

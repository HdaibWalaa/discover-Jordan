import React, { useContext, useState, useEffect } from "react";
import { View, ImageBackground, StyleSheet, Alert } from "react-native";
import * as Location from "expo-location";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "../../constants/theme";
import { AuthContext } from "../../store/auth-context";
import SearchBar from "./Search";
import ProfileIcon from "./Profile";
import LocationComponent from "./Location";
import NotificationIcon from "../../navigation/NotificationNavigator";
import SideMenu from "../../navigation/MainStackNavigator";
import { setUserLocation, getUserProfile } from "../../util/auth"; // Import the functions
import { useNavigation } from "@react-navigation/native";


const Header = ({ route }) => {
  const authCtx = useContext(AuthContext);
  const isAuthenticated = authCtx.isAuthenticated;
  const navigation = useNavigation();
  const [userAvatar, setUserAvatar] = useState("");
  const [location, setLocation] = useState(
    route.params?.location || "Press to save address"
  );


useEffect(() => {
  const fetchUserProfile = async () => {
    try {
      const profileData = await getUserProfile(authCtx.token);
      setUserAvatar(profileData.data.avatar);

      // Use the address from the profile if available
      const profileAddress = profileData.data.address || null;
      if (profileAddress) {
        setLocation(profileAddress);
      } else {
        const city =
          profileData.data.city || profileData.data.locality || "Unknown City";
        const country = profileData.data.countryName || "Unknown Country";

        const addressEn = `${city}, ${country}`;
        setLocation(addressEn);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  if (isAuthenticated) {
    fetchUserProfile();
  }
}, [authCtx.token, isAuthenticated]);



const sanitizeCountryName = (countryName) => {
  // Remove any text inside parentheses, e.g., "United States of America (the)"
  return countryName.replace(/\s*\(.*?\)\s*/g, "").trim();
};

const translateToArabic = (city, country) => {
  const arabicTranslations = {
    "San Francisco": "سان فرانسيسكو",
    "United States of America": "الولايات المتحدة الأمريكية",
  };

  const cityAr = arabicTranslations[city] || city; // Use Arabic translation or fallback to original
  const countryAr = arabicTranslations[country] || country;

  return `${cityAr}، ${countryAr}`;
};

const handleSetLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("Permission Required", "Please allow location access.");
    return;
  }

  try {
    const { coords } = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = coords;

    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );
    const data = await response.json();

    let city = data.city || "Unknown City";
    let country = data.countryName || "Unknown Country";

    // Sanitize the country name
    country = sanitizeCountryName(country);

    // Convert to Arabic and English addresses
    const addressAr = translateToArabic(city, country);
    const addressEn = `${city}, ${country}`;

    setLocation(addressEn);

    // Send data to the backend
    console.log("Sending to API:");
    console.log("Longitude:", longitude);
    console.log("Latitude:", latitude);
    console.log("Address (AR):", addressAr);
    console.log("Address (EN):", addressEn);

    const responseApi = await setUserLocation(
      longitude,
      latitude,
      addressAr,
      addressEn,
      authCtx.token
    );

    console.log("API Response:", responseApi);
    Alert.alert(
      "Location Saved",
      "Your address has been updated successfully."
    );
  } catch (error) {
    Alert.alert("Error", "Unable to fetch or save location.");
    console.error(error);
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
              <LocationComponent
                location={location}
                onPress={handleSetLocation}
              />
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

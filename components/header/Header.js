import React, { useContext, useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import AwesomeAlert from "react-native-awesome-alerts";
import { Ionicons } from "@expo/vector-icons";
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
import { setUserLocation, getUserProfile } from "../../util/auth";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../store/context/ThemeContext";
import { useLanguage } from "../../store/context/LanguageContext";
import { LanguageProvider } from "../../store/context/LanguageContext";

const Header = () => {
  const authCtx = useContext(AuthContext);
  const { translations, language, toggleLanguage } = useLanguage(); // Include toggleLanguage
  const { mode } = useTheme();
  const isAuthenticated = authCtx.isAuthenticated;
  const navigation = useNavigation();
  const [userAvatar, setUserAvatar] = useState("");
  const [location, setLocation] = useState(translations.pressToSaveAddress);
  const [showAlert, setShowAlert] = useState(false);

  const headerBackground =
    mode === "dark"
      ? require("../../assets/images/header(dark).png")
      : require("../../assets/images/header1.png"); // Dynamic background

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileData = await getUserProfile(authCtx.token, language); // Pass language
        setUserAvatar(profileData.data.avatar);

        const profileAddress = profileData.data.address || null;
        if (profileAddress) {
          setLocation(profileAddress);
        } else {
          const city = profileData.data.city || translations.unknownCity;
          const country =
            profileData.data.countryName || translations.unknownCountry;
          setLocation(`${city}, ${country}`);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (isAuthenticated) {
      fetchUserProfile();
    }
  }, [authCtx.token, isAuthenticated, language]);

  const handleSetLocation = async () => {
    if (!isAuthenticated) {
      setShowAlert(true); // Show alert
      return;
    }

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert(translations.permissionRequired, translations.allowLocation);
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = coords;

      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=${language}`
      );
      const data = await response.json();

      const city = data.city || translations.unknownCity;
      const country = data.countryName || translations.unknownCountry;

      const address = `${city}, ${country}`;
      setLocation(address);

      await setUserLocation(
        longitude,
        latitude,
        address,
        address,
        authCtx.token
      );

      alert(translations.success, translations.locationUpdated);
    } catch (error) {
      console.error("Error updating location:", error.message);
      alert(translations.error, translations.unableToUpdate);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: mode === "dark" ? COLORS.navey : COLORS.white,
        },
      ]}
    >
      <View style={styles.headerWrapper}>
        <ImageBackground
          source={headerBackground}
          style={styles.headerImage}
          imageStyle={{ resizeMode: "cover" }}
        >
          <View style={styles.TopHeader}>
            <View style={styles.LeftRow}>
              <SideMenu />
              <LocationComponent
                location={location}
                onPress={handleSetLocation}
              />
            </View>
            <View style={styles.RightRow}>
              {isAuthenticated ? (
                <NotificationIcon
                  onPress={() => navigation.navigate("Notification")}
                />
              ) : (
                <TouchableOpacity onPress={toggleLanguage}>
                  <Ionicons
                    name="language-outline"
                    size={24}
                    color={mode === "dark" ? COLORS.white : COLORS.black}
                    style={[styles.languageIcon]}
                  />
                </TouchableOpacity>
              )}
              <ProfileIcon
                avatar={userAvatar}
                onPress={() =>
                  !isAuthenticated
                    ? setShowAlert(true)
                    : navigation.navigate("Profile")
                }
              />
            </View>
          </View>
        </ImageBackground>
      </View>
      <SearchBar />

      {/* Awesome Alert */}
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={translations.joinUsTitle}
        message={translations.joinUsMessage}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText={translations.cancel || "Cancel"}
        confirmText={translations.signup || "Signup"}
        cancelButtonColor={COLORS.grey}
        confirmButtonColor={COLORS.primary}
        onCancelPressed={() => setShowAlert(false)}
        onConfirmPressed={() => {
          setShowAlert(false);
          navigation.navigate("Signup");
        }}
      />
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
    right: wp(5),
    top: hp(0.5),
  },
  languageIcon: {
    borderWidth: 1,
    padding: wp(2),
    borderColor: COLORS.black,
    borderRadius: wp(5),
    marginRight: wp(-9),
  },
});

export default Header;

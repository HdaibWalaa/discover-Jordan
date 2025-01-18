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
    route.params?.location || "Set Location"
  );

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileData = await getUserProfile(authCtx.token);
        setUserAvatar(profileData.data.avatar);
        const city =
          profileData.data.city || profileData.data.locality || "Unknown";
        const country = profileData.data.countryName || "Unknown";
        setLocation(`${city}, ${country}`);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (isAuthenticated) {
      fetchUserProfile();
    }
  }, [authCtx.token, isAuthenticated]);

  const handleSetLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    let { latitude, longitude } = location.coords;

    let response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );
    let data = await response.json();

    const city = data.city || data.locality || "Unknown";
    const country = data.countryName || "Unknown";
    setLocation(`${city}, ${country}`);

    // Save location to backend
    try {
      const locationData = {
        latitude,
        longitude,
      };
      await setUserLocation(locationData, authCtx.token);
      Alert.alert(
        "Location Updated",
        "Your location has been updated successfully."
      );
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to update location. Please try again later."
      );
      console.error("Error updating location:", error);
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

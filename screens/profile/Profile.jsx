import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Platform,
  NativeModules,
  ActivityIndicator,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TopInfo from "./TopInfo";
import UserPosts from "./UserPosts";
import UserTrips from "./UserTrips";
import UserPlans from "./UserPlans";
import { COLORS, SIZES } from "../../constants/theme";
import { ReusableText } from "../../components";
import styles from "./topTab.style";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "../../store/auth-context";
import { getUserProfile } from "../../util/auth";
import FollowersModal from "./FollowersModal";
import { useTheme } from "../../store/context/ThemeContext";
import { useLanguage } from "../../store/context/LanguageContext";
import translations from "../../translations/translations";

const Tab = createMaterialTopTabNavigator();

const Profile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId, isOtherUser } = route.params || {};
  const authCtx = useContext(AuthContext);
  const { mode } = useTheme();
  const { language, setLanguage } = useLanguage();
  const translatedText = translations[language] || translations["en"];

  const deviceLanguage =
    Platform.OS === "ios"
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;

  const detectedLanguage = deviceLanguage
    ? deviceLanguage.split(/[-_]/)[0]
    : "en";

  const currentLanguage = language || detectedLanguage;

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowersModalVisible, setIsFollowersModalVisible] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileId = isOtherUser ? userId : authCtx.userId;
        const userProfile = await getUserProfile(authCtx.token, language); 
        setProfile(userProfile.data);
      } catch (error) {
        Alert.alert(
          translations[language]?.error || "Error",
          translations[language]?.profileFetchError ||
            "An error occurred while fetching the profile."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [authCtx.token, userId, isOtherUser, language]); 

  const handleLogout = async () => {
    try {
      authCtx.logout();
      navigation.reset({
        index: 0,
        routes: [{ name: "Onboarding" }],
      });
    } catch (error) {
      Alert.alert(
        translatedText.error || "Error",
        translatedText.logoutError || "An error occurred during logout."
      );
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color={COLORS.primary} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/images/header1.png")}
        style={styles.headerImage}
        imageStyle={{ resizeMode: "cover" }}
      >
        <View style={styles.headerContent}>
          <View style={styles.iconButtonLeft}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleLogout}
              accessibilityLabel={translatedText.logout || "Logout"}
            >
              <AntDesign
                name="logout"
                size={24}
                color={mode === "dark" ? COLORS.white : COLORS.black}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.buttonRowLeft}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setIsFollowersModalVisible(true)}
              accessibilityLabel={translatedText.followers || "Followers"}
            >
              <Image
                source={require("../../assets/images/icons/followersList.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
            {!isOtherUser && (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => navigation.navigate("EditUserProfile")}
                accessibilityLabel={
                  translatedText.editProfile || "Edit Profile"
                }
              >
                <AntDesign
                  name="edit"
                  size={24}
                  color={mode === "dark" ? COLORS.white : COLORS.black}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.profile}>
          <Image
            source={
              profile?.avatar
                ? { uri: profile.avatar }
                : require("../../assets/images/icons/people.png")
            }
            style={styles.image}
          />
          <ReusableText
            text={`${profile?.first_name || ""} ${profile?.last_name || ""}`}
            family={"Bold"}
            size={SIZES.large}
            color={mode === "dark" ? COLORS.white : COLORS.black}
          />
          <ReusableText
            text={`@${profile?.username || ""}`}
            family={"Regular"}
            size={SIZES.medium}
            color={mode === "dark" ? COLORS.lightGrey : COLORS.black}
          />
        </View>
      </ImageBackground>

      <View style={styles.container}>
        <View style={styles.followContainer}>
          <TouchableOpacity
            style={styles.followBox}
            onPress={() => setIsFollowersModalVisible(true)}
          >
            <Text
              style={[
                styles.followCount,
                mode === "dark" && styles.followCountDark,
              ]}
            >
              {profile?.follower_number}
            </Text>
            <Text
              style={[
                styles.followLabel,
                mode === "dark" && styles.followLabelDark,
              ]}
            >
              {translatedText.followers || "Followers"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.followBox}>
            <Text
              style={[
                styles.followCount,
                mode === "dark" && styles.followCountDark,
              ]}
            >
              {profile?.following_number}
            </Text>
            <Text
              style={[
                styles.followLabel,
                mode === "dark" && styles.followLabelDark,
              ]}
            >
              {translatedText.following || "Following"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
          <Tab.Navigator
            screenOptions={{
              tabBarScrollEnabled: true,
              tabBarStyle: {
                backgroundColor:
                  mode === "dark" ? COLORS.lightGrey : COLORS.white,
              },
              tabBarIndicatorStyle: { backgroundColor: COLORS.primary },
              tabBarLabelStyle: {
                color: mode === "dark" ? COLORS.white : COLORS.black,
              },
            }}
          >
            <Tab.Screen
              name={translatedText.about || "About"}
              component={TopInfo}
              initialParams={{ profile }}
            />
            <Tab.Screen
              name={translatedText.posts || "Posts"}
              component={UserPosts}
              initialParams={{ profile }}
            />
            <Tab.Screen
              name={translatedText.trips || "Trips"}
              component={UserTrips}
              initialParams={{ profile }}
            />
            <Tab.Screen
              name={translatedText.Plans || "PLans"}
              component={UserPlans}
              initialParams={{ profile }}
            />
          </Tab.Navigator>
        </View>
      </View>

      <FollowersModal
        isVisible={isFollowersModalVisible}
        onClose={() => setIsFollowersModalVisible(false)}
        token={authCtx.token}
        userId={authCtx.userId}
      />
    </View>
  );
};

export default Profile;

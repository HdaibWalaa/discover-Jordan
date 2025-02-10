import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Following from "../follow/Following";
import AllPlans from "../plan/AllPlans";
import AllPersonalTrip from "../trips/AllPersonalTrip";
import TopInfo from "./TopInfo";
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
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowersModalVisible, setIsFollowersModalVisible] = useState(false);
  const { mode } = useTheme();
  const { language } = useLanguage();
  const translatedText = translations[language] || translations["en"];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileId = isOtherUser ? userId : authCtx.userId;
        const userProfile = await getUserProfile(authCtx.token, profileId);
        setProfile(userProfile.data);
      } catch (error) {
        Alert.alert("Error", "An error occurred while fetching the profile.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [authCtx.token, userId, isOtherUser]);

  const handleLogout = async () => {
    try {
      authCtx.logout(); // Clear the token
      navigation.reset({
        index: 0,
        routes: [{ name: "Onboarding" }],
      });
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Logout Error", "An error occurred during logout.");
    }
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
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
              accessibilityLabel="Logout"
            >
              <AntDesign name="logout" size={24} color={COLORS.black} />
            </TouchableOpacity>
          </View>

          <View style={styles.buttonRowLeft}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setIsFollowersModalVisible(true)}
              accessibilityLabel="Followers List"
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
                accessibilityLabel="Edit Profile"
              >
                <AntDesign name="edit" size={24} color={COLORS.black} />
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
            text={`${profile?.first_name} ${profile?.last_name}`}
            family={"Bold"}
            size={SIZES.large}
            color={COLORS.black}
          />
          <ReusableText
            text={`@${profile?.username}`}
            family={"Regular"}
            size={SIZES.medium}
            color={COLORS.black}
          />
        </View>
      </ImageBackground>

      <View style={styles.container}>
        <View style={styles.followContainer}>
          <TouchableOpacity
            style={styles.followBox}
            onPress={() => setIsFollowersModalVisible(true)}
          >
            <Text style={styles.followCount}>{profile?.follower_number}</Text>
            <Text style={styles.followLabel}>Followers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.followBox}>
            <Text style={styles.followCount}>{profile?.following_number}</Text>
            <Text style={styles.followLabel}>Following</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
          <Tab.Navigator
            screenOptions={{
              tabBarScrollEnabled: true,
              tabBarStyle: { backgroundColor: COLORS.white },
              tabBarIndicatorStyle: { backgroundColor: COLORS.primary },
              tabBarLabelStyle: { color: COLORS.black },
            }}
          >
            <Tab.Screen
              name="ABOUT"
              component={TopInfo}
              initialParams={{ profile }}
            />
            <Tab.Screen name="POSTS" component={Following} />
            <Tab.Screen name="REVIEW" component={AllPlans} />
            <Tab.Screen name="Trips" component={AllPersonalTrip} />
          </Tab.Navigator>
        </View>
      </View>

      {/* Followers Modal */}
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

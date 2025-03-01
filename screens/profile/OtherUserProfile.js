import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Following from "../follow/Following";
import TopInfo from "./TopInfo";
import { COLORS, SIZES } from "../../constants/theme";
import { ReusableText } from "../../components";
import styles from "./topTab.style";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "../../store/auth-context";
import { useLanguage } from "../../store/context/LanguageContext";
import axios from "axios";
import BASE_URL from "../../hook/apiConfig";
import ProfileSkeleton from "../../components/Skeletons/ProfileSkeleton";

const Tab = createMaterialTopTabNavigator();

const OtherUserProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params || {};
  const authCtx = useContext(AuthContext);
  const { language } = useLanguage();

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    fetchOtherUserProfile();
  }, [userId, language]);

  // Add the missing handleFollow function
  const handleFollow = async () => {
    try {
      if (isFollowing) {
        // Unfollow logic
        const response = await axios.delete(
          `${BASE_URL}/follow/delete/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${authCtx.token}`,
              "X-API-KEY": "DISCOVERJO91427",
              "Content-Language": language || "en",
            },
          }
        );

        if (response.status === 200) {
          setIsFollowing(false);
          // Update follower count
          setProfile((prev) => ({
            ...prev,
            follower_number: Math.max(0, prev.follower_number - 1),
          }));
          Alert.alert("Success", "Unfollowed successfully.");
        } else {
          Alert.alert("Error", "Failed to unfollow user.");
        }
      } else {
        // Follow logic
        const formData = new FormData();
        formData.append("following_id", userId);

        const response = await axios.post(
          `${BASE_URL}/follow/create`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${authCtx.token}`,
              "Content-Type": "multipart/form-data",
              "X-API-KEY": "DISCOVERJO91427",
              "Content-Language": language || "en",
            },
          }
        );

        if (response.status === 200) {
          setIsFollowing(true);
          // Update follower count
          setProfile((prev) => ({
            ...prev,
            follower_number: prev.follower_number + 1,
          }));
          Alert.alert("Success", "Follow request sent successfully.");
        } else {
          Alert.alert("Error", "Failed to send follow request.");
        }
      }
    } catch (error) {
      console.error(
        "Error handling follow action:",
        error.response?.data || error.message
      );
      const errorMessage =
        error.response?.data?.msg?.[0] ||
        "An error occurred while processing your request.";

      Alert.alert("Error", errorMessage);
    }
  };

  const fetchOtherUserProfile = async () => {
    if (!userId) {
      Alert.alert("Error", "User ID is missing");
      navigation.goBack();
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/other/user/profile/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${authCtx.token}`,
            "X-API-KEY": "DISCOVERJO91427",
            "Content-Language": language || "en",
          },
        }
      );

      if (response.status === 200) {
        setProfile(response.data.data);
        setIsFollowing(response.data.data.is_following || false);
      } else {
        Alert.alert("Error", "Failed to load user profile.");
      }
    } catch (error) {
      console.error("Error fetching other user profile:", error);
      Alert.alert("Error", "An error occurred while fetching the profile.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (!profile) {
    return (
      <View style={styles.errorContainer}>
        <AntDesign name="exclamationcircleo" size={50} color={COLORS.red} />
        <Text style={styles.errorText}>User profile not found</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/images/header1.png")}
        style={styles.headerImage}
        imageStyle={{ resizeMode: "cover" }}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.iconButtonLeft}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="arrowleft" size={24} color={COLORS.black} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButtonRight}
            onPress={handleFollow}
          >
            <AntDesign
              name={isFollowing ? "deleteuser" : "adduser"}
              size={24}
              color={COLORS.black}
            />
          </TouchableOpacity>
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
            color={COLORS.black}
          />
          <ReusableText
            text={`@${profile?.username || ""}`}
            family={"Regular"}
            size={SIZES.medium}
            color={COLORS.black}
          />
        </View>
      </ImageBackground>

      <View style={styles.container}>
        <View style={styles.followContainer}>
          <View style={styles.followBox}>
            <Text style={styles.followCount}>
              {profile?.follower_number || 0}
            </Text>
            <Text style={styles.followLabel}>Followers</Text>
          </View>
          <View style={styles.followBox}>
            <Text style={styles.followCount}>
              {profile?.following_number || 0}
            </Text>
            <Text style={styles.followLabel}>Following</Text>
          </View>
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
            <Tab.Screen
              name="POSTS"
              component={Following}
              initialParams={{ userId }}
            />
          </Tab.Navigator>
        </View>
      </View>
    </View>
  );
};

export default OtherUserProfile;

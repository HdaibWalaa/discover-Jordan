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
import axios from "axios"; 
import BASE_URL from "../../hook/apiConfig"; 

const Tab = createMaterialTopTabNavigator();

const OtherUserProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params || {};
  const authCtx = useContext(AuthContext);

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the other user’s profile
  const fetchOtherUserProfile = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/other/user/profile/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${authCtx.token}`,
            "X-API-KEY": "DISCOVERJO91427",
            "Content-Language": language,
          },
        }
      );

      if (response.status === 200) {
        setProfile(response.data.data);
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

 
  const handleAddFriend = async () => {
    try {
      const formData = new FormData();
      formData.append("following_id", userId);

      const response = await axios.post(`${BASE_URL}/follow/create`, formData, {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
          "Content-Type": "multipart/form-data",
          "X-API-KEY": "DISCOVERJO91427",
          "Content-Language": language,
        },
      });

      if (response.status === 200) {
        Alert.alert("Success", "Follow request sent successfully.");
      } else {
        Alert.alert("Error", "Failed to send follow request.");
      }
    } catch (error) {
      console.error(
        "Error sending follow request:",
        error.response?.data || error.message
      );
      const errorMessage =
        error.response?.data?.msg?.[0] ||
        "An error occurred while sending the follow request.";

      Alert.alert("Error", errorMessage);
    }
  };

  useEffect(() => {
    fetchOtherUserProfile();
  }, [userId]);

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
          <TouchableOpacity
            style={styles.iconButtonLeft}
            onPress={() => navigation.goBack()}
            accessibilityLabel="Go Back"
          >
            <AntDesign name="arrowleft" size={24} color={COLORS.black} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButtonRight}
            onPress={handleAddFriend}
            accessibilityLabel="Add Friend"
          >
            <AntDesign name="adduser" size={24} color={COLORS.black} />
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
          <View style={styles.followBox}>
            <Text style={styles.followCount}>{profile?.follower_number}</Text>
            <Text style={styles.followLabel}>Followers</Text>
          </View>
          <View style={styles.followBox}>
            <Text style={styles.followCount}>{profile?.following_number}</Text>
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
            <Tab.Screen name="POSTS" component={Following} />
          </Tab.Navigator>
        </View>
      </View>
    </View>
  );
};

export default OtherUserProfile;

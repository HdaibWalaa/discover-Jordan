import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
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
import { FancyAlert } from "react-native-expo-fancy-alerts";
import axios from "axios"; // Import axios to fetch data
import BASE_URL from "../../hook/apiConfig"; // Add your API configuration

const Tab = createMaterialTopTabNavigator();

const OtherUserProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params || {}; // Get userId from route params
  const authCtx = useContext(AuthContext); // Get auth token from context
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Function to fetch the other user profile from the API
  const fetchOtherUserProfile = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/other/user/profile/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${authCtx.token}`, // Pass the token in the Authorization header
          },
        }
      );

      if (response.status === 200) {
        setProfile(response.data.data); // Extract the profile from `response.data.data`
      } else {
        setAlertMessage("Failed to load user profile.");
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Error fetching other user profile:", error);
      setAlertMessage("An error occurred while fetching the profile.");
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch profile when component is mounted
  useEffect(() => {
    fetchOtherUserProfile();
  }, [userId]);

  const handleAddFriend = async () => {
    try {
      const formData = new FormData();
      formData.append("following_id", userId); // Add the ID of the user to follow

      const response = await axios.post(
        `https://dashboard.discoverjo.com/api/follow/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authCtx.token}`, // Pass your token here
            "Content-Type": "multipart/form-data", // Explicitly specify the content type
          },
        }
      );

      if (response.status === 200) {
        setAlertMessage("Follow request sent successfully.");
        setShowAlert(true);
      } else {
        setAlertMessage("Failed to send follow request.");
        setShowAlert(true);
      }
    } catch (error) {
      console.error(
        "Error sending follow request:",
        error.response?.data || error.message
      );

      const errorMessage =
        error.response?.data?.msg?.[0] ||
        "An error occurred while sending the follow request.";

      setAlertMessage(errorMessage);
      setShowAlert(true);
    }
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      {/* FancyAlert */}
      <FancyAlert
        visible={showAlert}
        icon={
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#FF6F61",
              borderRadius: 50,
              width: "100%",
            }}
          >
            <Text style={{ color: "white", fontSize: 24 }}>🎉</Text>
          </View>
        }
        style={{ backgroundColor: "white" }}
      >
        <Text style={{ marginTop: -16, marginBottom: 32, textAlign: "center" }}>
          {alertMessage}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#FF6F61",
            padding: 10,
            borderRadius: 5,
            marginTop: 10,
          }}
          onPress={() => setShowAlert(false)}
        >
          <Text style={{ color: "white", fontSize: 16 }}>OK</Text>
        </TouchableOpacity>
      </FancyAlert>

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
            family={"Black"}
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

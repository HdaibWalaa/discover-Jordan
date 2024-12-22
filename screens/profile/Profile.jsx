import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Modal,
  FlatList,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Following from "../follow/Following";
import AllPlans from "../plan/AllPlans";
import AllTrip from "../trips/AllTrip";
import TopInfo from "./TopInfo";
import { COLORS, SIZES } from "../../constants/theme";
import { ReusableText } from "../../components";
import styles from "./topTab.style";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "../../store/auth-context";
import { getUserProfile } from "../../util/auth";
import FollowingScreen from "./FollowingScreen";
import FollowersScreen from "./FollowersScreen";

const Tab = createMaterialTopTabNavigator();

const Profile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId, isOtherUser } = route.params || {};
  const authCtx = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowersVisible, setIsFollowersVisible] = useState(false);
  const [isFollowingVisible, setIsFollowingVisible] = useState(false);

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

  const renderFollowingList = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isFollowingVisible}
      onRequestClose={() => setIsFollowingVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Following</Text>
          <FollowingScreen />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsFollowingVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderFollowersList = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isFollowersVisible}
      onRequestClose={() => setIsFollowersVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Followers</Text>
          <FollowersScreen />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsFollowersVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

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
            onPress={handleLogout}
            accessibilityLabel="Logout"
          >
            <AntDesign name="logout" size={24} color={COLORS.black} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButtonRight}
            onPress={() => navigation.navigate("EditProfile")}
            accessibilityLabel="Edit Profile"
          >
            <AntDesign name="edit" size={24} color={COLORS.black} />
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
          <TouchableOpacity
            style={styles.followBox}
            onPress={() => setIsFollowersVisible(true)}
          >
            <Text style={styles.followCount}>{profile?.follower_number}</Text>
            <Text style={styles.followLabel}>Followers</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.followBox}
            onPress={() => setIsFollowingVisible(true)}
          >
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
            <Tab.Screen name="Trips" component={AllTrip} />
          </Tab.Navigator>
        </View>
      </View>

      {/* Render Following List */}
      {renderFollowingList()}

      {/* Render Followers List */}
      {renderFollowersList()}
    </View>
  );
};

export default Profile;

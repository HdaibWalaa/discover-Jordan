import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";
import FollowingScreen from "./FollowingScreen";
import FollowersScreen from "../../screens/profile";

export const LogoutButton = ({ onPress, navigation }) => (
  <TouchableOpacity
    style={styles.iconButtonLeft}
    onPress={() => {
      onPress();
      navigation.reset({
        index: 0,
        routes: [{ name: "Onboarding" }],
      });
    }}
    accessibilityLabel="Logout"
  >
    <AntDesign name="logout" size={24} color={COLORS.black} />
  </TouchableOpacity>
);

export const EditProfileButton = ({ onPress }) => (
  <TouchableOpacity
    style={styles.iconButtonRight}
    onPress={onPress}
    accessibilityLabel="Edit Profile"
  >
    <AntDesign name="edit" size={24} color={COLORS.black} />
  </TouchableOpacity>
);

export const FollowButton = ({ onPress }) => (
  <TouchableOpacity
    style={styles.followButton}
    onPress={onPress}
    accessibilityLabel="Follow"
  >
    <Text style={styles.followButtonText}>Follow</Text>
  </TouchableOpacity>
);

export const FollowRequestButton = ({ onPress }) => (
  <TouchableOpacity
    style={styles.followRequestButton}
    onPress={onPress}
    accessibilityLabel="View Follow Requests"
  >
    <Text style={styles.followRequestButtonText}>Follow Requests</Text>
  </TouchableOpacity>
);

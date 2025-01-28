import React, { useContext, useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { AuthContext } from "../../store/auth-context";
import { getUserProfile } from "../../util/auth";
import { useNavigation } from "@react-navigation/native";
import { useLanguage } from "../../store/context/LanguageContext";
import { useTheme } from "../../store/context/ThemeContext";

const UserInfo = () => {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);
  const isAuthenticated = authCtx.isAuthenticated;
  const { language } = useLanguage(); // Use device language from context
  const { mode } = useTheme(); // Access theme mode
  const isDarkMode = mode === "dark";

  const [userData, setUserData] = useState({
    avatar: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated) {
        try {
          const profileData = await getUserProfile(authCtx.token, language);
          setUserData({
            avatar: profileData.data.avatar || "",
            firstName: profileData.data.first_name,
            lastName: profileData.data.last_name,
            email: profileData.data.email,
          });
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchUserData();
  }, [authCtx.token, isAuthenticated, language]);

  const defaultAvatar = "https://via.placeholder.com/150";
  const avatarSource = userData.avatar
    ? { uri: userData.avatar }
    : { uri: defaultAvatar };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Profile")}
      style={styles.userInfoContainer}
    >
      <Image source={avatarSource} style={styles.avatar} />
      <View>
        <Text
          style={[
            styles.username,
            { color: isDarkMode ? "#FFFFFF" : "#000000" }, // White in dark mode
          ]}
        >
          {isAuthenticated
            ? `${userData.firstName} ${userData.lastName}`
            : language === "ar"
            ? "اضغط للتسجيل"
            : "Press to register"}
        </Text>
        {isAuthenticated && (
          <Text
            style={[
              styles.email,
              { color: isDarkMode ? "#D3D3D3" : "gray" }, // Light gray in dark mode
            ]}
          >
            {userData.email}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: "#ccc",
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  email: {
    fontSize: 14,
  },
});

import React, { useContext, useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { AuthContext } from "../../store/auth-context";
import { getUserProfile } from "../../util/auth"; // Make sure this function fetches data from your API

const UserInfo = ({ onPress }) => {
  const authCtx = useContext(AuthContext);
  const isAuthenticated = authCtx.isAuthenticated;
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
          const profileData = await getUserProfile(authCtx.token);
          setUserData({
            avatar: profileData.data.avatar || "", // Ensure this is not undefined
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
  }, [authCtx.token, isAuthenticated]);

  const defaultAvatar = "https://via.placeholder.com/150";
  const avatarSource = userData.avatar
    ? { uri: userData.avatar }
    : { uri: defaultAvatar };

  return (
    <TouchableOpacity onPress={onPress} style={styles.userInfoContainer}>
      <Image source={avatarSource} style={styles.avatar} />
      <View>
        <Text style={styles.username}>
          {isAuthenticated
            ? `${userData.firstName} ${userData.lastName}`
            : "Press to register"}
        </Text>
        {isAuthenticated && <Text style={styles.email}>{userData.email}</Text>}
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
    color: "gray",
  },
});

import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import * as ImagePicker from "expo-image-picker"; // Import ImagePicker for image selection
import { AntDesign, MaterialIcons } from "@expo/vector-icons"; // Import MaterialIcons for the plus icon
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import { COLORS } from "../../constants/theme"; // Assuming COLORS is defined in your theme
import { AuthContext } from "../../store/auth-context";
import { getUserProfile } from "../../util/auth";
import LoadingIndicator from "../../components/Reusable/LoadingIndicator";
import styles from "./EditUserProfileStyles";
import PersonalInfoForm from "../../components/edit/PersonalInfoForm";

const EditUserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null); // State for the selected image
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation(); // Use useNavigation for navigation control

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userProfile = await getUserProfile(authCtx.token);
        setProfile(userProfile.data);
      } catch (error) {
        console.error("An error occurred while fetching the profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [authCtx.token]);

  if (loading) {
    return <LoadingIndicator />;
  }

  const handleLogout = async () => {
    try {
      authCtx.logout(); // Clear the token
      navigation.reset({
        index: 0,
        routes: [{ name: "Onboarding" }], // Reset navigation to Onboarding screen
      });
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Logout Error", "An error occurred during logout.");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const { uri } = result.assets[0];
      setImage(uri); // Update the selected image state
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
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
        </View>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={
                image
                  ? { uri: image }
                  : profile?.avatar
                  ? { uri: profile.avatar }
                  : require("../../assets/images/icons/man.png")
              }
              style={styles.image}
            />
          
            <View style={styles.plusIconContainer}>
              <MaterialIcons name="add" size={24} color={COLORS.black} />
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={styles.container}>
        <PersonalInfoForm selectedImage={image} />
      </View>
    </ScrollView>
  );
};

export default EditUserProfile;

import React, { useState, useContext, useEffect } from "react";
import {
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
  View,
  Text,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../../store/auth-context";
import BASE_URL from "../../hook/apiConfig";
import styles from "./EditUserProfileStyles";
import PersonalInfoForm from "../../components/edit/PersonalInfoForm";
import TagsForm from "../../components/edit/TagsForm";
import { COLORS } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { useLanguage } from "../../store/context/LanguageContext";
import translations from "../../translations/translations";

const EditUserProfile = () => {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);
  const { token } = authCtx;
  const { language } = useLanguage();

  const [step, setStep] = useState(1);
  const [profileData, setProfileData] = useState({});
  const [modifiedFields, setModifiedFields] = useState({});
  const [selectedTags, setSelectedTags] = useState([]);
  const [allTags, setAllTags] = useState([]); // ✅ Fix: Define state for all tags
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTagsAndProfile = async () => {
      try {
        if (!token) throw new Error("User is not authenticated.");

        // Fetch all available tags
        const tagsResponse = await fetch(`${BASE_URL}/all/tags`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "X-API-KEY": "DISCOVERJO91427",
          },
        });

        if (!tagsResponse.ok) throw new Error("Failed to fetch all tags.");
        const tagsData = await tagsResponse.json();
        const fetchedTags = tagsData.data || [];
        setAllTags(fetchedTags); // ✅ Fix: Save available tags

        console.log("Fetched Available Tags:", fetchedTags);

        // Fetch user profile (including user's selected tags)
        const profileResponse = await fetch(`${BASE_URL}/user/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Language": language,
            "X-API-KEY": "DISCOVERJO91427",
          },
        });

        if (!profileResponse.ok)
          throw new Error("Failed to fetch user profile.");
        const profileData = await profileResponse.json();
        const userProfile = profileData.data || {};
        setProfileData(userProfile);

        console.log("User Profile Data:", userProfile);

        // Convert user's selected tags (which only have names) into IDs
        const selectedTagIds = userProfile.tags
          ? userProfile.tags
              .map(
                (userTag) =>
                  fetchedTags.find((tag) => tag.name === userTag.name)?.id
              )
              .filter(Boolean) // Remove undefined values
          : [];

        console.log("Mapped Selected Tag IDs:", selectedTagIds);
        setSelectedTags(selectedTagIds); // ✅ Fix: Ensure selected tags are properly set
      } catch (error) {
        console.error("Error fetching profile or tags:", error);
        Alert.alert(
          translations[language]?.error || "Error",
          translations[language]?.profileFetchError ||
            "An error occurred while fetching the profile and tags."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchTagsAndProfile();
  }, [token, language]);

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setModifiedFields((prev) => ({ ...prev, avatar: imageUri }));
    }
  };

  const handleFieldChange = (field, value) => {
    console.log(`Updating field ${field}:`, value);
    setModifiedFields((prev) => ({ ...prev, [field]: value }));
  };

const handleSubmit = async () => {
  if (!modifiedFields.birthday) {
    modifiedFields.birthday = profileData.birth_of_day || "";
  }

  if (selectedTags.length > 0) {
    modifiedFields.tags = selectedTags;
  }

  if (Object.keys(modifiedFields).length === 0) {
    Alert.alert("No changes detected.", "Make edits before submitting.");
    return;
  }

  const formData = new FormData();

  Object.entries(modifiedFields).forEach(([key, value]) => {
    if (key === "avatar") {
      formData.append("avatar", {
        uri: value,
        name: `profile_${Date.now()}.jpg`,
        type: "image/jpeg",
      });
    } else if (key === "tags") {
      // 🚀 Check if the API expects a JSON string or an array format
      formData.append("tags", JSON.stringify(value)); // Format as JSON string
      // Alternatively, try sending each tag separately if API expects `tags[]`
      // value.forEach((tagId) => formData.append("tags[]", tagId));
    } else {
      formData.append(key, value);
    }
  });

  formData.append("lang", language);

  console.log("✅ FormData being sent:");
  for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }

  try {
    const response = await fetch(`${BASE_URL}/profile/update`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        "X-API-KEY": "DISCOVERJO91427",
        "Content-Language": language,
      },
      body: formData,
    });

    const responseData = await response.json();
    console.log("✅ Response from API:", responseData);

    if (response.ok) {
      Alert.alert("Profile Updated Successfully!", "", [
        { text: "OK", onPress: () => navigation.navigate("BottomTabs") },
      ]);
    } else {
      throw new Error(responseData.message || "Failed to update profile.");
    }
  } catch (error) {
    console.error("❌ Error during profile update:", error);
    Alert.alert(
      "Failed to update profile.",
      error.message || "Please try again."
    );
  }
};



  if (isLoading) return <Text>Loading...</Text>;

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
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="arrowleft" size={24} color={COLORS.black} />
          </TouchableOpacity>
        </View>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={handleImagePicker}>
            <Image
              source={
                modifiedFields.avatar
                  ? { uri: modifiedFields.avatar }
                  : profileData.avatar
                  ? { uri: profileData.avatar }
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
        {step === 1 ? (
          <PersonalInfoForm
            {...profileData}
            handleNext={() => setStep(2)}
            handleFieldChange={handleFieldChange}
          />
        ) : (
          <TagsForm
            allTags={allTags} // ✅ Pass all available tags
            selectedTags={selectedTags}
            setSelectedTags={(tags) => {
              setSelectedTags(tags);
              setModifiedFields((prev) => ({ ...prev, tags }));
            }}
            handleSubmit={handleSubmit}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default EditUserProfile;

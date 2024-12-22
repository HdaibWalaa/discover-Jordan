import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  ImageBackground, // Make sure this is properly imported
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons"; // Import MaterialIcons for the plus icon
import { useRoute, useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../store/auth-context"; // To access token for final submission
import axios from "axios";
import { COLORS } from "../../constants/theme";
import * as ImagePicker from "expo-image-picker";
import BASE_URL from "../../hook/apiConfig";
import styles from "./EditUserProfileStyles"; // Assuming you're using the same styles
// Assuming you're using the same styles

const TagsSelection = () => {
  const [availableTags, setAvailableTags] = useState([]); // Store available tags from API
  const [selectedTags, setSelectedTags] = useState([]); // State to store selected tags
  const [loading, setLoading] = useState(true); // Loading state for tags
  const [image, setImage] = useState(null); // State for the selected image

  const route = useRoute();
  const navigation = useNavigation();
  const { token } = useContext(AuthContext); // Get token from AuthContext

  // Data passed from the personal info form
  const {
    firstName,
    lastName,
    username,
    birthday,
    gender,
    description,
    phoneNumber,
    profileImage, // Profile image from the route params
  } = route.params;

  // If the image is passed from PersonalInfoForm, set it as the default
  useEffect(() => {
    if (profileImage) {
      setImage(profileImage);
    }
  }, [profileImage]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/all/tags`, {
          headers: {
            Authorization: `Bearer ${token}`, // Correct token usage
            Accept: "application/json",
          },
        });

        if (response.data && response.data.data) {
          setAvailableTags(response.data.data); // Correct extraction of tags from response
        } else {
          console.error("Tags data missing in the response");
          Alert.alert("Error", "No tags available. Please try again later.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tags:", error);
        Alert.alert("Error", "Failed to load tags. Please try again later.");
        setLoading(false);
      }
    };

    fetchTags();
  }, [token]);

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
    const handleTagSelection = (tagId) => {
      if (selectedTags.includes(tagId)) {
        setSelectedTags(selectedTags.filter((id) => id !== tagId));
      } else {
        setSelectedTags([...selectedTags, tagId]);
      }
    };

  const handleSubmit = async () => {
    if (selectedTags.length < 3) {
      Alert.alert("Please select at least three tags.");
      return;
    }

    // Convert the birthday to the correct format (YYYY-MM-DD)
    const formattedBirthday = birthday.split("-").reverse().join("-");

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("username", username);
    formData.append("birthday", formattedBirthday);
    formData.append("gender", gender);
    formData.append("description", description);
    formData.append("phone_number", phoneNumber);
    formData.append("tags_id", JSON.stringify(selectedTags));

    // Add image to the formData if it exists
    if (image) {
      const filename = image.split("/").pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;

      formData.append("image", {
        uri: image,
        name: filename,
        type,
      });
    }
  
    // Log the user data before submitting
    console.log("User data being submitted:", {
      firstName,
      lastName,
      username,
      formattedBirthday,
      gender,
      description,
      phoneNumber,
      image,
      selectedTags,
    });

    try {
      const response = await axios.post(
        `${BASE_URL}/profile/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Language": "en",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        Alert.alert("Success", "Profile updated successfully.");
        navigation.navigate("BottomTabs"); // Navigate to Profile screen
      } else {
        Alert.alert("Error", "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error during profile update:", error.response || error);
      Alert.alert("Error", "An error occurred while updating the profile.");
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
            onPress={() => navigation.goBack()}
            accessibilityLabel="Go Back"
          >
            <AntDesign name="arrowleft" size={24} color={COLORS.black} />
          </TouchableOpacity>
        </View>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={
                image
                  ? { uri: image }
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

      {/* Tag selection */}
      <View style={styles.container}>
        <Text style={styles.header}>Select at least 3 Tags</Text>
        <View style={styles.tagContainer}>
          {availableTags.map((tag) => (
            <TouchableOpacity
              key={tag.id}
              style={[
                styles.tag,
                selectedTags.includes(tag.id) ? styles.selectedTag : null,
              ]}
              onPress={() => handleTagSelection(tag.id)}
            >
              <Image
                source={{ uri: tag.image_active }}
                style={styles.tagIcon}
              />
              <Text style={styles.tagText}>{tag.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default TagsSelection;

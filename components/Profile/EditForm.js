import React, { useState, useEffect, useContext } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import { AuthContext } from "../../store/auth-context";
import { updateUserProfile } from "../../util/auth";
import TagSelector from "./TagSelector";
import styles from "./EditFormStyles";
import BASE_URL from "../../hook/apiConfig";

const EditForm = ({ profile }) => {
  const [firstName, setFirstName] = useState(profile?.first_name || "");
  const [lastName, setLastName] = useState(profile?.last_name || "");
  const [username, setUsername] = useState(profile?.username || "");
  const [description, setDescription] = useState(profile?.description || "");
  const [birthday, setBirthday] = useState(profile?.birthday || "");
  const [gender, setGender] = useState(profile?.gender?.toString() || "1");
  const [tagsId, setTagsId] = useState(
    profile?.tags?.map((tag) => tag.id) || []
  );
  const [validTags, setValidTags] = useState([]);
  const [image, setImage] = useState(profile?.avatar || null);
  const [imageData, setImageData] = useState(null);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/places/all/tags`, {
          headers: {
            Authorization: `Bearer ${authCtx.token}`,
            Accept: "application/json",
          },
        });
        setValidTags(response.data.data.map((tag) => tag.id));
      } catch (error) {
        console.error("Error fetching valid tags:", error);
        Alert.alert("Error", "Failed to fetch valid tags.");
      }
    };

    fetchTags();
  }, [authCtx.token]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
      const imageInfo = await FileSystem.getInfoAsync(result.uri);
      setImageData({
        uri: result.uri,
        name: result.uri.split("/").pop(),
        type: "image/jpeg",
      });
    }
  };

  const handleUpdate = async () => {
    if (!tagsId.every((id) => validTags.includes(id))) {
      Alert.alert("Error", "One or more selected tags are invalid.");
      return;
    }

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("username", username);
    formData.append("description", description);
    formData.append("birthday", birthday);
    formData.append("gender", gender);
    formData.append("tags_id", JSON.stringify(tagsId));

    if (imageData) {
      formData.append("image", imageData);
    }

    try {
      const response = await updateUserProfile(formData, authCtx.token);
      Alert.alert(
        "Profile Update",
        response?.msg || "Profile updated successfully!"
      );
    } catch (error) {
      const errorMsg =
        error.response?.data?.msg ||
        "An error occurred while updating your profile. Please try again later.";
      console.error(
        "Error occurred while updating profile:",
        error.response?.data
      );
      Alert.alert(
        "Update Failed",
        Array.isArray(errorMsg) ? errorMsg.join("\n") : errorMsg
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.avatar} />
        ) : (
          <Image
            source={require("../../assets/images/icons/male.png")}
            style={styles.avatar}
          />
        )}
        <View style={styles.editIconContainer}>
          <Image
            source={require("../../assets/images/icons/shuffle.png")}
            style={styles.editIcon}
          />
        </View>
      </TouchableOpacity>
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        placeholder="Birthday (YYYY-MM-DD)"
        value={birthday}
        onChangeText={setBirthday}
        style={styles.input}
      />
      <View style={styles.genderContainer}>
        <Text style={styles.genderLabel}>Gender</Text>
        <View style={styles.genderButtons}>
          <TouchableOpacity
            style={[
              styles.genderButton,
              gender === "1" && styles.selectedGenderButton,
            ]}
            onPress={() => setGender("1")}
          >
            <Text
              style={[
                styles.genderButtonText,
                gender === "1" && styles.selectedGenderButtonText,
              ]}
            >
              Male
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderButton,
              gender === "2" && styles.selectedGenderButton,
            ]}
            onPress={() => setGender("2")}
          >
            <Text
              style={[
                styles.genderButtonText,
                gender === "2" && styles.selectedGenderButtonText,
              ]}
            >
              Female
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TagSelector selectedTags={tagsId} onTagsChange={setTagsId} />
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.updateButtonText}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditForm;

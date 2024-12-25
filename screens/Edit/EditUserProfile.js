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

const EditUserProfile = () => {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [birthdayWarning, setBirthdayWarning] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileResponse = await fetch(`${BASE_URL}/user/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authCtx.token}`,
            Accept: "application/json",
          },
        });

        if (!profileResponse.ok) {
          throw new Error("Failed to fetch user profile.");
        }

        const profileData = await profileResponse.json();
        const profileTags = profileData.data.tags;

        const tagsResponse = await fetch(`${BASE_URL}/all/tags`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authCtx.token}`,
            Accept: "application/json",
          },
        });

        if (!tagsResponse.ok) {
          throw new Error("Failed to fetch all tags.");
        }

        const allTags = await tagsResponse.json();

        const matchedTags = profileTags.map(
          (tag) => allTags.data.find((t) => t.name === tag.name)?.id
        );

        setFirstName(profileData.data.first_name || "");
        setLastName(profileData.data.last_name || "");
        setUsername(profileData.data.username || "");
        setDescription(profileData.data.description || "");
        setBirthday(profileData.data.birth_of_day || "");
        setGender(profileData.data.gender === "انثى" ? "2" : "1");
        setPhoneNumber(profileData.data.phone_number || "");
        setSelectedTags(matchedTags.filter(Boolean));
        setImage(profileData.data.avatar || null);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        Alert.alert("Error", "Could not load profile data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [authCtx.token]);

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (selectedTags.length < 3) {
      Alert.alert("Please select at least 3 tags.");
      return;
    }

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("username", username);
    formData.append("description", description);
    formData.append("birthday", birthday);
    formData.append("gender", gender);
    formData.append("phone_number", phoneNumber);
    formData.append("tags_id", JSON.stringify(selectedTags));

    if (image) {
      // Ensure the image URI is formatted correctly for FormData
      const formattedUri = image.startsWith("file://")
        ? image
        : `file://${image}`;
      formData.append("image", {
        uri: formattedUri,
        name: `user_profile_${Date.now()}.jpg`,
        type: "image/jpeg",
      });
    }

    // Debugging FormData
    console.log("FormData being sent:");
    for (let [key, value] of formData.entries()) {
      if (key === "image") {
        console.log(`${key}:`, value.name, value.type, value.uri);
      } else {
        console.log(`${key}:`, value);
      }
    }


    try {
      const response = await fetch(`${BASE_URL}/profile/update`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          "Content-Language": "en",
        },
        body: formData,
      });

      const responseData = await response.json();
      console.log("Response:", responseData);

      if (response.ok) {
        Alert.alert("Profile Updated Successfully!", "", [
          {
            text: "OK",
            onPress: () => navigation.navigate("BottomTabs"),
          },
        ]);
      } else {
        throw new Error(responseData.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error during profile update:", error);
      Alert.alert(
        "Failed to update profile.",
        error.message || "Please try again."
      );
    }
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

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
      <View style={styles.container}>
        {step === 1 ? (
          <PersonalInfoForm
            firstName={firstName}
            lastName={lastName}
            username={username}
            birthday={birthday}
            gender={gender}
            phoneNumber={phoneNumber}
            description={description}
            setFirstName={setFirstName}
            setLastName={setLastName}
            setUsername={setUsername}
            setBirthday={setBirthday}
            setGender={setGender}
            setPhoneNumber={setPhoneNumber}
            setDescription={setDescription}
            handleNext={() => setStep(2)}
            birthdayWarning={birthdayWarning}
          />
        ) : (
          <TagsForm
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            handleSubmit={handleSubmit}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default EditUserProfile;

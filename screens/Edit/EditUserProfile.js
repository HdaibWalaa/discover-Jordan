import React, { useState, useContext } from "react";
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

  const handleNext = () => {
    if (
      !firstName ||
      !lastName ||
      !username ||
      !description ||
      !phoneNumber ||
      !gender ||
      !birthday
    ) {
      Alert.alert("Please fill in all fields.");
      return;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(birthday)) {
      setBirthdayWarning("Date should be in the format YYYY-MM-DD.");
      return;
    }

    setBirthdayWarning("");
    setStep(2);
  };

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
    formData.append("image", {
      uri: image,
      name: "user_profile.jpg",
      type: "image/jpeg",
    });
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

    if (response.ok) {
      Alert.alert("Profile Updated Successfully!", "", [
        {
          text: "OK",
          onPress: () => {
            setStep(1); // Reset to step 1
            navigation.navigate("BottomTabs"); // Redirect to BottomTabs
          },
        },
      ]);
    } else {
      throw new Error("Failed to update profile");
    }
  } catch (error) {
    console.error(error);
    Alert.alert("Failed to update profile. Please try again.");
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
            onPress={step === 1 ? handleLogout : () => setStep(1)}
          >
            <AntDesign
              name={step === 1 ? "logout" : "arrowleft"}
              size={24}
              color={COLORS.black}
            />
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
            handleNext={handleNext}
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

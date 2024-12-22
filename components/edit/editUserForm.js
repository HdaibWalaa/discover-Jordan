import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import BASE_URL from "../../hook/apiConfig";
import { AuthContext } from "../../store/auth-context";
import styles from "../../screens/Edit/EditUserProfileStyles";

const EditUserForm = () => {
  const [firstName, setFirstName] = useState("new");
  const [lastName, setLastName] = useState("user");
  const [username, setUsername] = useState("new_user");
  const [birthday, setBirthday] = useState("1992-01-19");
  const [gender, setGender] = useState("2"); // Male or Female options.
  const [tagsId, setTagsId] = useState([1, 2, 3]);
  const [description, setDescription] = useState(
    "i love watch movies and help people"
  );
  const [phoneNumber, setPhoneNumber] = useState("0795802354");
  const [image, setImage] = useState(null);
  const { token } = useContext(AuthContext); // Get token from AuthContext

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const { uri } = result.assets[0]; // Accessing the first asset from result
      setImage(uri); // Setting the image URI to state
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("username", username);
    formData.append("birthday", birthday);
    formData.append("gender", gender);
    formData.append("tags_id", JSON.stringify(tagsId));
    formData.append("description", description);
    formData.append("phone_number", phoneNumber);

    // Append the image file if one is selected
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
        console.log("Profile updated successfully:", response.data);
        Alert.alert("Success", "Profile updated successfully.");
      } else {
        console.log("Failed to update profile:", response.data);
        Alert.alert("Error", "Failed to update profile.");
      }
    } catch (error) {
      console.log("Error updating profile:", error);
      Alert.alert("Error", "An error occurred while updating the profile.");
    }
  };

  return (
    <View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Birthday"
          value={birthday}
          onChangeText={setBirthday}
        />
      </View>

      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[
            styles.genderButton,
            gender === "1" ? styles.genderSelected : null,
          ]}
          onPress={() => setGender("1")}
        >
          <Text style={styles.genderText}>Male</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.genderButton,
            gender === "2" ? styles.genderSelected : null,
          ]}
          onPress={() => setGender("2")}
        >
          <Text style={styles.genderText}>Female</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
      </View>

      <Button title="Pick an image from gallery" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditUserForm;

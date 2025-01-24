import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import axios from "axios";
import { COLORS } from "../../constants/theme";
import BASE_URL from "../../hook/apiConfig";

const SuggestPlace = () => {
  const [placeName, setPlaceName] = useState("");
  const [address, setAddress] = useState("");
  const [images, setImages] = useState([]);

  // Handle image picking and resizing
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      const resizedImages = await Promise.all(
        result.assets.map(async (asset) => {
          const resized = await ImageManipulator.manipulateAsync(
            asset.uri,
            [{ resize: { width: 800 } }], // Resize image to 800px width
            { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
          );
          return resized.uri;
        })
      );
      setImages([...images, ...resizedImages]);
    }
  };

  // Handle form submission
  const submitForm = async () => {
    if (!placeName || !address) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("place_name", placeName);
    formData.append("address", address);

    images.forEach((image, index) => {
      formData.append(`images[${index}]`, {
        uri: image,
        name: `image_${index}.jpg`,
        type: "image/jpeg",
      });
    });

    try {
      const response = await axios.post(
        `${BASE_URL}/suggestion/places`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-API-KEY": "DISCOVERJO91427",
          },
        }
      );
      Alert.alert("Success", "Your suggestion has been sent successfully.");
      // Reset form
      setPlaceName("");
      setAddress("");
      setImages([]);
    } catch (error) {
      console.error("Error submitting form:", error);
      Alert.alert("Error", "There was a problem sending your suggestion.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Compose A Recommend About A New Place</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Place Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Place 256"
          value={placeName}
          onChangeText={setPlaceName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Place Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Search for a location"
          value={address}
          onChangeText={setAddress}
        />
      </View>

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        <Text style={styles.imagePickerText}>ADD IMAGES / VIDEOS</Text>
      </TouchableOpacity>

      <View style={styles.imagePreviewContainer}>
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={styles.imagePreview}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={submitForm}>
        <Text style={styles.submitButtonText}>SEND</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SuggestPlace;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  imagePicker: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  imagePickerText: {
    color: "#555",
    fontSize: 16,
  },
  imagePreviewContainer: {
    flexDirection: "row",
    marginBottom: 20,
    flexWrap: "wrap",
  },
  imagePreview: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

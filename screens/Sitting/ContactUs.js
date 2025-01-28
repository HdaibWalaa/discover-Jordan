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

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [images, setImages] = useState([]);

  const compressImage = async (uri) => {
    const manipResult = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 800 } }], // Resize to width of 800px
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
    );
    return manipResult.uri;
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      const compressedImages = await Promise.all(
        result.assets.map(async (asset) => {
          const compressedUri = await compressImage(asset.uri);
          return compressedUri;
        })
      );
      setImages([...images, ...compressedImages]);
    }
  };

  const submitForm = async () => {
    if (!name || !email || !subject || !message) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("subject", subject);
    formData.append("message", message);

    images.forEach((image, index) => {
      formData.append(`images[${index}]`, {
        uri: image,
        name: `image_${index}.jpg`,
        type: "image/jpeg",
      });
    });

    try {
      const response = await axios.post(`${BASE_URL}/contact-us`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-API-KEY": "DISCOVERJO91427",
        },
      });
      Alert.alert("Success", "Your message has been sent successfully.");
      // Reset form
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setImages([]);
    } catch (error) {
      console.error("Error submitting form:", error);
      Alert.alert("Error", "There was a problem sending your message.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Share Your Feedback</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Subject</Text>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={subject}
          onChangeText={setSubject}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Your Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Salem"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="test@test.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Your Message</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Type here ..."
          value={message}
          onChangeText={setMessage}
          multiline={true}
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
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ContactUs;

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
  textArea: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingTop: 10,
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
  },
  imagePreview: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
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

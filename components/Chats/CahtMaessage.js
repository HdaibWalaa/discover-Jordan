import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker"; // For picking images/videos
import { AuthContext } from "../../store/auth-context";
import BASE_URL from "../../hook/apiConfig";

const CahtMaessage = () => {
  const [messageTxt, setMessageTxt] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const { token } = useContext(AuthContext); // Get the token from AuthContext
  const conversationId = 20; // Assuming this is the trip ID

  // Log the user token
  console.log("User Token:", token);

  const handleSendMessage = async () => {
    if (!messageTxt && !selectedFile) {
      Alert.alert("Error", "Please enter a message or attach a file.");
      return;
    }

    const formData = new FormData();
    formData.append("conversation_id", conversationId.toString());
    formData.append("message_txt", messageTxt);
    if (selectedFile) {
      formData.append("file", {
        uri: selectedFile.uri,
        name: selectedFile.name,
        type: selectedFile.type,
      });
    }

    // Log the form data for debugging
    console.log("Form Data:", {
      conversation_id: conversationId,
      message_txt: messageTxt,
      file: selectedFile,
    });

    try {
      const url = `${BASE_URL}/chat/store`;
      console.log(`Request URL: ${url}`);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const responseText = await response.text();
      console.log("Raw Response:", responseText);

      try {
        const result = JSON.parse(responseText);
        if (response.ok) {
          Alert.alert("Success", "Message sent successfully");
          setMessageTxt("");
          setSelectedFile(null);
        } else {
          console.log("Error Response:", result);
          Alert.alert("Error", result.message || "Failed to send message");
        }
      } catch (error) {
        console.error("Error parsing response:", error);
        Alert.alert("Error", "Unexpected response from the server.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

const handlePickFile = async () => {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, // Allow both images and videos
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      const fileUri = result.uri || result.assets[0].uri;
      const fileName = fileUri.split("/").pop();
      let fileType;

      if (fileName.endsWith(".mp4") || fileName.endsWith(".mov")) {
        fileType = "video/mp4";
      } else if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) {
        fileType = "image/jpeg";
      } else if (fileName.endsWith(".png")) {
        fileType = "image/png";
      } else {
        Alert.alert("Unsupported file type");
        return;
      }

      setSelectedFile({
        uri: fileUri,
        name: fileName,
        type: fileType,
      });
    }
  } catch (error) {
    console.error("Error picking file:", error);
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>CahtMaessage</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your message..."
        value={messageTxt}
        onChangeText={setMessageTxt}
      />
      <TouchableOpacity style={styles.fileButton} onPress={handlePickFile}>
        <Text>{selectedFile ? selectedFile.name : "Attach a file"}</Text>
      </TouchableOpacity>
      <Button title="Send Message" onPress={handleSendMessage} />
    </View>
  );
};

export default CahtMaessage;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  fileButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 8,
  },
});

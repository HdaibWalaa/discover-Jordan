import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import BASE_URL from "../../hook/apiConfig";

const CahtMaessage = ({ conversationId, token }) => {
  const [messageTxt, setMessageTxt] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

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

    try {
      const response = await fetch(`${BASE_URL}/chat/store`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "X-API-KEY": "DISCOVERJO91427",
        },
        body: formData,
      });

      const responseText = await response.text();
      console.log("Raw Response:", responseText);

      if (response.ok) {
        Alert.alert("Success", "Message sent successfully.");
        setMessageTxt("");
        setSelectedFile(null);
      } else {
        Alert.alert("Error", "Failed to send the message.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  const handlePickFile = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.cancelled) {
        const fileUri = result.uri || result.assets[0].uri;
        const fileName = fileUri.split("/").pop();
        const fileType = fileName.endsWith(".mp4")
          ? "video/mp4"
          : fileName.endsWith(".png") || fileName.endsWith(".jpeg")
          ? "image/jpeg"
          : "unknown";

        setSelectedFile({ uri: fileUri, name: fileName, type: fileType });
      }
    } catch (error) {
      console.error("Error picking file:", error);
    }
  };

  return (
    <View style={styles.container}>
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
  container: { padding: 16 },
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

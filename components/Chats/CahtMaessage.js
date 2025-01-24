import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
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

      const result = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Message sent successfully.");
        setMessageTxt("");
        setSelectedFile(null);
      } else {
        Alert.alert("Error", result.message || "Failed to send the message.");
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
      <TouchableOpacity onPress={handlePickFile}>
        <Image
          source={require("../../assets/images/icons/attach-file.png")} // Replace with the correct path to the icon
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Alert.alert("Mic button pressed")}>
        <Image
          source={require("../../assets/images/icons/microphone.png")} // Replace with the correct path to the icon
          style={styles.icon}
        />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Write your message"
        value={messageTxt}
        onChangeText={setMessageTxt}
      />
      <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
        <Image
          source={require("../../assets/images/icons/sendrtip.png")} // Replace with the correct path to the icon
          style={styles.sendIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CahtMaessage;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#F5F5F5",
    borderRadius: 25,
    marginHorizontal: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 8,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 12,
    marginHorizontal: 8,
  },
  sendButton: {
    backgroundColor: "#FCD228", // Yellow color for the button
    padding: 10,
    borderRadius: 25,
    marginLeft: 8,
  },
  sendIcon: {
    width: 24,
    height: 24,
    tintColor: "#000000", // Black color for the icon
  },
});

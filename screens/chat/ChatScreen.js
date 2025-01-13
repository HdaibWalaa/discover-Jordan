import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import Pusher from "pusher-js";
import ChatHeader from "../../components/Chats/ChatHeader"; // Import the new ChatHeader component
import BASE_URL from "../../hook/apiConfig";
import styles from "./GroupChatScreenStyles";

export default function GroupChatScreen({ route }) {
  const { tripId, userToken } = route.params || { tripId: 18, userToken: null };

  const [groupMembers, setGroupMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [messageType, setMessageType] = useState("text"); // Default message type
  const [selectedFile, setSelectedFile] = useState(null); // To hold file (image/video/audio)

  useEffect(() => {
    // Fetch existing group members
    axios
      .get(`${BASE_URL}/chat/members/${tripId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          Accept: "application/json",
          "Content-Language": "en",
        },
      })
      .then((res) => {
        const members = res.data?.data?.members || [];
        setGroupMembers(members);
      })
      .catch((err) => console.error("Error fetching members:", err));

    // Fetch existing messages
    axios
      .get(`${BASE_URL}/chat/${tripId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        const fetchedMessages = res.data?.data?.messages || [];
        setMessages(fetchedMessages);
      })
      .catch((err) => console.error("Error fetching messages:", err));

    // Initialize Pusher and subscribe to the private channel
    const pusher = new Pusher("239f28d2e3151e572e3e", {
      cluster: "ap2",
      authEndpoint: `${BASE_URL}/broadcasting/auth`,
      auth: {
        headers: {
          Authorization: `Bearer ${userToken}`,
          Accept: "application/json",
        },
      },
    });

    const channel = pusher.subscribe(`private-group-channel.${tripId}`);

    // Bind to "group-message" events for real-time messages
    channel.bind("group-message", (data) => {
      console.log("New message received:", data);
      setMessages((prev) => [...prev, data]); // Add new message to the list
    });

    return () => {
      channel.unbind("group-message");
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [tripId, userToken]);

  // Function to handle sending a message
const handleSendMessage = () => {
  if (!messageText.trim() && !selectedFile) {
    Alert.alert("Error", "Please enter a message or attach a file.");
    return;
  }

  const formData = new FormData();
  formData.append("conversation_id", tripId);
  formData.append("message_type", messageType);

  if (messageText.trim()) {
    formData.append("message_txt", messageText.trim());
  }

 if (selectedFile) {
   // Extract file extension
   const fileExtension = selectedFile.uri.split(".").pop();

   // Determine MIME type based on the file extension
   let mimeType = "application/octet-stream"; // Default MIME type
   if (messageType === "image") {
     mimeType = `image/${fileExtension}`;
   } else if (messageType === "video") {
     mimeType = `video/${fileExtension}`;
   } else if (messageType === "audio") {
     mimeType = `audio/${fileExtension}`;
   }

   formData.append("file", {
     uri: selectedFile.uri,
     name: `file.${fileExtension}`, // Set file name with correct extension
     type: mimeType, // Set the correct MIME type
   });
 }


  axios
    .post(`${BASE_URL}/chat/store`, formData, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log("Message sent successfully:", res.data);

      // Transform the sent message to match the existing message format
      const newMessage = {
        id: Date.now(),
        user_id: res.data.data.user_id || 64,
        username: res.data.data.username,
        user_image: res.data.data.image,
        message: res.data.data.message,
        message_file: res.data.data.file_url,
        sent_datetime: res.data.data.sent_datetime,
        message_type: res.data.data.message_type,
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessageText("");
      setSelectedFile(null);
      setMessageType("text");
    })
    .catch((err) => {
      if (err.response) {
        // Server responded with a status code outside the 2xx range
        console.log("Error response data:", err.response.data);
        console.log("Error response status:", err.response.status);
        console.log("Error response headers:", err.response.headers);
        Alert.alert(
          "Error",
          `Failed to send message: ${err.response.data.msg || "Unknown error"}`
        );
      } else if (err.request) {
        // No response received from the server
        console.log("Error request:", err.request);
        Alert.alert("Error", "No response from server. Please try again.");
      } else {
        // Something else happened while setting up the request
        console.log("Error message:", err.message);
        Alert.alert("Error", `An error occurred: ${err.message}`);
      }
    });
};




  // Function to handle file selection (image/video)
const handlePickFile = async (type) => {
  let result;
  if (type === "image") {
    result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
  } else if (type === "video") {
    result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });
  }

  if (!result.cancelled) {
    const fileType = result.uri.split(".").pop().toLowerCase(); // Extract file extension
    const validFileTypes = [
      "jpg",
      "jpeg",
      "png",
      "gif",
      "mp3",
      "wav",
      "mp4",
      "mov",
      "avi",
    ];

    if (!validFileTypes.includes(fileType)) {
      Alert.alert(
        "Invalid File",
        "Please select a valid file type (jpg, jpeg, png, gif, mp3, wav, mp4, mov, avi)."
      );
      return;
    }

    setSelectedFile(result);
    setMessageType(type); // Set message type based on file type
  }
};



  return (
    <View style={styles.container}>
      {/* Use ChatHeader and pass groupMembers as a prop */}
      <ChatHeader groupMembers={groupMembers} />

      {/* Chat Messages Section */}
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const isCurrentUser = item.user_id === 64; // Replace 64 with actual logged-in user ID
          return (
            <View
              style={[
                styles.messageBox,
                isCurrentUser
                  ? styles.currentUserMessage
                  : styles.otherUserMessage,
              ]}
            >
              {/* Show avatar only for other users' messages */}
              {!isCurrentUser && (
                <Image
                  source={{ uri: item.user_image }}
                  style={styles.messageAvatar}
                />
              )}

              <View
                style={[
                  styles.messageContentWrapper,
                  isCurrentUser
                    ? styles.currentUserContent
                    : styles.otherUserContent,
                ]}
              >
                <Text style={styles.messageUsername}>
                  {isCurrentUser ? "You" : item.username}
                </Text>

                {/* Display the message text */}
                <Text style={styles.messageText}>{item.message}</Text>

                {/* Display the message time */}
                <Text style={styles.messageTime}>{item.sent_datetime}</Text>
              </View>
            </View>
          );
        }}
        contentContainerStyle={styles.chatContainer}
      />

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={() => handlePickFile("image")}>
          <Image
            source={require("../../assets/images/icons/camera.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePickFile("video")}>
          <Image
            source={require("../../assets/images/icons/attach-file.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePickFile("audio")}>
          <Image
            source={require("../../assets/images/icons/microphone.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Write your message"
          value={messageText}
          onChangeText={(text) => setMessageText(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

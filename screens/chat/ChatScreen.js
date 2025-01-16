import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import Pusher from "pusher-js";
import ChatHeader from "../../components/Chats/ChatHeader";
import CahtMaessage from "../../components/Chats/CahtMaessage";
import BASE_URL from "../../hook/apiConfig";
import styles from "./GroupChatScreenStyles";

export default function GroupChatScreen({ route }) {
  const { tripId, userToken } = route.params;
  const [groupMembers, setGroupMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  let pusher = null;
  let channel = null;

  useEffect(() => {
    fetchInitialData();
    setupPusher();

    return () => {
      cleanupPusher();
    };
  }, [tripId, userToken]);

  // Fetch initial data
  const fetchInitialData = async () => {
    try {
      const membersResponse = await axios.get(
        `${BASE_URL}/chat/members/${tripId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            Accept: "application/json",
            "Content-Language": "en",
          },
        }
      );

      const messagesResponse = await axios.get(`${BASE_URL}/chat/${tripId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          Accept: "application/json",
        },
      });

      setGroupMembers(membersResponse.data?.data?.members || []);
      setMessages(messagesResponse.data?.data?.messages || []);
    } catch (error) {
      console.error("Error fetching initial data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Setup Pusher
  const setupPusher = () => {
    pusher = new Pusher("239f28d2e3151e572e3e", {
      cluster: "ap2",
      authEndpoint: `${BASE_URL}/broadcasting/auth`,
      auth: {
        headers: {
          Authorization: `Bearer ${userToken}`,
          Accept: "application/json",
        },
      },
    });

    channel = pusher.subscribe(`private-group-channel.${tripId}`);

    channel.bind("group-message", (data) => {
      console.log("New message received:", data);

      const newMessage = {
        id: data.id,
        user: data.user,
        message: data.message_txt,
        message_file: data.file_url,
        sent_datetime: data.sent_datetime,
      };

      setMessages((prev) => [...prev, newMessage]); // Add new message to the list
    });
  };

  // Cleanup Pusher
  const cleanupPusher = () => {
    if (channel) {
      channel.unbind("group-message");
      pusher.unsubscribe(`private-group-channel.${tripId}`);
    }
    if (pusher) {
      pusher.disconnect();
    }
  };

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#FFD700" style={styles.loader} />
    );
  }

  return (
    <View style={styles.container}>
      <ChatHeader groupMembers={groupMembers} />
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const isCurrentUser = item.user?.username === "You";

          return (
            <View
              style={[
                styles.messageBox,
                isCurrentUser
                  ? styles.currentUserMessage
                  : styles.otherUserMessage,
              ]}
            >
              <Image
                source={{ uri: item.user?.user_image }}
                style={styles.messageAvatar}
              />
              <View
                style={[
                  styles.messageContentWrapper,
                  isCurrentUser
                    ? styles.currentUserContent
                    : styles.otherUserContent,
                ]}
              >
                <Text style={styles.messageUsername}>
                  {isCurrentUser ? "You" : item.user?.username}
                </Text>

                {/* Render message text */}
                {item.message && (
                  <Text style={styles.messageText}>{item.message}</Text>
                )}

                {/* Render attachment if available */}
                {item.message_file && (
                  <Image
                    source={{ uri: item.message_file }}
                    style={styles.messageImage}
                  />
                )}

                <Text style={styles.messageTime}>{item.sent_datetime}</Text>
              </View>
            </View>
          );
        }}
        contentContainerStyle={styles.chatContainer}
      />

      <CahtMaessage />
    </View>
  );
}

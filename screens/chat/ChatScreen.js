import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, Image, Text } from "react-native";
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

  // Fetch initial data for group members and messages
  const fetchInitialData = async () => {
    try {
      // Fetch group members
      const membersResponse = await axios.get(
        `${BASE_URL}/chat/members/${tripId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            Accept: "application/json",
            "Content-Language": "en",
            "X-API-KEY": "DISCOVERJO91427",
          },
        }
      );

      // Fetch initial messages
      const messagesResponse = await axios.get(`${BASE_URL}/chat/${tripId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          Accept: "application/json",
          "X-API-KEY": "DISCOVERJO91427",
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

  // Set up Pusher for real-time updates
  const setupPusher = () => {
    pusher = new Pusher("239f28d2e3151e572e3e", {
      cluster: "ap2",
      authEndpoint: `${BASE_URL}/broadcasting/auth`,
      auth: {
        headers: {
          Authorization: `Bearer ${userToken}`,
          Accept: "application/json",
          "X-API-KEY": "DISCOVERJO91427",
        },
      },
    });

    // Subscribe to the specific channel for this trip
    channel = pusher.subscribe(`private-group-channel.${tripId}`);

    // Listen for new messages
    channel.bind("group-message", (data) => {
      console.log("New message received:", data);

      const newMessage = {
        id: data.message.id || Date.now().toString(),
        user: data.user,
        message: data.message.message,
        message_file: data.message.message_file,
        sent_datetime: data.message.sent_datetime,
      };

      // Update the messages state
      setMessages((prev) => [...prev, newMessage]);
    });
  };

  // Clean up Pusher on component unmount
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
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageBox,
              item.user?.username === "You"
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
                item.user?.username === "You"
                  ? styles.currentUserContent
                  : styles.otherUserContent,
              ]}
            >
              <Text style={styles.messageUsername}>
                {item.user?.username || "Unknown"}
              </Text>
              {item.message && (
                <Text style={styles.messageText}>{item.message}</Text>
              )}
              {item.message_file && (
                <Image
                  source={{ uri: item.message_file }}
                  style={styles.messageImage}
                />
              )}
              <Text style={styles.messageTime}>{item.sent_datetime}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.chatContainer}
      />
      <CahtMaessage conversationId={tripId} token={userToken} />
    </View>
  );
}

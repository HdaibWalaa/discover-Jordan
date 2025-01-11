import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import axios from "axios";
import Pusher from "pusher-js";
import BASE_URL from "../../hook/apiConfig"; // Ensure this points to your API base URL

export default function GroupChatScreen({ route }) {
  const { tripId, userToken } = route.params || { tripId: 18, userToken: null };

  const [groupMembers, setGroupMembers] = useState([]);
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    console.log("User token:", userToken);

    // 1) Fetch existing group members using the provided API
    axios
      .get(`${BASE_URL}/chat/members/${tripId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          Accept: "application/json",
          "Content-Language": "en",
        },
      })
      .then((res) => {
        console.log("Fetch members response:", res.data);
        const members = res.data?.data?.members || [];
        setGroupMembers(members);
      })
      .catch((err) => console.error("Error fetching members:", err));

    // 2) Initialize Pusher and subscribe to the private channel
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

    // 3) Bind to "group-member" events for real-time updates
    channel.bind("group-member", (data) => {
      console.log("group-member event data:", data);
      setUpdates((prev) => [...prev, data]);

      // Handle join action
      if (data.action === "join" && data.user) {
        setGroupMembers((prev) => {
          const exists = prev.some((member) => member.id === data.user.id);
          return exists ? prev : [...prev, data.user]; // Add user if not already in the list
        });
      }

      // Handle leave action
      if (data.action === "leave" && data.user) {
        setGroupMembers(
          (prev) => prev.filter((member) => member.id !== data.user.id) // Remove user from the list
        );
      }
    });

    // Cleanup on unmount
    return () => {
      channel.unbind("group-member");
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [tripId, userToken]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        Private channel: private-group-channel.{tripId}
      </Text>

      <Text style={styles.title}>Group Members</Text>
      <ScrollView horizontal style={styles.membersContainer}>
        {groupMembers.map((mem) => (
          <View key={mem.id} style={styles.memberBox}>
            {mem.image ? (
              <Image source={{ uri: mem.image }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.placeholder]} />
            )}
            <Text style={styles.memberName}>{mem.username}</Text>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.title}>Updates (raw events):</Text>
      {updates.map((item, idx) => (
        <Text key={idx} style={styles.updateText}>
          user: {item.user?.username}, action: {item.action}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  headerText: { fontSize: 14, marginBottom: 10, color: "gray" },
  title: { fontWeight: "bold", fontSize: 16, marginBottom: 150 },
  membersContainer: { marginBottom: 20 },
  memberBox: { alignItems: "center", marginRight: 15 },
  avatar: { width: 50, height: 50, borderRadius: 25, marginBottom: 5 },
  placeholder: { backgroundColor: "#ccc" },
  memberName: { fontSize: 14, color: "#333" },
  updateText: { fontSize: 14, marginBottom: 150 },
});

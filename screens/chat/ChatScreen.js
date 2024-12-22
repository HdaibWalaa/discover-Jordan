import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";

const ChatScreen = () => {
  const messages = [
    {
      id: "1",
      user: "Samer Salameh",
      message: "It was a very beautiful trip",
      time: "09:25 AM",
      type: "text",
    },
    {
      id: "2",
      user: "Maria Tareq",
      message: "https://example.com/audio.mp3",
      time: "09:25 AM",
      type: "audio",
      duration: "00:16",
    },
    {
      id: "3",
      user: "You",
      message: "You did your job well!",
      time: "09:25 AM",
      type: "text",
      self: true,
    },
  ];

  const renderMessage = ({ item }) => {
    if (item.type === "text") {
      return (
        <View
          style={[styles.messageContainer, item.self && styles.selfMessage]}
        >
          <View style={[styles.messageBubble, item.self && styles.selfBubble]}>
            <Text style={styles.messageText}>{item.message}</Text>
          </View>
          <Text style={[styles.timeText, item.self && styles.selfTimeText]}>
            {item.time}
          </Text>
        </View>
      );
    } else if (item.type === "audio") {
      return (
        <View style={styles.messageContainer}>
          <View style={styles.audioBubble}>
            <View style={styles.audioWave}></View>
            <Text style={styles.audioDuration}>{item.duration}</Text>
          </View>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.chatList}
        contentContainerStyle={styles.chatListContent}
      />
      <View style={styles.inputContainer}>
        <TouchableOpacity>
          <Image
            source={require("../../assets/images/icons/microphone.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TextInput style={styles.textInput} placeholder="Write your message" />
        <TouchableOpacity>
          <Image
            source={require("../../assets/images/icons/microphone.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../../assets/images/icons/microphone.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  messageContainer: {
    marginBottom: 10,
    alignItems: "flex-start",
    padding: 15,
  },
  selfMessage: {
    alignItems: "flex-end",
  },
  messageBubble: {
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    maxWidth: "75%",
  },
  selfBubble: {
    backgroundColor: "#3AAFB9",
  },
  messageText: {
    fontSize: 16,
  },
  timeText: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
    marginLeft: 10,
  },
  selfTimeText: {
    marginLeft: 0,
    marginRight: 10,
  },
  audioBubble: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxWidth: "75%",
  },
  audioWave: {
    flex: 1,
    height: 10,
    backgroundColor: "#3AAFB9",
    marginRight: 10,
  },
  audioDuration: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 5,
  },
});

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  chatContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  messageBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  currentUserMessage: {
    flexDirection: "row-reverse", // Align current user's message to the right
    alignSelf: "flex-end",
  },
  otherUserMessage: {
    alignSelf: "flex-start",
  },
  messageAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  messageContentWrapper: {
    borderRadius: 10,
    padding: 10,
    maxWidth: "75%",
  },
  currentUserContent: {
    backgroundColor: "#DCF8C6", // Light green for current user's messages
  },
  otherUserContent: {
    backgroundColor: "#f1f1f1", // Light gray for other users' messages
  },
  messageUsername: {
    fontWeight: "bold",
    marginBottom: 3,
    fontSize: 14,
    color: "#333",
  },
  messageText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  messageTime: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
    textAlign: "right",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: "#f1f1f1",
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#FFD700",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sendButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    marginBottom: 5,
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: "#f1f1f1",
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#FFD700",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sendButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
  messageVideoThumbnail: {
    width: 150,
    height: 100,
    borderRadius: 10,
    marginTop: 5,
  },
  playIcon: {
    position: "absolute",
    top: "40%",
    left: "40%",
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  audioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  audioIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  audioText: {
    fontSize: 14,
    color: "#333",
  },
});

export default styles;

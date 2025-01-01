import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { COLORS } from "../../../constants/theme";
import { AntDesign } from "@expo/vector-icons";
import EditDeleteReply from "./EditDeleteReply";

const CommentReply = ({
  commentId,
  handleReply,
  replies,
  handleLike,
  onReplyUpdated,
  onReplyDeleted,
}) => {
  const [newReply, setNewReply] = useState(""); // Reply content

  const handleSendReply = () => {
    if (!newReply.trim()) return;
    handleReply(commentId, newReply);
    setNewReply(""); // Clear the reply input after sending
  };

  return (
    <View style={styles.container}>
      {/* Render replies */}
      {replies && replies.length > 0 && (
        <View style={styles.repliesContainer}>
          {replies.map((reply) => (
            <View key={reply.id} style={styles.reply}>
              <Image
                source={{ uri: reply.avatar }}
                style={styles.replyAvatar}
              />
              <View style={styles.replyContent}>
                <View style={styles.replyHeader}>
                  <Text style={styles.replyAuthor}>{reply.username}</Text>
                  <EditDeleteReply
                    replyId={reply.id}
                    initialContent={reply.content}
                    onReplyUpdated={(replyId, updatedContent) => {
                      console.log(
                        "Reply updated with ID:",
                        replyId,
                        "Content:",
                        updatedContent
                      );

                      // Call the parent's handler to update the replies in the parent state
                      onReplyUpdated(replyId, updatedContent);
                    }}
                    onReplyDeleted={() => {
                      console.log("Reply deleted with ID:", reply.id);

                      // Call the parent's handler to delete the reply from the parent state
                      onReplyDeleted(reply.id);
                    }}
                  />
                </View>
                <Text style={styles.replyText}>{reply.content}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
      <View style={styles.replyContainer}>
        <TextInput
          style={styles.replyInput}
          placeholder="Type your reply..."
          value={newReply}
          onChangeText={setNewReply}
        />
        <TouchableOpacity style={styles.replyButton} onPress={handleSendReply}>
          <Text style={styles.replyButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentReply;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  replyContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  replyInput: {
    flex: 1,
    borderBottomWidth: 1,
    padding: 5,
    marginRight: 10,
    borderColor: COLORS.gray,
  },
  replyButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  replyButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  repliesContainer: {
    marginTop: 10,
    paddingLeft: 20,
  },
  reply: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  replyAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  replyContent: {
    flex: 1,
  },
  replyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  replyAuthor: {
    fontWeight: "bold",
  },
  replyText: {
    color: COLORS.darkGray,
    marginVertical: 5,
  },
  replyActions: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  likeCount: {
    marginLeft: 5,
    color: COLORS.primary,
  },
});

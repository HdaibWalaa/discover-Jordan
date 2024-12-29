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

const CommentReply = ({ commentId, handleReply, replies, handleLike }) => {
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
                <Text style={styles.replyAuthor}>{reply.username}</Text>
                <Text style={styles.replyText}>{reply.content}</Text>
                <View style={styles.replyActions}>
                  <TouchableOpacity
                    onPress={() => handleLike(reply.id)}
                    style={styles.likeButton}
                  >
                    <AntDesign name="like2" size={16} color={COLORS.primary} />
                    <Text style={styles.likeCount}>
                      {reply.reply_likes.total_likes}
                    </Text>
                  </TouchableOpacity>
                </View>
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

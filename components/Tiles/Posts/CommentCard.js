import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../../constants/theme";
import { AuthContext } from "../../../store/auth-context";
import defaultUserImage from "../../../assets/images/icons/userdefault.png";
import CommentReply from "./CommentReply";
import EditDeleteComment from "./EditDeleteComment";
import {
  addComment,
  replyToComment,
} from "../../../hook/posts/fetchAllComments";

const CommentCard = ({ postId, comments, setComments }) => {
  const { token } = useContext(AuthContext);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const newCommentData = await addComment(postId, newComment, token);
      setComments((prevComments) => [...prevComments, newCommentData]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error.message);
    }
  };

  const handleReplyComment = async (commentId, content) => {
    try {
      const newReplyData = await replyToComment(commentId, content, token);
      setComments((prevComments) => {
        const updatedComments = prevComments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                replies: [...(comment.replies || []), newReplyData],
              }
            : comment
        );
        return updatedComments;
      });
      setReplyTo(null);
    } catch (error) {
      console.error("Error replying to comment:", error.message);
    }
  };

  const handleCommentUpdate = (commentId, updatedContent) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? { ...comment, content: updatedContent }
          : comment
      )
    );
  };

  const handleCommentDelete = (commentId) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId)
    );
  };

  const renderComment = ({ item }) => (
    <View style={styles.commentContainer}>
      <Image
        source={{
          uri: item.avatar || defaultUserImage,
        }}
        style={styles.avatar}
      />
      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <Text style={styles.commentAuthor}>
            {item.username || "Anonymous"}
          </Text>
          <EditDeleteComment
            commentId={item.id}
            initialContent={item.content}
            onCommentUpdated={handleCommentUpdate}
            onCommentDeleted={handleCommentDelete}
          />
        </View>
        <Text style={styles.commentText}>{item.content}</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={() => setReplyTo(item.id)}>
            <Text style={styles.actionText}>Reply</Text>
          </TouchableOpacity>
        </View>
        {replyTo === item.id && (
          <CommentReply
            commentId={item.id}
            handleReply={handleReplyComment}
            replies={item.replies}
            handleLike={(replyId) => console.log(`Liked reply: ${replyId}`)}
            onReplyUpdated={(replyId, updatedContent) => {
              setComments((prevComments) =>
                prevComments.map((comment) =>
                  comment.id === item.id
                    ? {
                        ...comment,
                        replies: comment.replies.map((reply) =>
                          reply.id === replyId
                            ? { ...reply, content: updatedContent } // Update the reply content
                            : reply
                        ),
                      }
                    : comment
                )
              );
            }}
            onReplyDeleted={(replyId) => {
              setComments((prevComments) =>
                prevComments.map((comment) =>
                  comment.id === item.id
                    ? {
                        ...comment,
                        replies: comment.replies.filter(
                          (reply) => reply.id !== replyId
                        ),
                      }
                    : comment
                )
              );
            }}
          />
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.addCommentContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Type your comment..."
          value={newComment}
          onChangeText={setNewComment}
        />
        <TouchableOpacity onPress={handleAddComment} style={styles.ArrowInput}>
          <AntDesign name="arrowright" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    paddingBottom: 5,
    marginBottom: 10,
  },
  commentAuthor: {
    fontWeight: "bold",
    color: COLORS.dark,
    marginBottom: 3,
  },
  commentText: {
    color: COLORS.darkGray,
    fontSize: 14,
    lineHeight: 18,
  },
  actionsContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  actionText: {
    marginRight: 15,
    color: COLORS.primary,
    fontSize: 14,
  },
  addCommentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: COLORS.lightGray,
    borderRadius: 20,
    padding: 5,
  },
  commentInput: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: COLORS.white,
  },
  ArrowInput: {
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    padding: 8,
    borderRadius: 20,
  },
});

export default CommentCard;

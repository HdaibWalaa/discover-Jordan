import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import ReplyComment from "../../post/ReplyComment";
import { COLORS } from "../../../constants/theme";
import styles from "./PostCardStyles";

const defaultAvatar = require("../../../assets/images/default/user.png");

const CommentsSection = ({
  item,
  comments,
  loading,
  error,
  fetchComments,
  createComment,
  updateComment,
  deleteComment,
  likeDislikeComment,
  createReply,
  updateReply,
  deleteReply,
  likeDislikeReply,
}) => {
  const [newComment, setNewComment] = useState("");
  const [editComment, setEditComment] = useState(null);
  const [reply, setReply] = useState(null);
  const [newReply, setNewReply] = useState("");

  // Function to handle creating a new comment
  const handleCreateComment = () => {
    if (newComment.trim()) {
      createComment(item.id, newComment).then(() => {
        setNewComment(""); // Clear the input field after creating a comment
      });
    }
  };

  // Function to handle liking or disliking a comment
  const handleLikeDislikeComment = (commentId) => {
    likeDislikeComment(commentId).then(() => fetchComments(item.id));
  };

  // Function to set the comment being edited
  const handleEditComment = (commentId, content) => {
    setEditComment({ id: commentId, content });
  };

  // Function to save the edited comment
  const handleSaveEditComment = () => {
    if (editComment.content.trim()) {
      updateComment(editComment.id, editComment.content).then(() => {
        setEditComment(null); // Clear the editing state after saving
        fetchComments(item.id); // Refresh the comments to see the updated one
      });
    }
  };

  // Function to delete a comment
  const handleDeleteComment = (commentId) => {
    deleteComment(commentId).then(() => fetchComments(item.id));
  };

  // Function to handle creating a reply to a comment
  const handleCreateReply = (commentId) => {
    if (newReply.trim()) {
      createReply(commentId, newReply).then(() => {
        setNewReply(""); // Clear the input field after creating a reply
        setReply(null); // Close the reply section after replying
        fetchComments(item.id); // Refresh comments to include the new reply
      });
    }
  };

  return (
    <View style={styles.commentsSection}>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : error ? (
        <Text style={{ color: "red" }}>{error}</Text>
      ) : (
        <>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <View key={index} style={styles.comment}>
                <Image
                  source={
                    comment.avatar ? { uri: comment.avatar } : defaultAvatar
                  }
                  style={styles.commentUserImage}
                />
                <View style={styles.commentContent}>
                  <Text style={styles.commentUserName}>{comment.username}</Text>
                  <Text style={styles.commentTime}>{comment.created_at}</Text>
                  {editComment && editComment.id === comment.id ? (
                    <TextInput
                      style={styles.commentInput}
                      value={editComment.content}
                      onChangeText={(text) =>
                        setEditComment({ ...editComment, content: text })
                      }
                    />
                  ) : (
                    <Text style={styles.commentText}>{comment.content}</Text>
                  )}
                  <View style={styles.commentActions}>
                    <TouchableOpacity
                      onPress={() => handleLikeDislikeComment(comment.id)}
                    >
                      <Text style={styles.commentAction}>
                        {comment.liked ? "Dislike" : "Like"}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        handleEditComment(comment.id, comment.content)
                      }
                    >
                      <Text style={styles.commentAction}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDeleteComment(comment.id)}
                    >
                      <Text style={styles.commentAction}>Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setReply(comment.id)}>
                      <Text style={styles.commentAction}>Reply</Text>
                    </TouchableOpacity>
                  </View>
                  {reply === comment.id && (
                    <View style={styles.addReplySection}>
                      <Image
                        source={
                          item.user.image
                            ? { uri: item.user.image }
                            : defaultAvatar
                        }
                        style={styles.replyUserImage}
                      />
                      <TextInput
                        style={styles.replyInput}
                        placeholder="Type your reply..."
                        value={newReply}
                        onChangeText={setNewReply}
                      />
                      <TouchableOpacity
                        onPress={() => handleCreateReply(comment.id)}
                      >
                        <Text style={styles.replyButton}>Reply</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  {editComment && editComment.id === comment.id && (
                    <TouchableOpacity
                      onPress={handleSaveEditComment}
                      style={styles.saveEditButton}
                    >
                      <Text style={styles.commentAction}>Save</Text>
                    </TouchableOpacity>
                  )}
                  {comment.replies &&
                    comment.replies.map((reply, replyIndex) => (
                      <ReplyComment
                        key={replyIndex}
                        reply={reply}
                        handleEditReply={handleEditComment}
                        handleSaveEditReply={handleSaveEditComment}
                        handleDeleteReply={handleDeleteComment}
                        handleLikeDislikeReply={handleLikeDislikeComment}
                      />
                    ))}
                </View>
              </View>
            ))
          ) : (
            <Text>No comments yet.</Text>
          )}
        </>
      )}
      <View style={styles.addCommentSection}>
        <Image
          source={item.user.image ? { uri: item.user.image } : defaultAvatar}
          style={styles.commentUserImage}
        />
        <TextInput
          style={styles.commentInput}
          placeholder="Type your comment..."
          value={newComment}
          onChangeText={setNewComment}
        />
        <TouchableOpacity onPress={handleCreateComment}>
          <Text style={styles.commentButton}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentsSection;

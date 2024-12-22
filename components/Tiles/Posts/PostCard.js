import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import CommentButton from "../../post/CommentButton";
import { AuthContext } from "../../../store/auth-context";
import styles from "./PostCardStyles";
import useComments from "../../../hook/useComments";
import ReplyComment from "../../post/ReplyComment";
import { COLORS } from "../../../constants/theme";

const defaultAvatar = require("../../../assets/images/default/user.png");

const PostCard = ({ item }) => {
  const { token } = useContext(AuthContext);
  const {
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
  } = useComments(token);

  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [editComment, setEditComment] = useState(null);
  const [commentsCount, setCommentsCount] = useState(item.comments.length);
  const [reply, setReply] = useState(null);
  const [newReply, setNewReply] = useState("");

  useEffect(() => {
    if (showComments) {
      fetchComments(item.id);
    }
  }, [showComments, item.id]);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleCreateComment = () => {
    if (newComment.trim()) {
      createComment(item.id, newComment).then(() => {
        setNewComment("");
        setCommentsCount(commentsCount + 1);
        fetchComments(item.id); // Fetch comments again to update the list
      });
    }
  };

  const handleLikeDislikeComment = (commentId) => {
    likeDislikeComment(commentId).then(() => fetchComments(item.id));
  };

  const handleEditComment = (commentId, content) => {
    setEditComment({ id: commentId, content });
  };

  const handleSaveEditComment = () => {
    if (editComment.content.trim()) {
      updateComment(editComment.id, editComment.content).then(() => {
        setEditComment(null);
        fetchComments(item.id);
      });
    }
  };

  const handleDeleteComment = (commentId) => {
    deleteComment(commentId).then(() => {
      setCommentsCount(commentsCount - 1);
      fetchComments(item.id);
    });
  };

  const handleCreateReply = (commentId) => {
    if (newReply.trim()) {
      createReply(commentId, newReply).then(() => {
        setNewReply("");
        setReply(null);
        fetchComments(item.id);
      });
    }
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.header}>
        <Image
          source={item.user.image ? { uri: item.user.image } : defaultAvatar}
          style={styles.userImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.user.username}</Text>
          <Text style={styles.postTime}>{item.created_at}</Text>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <Image
            source={require("../../../assets/images/icons/heart.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Image
            source={require("../../../assets/images/icons/more.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.postTitle}>{item.name}</Text>
      <Text style={styles.postDescription}>{item.content}</Text>
      {item.images.length > 0 && (
        <Image source={{ uri: item.images[0].url }} style={styles.postImage} />
      )}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem}>
          <Image
            source={require("../../../assets/images/icons/like.png")}
            style={styles.footerIcon}
          />
          <Text style={styles.footerText}>
            You and {item.post_likes.total_likes} Likes
          </Text>
        </TouchableOpacity>
        <CommentButton
          postId={item.id}
          commentsCount={commentsCount}
          likeDislikeComment={handleLikeDislikeComment}
          onPress={toggleComments}
        />
      </View>
      {showComments && (
        <View style={styles.commentsSection}>
          {loading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>{error}</Text>
          ) : comments.length > 0 ? (
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
          <View style={styles.addCommentSection}>
            <Image
              source={
                item.user.image ? { uri: item.user.image } : defaultAvatar
              }
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
      )}
    </View>
  );
};

export default PostCard;

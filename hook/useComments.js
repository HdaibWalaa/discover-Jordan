import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "./apiConfig";

const useComments = (token) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComments = async (postId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/post/followings`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-API-KEY": "DISCOVERJO91427",
        },
      });
      const post = response.data.data.find((post) => post.id === postId);
      setComments(
        post
          ? post.comments.map((comment) => ({ ...comment, liked: false }))
          : []
      );
    } catch (error) {
      setError("Failed to fetch comments");
      console.error("Failed to fetch comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const createComment = async (postId, content) => {
    try {
      await axios.post(
       `${BASE_URL}/post/comment/store`,
        { post_id: postId, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      fetchComments(postId); // Refresh comments
    } catch (error) {
      setError("Failed to create comment");
      console.error("Failed to create comment:", error);
    }
  };

  const updateComment = async (commentId, content) => {
    try {
      await axios.post(
        `${BASE_URL}/post/comment/update/${commentId}`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      // Optionally, refresh comments if you have the postId available
    } catch (error) {
      setError("Failed to update comment");
      console.error("Failed to update comment:", error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await axios.delete(
        `${BASE_URL}/post/comment/delete/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      // Optionally, refresh comments if you have the postId available
    } catch (error) {
      setError("Failed to delete comment");
      console.error("Failed to delete comment:", error);
    }
  };

  const likeDislikeComment = async (commentId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/post/comment/like-dislike/like/${commentId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      if (response.status === 200) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === commentId
              ? { ...comment, liked: !comment.liked }
              : comment
          )
        );
      } else {
        throw new Error("Failed to like/dislike comment");
      }
    } catch (error) {
      setError("Failed to like/dislike comment");
      console.error("Failed to like/dislike comment:", error);
    }
  };

  // Add these functions for replies
  const createReply = async (commentId, content) => {
    try {
      await axios.post(
       `${BASE_URL}/post/reply/create`,
        { comment_id: commentId, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      // Optionally, refresh comments if you have the commentId available
    } catch (error) {
      setError("Failed to create reply");
      console.error("Failed to create reply:", error);
    }
  };

  const updateReply = async (replyId, content) => {
    try {
      await axios.post(
        `${BASE_URL}/post/reply/update/${replyId}`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      // Optionally, refresh comments if you have the replyId available
    } catch (error) {
      setError("Failed to update reply");
      console.error("Failed to update reply:", error);
    }
  };

  const deleteReply = async (replyId) => {
    try {
      await axios.delete(
        `${BASE_URL}/post/reply/delete/${replyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      // Optionally, refresh comments if you have the replyId available
    } catch (error) {
      setError("Failed to delete reply");
      console.error("Failed to delete reply:", error);
    }
  };

  const likeDislikeReply = async (replyId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/post/reply/dislike/${replyId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      if (response.status === 200) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.replies.map((reply) =>
              reply.id === replyId ? { ...reply, liked: !reply.liked } : reply
            )
          )
        );
      } else {
        throw new Error("Failed to like/dislike reply");
      }
    } catch (error) {
      setError("Failed to like/dislike reply");
      console.error("Failed to like/dislike reply:", error);
    }
  };

  return {
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
  };
};

export default useComments;

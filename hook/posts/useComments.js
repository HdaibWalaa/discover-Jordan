import { useState } from "react";
import axios from "axios";
import BASE_URL from "../apiConfig";

const useComments = (token) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComments = async (postId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/api/post/followings`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      // Find the post with the given postId
      const post = response.data.data.posts.find((p) => p.id === postId);

      if (post && post.comments) {
        setComments(post.comments); // Set comments for the post
      } else {
        setComments([]); // If no comments found
      }
    } catch (err) {
      setError("Failed to fetch comments.");
    } finally {
      setLoading(false);
    }
  };

  const createComment = async (postId, content) => {
    setLoading(true);
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
      await fetchComments(postId); // Refresh comments after adding a new one
    } catch (err) {
      setError("Failed to create comment.");
    } finally {
      setLoading(false);
    }
  };

  const updateComment = async (commentId, content) => {
    setLoading(true);
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
      await fetchComments(commentId); // Refresh comments after updating one
    } catch (err) {
      setError("Failed to update comment.");
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (commentId) => {
    setLoading(true);
    try {
      await axios.delete(`${BASE_URL}/post/comment/delete/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      await fetchComments(commentId); // Refresh comments after deleting one
    } catch (err) {
      setError("Failed to delete comment.");
    } finally {
      setLoading(false);
    }
  };

  const likeDislikeComment = async (commentId) => {
    try {
      await axios.post(
        `${BASE_URL}/post/comment/like-dislike/like/${commentId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      await fetchComments(commentId); // Refresh comments after liking/disliking one
    } catch (err) {
      setError("Failed to like/dislike comment.");
    }
  };

  const createReply = async (commentId, content) => {
    setLoading(true);
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
      await fetchComments(commentId); // Refresh comments after adding a new reply
    } catch (err) {
      setError("Failed to create reply.");
    } finally {
      setLoading(false);
    }
  };

  const updateReply = async (replyId, content) => {
    setLoading(true);
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
      await fetchComments(replyId); // Refresh comments after updating a reply
    } catch (err) {
      setError("Failed to update reply.");
    } finally {
      setLoading(false);
    }
  };

  const deleteReply = async (replyId) => {
    setLoading(true);
    try {
      await axios.delete(`${BASE_URL}/post/reply/delete/${replyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      await fetchComments(replyId); // Refresh comments after deleting a reply
    } catch (err) {
      setError("Failed to delete reply.");
    } finally {
      setLoading(false);
    }
  };

  const likeDislikeReply = async (replyId) => {
    try {
      await axios.post(
        `${BASE_URL}/post/reply/dislike/${replyId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      await fetchComments(replyId); // Refresh comments after liking/disliking a reply
    } catch (err) {
      setError("Failed to like/dislike reply.");
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

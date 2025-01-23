import axios from "axios";
import BASE_URL from "../apiConfig";

// Function to fetch all comments for a post
export const fetchComments = async (postId, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/post/comment/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-API-KEY": "DISCOVERJO91427",
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching comments:", error.message);
    throw error;
  }
};

// Function to add a new comment
export const addComment = async (postId, content, token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/post/comment/store`,
      { post_id: postId, content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error adding comment:", error.message);
    throw error;
  }
};

// Function to reply to a comment
export const replyToComment = async (commentId, content, token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/post/reply/create`,
      { comment_id: commentId, content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error replying to comment:", error.message);
    throw error;
  }
};

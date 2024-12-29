import axios from "axios";
import BASE_URL from "../../../hook/apiConfig";

export const handleLikeDislike = async (token, item, liked, setLiked) => {
  const action = liked ? "dislike" : "like"; // Toggle action

  try {
    const response = await axios.post(
      `${BASE_URL}/post/like-dislike/${action}/${item.id}`,
      {
        title: item.name || "", // Provide the "title" if required by the API
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Response from server:", response.data);

    setLiked(!liked); // Update like status locally
  } catch (error) {
    console.error("Error liking/disliking the post:", error.message);
    console.error("Error Details:", error.response?.data);
  }
};

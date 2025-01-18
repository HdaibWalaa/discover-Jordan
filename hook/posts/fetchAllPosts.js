import axios from "axios";
import BASE_URL from "../apiConfig";

const fetchAllPosts = async (token, page = 1, language = "en") => {
  try {
    const response = await axios.get(
      `${BASE_URL}/post/followings?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Language": language, // Include the language header
        },
      }
    );

    if (response.status === 200 && response.data.data) {
      const newPosts = response.data.data.posts;
      const nextPageUrl = response.data.data.pagination.next_page_url;

      return {
        posts: newPosts,
        hasMore: !!nextPageUrl,
      };
    } else {
      throw new Error("Failed to fetch posts");
    }
  } catch (error) {
    console.error("Error in fetchAllPosts:", error.message);
    throw error;
  }
};

export default fetchAllPosts;

import React, { useEffect, useState, useContext } from "react";
import {
  View,
  VirtualizedList,
  StyleSheet,
  ActivityIndicator,
  Text,
} from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import HeightSpacer from "../Reusable/HeightSpacer";
import PostCard from "../Tiles/Posts/PostCard";
import axios from "axios";
import { AuthContext } from "../../store/auth-context";
import BASE_URL from "../../hook/apiConfig";

const AllPostsCard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // To track if there are more posts to load

  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async (page = 1) => {
      if (!hasMore && page > 1) return; // If no more posts, don't fetch

      try {
        const response = await axios.get(
          `${BASE_URL}/post/followings?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const newPosts = response.data.data.posts;
        const nextPageUrl = response.data.data.pagination.next_page_url;

        setPosts((prevPosts) =>
          page === 1 ? newPosts : [...prevPosts, ...newPosts]
        );
        setHasMore(!!nextPageUrl);
      } catch (error) {
        setError("Failed to fetch posts");
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };

    fetchPosts(page);
  }, [token, page, hasMore]);

  const loadMorePosts = () => {
    if (loadingMore || !hasMore) return; // Prevent loading more if already loading or no more posts
    setLoadingMore(true);
    setPage((prevPage) => prevPage + 1);
  };

  const getItem = (data, index) => data[index];

  if (loading) {
    return <ActivityIndicator size="large" color={COLORS.primary} />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View>
      <HeightSpacer height={SIZES.xLarge} />
      <VirtualizedList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        getItemCount={(data) => data.length}
        getItem={getItem}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <PostCard item={item} />
          </View>
        )}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.5} // Load more when 50% away from the end
        ListFooterComponent={() =>
          loadingMore ? (
            <ActivityIndicator size="small" color={COLORS.primary} />
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 20,
  },
});

export default AllPostsCard;

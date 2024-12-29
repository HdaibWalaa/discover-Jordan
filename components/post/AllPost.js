import React, { useEffect, useState, useContext } from "react";
import {
  View,
  VirtualizedList,
  StyleSheet,
  ActivityIndicator,
  Text,
  Platform,
  NativeModules,
} from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import HeightSpacer from "../Reusable/HeightSpacer";
import PostCard from "../Tiles/Posts/PostCard";
import { AuthContext } from "../../store/auth-context";
import fetchAllPosts from "../../hook/posts/fetchAllPosts";

const AllPostsCard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // To track if there are more posts to load

  const { token } = useContext(AuthContext);

  // Determine the device language
  const deviceLanguage =
    Platform.OS === "ios"
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;

  const language = deviceLanguage?.split(/[_-]/)[0] || "en"; // Default to 'en'

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const { posts: newPosts, hasMore: moreAvailable } = await fetchAllPosts(
          token,
          page,
          language // Pass the language to the fetchAllPosts function
        );

        setPosts((prevPosts) =>
          page === 1 ? newPosts : [...prevPosts, ...newPosts]
        );
        setHasMore(moreAvailable);
      } catch (err) {
        setError("Failed to fetch posts");
        console.error(err.message);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };

    loadPosts();
  }, [token, page, language]);

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
        renderItem={({ item }) => <PostCard item={item} />}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.5}
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

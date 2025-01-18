import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { COLORS, TEXT } from "../../constants/theme";
import ReusableBackground from "../../components/Reusable/ReusableBackground";
import ReusableText from "../../components/Reusable/ReusableText";
import { getUserProfile } from "../../util/auth";
import { AuthContext } from "../../store/auth-context";
import PostCard from "../../components/Tiles/Posts/PostCard";
const AllUserPosts = () => {
  const { token } = useContext(AuthContext); // Access token from AuthContext
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getUserProfile(token);
        setUserProfile(profileData?.data);
      } catch (err) {
        console.error("Error fetching user profile:", err.message);
        setError("Failed to load user profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const renderPostItem = ({ item }) => <PostCard item={item} />;

  if (loading) {
    return (
      <ReusableBackground>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </ReusableBackground>
    );
  }

  if (error) {
    return (
      <ReusableBackground>
        <Text style={styles.errorText}>{error}</Text>
      </ReusableBackground>
    );
  }

  return (
    <ReusableBackground>
      {/* User Profile Header */}
      <View style={styles.profileHeader}>
        <Image
          source={{
            uri: userProfile?.avatar || "https://via.placeholder.com/100",
          }}
          style={styles.avatar}
        />
        <View style={styles.profileDetails}>
          <ReusableText
            text={userProfile?.username || "Unknown User"}
            family="Bold"
            size={TEXT.large}
            color={COLORS.black}
          />
          <Text style={styles.description}>
            {userProfile?.description || "No description available"}
          </Text>
        </View>
      </View>

      {/* Posts List */}
      <FlatList
        data={userProfile?.posts || []}
        renderItem={renderPostItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.noPostsText}>No posts available.</Text>
        }
        ListFooterComponent={() => (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            {/* Add space below the posts */}
            <View style={{ height: 100 }} />
          </View>
        )}
      />
    </ReusableBackground>
  );
};

export default AllUserPosts;

const styles = StyleSheet.create({
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.light,
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileDetails: {
    flex: 1,
  },
  description: {
    color: COLORS.gray,
    marginTop: 4,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  noPostsText: {
    fontSize: TEXT.medium,
    color: COLORS.gray,
    textAlign: "center",
    marginTop: 20,
  },
  errorText: {
    fontSize: TEXT.medium,
    color: COLORS.red,
    textAlign: "center",
    marginTop: 20,
  },
});

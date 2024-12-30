import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Video } from "expo-av";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { COLORS, TEXT } from "../../../constants/theme";
import { AuthContext } from "../../../store/auth-context";
import styles from "./PostCardStyles";
import { ReusableText } from "../../index";
import CommentCard from "./CommentCard";
import EditDeletePost from "./EditDeletePost";
import {
  addFavorite,
  deleteFavorite,
} from "../../../hook/posts/fetchFavoritepost";

const PostCard = ({ item }) => {
  const { token } = useContext(AuthContext);
  const [liked, setLiked] = useState(
    item.post_likes.user_likes_info.length > 0
  );
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(item.comments);
  const [showFullContent, setShowFullContent] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(item.favorite);
  const [modalVisible, setModalVisible] = useState(false);

  const handleFavoriteToggle = async () => {
    try {
      if (isFavorite) {
        await deleteFavorite(item.id, token);
      } else {
        await addFavorite(item.id, token);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      Alert.alert("Error", "Unable to update favorites. Please try again.");
    }
  };

  const handleEditPost = () => {
    setModalVisible(false);
    Alert.alert("Edit Post", "Edit post functionality here.");
  };

  const handleDeletePost = () => {
    console.log("Post deleted"); // Replace with delete logic
    setModalVisible(false);
  };

  const renderMediaItem = ({ item }) => {
    const isVideo = item.url.endsWith(".mp4");
    return isVideo ? (
      <Video
        source={{ uri: item.url }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay={false}
        useNativeControls
        style={styles.media}
      />
    ) : (
      <Image source={{ uri: item.url }} style={styles.media} />
    );
  };

  return (
    <View style={styles.cardContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: item.user.image }} style={styles.avatar} />
        <View style={styles.headerDetails}>
          <View style={styles.userInfo}>
            <ReusableText
              text={item.user.username}
              family={"Bold"}
              size={TEXT.medium}
              color={COLORS.black}
              style={styles.username}
            />
            <ReusableText
              text={item.created_at}
              family={"Bold"}
              size={TEXT.small}
              color={COLORS.lightGrey}
              style={styles.createdAt}
            />
          </View>
          <ReusableText
            text={item.name}
            family={"Medium"}
            size={TEXT.small}
            color={COLORS.gray}
            style={styles.createdAt}
          />
        </View>
        <TouchableOpacity
          style={styles.moreIcon}
          onPress={() => setModalVisible(true)}
        >
          <Entypo name="dots-three-horizontal" size={20} color={COLORS.gray} />
        </TouchableOpacity>
      </View>

      {/* Edit/Delete Modal */}
      <EditDeletePost
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onEdit={() => console.log("Edit Post")}
        onDelete={() => {
          // Update the UI after deletion
          console.log("Post deleted");
        }}
        token={token} // Pass the user token
        postId={item.id} // Pass the post ID
      />

      {/* Content */}
      <View style={styles.contentContainer}>
        <Text>
          <ReusableText
            text={
              showFullContent || item.content.length <= 100
                ? item.content
                : `${item.content.slice(0, 100)}...`
            }
            family={"Medium"}
            size={TEXT.medium}
            color={COLORS.dark}
          />
          {item.content.length > 100 && (
            <Text
              style={styles.toggleText}
              onPress={() => setShowFullContent(!showFullContent)}
            >
              {showFullContent ? " Show less" : " Show more"}
            </Text>
          )}
        </Text>
      </View>

      {/* Media Carousel */}
      {item.images.length > 0 && (
        <FlatList
          data={item.images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={renderMediaItem}
          keyExtractor={(mediaItem) => mediaItem.id.toString()}
          onScroll={(event) => {
            const offsetX = event.nativeEvent.contentOffset.x;
            setCurrentIndex(
              Math.floor(offsetX / event.nativeEvent.layoutMeasurement.width)
            );
          }}
        />
      )}

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.actionsLeft}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setLiked(!liked)}
          >
            <AntDesign
              name={liked ? "heart" : "hearto"}
              size={20}
              color={liked ? COLORS.primary : COLORS.gray}
            />
            <Text style={styles.footerText}>
              {liked
                ? item.post_likes.total_likes + 1
                : item.post_likes.total_likes}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.iconButton, { marginLeft: 10 }]}
            onPress={() => setShowComments(!showComments)}
          >
            <AntDesign name="message1" size={20} color={COLORS.gray} />
            <Text style={styles.footerText}>
              {comments.length > 0 ? comments.length : "0"}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={handleFavoriteToggle}
        >
          <FontAwesome
            name={isFavorite ? "bookmark" : "bookmark-o"}
            size={20}
            color={isFavorite ? COLORS.primary : COLORS.gray}
          />
        </TouchableOpacity>
      </View>

      {/* Comment Section */}
      {showComments && (
        <CommentCard
          postId={item.id}
          comments={comments}
          setComments={setComments}
        />
      )}
    </View>
  );
};

export default PostCard;

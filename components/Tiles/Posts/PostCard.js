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
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { COLORS, TEXT } from "../../../constants/theme";
import { AuthContext } from "../../../store/auth-context";
import styles from "./PostCardStyles";
import { ReusableText } from "../../index";
import CommentCard from "./CommentCard";

const PostCard = ({ item }) => {
  const { token } = useContext(AuthContext);
  const [liked, setLiked] = useState(
    item.post_likes.user_likes_info.length > 0
  );
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(item.comments);
  const [showFullContent, setShowFullContent] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // State to track the current media index
  const [isFavorite, setIsFavorite] = useState(item.favorite);

  const handleFavoriteToggle = async () => {
    try {
      const url = isFavorite
        ? `https://dashboard.discoverjo.com/api/post/favorite/${item.id}/delete`
        : `https://dashboard.discoverjo.com/api/post/favorite/${item.id}`;
      const method = isFavorite ? "DELETE" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        setIsFavorite(!isFavorite);
      } else {
        Alert.alert("Error", data.msg || "Failed to update favorites.");
      }
    } catch (error) {
      console.error("Error toggling favorite:", error.message);
      Alert.alert("Error", "Something went wrong. Please try again later.");
    }
  };

  const renderMediaItem = ({ item }) => {
    const isVideo = item.url.endsWith(".mp4");

    if (isVideo) {
      return (
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
      );
    }

    return <Image source={{ uri: item.url }} style={styles.media} />;
  };

  const handleMoreOptions = (postId) => {
    console.log(`More options for post ID: ${postId}`);
    // Add logic for edit or delete functionality
  };

  const isContentTruncated = item.content.length > 100;
  const contentToShow = showFullContent
    ? item.content
    : isContentTruncated
    ? `${item.content.slice(0, 100)}...`
    : item.content;

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
          onPress={() => handleMoreOptions(item.id)}
        >
          <Entypo name="dots-three-horizontal" size={20} color={COLORS.gray} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        <Text>
          <ReusableText
            text={contentToShow}
            family={"Medium"}
            size={TEXT.medium}
            color={COLORS.dark}
          />
          {isContentTruncated && (
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
      {item.images.length > 1 && (
        <View>
          <FlatList
            data={item.images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={renderMediaItem}
            keyExtractor={(mediaItem) => mediaItem.id.toString()}
            onScroll={(event) => {
              const offsetX = event.nativeEvent.contentOffset.x;
              const index = Math.floor(
                offsetX / event.nativeEvent.layoutMeasurement.width
              );
              setCurrentIndex(index);
            }}
          />
          {/* Counter inside the image */}
          <View style={styles.imageCounterContainer}>
            <Text style={styles.imageCounterText}>
              {`${currentIndex + 1}/${item.images.length}`}
            </Text>
          </View>

          {/* Dot Indicators below the image */}
          <View style={styles.dotContainer}>
            {item.images.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, currentIndex === index && styles.activeDot]}
              />
            ))}
          </View>
        </View>
      )}

      {/* Show single media without carousel */}
      {item.images.length === 1 && (
        <View>{renderMediaItem({ item: item.images[0] })}</View>
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
                ? `${item.post_likes.total_likes + 1}`
                : `${item.post_likes.total_likes}`}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.iconButton, { marginLeft: 10 }]}
            onPress={() => setShowComments(!showComments)}
          >
            <AntDesign name="message1" size={20} color={COLORS.gray} />
            <Text style={styles.footerText}>
              {comments.length > 0 ? `${comments.length}` : "0"}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={handleFavoriteToggle}
        >
          <Feather
            name="bookmark" // Feather only supports the 'bookmark' icon
            size={20}
            color={isFavorite ? COLORS.primary : COLORS.gray} // Change the color dynamically
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

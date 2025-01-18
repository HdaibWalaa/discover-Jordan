import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AuthContext } from "../../store/auth-context";
import { COLORS, SIZES } from "../../constants/theme";

const EditUserPost = ({ route, navigation }) => {
  const { token } = useContext(AuthContext);
  const { postId } = route.params;

  const [content, setContent] = useState("");
  const [visitableId, setVisitableId] = useState("");
  const [privacy, setPrivacy] = useState("1");
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(
          `https://dashboard.discoverjo.com/api/post/show/${postId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const post = data?.data;
          setContent(post.content || "");
          setVisitableId(post.visitable_id?.toString() || "");
          setPrivacy(post.privacy?.toString() || "1");
          setMedia(post.media || []);
        } else {
          const errorData = await response.json();
          Alert.alert(
            "Error",
            errorData.msg || "Failed to fetch post details."
          );
        }
      } catch (error) {
        Alert.alert("Error", "Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [postId, token]);

  const handlePickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setMedia([
        ...media,
        ...result.assets.map((asset) => ({
          uri: asset.uri,
          id: `new-${asset.uri}`,
          isNew: true,
        })),
      ]);
    }
  };

  const handleDeleteImage = (imageId) => {
    setMedia((prevMedia) => prevMedia.filter((item) => item.id !== imageId));
  };

  const handleUpdatePost = async () => {
    const formData = new FormData();
    formData.append("visitable_type", "place");
    formData.append("visitable_id", visitableId);
    formData.append("content", content);
    formData.append("privacy", privacy);
    formData.append("post_id", postId);

    media
      .filter((item) => item.isNew)
      .forEach((item, index) => {
        formData.append("media[]", {
          uri: item.uri,
          name: `image${index}.jpg`,
          type: "image/jpeg",
        });
      });

    try {
      const response = await fetch(
        `https://dashboard.discoverjo.com/api/post/update/${postId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        Alert.alert("Success", "Post updated successfully.");
        navigation.goBack();
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData.msg || "Failed to update post.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again later.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Content:</Text>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
        placeholder="Enter your post content"
        multiline
      />

      <Text style={styles.label}>Visitable ID:</Text>
      <TextInput
        style={styles.input}
        value={visitableId}
        onChangeText={setVisitableId}
        placeholder="Enter visitable ID"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Privacy:</Text>
      <TextInput
        style={styles.input}
        value={privacy}
        onChangeText={setPrivacy}
        placeholder="Enter privacy level (e.g., 1 for public)"
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.imagePicker} onPress={handlePickImages}>
        <Text style={styles.imagePickerText}>Pick Images</Text>
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        {media.map((item) => (
          <View key={item.id} style={styles.imageWrapper}>
            <Image source={{ uri: item.uri }} style={styles.imagePreview} />
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteImage(item.id)}
            >
              <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <Button
        title="Update Post"
        onPress={handleUpdatePost}
        color={COLORS.primary}
      />
    </View>
  );
};

export default EditUserPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.light,
    top: 100,
  },
  label: {
    fontSize: SIZES.medium,
    marginBottom: 8,
    color: COLORS.dark,
  },
  input: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray,
    marginBottom: 16,
  },
  imagePicker: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  imagePickerText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  imageWrapper: {
    position: "relative",
    marginRight: 8,
    marginBottom: 8,
  },
  imagePreview: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  deleteButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 15,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "bold",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

import React,{useState} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons"; // Make sure you have expo/vector-icons installed

const TripGallery = ({ gallery, setGallery }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Request permission and handle image picking
  const handleImagePick = async () => {
    setIsLoading(true);

    try {
      // Request permission
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "We need camera roll permissions to upload images"
        );
        setIsLoading(false);
        return;
      }

      // Pick images
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.8,
        aspect: [4, 3],
        allowsEditing: false,
      });

      if (!result.canceled) {
        setGallery((prevGallery) => [
          ...prevGallery,
          ...result.assets.map((asset) => asset.uri),
        ]);
      }
    } catch (error) {
      console.error("Image picking error:", error);
      Alert.alert("Error", "Failed to pick images");
    } finally {
      setIsLoading(false);
    }
  };

  // Remove image from gallery
  const removeImage = (index) => {
    Alert.alert("Remove Image", "Are you sure you want to remove this image?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () =>
          setGallery((prevGallery) =>
            prevGallery.filter((_, i) => i !== index)
          ),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Gallery Images</Text>
      <Text style={styles.subtitle}>
        Add photos that showcase the trip experience
      </Text>

      <View style={styles.galleryContainer}>
        {gallery.length === 0 ? (
          <View style={styles.emptyGallery}>
            <Ionicons name="images-outline" size={48} color="#ddd" />
            <Text style={styles.emptyText}>No images added yet</Text>
          </View>
        ) : (
          gallery.map((image, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={{ uri: image }} style={styles.image} />
              <TouchableOpacity
                onPress={() => removeImage(index)}
                style={styles.removeButton}
              >
                <Ionicons name="close" size={16} color="#FFF" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleImagePick}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <>
            <Ionicons name="add-circle-outline" size={18} color="#fff" />
            <Text style={styles.addButtonText}>Add Images</Text>
          </>
        )}
      </TouchableOpacity>

      {gallery.length > 0 && (
        <Text style={styles.count}>
          {gallery.length} {gallery.length === 1 ? "image" : "images"} selected
        </Text>
      )}
    </View>
  );
};

export default TripGallery;

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 14,
  },
  galleryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  emptyGallery: {
    width: "100%",
    height: 120,
    borderWidth: 2,
    borderColor: "#eee",
    borderStyle: "dashed",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    marginBottom: 12,
  },
  emptyText: {
    marginTop: 8,
    color: "#999",
  },
  imageWrapper: {
    position: "relative",
    margin: 4,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeButton: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    backgroundColor: "#FCD228",
    padding: 14,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 6,
  },
  count: {
    marginTop: 8,
    textAlign: "center",
    color: "#666",
    fontSize: 14,
  },
});

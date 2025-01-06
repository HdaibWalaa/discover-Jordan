import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const TripGallery = ({ gallery, setGallery }) => {
  // Function to pick multiple images
  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // Allow multiple selection
      quality: 1,
    });

    if (!result.canceled) {
      setGallery((prevGallery) => [
        ...prevGallery,
        ...result.assets.map((asset) => asset.uri),
      ]);
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
      <Text style={styles.label}>Gallery</Text>
      <View style={styles.galleryContainer}>
        {gallery.map((image, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image source={{ uri: image }} style={styles.image} />
            <TouchableOpacity
              onPress={() => removeImage(index)}
              style={styles.removeButton}
            >
              <Text style={styles.removeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleImagePick}>
        <Text style={styles.addButtonText}>+ Add Images</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TripGallery;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  galleryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  imageWrapper: {
    position: "relative",
    marginRight: 8,
    marginBottom: 8,
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 4,
    borderRadius: 8,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#FCD228",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "../../screens/search/reusableTile.style";

const ReusableTile = ({ item, onPress }) => {
  const placeholderImage = "https://via.placeholder.com/150"; // Fallback image URL

  return (
    <TouchableOpacity style={styles.tileContainer} onPress={onPress}>
      <Image
        source={{ uri: item.image || placeholderImage }} // Use fallback if image is missing
        style={styles.image}
        onError={() => {
          console.warn("Failed to load image, using fallback.");
        }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.name || item.title}</Text>
        <Text style={styles.location}>
          {item.region || item.location || item.address}
        </Text>
        {item.rating && (
          <Text style={styles.rating}>Rating: {item.rating}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ReusableTile;

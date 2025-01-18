import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import styles from "./post.style";

const PostMedia = ({ pickImage }) => {
  return (
    <View style={styles.addMediaContainer}>
      <TouchableOpacity style={styles.addMediaButton} onPress={pickImage}>
        <Image
          source={require("../../assets/images/icons/apps-add.png")}
          style={styles.addMediaIcon}
        />
        <Text style={styles.addMediaText}>ADD IMAGES / VIDEOS</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PostMedia;

import React from "react";
import { TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

const CommentButton = ({ commentsCount, onPress }) => {
  return (
    <TouchableOpacity style={styles.footerItem} onPress={onPress}>
      <Image
        source={require("../../assets/images/icons/comment.png")}
        style={styles.footerIcon}
      />
      <Text style={styles.footerText}>
        {commentsCount > 0 ? `${commentsCount} Comments` : "No comments yet"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  footerText: {
    fontSize: 14,
  },
});

export default CommentButton;

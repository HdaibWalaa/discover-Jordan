import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { COLORS } from "../../../constants/theme";

const LikePost = ({ totalLikes }) => {
  return (
    <View style={styles.footerItem}>
      <Image
        source={require("../../../assets/images/icons/like.png")}
        style={styles.icon}
      />
      <Text>{totalLikes} Likes</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});

export default LikePost;

import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// Default image in case no image is provided
const defaultImage = "https://example.com/default-image.png"; // Replace with a valid URL

const ProfileTags = ({ tags = [] }) => {
  if (tags.length === 0) {
    return <Text style={styles.noTagsText}>No tags available</Text>;
  }

  return (
    <View style={styles.tagsContainer}>
      {tags.map((tag, index) => (
        <View key={index} style={styles.tagBox}>
          <Image
            source={{ uri: tag.image_inactive || defaultImage }}
            style={styles.tagIcon}
          />
          <Text style={styles.tagText}>{tag.name}</Text>
        </View>
      ))}
    </View>
  );
};

export default ProfileTags;

const styles = StyleSheet.create({
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: wp("2%"),
  },
  tagBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: wp("10%"),
    borderColor: COLORS.gray,
    overflow: "hidden",
    padding: wp("2%"),
    marginBottom: wp("2%"),
  },
  tagIcon: {
    width: wp("6%"),
    height: wp("6%"),
    borderRadius: wp("3%"),
    marginRight: wp("2%"),
  },
  tagText: {
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  noTagsText: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
    marginTop: hp("2%"),
  },
});

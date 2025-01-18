import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const TripTags = ({ tripDetails }) => {
  return (
    <View>
      <Text style={styles.tagsTitle}>Tags:</Text>
      <View style={styles.tagsContainer}>
        {tripDetails.tags.map((tag) => (
          <View key={tag.name} style={styles.tagItem}>
            <Image source={{ uri: tag.image_active }} style={styles.tagIcon} />
            <Text style={styles.tagText}>{tag.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default TripTags;

const styles = StyleSheet.create({
  tagsTitle: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    color: COLORS.dark,
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // This allows tags to wrap to a new line if they don't fit
    marginBottom: 20,
  },
  tagItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 25,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  tagIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  tagText: {
    fontSize: SIZES.medium,
    color: COLORS.dark,
    fontWeight: "500",
  },
});

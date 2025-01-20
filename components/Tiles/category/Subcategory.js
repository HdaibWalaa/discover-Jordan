import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { ReusableText } from "../../../components/index";
import { TEXT, COLORS } from "../../../constants/theme";

const Subcategory = ({ item, isActive, onPress }) => {
  const fallbackImage = "https://via.placeholder.com/150"; // Fallback image URL
  const imageUri = isActive
    ? item.active_image || fallbackImage
    : item.inactive_image || fallbackImage;

  return (
    <TouchableOpacity
      onPress={() => onPress(item.id)}
      style={styles.subCategory}
    >
      <View
        style={[
          styles.container,
          isActive ? styles.activeContainer : styles.inactiveContainer,
        ]}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </View>
        <View style={styles.overlayContainer}>
          <ReusableText
            text={item.name}
            family={"Medium"}
            size={TEXT.medium}
            color={isActive ? COLORS.white : COLORS.black}
            align={"left"}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  subCategory: {
    marginHorizontal: 5,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 30,
    borderColor: COLORS.gray,
    overflow: "hidden",
    padding: 5,
  },
  imageContainer: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: COLORS.gray,
    overflow: "hidden",
    marginLeft: 5,
  },
  overlayContainer: {
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 15,
  },
  activeContainer: {
    backgroundColor: COLORS.secondary, // Use primary color for active state
    borderColor: COLORS.secondary,
  },
  inactiveContainer: {
    backgroundColor: COLORS.lightGray,
    borderColor: COLORS.gray,
  },
  image: {
    width: 20,
    height: 20,
    borderRadius: 12,
  },
});

export default Subcategory;

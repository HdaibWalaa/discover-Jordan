import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { TEXT, COLORS } from "../../../constants/theme";
import NetworkImage from "../../Reusable/NetworkImage";
import ReusableText from "../../Reusable/ReusableText";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

// Get screen width
const { width } = Dimensions.get("window");

const Category = ({ item }) => {
  const navigation = useNavigation();

  // Function to truncate the text
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  // Calculate responsive size
  const containerSize = width * 0.22; 
  const textMaxLength = containerSize / 16; 

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("PlacesList", { id: item.id })}
    >
      <View
        style={[
          styles.container,
          { width: containerSize, height: containerSize },
        ]}
      >
        <NetworkImage
          source={item.image}
          width={containerSize}
          height={containerSize}
          radius={12}
        />
        <LinearGradient
          colors={["rgba(0, 0, 0, 0)", "#000000"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradient}
        />
        <View style={styles.overlayContainer}>
          <ReusableText
            text={truncateText(item.name, textMaxLength)}
            family={"Medium"}
            size={TEXT.medium}
            color={COLORS.white}
            align={"left"}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    borderRadius: 12,
    overflow: "hidden",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
  },
  overlayContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
});

export default Category;

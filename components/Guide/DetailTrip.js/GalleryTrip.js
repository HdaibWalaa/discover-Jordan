import React from "react";
import { View, Image, StyleSheet, Text, Dimensions } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";
import { COLORS } from "../../../constants/theme";

const { width } = Dimensions.get("window");

const GalleryTrip = ({ gallery }) => {
  const scrollX = useSharedValue(0); // Initialize shared value for scroll position
  const IMAGE_WIDTH = width * 0.8; // Image width (80% of the screen width)
  const SPACING = -25; // Spacing between images
  const SIDE_SPACER = (width - IMAGE_WIDTH) / 3; // Spacer to center the images

  if (!gallery || gallery.length === 0) {
    return <Text style={styles.noImagesText}>No images available.</Text>;
  }

  const onScrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  return (
    <View>
      {/* Gallery ScrollView */}
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled={false} // Disable default paging to allow custom snapping
        snapToInterval={IMAGE_WIDTH + SPACING} // Snap to the width of each image plus spacing
        snapToAlignment="center"
        decelerationRate="fast"
        onScroll={onScrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingHorizontal: SIDE_SPACER }}
      >
        {gallery.map((item, index) => {
          // Use animated style for scaling effect
          const animatedStyle = useAnimatedStyle(() => {
            const scale = interpolate(
              scrollX.value,
              [
                (index - 1) * (IMAGE_WIDTH + SPACING),
                index * (IMAGE_WIDTH + SPACING),
                (index + 1) * (IMAGE_WIDTH + SPACING),
              ],
              [0.8, 1, 0.8] // Scale values for previous, current, and next images
            );

            return {
              transform: [{ scale }],
            };
          });

          return (
            <View
              key={index}
              style={{ width: IMAGE_WIDTH, marginHorizontal: SPACING / 2 }}
            >
              <Animated.View style={[styles.imageContainer, animatedStyle]}>
                <Image source={{ uri: item }} style={styles.galleryImage} />
              </Animated.View>
            </View>
          );
        })}
      </Animated.ScrollView>

      {/* Dots Indicator */}
      <View style={styles.dotsContainer}>
        {gallery.map((_, index) => {
          const animatedDotStyle = useAnimatedStyle(() => {
            const opacity = interpolate(
              scrollX.value,
              [
                (index - 1) * (IMAGE_WIDTH + SPACING),
                index * (IMAGE_WIDTH + SPACING),
                (index + 1) * (IMAGE_WIDTH + SPACING),
              ],
              [0.5, 1, 0.5] // Opacity for previous, current, and next dots
            );

            const scale = interpolate(
              scrollX.value,
              [
                (index - 1) * (IMAGE_WIDTH + SPACING),
                index * (IMAGE_WIDTH + SPACING),
                (index + 1) * (IMAGE_WIDTH + SPACING),
              ],
              [0.8, 1.2, 0.8] // Scale for previous, current, and next dots
            );

            return {
              opacity,
              transform: [{ scale }],
            };
          });

          return (
            <Animated.View
              key={index}
              style={[styles.dot, animatedDotStyle]}
            />
          );
        })}
      </View>
    </View>
  );
};

export default GalleryTrip;

const styles = StyleSheet.create({
  galleryImage: {
    width: "90%",
    height: "100%",
    borderRadius: 10,
  },
  imageContainer: {
    width: "110%",
    height: 300,
    overflow: "hidden",
    borderRadius: 10,
  },
  noImagesText: {
    fontSize: 16,
    color: "#555",
    marginTop: 10,
    textAlign: "center",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.secondary,
    marginHorizontal: 5,
  },
});

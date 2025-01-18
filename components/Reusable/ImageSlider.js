import React from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import Swiper from "react-native-swiper";

const ImageSlider = ({ images }) => {
  return (
    <View style={styles.container}>
      <Swiper style={styles.wrapper} showsButtons={false} autoplay={true}>
        {images.map((image, index) => (
          <View style={styles.slide} key={index}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    height: 200,
    marginBottom: 20,
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width,
    flex: 1,
  },
});

export default ImageSlider;

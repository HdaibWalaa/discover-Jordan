import React from "react";
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { COLORS } from "../../constants/theme";

const ImageGallery = ({ images, onSelectImage }) => {
  return (
    <View style={styles.galleryWrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.galleryContainer}
      >
        {images.map((image, index) => (
          <TouchableOpacity key={index} onPress={() => onSelectImage(image)}>
            <Image source={{ uri: image }} style={styles.thumbnail} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ImageGallery;

const styles = StyleSheet.create({
  galleryWrapper: {
    backgroundColor: COLORS.black,
    paddingVertical:5,
    paddingHorizontal:5,
    borderRadius: 20,
    marginTop: -100,
    marginHorizontal: 40,
  },
  galleryContainer: {
    paddingVertical: 10,
  },
  thumbnail: {
    width: wp(15),
    height: wp(15),
    borderRadius: 10,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: "white",
  },
});

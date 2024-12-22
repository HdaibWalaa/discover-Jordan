import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import styles from "./slides.style";
import { HeightSpacer, ReusableText } from "../../components/index";
import { COLORS, SIZES } from "../../constants/theme";

const Slides = ({ item, currentSlideIndex, totalSlides, onNext }) => {
  const navigation = useNavigation();

  const renderDots = () => {
    return Array.from({ length: totalSlides }).map((_, index) => {
      const isActive = currentSlideIndex === index;
      return (
        <View key={index} style={styles.dotContainer}>
          {isActive ? (
            <View style={styles.activeDotWrapper}>
              <Image
                source={require("../../assets/images/icons/Ellipse_3.png")}
                style={styles.activeDotImageBackground}
              />
              <View style={styles.activeDot} />
            </View>
          ) : (
            <View style={styles.inactiveDot} />
          )}
        </View>
      );
    });
  };

  const getButtonImage = () => {
    switch (currentSlideIndex) {
      case 0:
        return require("../../assets/images/icons/button_next_1.png");
      case 1:
        return require("../../assets/images/icons/button_next_2.png");
      case 2:
        return require("../../assets/images/icons/button_next_3.png");
      default:
        return require("../../assets/images/icons/button_next.png");
    }
  };

  return (
    <View>
      <Image source={item.image} style={styles.image} />

      <LinearGradient
        colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]}
        style={styles.overlay}
      />

      <View style={styles.stack}>
        <ReusableText
          text={item.title}
          family={"medium"}
          size={SIZES.xxLarge}
          color={COLORS.white}
        />
        <HeightSpacer height={10} />
        <ReusableText
          text={item.subTitle}
          family={"medium"}
          size={SIZES.medium}
          color={COLORS.white}
        />
        <HeightSpacer height={10} />

        <View style={styles.dotsContainer}>{renderDots()}</View>

        <View style={styles.arrowContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Welcome")}>
            <Image source={getButtonImage()} style={styles.buttonImage} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Slides;

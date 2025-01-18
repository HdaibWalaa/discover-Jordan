import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../../constants/theme";
import {
  HeightSpacer,
  ReusableBtn,
  ReusableText,
  GoBack,
  TruncatedText,
  FiveStar,
} from "../../index";

const { width, height } = Dimensions.get("window");

const PopularPlaceDetails = ({ item }) => {
  const navigation = useNavigation();

  const handleReadMorePress = () => {
    navigation.navigate("PlaceDetails", { id: item.place_id });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.imagePopular} />
      <LinearGradient
        colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]}
        style={styles.overlay}
      />
      <View style={styles.header}>
        <GoBack />
        <View style={styles.titleContainer}>
          <ReusableText
            text={"PopularPlaces".toUpperCase()}
            family={"Bold"}
            size={SIZES.xLarge}
            color={COLORS.white}
            style={styles.title}
          />
        </View>
        <View style={styles.placeholder}></View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.review}>
          <FiveStar rating={item.rating} />
        </View>
        <HeightSpacer height={SIZES.small} />
        <View style={styles.middle}>
          <ReusableText
            text={item.name.toUpperCase()}
            family={"Bold"}
            size={SIZES.xLarge}
            color={COLORS.white}
          />
          <View style={styles.distanceContainer}>
            <ReusableText
              text={`${(item.distance / 1000).toFixed(3)} km away`}
              family={"SemiBold"}
              size={SIZES.small}
              color={COLORS.white}
            />
          </View>
        </View>
        <HeightSpacer height={SIZES.small} />
        <View style={styles.description}>
          <TruncatedText style={styles.descriptionText} numberOfLines={3}>
            {item.description}
          </TruncatedText>
        </View>
        <HeightSpacer height={SIZES.medium} />
        <View style={styles.buttonContainer}>
          <ReusableBtn
            onPress={handleReadMorePress}
            btnText={
              <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>Read more</Text>
                <Feather name="arrow-up-right" size={24} color="black" />
              </View>
            }
            width={width * 0.85}
            backgroundColor={COLORS.primary}
            borderColor={COLORS.primary}
            borderWidth={0}
            textColor={COLORS.black}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
  },
  imagePopular: {
    width,
    height,
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    width,
    height,
  },
  header: {
    position: "absolute",
    top: 70,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  placeholder: {
    width: 30, // Same width as GoBack icon to keep title centered
  },
  contentContainer: {
    position: "absolute",
    bottom: 50,
    left: 30,
    right: 30,
  },
  review: {
    flexDirection: "row",
  },
  middle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  distanceContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  description: {
    marginVertical: SIZES.small,
  },
  descriptionText: {
    fontFamily: "SemiBold",
    fontSize: SIZES.small,
    color: COLORS.white,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    textTransform: "uppercase",
    fontFamily: "SemiBold",
    fontSize: SIZES.medium,
    marginRight: 10,
  },
});

export default PopularPlaceDetails;

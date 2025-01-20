import React from "react";
import { View, Image, Text, StyleSheet, Dimensions } from "react-native";
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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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
            size={hp(3)} // Responsive font size
            color={COLORS.white}
          />
        </View>
        <View style={styles.placeholder}></View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.review}>
          <FiveStar rating={item.rating} />
        </View>
        <HeightSpacer height={hp(1)} />
        <View style={styles.middle}>
          <ReusableText
            text={item.name.toUpperCase()}
            family={"Bold"}
            size={hp(2.5)} // Responsive font size
            color={COLORS.white}
          />
          <View style={styles.distanceContainer}>
            <ReusableText
              text={`${(item.distance / 1000).toFixed(3)} km away`}
              family={"SemiBold"}
              size={hp(1.8)} // Responsive font size
              color={COLORS.white}
            />
          </View>
        </View>
        <HeightSpacer height={hp(1)} />
        <View style={styles.description}>
          <TruncatedText style={styles.descriptionText} numberOfLines={3}>
            {item.description}
          </TruncatedText>
        </View>
        <HeightSpacer height={hp(2)} />
        <View style={styles.buttonContainer}>
          <ReusableBtn
            onPress={handleReadMorePress}
            btnText={
              <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>Read more</Text>
                <Feather name="arrow-up-right" size={hp(2.5)} color="black" />
              </View>
            }
            width={wp(20)} // Responsive width
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
    width: wp(100), // Responsive width
    height: hp(100), // Responsive height
  },
  imagePopular: {
    width: wp(100), // Responsive width
    height: hp(100), // Responsive height
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    width: wp(100), // Responsive width
    height: hp(100), // Responsive height
  },
  header: {
    position: "absolute",
    top: hp(7), // Responsive top spacing
    left: wp(5), // Responsive left spacing
    right: wp(5), // Responsive right spacing
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    left: wp(7),
  },
  placeholder: {
    width: wp(10), // Same width as GoBack icon for centering
  },
  contentContainer: {
    position: "absolute",
    bottom: hp(5), // Responsive bottom spacing
    left: wp(7), // Responsive left spacing
    right: wp(7), // Responsive right spacing
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
    paddingHorizontal: wp(3), // Responsive padding
    paddingVertical: hp(0.5), // Responsive padding
    borderRadius: wp(2), // Responsive border radius
  },
  description: {
    marginVertical: hp(1),
  },
  descriptionText: {
    fontFamily: "SemiBold",
    fontSize: hp(1.8), // Responsive font size
    color: COLORS.white,
    lineHeight: hp(2.5), // Responsive line height
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
    fontSize: hp(2), // Responsive font size
    marginRight: wp(2), // Responsive margin
  },
});

export default PopularPlaceDetails;

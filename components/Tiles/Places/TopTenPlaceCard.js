import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  Dimensions,
} from "react-native";
import {
  ReusableText,
  ReusableRegionLocation,
  Arrow,
  ReusableFavorite,
} from "../../index";
import { COLORS } from "../../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const TopTenPlaceCard = ({ item, cardWidth, cardHeight }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("PlaceDetails", { id: item.place_id })}
    >
      <ImageBackground
        source={{ uri: item.image }}
        style={[styles.imageBackground, { width: wp(86), height: hp(25) }]}
        imageStyle={styles.imageBackgroundStyle}
      >
        <View style={styles.overlayContainer}>
          <View style={styles.textContainer}>
            <ReusableText
              text={item.name.toUpperCase()}
              family={"SemiBold"}
              size={wp("5%")}
              color={COLORS.black}
              align={"left"}
            />
            <ReusableRegionLocation region={item.region} />
          </View>

          <View style={styles.arrowContainer}>
            <Arrow
              region={item.region}
              size={wp("5%")}
              color="white"
              onPress={() =>
                navigation.navigate("PlaceDetails", { id: item.place_id })
              }
            />
          </View>

          <View style={styles.favoriteContainer}>
            <ReusableFavorite iconColor="white" bgColor="rgba(0, 0, 0, 0.7)" />
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    borderRadius: wp("5%"),
    overflow: "hidden",
    marginBottom: hp("2%"),
  },
  imageBackgroundStyle: {
    resizeMode: "cover",
  },
  overlayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: hp("1.5%"),
    paddingHorizontal: wp("4%"),
    borderTopWidth: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  arrowContainer: {
    position: "absolute",
    bottom: hp("2%"),
    right: wp("4%"),
    backgroundColor: "black",
    padding: wp("3%"),
    borderRadius: wp("2.5%"),
  },
  favoriteContainer: {
    position: "absolute",
    top: hp("2%"),
    right: wp("3%"),
  },
});

export default TopTenPlaceCard;

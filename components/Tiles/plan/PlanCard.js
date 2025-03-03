import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
} from "react-native";
import { ReusableText } from "../../index";
import { COLORS, SIZES } from "../../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import PlanFavorite from "../../../screens/plan/PlanFavorite";
import PlanDayNightNum from "./PlanDayNightNum";

const PlanCard = ({ item, token }) => {
  const navigation = useNavigation();
  // Add local state to track favorite status
  const [isFavorite, setIsFavorite] = useState(item.favorite || false);

  // Handler for favorite toggle - safe to use here
  const handleFavoriteToggle = (newState) => {
    setIsFavorite(newState);
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("PlanDetails", { id: item.id })}
      style={styles.cardWrapper}
    >
      <ImageBackground
        source={{ uri: item.image }}
        style={[styles.imageBackground, { width: wp(86), height: hp(20) }]}
        imageStyle={styles.imageBackgroundStyle}
      >
        <View style={styles.overlay} />
        <View style={styles.favoriteContainer}>
          <ReusableText
            text={item.name}
            family={"Bold"}
            size={SIZES.medium}
            color={COLORS.white}
            align={"left"}
            style={[{ width: wp("70%") }]}
          />
          <PlanFavorite
            planId={item.id}
            initialFavorite={isFavorite}
            token={token}
            onToggle={handleFavoriteToggle}
            iconColor="white"
            bgColor="rgba(0, 0, 0, 0.5)"
          />
        </View>
      </ImageBackground>
      <View style={styles.infoContainer}>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <Image
              source={require("../../../assets/images/icons/dayes.png")}
              style={styles.imageStyle}
            />
            <ReusableText
              text={`${item.number_of_days} Days`}
              family={"Medium"}
              size={SIZES.small}
              color={COLORS.gray}
              align={"center"}
            />
          </View>
          <View style={styles.innerContainer}>
            <Image
              source={require("../../../assets/images/icons/places.png")}
              style={styles.imageStyle}
            />
            <ReusableText
              text={`${item.number_of_activities} Activities`}
              family={"Medium"}
              size={SIZES.small}
              color={COLORS.gray}
              align={"center"}
            />
          </View>
          <View style={styles.innerContainer}>
            <Image
              source={require("../../../assets/images/icons/avtivities.png")}
              style={styles.imageStyle}
            />
            <ReusableText
              text={`${item.number_of_place} Places`}
              family={"Medium"}
              size={SIZES.small}
              color={COLORS.gray}
              align={"center"}
            />
          </View>
        </View>
        <View style={styles.Dayescontainer}>
          <PlanDayNightNum numberOfDays={item.number_of_days} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: hp(-2),
  },
  imageBackground: {
    borderRadius: wp("5%"),
    overflow: "hidden",
  },
  imageBackgroundStyle: {
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: wp("4%"),
  },
  favoriteContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  infoContainer: {
    flexDirection: "column",
    marginTop: -hp(5),
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: hp(2),
    paddingHorizontal: wp("8%"),
    backgroundColor: COLORS.white,
    borderRadius: wp("5%"),
    width: wp("80%"),
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: hp("0.3%") },
    shadowOpacity: 0.1,
    shadowRadius: wp("1%"),
    elevation: 5,
    overflow: "visible",
  },
  innerContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  imageStyle: {
    width: wp("7%"),
    height: wp("7%"),
    marginBottom: hp(0.5),
  },
  Dayescontainer: {
    left: wp("60%"),
    top: -hp(13),
  },
});

export default PlanCard;

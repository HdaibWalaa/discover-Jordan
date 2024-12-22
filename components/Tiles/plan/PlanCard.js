import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
} from "react-native";
import { ReusableText, ReusableFavorite } from "../../index";
import { COLORS, SIZES } from "../../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { addFavourite, removeFavourite } from "../../../store/redux/favorites";
import PlanDayNightNum from "./PlanDayNightNum";

const PlanCard = ({ item }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const favoriteEvents = useSelector((state) => state.favoriteEvents.ids);

  const isFavorite = favoriteEvents.includes(item.id);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFavourite(item.id));
    } else {
      dispatch(addFavourite(item.id));
    }
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("PlanDetails", { id: item.id })}
      style={styles.cardWrapper} // Wrapper to add margin between cards
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
          />
          <ReusableFavorite
            iconColor="white"
            bgColor="rgba(0, 0, 0, 0.8)"
            onPress={handleFavoriteToggle}
            isFavorite={isFavorite}
          />
        </View>
        <View style={styles.Dayescontainer}>
          <PlanDayNightNum numberOfDays={item.number_of_days} />
        </View>
      </ImageBackground>

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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: hp(2), // This will add a gap between the cards
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
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: hp(2),
    paddingHorizontal: wp("8%"),
    backgroundColor: COLORS.white,
    marginTop: -hp(6), // Adjust to position closer to the image
    borderRadius: wp("5%"),
    width: wp("80%"),
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: wp("4%"), // Softer shadow
    shadowOffset: {
      width: 0,
      height: 4, // Make the shadow drop downwards
    },
    elevation: 5, // For Android shadow
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
  borderShadow: {
    position: "absolute",
    top: -wp("5%"),
    bottom: -wp("5%"),
    left: -wp("5%"),
    right: -wp("5%"),
    borderRadius: wp("5%"),
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: wp("5%"),
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 5,
  },
  Dayescontainer: {
    left: wp("60%"),
    top: wp("5%"),
  },
});

export default PlanCard;

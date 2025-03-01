import React from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ReusableText } from "../../components/index";
import { COLORS } from "../../constants/theme";
import { useLanguage } from "../../store/context/LanguageContext";
import translations from "../../translations/translations";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const FavoritCards = () => {
  const navigation = useNavigation();
  const { language } = useLanguage();
  const localizedText = translations[language] || translations["en"];

  const handlePress = (cardId) => {
    navigation.navigate("AllFavorites", { selectedCardId: cardId });
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftRowCards}>
        <TouchableOpacity onPress={() => handlePress(2)}>
          <ImageBackground
            source={require("../../assets/images/favorites/places.jpeg")}
            style={styles.leftCard}
          >
            <View style={styles.overlay} />
            <View style={styles.infoContainer}>
              <ReusableText
                text={localizedText.places || "Places"}
                family={"Bold"}
                size={wp("4%")}
                color={COLORS.white}
                align={"left"}
              />
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handlePress(3)}>
          <ImageBackground
            source={require("../../assets/images/favorites/Events.png")}
            style={styles.SecoundleftCard}
          >
            <View style={styles.overlay} />
            <View style={styles.infoContainer}>
              <ReusableText
                text={localizedText.events || "Events"}
                family={"Bold"}
                size={wp("4%")}
                color={COLORS.white}
                align={"left"}
              />
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>

      <View style={styles.rightCardsContainer}>
        <TouchableOpacity
          onPress={() => handlePress(1)}
          style={styles.cardWrapper}
        >
          <ImageBackground
            source={require("../../assets/images/favorites/trips.jpeg")}
            style={styles.topRightCard}
          >
            <View style={styles.overlay} />
            <View style={styles.infoContainer}>
              <ReusableText
                text={localizedText.trips || "Trips"}
                family={"Bold"}
                size={wp("4%")}
                color={COLORS.white}
                align={"left"}
              />
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handlePress(4)}
          style={styles.cardWrapper}
        >
          <ImageBackground
            source={require("../../assets/images/favorites/plans.jpeg")}
            style={styles.topRightCard}
          >
            <View style={styles.overlay} />
            <View style={styles.infoContainer}>
              <ReusableText
                text={localizedText.plans || "Plans"}
                family={"Bold"}
                size={wp("4%")}
                color={COLORS.white}
                align={"left"}
              />
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handlePress(5)}
          style={styles.cardWrapper}
        >
          <ImageBackground
            source={require("../../assets/images/favorites/Volunteer.png")}
            style={styles.bottomRightCard}
          >
            <View style={styles.overlay} />
            <View style={styles.infoContainer}>
              <ReusableText
                text={localizedText.volunteers || "Volunteers"}
                family={"Bold"}
                size={wp("4%")}
                color={COLORS.white}
                align={"left"}
              />
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FavoritCards;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: hp(5),
  },
  leftRowCards: {
    flexDirection: "column",
  },
  leftCard: {
    position: "relative",
    width: wp("42%"),
    marginRight: wp("4%"),
    borderRadius: wp("4%"),
    overflow: "hidden",
    height: hp("30%"),
    marginBottom: hp("1%"),
  },
  SecoundleftCard: {
    position: "relative",
    width: wp("42%"),
    marginRight: wp("4%"),
    borderRadius: wp("4%"),
    overflow: "hidden",
    height: hp("20%"),
  },
  rightCardsContainer: {
    width: wp("42%"),
    flexDirection: "column",
  },
  topRightCard: {
    position: "relative",
    flex: 1,
    marginBottom: hp("1%"),
    borderRadius: wp("4%"),
    overflow: "hidden",
  },
  bottomRightCard: {
    position: "relative",
    flex: 1,
    marginTop: hp("1%"),
    borderRadius: wp("4%"),
    overflow: "hidden",
  },
  infoContainer: {
    position: "absolute",
    bottom: wp("2.5%"),
    left: wp("3%"),
    right: wp("2%"),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: wp("4%"),
  },
  cardWrapper: {
    flex: 1,
    marginBottom: hp("1%"),
    borderRadius: wp("4%"),
    overflow: "hidden",
  },
});

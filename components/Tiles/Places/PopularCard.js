import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ReusableText, Region } from "../../index";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../constants/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const PopularCard = ({ places }) => {
  const navigation = useNavigation();
  if (!places || places.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Left card */}
      {places[0] && places[0].image && (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("PlaceDetails", { id: places[0].place_id })
          }
        >
          <ImageBackground
            source={{ uri: places[0].image }}
            style={styles.leftCard}
          >
            <View style={styles.overlay} />
            <View style={styles.infoContainer}>
              <ReusableText
                text={places[0].name.toUpperCase()}
                family={"Bold"}
                size={wp("4%")}
                color={COLORS.white}
                align={"left"}
              />
              <Region region={places[0].region} />
            </View>
          </ImageBackground>
        </TouchableOpacity>
      )}

      <View style={styles.rightCardsContainer}>
        {places[1] && places[1].image && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("PlaceDetails", { id: places[1].place_id })
            }
            style={styles.cardWrapper}
          >
            <ImageBackground
              source={{ uri: places[1].image }}
              style={styles.topRightCard}
            >
              <View style={styles.overlay} />
              <View style={styles.infoContainer}>
                <ReusableText
                  text={places[1].name.toUpperCase()}
                  family={"Bold"}
                  size={wp("4%")}
                  color={COLORS.white}
                  align={"left"}
                />
                <Region region={places[1].region} />
              </View>
            </ImageBackground>
          </TouchableOpacity>
        )}

        {places[2] && places[2].image && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("PlaceDetails", { id: places[2].place_id })
            }
            style={styles.cardWrapper}
          >
            <ImageBackground
              source={{ uri: places[2].image }}
              style={styles.bottomRightCard}
            >
              <View style={styles.overlay} />
              <View style={styles.infoContainer}>
                <ReusableText
                  text={places[2].name.toUpperCase()}
                  family={"Bold"}
                  size={wp("4%")}
                  color={COLORS.white}
                  align={"left"}
                />
                <Region region={places[2].region} />
              </View>
            </ImageBackground>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: hp(3),
  },
  leftCard: {
    position: "relative",
    width: wp("40%"),
    marginRight: wp("4%"),
    borderRadius: wp("4%"),
    overflow: "hidden",
    height: hp("35%"),
  },
  rightCardsContainer: {
    width: wp("40%"),
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

export default PopularCard;

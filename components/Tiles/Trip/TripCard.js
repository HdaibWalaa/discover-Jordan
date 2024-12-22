import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { DateComponent, Card } from "../../../components/index";
import AddTripFavorite from "./AddTripFavorite";

const TripCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.tripCard} onPress={onPress}>
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.cardImage}
        resizeMode="cover"
      >
        <View style={styles.topSection}>
          <DateComponent date={item.date} />
          <AddTripFavorite size={24} color="white" favorite={item.favorite} />
        </View>
        <Card trip={item} />
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default TripCard;

const styles = StyleSheet.create({
  tripCard: {
    width: wp("72%"),
    height: hp("42%"),
    marginHorizontal: wp("2.5%"),
    marginBottom: hp("2%"),
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp("5%"),
    paddingTop: hp("3%"),
  },
});

import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  Text,
  Image,
} from "react-native";
import {
  ReusableText,
  ReusableRegionLocation,
  ReusableFavorite,
  Arrow,
} from "../../index";
import { COLORS } from "../../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import IntresetUser from "./IntresetUser";
import AddFavorite from "../../events/addFavorite";

const AllEventCard = ({ item, eventId, refresh }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("EventsDetails", { id: item.id })}
    >
      <View style={styles.cardContainer}>
        <ImageBackground
          source={{ uri: item.image }}
          style={styles.imageBackground}
          imageStyle={styles.imageBackgroundStyle}
        >
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>
              {new Date(item.start_day).getDate()}
            </Text>
            <Text style={styles.monthText}>
              {new Date(item.start_day)
                .toLocaleString("default", { month: "short" })
                .toUpperCase()}
            </Text>
          </View>
          <View style={styles.favoriteContainer}>
            <AddFavorite
              eventId={eventId} // Pass eventId
              favorite={item.favorite} // Pass initial favorite status
              refresh={refresh} // Optional refresh function
              iconColor="white"
              size={24}
              width={35}
              height={35}
              bgColor="rgba(0, 0, 0, 0.7)"
              style={styles.favoriteIcon}
            />
          </View>
        </ImageBackground>
        <View style={styles.textContainer}>
          <ReusableText
            text={item.name.toUpperCase()}
            family={"SemiBold"}
            size={wp("5%")}
            color={COLORS.black}
            align={"left"}
          />
          <View>
            <IntresetUser users={item.interested_users} />
            <View style={styles.locationContainer}>
              <ReusableRegionLocation region={item.region} />
            </View>
            <View style={styles.arrowContainer}>
              <Arrow
                region={item.region}
                size={wp("5%")}
                color="white"
                onPress={() =>
                  navigation.navigate("PlaceDetails", { id: item.id })
                }
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: hp("6%"),
    width: wp("90%"),
    alignItems: "center",
  },
  imageBackground: {
    borderRadius: wp(5),
    overflow: "hidden",
    height: hp(20),
    width: wp("90%"),
  },
  imageBackgroundStyle: {
    resizeMode: "cover",
  },
  dateContainer: {
    position: "absolute",
    top: wp("3%"),
    left: wp("5%"),
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: wp("2%"),
    paddingVertical: wp("1.5%"),
    paddingHorizontal: wp("2%"),
    alignItems: "center",
  },
  dateText: {
    fontSize: wp("4%"),
    fontWeight: "bold",
    color: COLORS.black,
  },
  monthText: {
    fontSize: wp("3%"),
    color: COLORS.black,
  },
  favoriteContainer: {
    position: "absolute",
    top: wp("3%"),
    right: wp("5%"),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textContainer: {
    position: "absolute",
    top: hp("12%"),
    left: wp("5%"),
    right: wp("5%"),
    backgroundColor: COLORS.white,
    borderRadius: wp("4%"),
    padding: wp("3%"),
    paddingHorizontal: wp("4%"),
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  interestedContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: wp("1%"),
  },
  interestedUser: {
    width: wp("5%"),
    height: wp("5%"),
    borderRadius: wp("2.5%"),
    marginRight: wp("1%"),
  },
  interestedText: {
    fontSize: wp("3%"),
    color: COLORS.primary,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: wp("1%"),
  },
  arrowContainer: {
    position: "absolute",
    top: hp("1%"),
    right: wp("1%"),
    backgroundColor: "black",
    padding: wp("3%"),
    borderRadius: wp("2.5%"),
  },
});

export default AllEventCard;

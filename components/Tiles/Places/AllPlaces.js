import React, { memo } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { TEXT, COLORS } from "../../../constants/theme";
import {
  NetworkImage,
  ReusableFavorite,
  PlaceRate,
  ReusableRegionLocation,
} from "../../../components/index";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const AllPlaces = memo(({ item, refetch }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("PlaceDetails", { id: item.id })}
    >
      <View style={styles.container}>
        <View style={styles.ImageContainer}>
          <NetworkImage
            source={item.image}
            width={"100%"}
            height={hp(20)}
            radius={12}
          />
          <View style={styles.TopSection}>
            <View>
              <PlaceRate rating={item.total_ratings} />
            </View>
            <View style={styles.favoriteContainer}>
              <ReusableFavorite
                favorite={item.favorite}
                placeId={item.id}
                refresh={refetch} // Pass the refresh function to update the list
                iconColor="white"
                size={wp("6%")}
                bgColor="rgba(0, 0, 0, 0.7)"
                width={wp("9%")}
                height={hp("4%")}
              />
            </View>
          </View>
        </View>

        <View style={styles.overlayContainer}>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
            {item.name}
          </Text>
          <View style={styles.textContainer}>
            <ReusableRegionLocation region={item.region} />
            <View style={styles.goContainer}>
              <Text style={styles.distance}>
                {item.distance !== undefined && item.distance !== null
                  ? `${item.distance.toFixed(2)} km away`
                  : "Calculating..."}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    width: wp(43),
    borderRadius: 12,
    overflow: "hidden",
    marginTop: hp("2%"),
    marginRight: 10,
    backgroundColor: COLORS.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  overlayContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },
  ImageContainer: {
    position: "relative",
  },
  TopSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
  },
  name: {
    fontFamily: "SemiBold",
    fontSize: TEXT.large,
    color: COLORS.black,
  },
  distance: {
    fontFamily: "Medium",
    fontSize: TEXT.medium,
    color: COLORS.gray,
  },
  favoriteContainer: {
    alignSelf: "flex-end",
  },
});

export default AllPlaces;

import React, { memo, useState } from "react";
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
  const [isFavorite, setIsFavorite] = useState(item.favorite); // Local state for favorite status

  const handleFavoriteToggle = () => {
    setIsFavorite((prev) => !prev); // Toggle the favorite state immediately
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("PlaceDetails", { id: item.id })}
    >
      <View style={styles.container}>
        <View style={styles.ImageContainer}>
          <NetworkImage
            source={item.image || "https://via.placeholder.com/150"}
            width={"100%"}
            height={hp(20)}
            radius={12}
          />
          <View style={styles.TopSection}>
            <View>
              <PlaceRate rating={item.total_ratings || 0} />
            </View>
            <View style={styles.favoriteContainer}>
              <ReusableFavorite
                favorite={isFavorite} // Bind local state to the component
                placeId={item.id}
                refresh={refetch} // Optional: Update the list if needed
                iconColor="white"
                size={wp("6%")}
                bgColor="rgba(0, 0, 0, 0.7)"
                width={wp("9%")}
                height={hp("4%")}
                onToggle={handleFavoriteToggle} // Pass toggle handler
              />
            </View>
          </View>
        </View>

        <View style={styles.overlayContainer}>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
            {item.name}
          </Text>
          <View style={styles.textContainer}>
            <ReusableRegionLocation region={item.region || "Unknown"} />
            <View style={styles.goContainer}>
              <Text style={styles.distance}>
                {item.distance
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

import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { NetworkImage } from "../../components/index";
import { useNavigation } from "@react-navigation/native";
import ReusableFavorite from "../Reusable/reusableFavorite";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import styles from "./ImageContainer.styles";

const ImageContainer = ({
  mainImage,
  placeData,
  handleDirectionPress,
  refetch,
}) => {
  const navigation = useNavigation(); // Use navigation hook

  return (
    <View style={styles.imageContainer}>
      <NetworkImage
        source={mainImage}
        width={wp("100%")}
        height={hp("51%")}
        radius={wp("7.5%")}
        resizeMode="cover"
      />
      <View style={styles.topRow}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()} // Go back when pressed
          style={styles.directionButton}
        >
          <View style={styles.directionButtonContent}>
            <Image
              source={require("../../assets/images/icons/back.png")}
              style={styles.icon}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>

        {/* Favorite Button */}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => {
            // Add to favorite logic
          }}
        >
          <ReusableFavorite
            favorite={placeData.favorite}
            placeId={placeData.id}
            refresh={refetch}
            iconColor="white"
            size={wp("7%")}
            bgColor="rgba(255, 255, 255, 0.7)"
            width={wp("12%")}
            height={hp("5%")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ImageContainer;

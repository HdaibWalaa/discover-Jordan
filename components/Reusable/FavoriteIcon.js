import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const FavoriteIcon = ({ size = 24, color = "black", onPress }) => {
  const navigation = useNavigation();
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <TouchableOpacity onPress={onPress} style={styles.favoriteIcon}>
      <Image
        source={require("../../assets/images/icons/heart.png")}
        style={{
          width: size,
          height: size,
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  favoriteIcon: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp("3%"),
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    marginBottom: hp("1%"),
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FavoriteIcon;

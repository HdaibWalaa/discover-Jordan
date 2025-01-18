import React from "react";
import { Text, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "../../constants/theme";


const PriceComponent = ({ price }) => {


  return (
    <View style={styles.priceContainer}>
      <Text style={[styles.price, { fontSize: wp(5) }]}>{price}</Text>
      <Text style={[styles.currency, { fontSize: wp(3) }]}> JOD</Text>
    </View>
  );
};

const styles = {
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    color: COLORS.black,
    fontFamily: "SemiBold",
    marginBottom: 5,
    lineHeight: hp(3),
  },
  currency: {
    color: COLORS.black,
    fontFamily: "Medium",
    marginBottom: 5,
    lineHeight: hp(3),
    marginLeft: wp(-0.5),
    marginTop: hp(0.5),
  },
};

export default PriceComponent;

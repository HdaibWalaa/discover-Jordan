import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

const ReusableArrow = ({ onPress, size, color }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={onPress}>
      <AntDesign name="arrowright" size={size} color={color} />
    </TouchableOpacity>
  );
};

export default ReusableArrow;

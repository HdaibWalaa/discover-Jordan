import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const Arrow = ({ onPress, size, color }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Feather name="arrow-up-right" size={size} color={color} />
    </TouchableOpacity>
  );
};

export default Arrow;

import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const ReusableGo = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <FontAwesome name="chevron-right" size={15} color="white" />
    </TouchableOpacity>
  );
};

export default ReusableGo;

const styles = StyleSheet.create({});

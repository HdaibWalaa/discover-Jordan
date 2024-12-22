import { StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SIZES } from "../../constants/theme";

const CalendarButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={require("../../assets/images/icons/calendarbutton.png")}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

export default CalendarButton;

const styles = StyleSheet.create({
  image: {
    width: SIZES.xLarge,
    height: SIZES.xLarge,
  },
});

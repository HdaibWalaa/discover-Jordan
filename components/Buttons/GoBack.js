import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const GoBack = ({ style }) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack(); // Triggers the navigation back action
  };

  return (
    <View style={StyleSheet.flatten([styles.goBackContainer, style])}>
      <TouchableOpacity onPress={handleGoBack}>
        <Ionicons name="chevron-back" size={wp(6)} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  goBackContainer: {
    position: "absolute",
    borderRadius: wp(2),
    backgroundColor: "white",
    padding: wp(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: hp(0.5),
    },
    shadowOpacity: 0.1,
    shadowRadius: hp(0.5),
    elevation: 3, // For Android shadow effect
  },
});

export default GoBack;

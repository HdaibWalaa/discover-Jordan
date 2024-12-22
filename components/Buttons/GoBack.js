import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const GoBack = ({ style }) => {
  const navigation = useNavigation();

const handleGoBack = () => {
  navigation.goBack(); // This will trigger the navigation back action
};

  return (
    <View style={StyleSheet.flatten([styles.goBackContainer, style])}>
      <TouchableOpacity onPress={handleGoBack}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  goBackContainer: {
    position: "absolute",
    borderRadius: 10,
    backgroundColor: "white",
    padding: 7,
  },
});

export default GoBack;

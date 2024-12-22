import React from "react";
import { View, TextInput, Image, StyleSheet, Text } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const CustomTextInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  iconSource,
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}> {label} </Text>}
      <View style={styles.inputWrapper}>
        <Image source={iconSource} style={[styles.icon]} />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={COLORS.black}
          style={[styles.input, styles.placeholder]}
          onChangeText={onChangeText}
          value={value}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
    marginLeft: 5,
  },
  label: {
    fontFamily: "Medium",
    color: "#858585",
    fontSize: 14,
    fontWeight: "400",
    marginTop: 20,
    marginBottom: -15,
  },
  inputWrapper: {
    width: 294,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#8D8D8D",
    borderStyle: "solid",
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    height: 30,
    color: COLORS.black,
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 5,
  },
  placeholder: {
    fontFamily: "Medium",
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 0,
    textAlign: "left",
  },
});

export default CustomTextInput;

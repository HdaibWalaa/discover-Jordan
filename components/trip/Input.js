import React from "react";
import { View, TextInput, Image, StyleSheet, Text } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

function Input({
  label,
  onUpdateValue,
  value,
  isInvalid,
  secure,
  iconSource,
  placeholder,
  width, // Added width prop
}) {
  return (
    <View style={[styles.container, { width: width || "100%" }]}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      <View style={styles.inputWrapper}>
        {iconSource && <Image source={iconSource} style={styles.icon} />}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={COLORS.gray} 
          style={[
            styles.input,
            styles.placeholder,
            isInvalid && styles.inputInvalid,
          ]}
          onChangeText={onUpdateValue}
          value={value}
          secureTextEntry={secure}
        />
      </View>
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  container: {
    gap: 30,
    marginLeft: 5,
  },
  label: {
    fontFamily: "Medium",
    color: COLORS.dark, // Use COLORS.dark for the label color
    fontSize: 14,
    fontWeight: "400",
    marginBottom: -15,
  },
  inputWrapper: {
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
  labelInvalid: {
    color: COLORS.error500,
  },
  inputInvalid: {
    backgroundColor: COLORS.error100,
  },
});

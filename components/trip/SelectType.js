import React from "react";
import { View, Image, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { COLORS, TEXT } from "../../constants/theme";
import ReusableText from "../Reusable/ReusableText";

const SelectType = ({
  label,
  iconSource,
  onValueChange,
  value,
  width = 300,
}) => {
  const types = [
    { label: "Public", value: "0" },
    { label: "Followers", value: "1" },
    { label: "Specific Users", value: "2" },
  ];

  const handleValueChange = (value) => {
    if (onValueChange) {
      onValueChange(value);
    }
  };

  const pickerWidth = typeof width === "number" ? width : 300;

  return (
    <View style={[styles.container, { width: pickerWidth + 10 }]}>
      <ReusableText
        text={label}
        family={"Regular"}
        size={TEXT.medium}
        color={COLORS.dark}
      />
      <View style={[styles.pickerWrapper, { width: pickerWidth }]}>
        <Image source={iconSource} style={styles.icon} />
        <RNPickerSelect
          onValueChange={handleValueChange}
          items={types.map((type) => ({
            label: type.label,
            value: type.value,
          }))}
          placeholder={{ label: "Select type...", value: null }}
          style={pickerSelectStyles}
          value={value}
          useNativeAndroidPickerStyle={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginLeft: 5,
  },
  pickerWrapper: {
    height: 35,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor:COLORS.dark,
    borderStyle: "solid",
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 5,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 15,
    paddingHorizontal: 10,
    color: COLORS.black,
    paddingRight: 30, 
  },
  inputAndroid: {
    flex: 1,
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 15,
    color: COLORS.black,
    paddingRight: 30, 
  },
});

export default SelectType;

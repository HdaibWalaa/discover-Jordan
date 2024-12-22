import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";

const FilterDays = ({ onFilterChange }) => {
  const [inputValue, setInputValue] = React.useState("");

  const handleInputChange = (value) => {
    const numericValue = value.replace(/[^0-9]/g, ""); // Allow only numbers
    setInputValue(numericValue);
    onFilterChange(numericValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Filter by Days:</Text>
      <TextInput
        value={inputValue}
        onChangeText={handleInputChange}
        style={styles.input}
        placeholder="Enter days"
        keyboardType="numeric" // Open numeric keyboard
      />
    </View>
  );
};

export default FilterDays;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    marginRight: 10,
  },
  input: {
    height: 40,
    width: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
});

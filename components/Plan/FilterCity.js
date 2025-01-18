import { StyleSheet, View, TextInput, Text } from "react-native";
import React, { useState } from "react";

const FilterCity = ({ onFilterChange }) => {
  const [city, setCity] = useState("");

  const handleChange = (value) => {
    setCity(value);
    onFilterChange(value);
  };

  return (
    <View style={styles.container}>
      <Text>Filter by City:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city"
        value={city}
        onChangeText={handleChange}
      />
    </View>
  );
};

export default FilterCity;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    borderRadius: 5,
  },
});

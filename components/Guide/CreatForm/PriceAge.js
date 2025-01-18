import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const PriceAge = ({ priceAge, setPriceAge }) => {
  // Handle changes in price age fields
  const handleFieldChange = (index, field, value) => {
    const updatedPriceAge = [...priceAge];
    updatedPriceAge[index][field] = value;
    setPriceAge(updatedPriceAge);
  };

  // Add a new price age group
  const addPriceAgeGroup = () => {
    setPriceAge([...priceAge, { min_age: "", max_age: "", cost: "" }]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Price by Age</Text>
      {priceAge.map((ageGroup, index) => (
        <View key={index} style={styles.fieldRow}>
          <TextInput
            style={styles.input}
            value={ageGroup.min_age.toString()}
            onChangeText={(value) => handleFieldChange(index, "min_age", value)}
            placeholder="Min Age"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            value={ageGroup.max_age.toString()}
            onChangeText={(value) => handleFieldChange(index, "max_age", value)}
            placeholder="Max Age"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            value={ageGroup.cost.toString()}
            onChangeText={(value) => handleFieldChange(index, "cost", value)}
            placeholder="Cost"
            keyboardType="numeric"
          />
        </View>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={addPriceAgeGroup}>
        <Text style={styles.addButtonText}>+ Add Price by Age Group</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PriceAge;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  fieldRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 4,
  },
  addButton: {
    backgroundColor: "#FCD228",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

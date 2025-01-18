import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const TripPriceInclude = ({ priceInclude, setPriceInclude }) => {
  // Handle changes in price include fields
  const handleFieldChange = (index, field, value) => {
    const updatedPriceInclude = [...priceInclude];
    updatedPriceInclude[index][field] = value;
    setPriceInclude(updatedPriceInclude);
  };

  // Add a new price include field
  const addPriceInclude = () => {
    setPriceInclude([...priceInclude, { en: "", ar: "" }]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Price Includes</Text>
      {priceInclude.map((item, index) => (
        <View key={index} style={styles.fieldRow}>
          <TextInput
            style={styles.input}
            value={item.en}
            onChangeText={(value) => handleFieldChange(index, "en", value)}
            placeholder="Include (EN)"
          />
          <TextInput
            style={styles.input}
            value={item.ar}
            onChangeText={(value) => handleFieldChange(index, "ar", value)}
            placeholder="Include (AR)"
          />
        </View>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={addPriceInclude}>
        <Text style={styles.addButtonText}>+ Add Price Include</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TripPriceInclude;

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

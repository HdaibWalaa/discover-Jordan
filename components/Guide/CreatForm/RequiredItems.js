import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const RequiredItems = ({ requiredItems, setRequiredItems }) => {
  // Handle changes in required items fields
  const handleFieldChange = (index, field, value) => {
    const updatedItems = [...requiredItems];
    updatedItems[index][field] = value;
    setRequiredItems(updatedItems);
  };

  // Add a new required item
  const addRequiredItem = () => {
    setRequiredItems([...requiredItems, { en: "", ar: "" }]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Required Items</Text>
      {requiredItems.map((item, index) => (
        <View key={index} style={styles.fieldRow}>
          <TextInput
            style={styles.input}
            value={item.en}
            onChangeText={(value) => handleFieldChange(index, "en", value)}
            placeholder="Item (EN)"
          />
          <TextInput
            style={styles.input}
            value={item.ar}
            onChangeText={(value) => handleFieldChange(index, "ar", value)}
            placeholder="Item (AR)"
          />
        </View>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={addRequiredItem}>
        <Text style={styles.addButtonText}>+ Add Required Item</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RequiredItems;

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

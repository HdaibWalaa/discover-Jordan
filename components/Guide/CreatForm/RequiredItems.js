import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

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

  // Remove an item
  const removeItem = (index) => {
    const updatedItems = [...requiredItems];
    updatedItems.splice(index, 1);
    setRequiredItems(updatedItems);
  };

  // Render individual item row
  const renderItem = ({ item, index }) => (
    <View style={styles.fieldRow}>
      <TextInput
        style={styles.input}
        value={item.en === "Passport" || item.en === "Snacks" ? "" : item.en}
        onChangeText={(value) => handleFieldChange(index, "en", value)}
        placeholder={
          item.en === "Passport"
            ? "Passport"
            : item.en === "Snacks"
            ? "Snacks"
            : "Item (EN)"
        }
      />
      <TextInput
        style={styles.input}
        value={item.ar === "جواز السفر" || item.ar === "وجبات" ? "" : item.ar}
        onChangeText={(value) => handleFieldChange(index, "ar", value)}
        placeholder={
          item.ar === "جواز السفر"
            ? "جواز السفر"
            : item.ar === "وجبات"
            ? "وجبات"
            : "Item (AR)"
        }
      />
      {requiredItems.length > 1 && (
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeItem(index)}
        >
          <Ionicons name="trash-outline" size={18} color="#f44336" />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.sectionTitle}>Required Items</Text>
        <Text style={styles.subtitle}>
          Items that participants should bring with them
        </Text>
      </View>

      <FlatList
        data={requiredItems}
        renderItem={renderItem}
        keyExtractor={(_, index) => `required-item-${index}`}
        scrollEnabled={false}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={styles.columnHeader}>English</Text>
            <Text style={styles.columnHeader}>Arabic</Text>
            <Text style={styles.columnHeader}></Text>
          </View>
        }
      />

      <TouchableOpacity style={styles.addButton} onPress={addRequiredItem}>
        <Ionicons name="add-circle-outline" size={18} color="#fff" />
        <Text style={styles.addButtonText}>Add Required Item</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RequiredItems;

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headerContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  listHeader: {
    flexDirection: "row",
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  columnHeader: {
    flex: 1,
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },
  fieldRow: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 4,
    fontSize: 15,
    backgroundColor: "#f9f9f9",
  },
  removeButton: {
    padding: 8,
    marginLeft: 4,
  },
  addButton: {
    backgroundColor: "#FCD228",
    padding: 14,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
  },
});

import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const Assembly = ({ assembly, setAssembly }) => {
  // Handle changes in assembly fields
  const handleFieldChange = (index, field, value) => {
    const updatedAssembly = [...assembly];
    updatedAssembly[index][field] = value;
    setAssembly(updatedAssembly);
  };

  // Add a new assembly point
  const addAssemblyPoint = () => {
    setAssembly([...assembly, { time: "", place_en: "", place_ar: "" }]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Assembly Points</Text>
      {assembly.map((point, index) => (
        <View key={index} style={styles.fieldRow}>
          <TextInput
            style={styles.input}
            value={point.time}
            onChangeText={(value) => handleFieldChange(index, "time", value)}
            placeholder="Time (e.g., 08:00)"
          />
          <TextInput
            style={styles.input}
            value={point.place_en}
            onChangeText={(value) =>
              handleFieldChange(index, "place_en", value)
            }
            placeholder="Place (EN)"
          />
          <TextInput
            style={styles.input}
            value={point.place_ar}
            onChangeText={(value) =>
              handleFieldChange(index, "place_ar", value)
            }
            placeholder="Place (AR)"
          />
        </View>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={addAssemblyPoint}>
        <Text style={styles.addButtonText}>+ Add Assembly Point</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Assembly;

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

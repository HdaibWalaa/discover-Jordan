import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const TripActivities = ({ activities, setActivities }) => {
  // Handle changes in activity fields
  const handleFieldChange = (index, field, value) => {
    const updatedActivities = [...activities];
    updatedActivities[index][field] = value;
    setActivities(updatedActivities);
  };

  // Add a new activity field
  const addActivity = () => {
    setActivities([...activities, { en: "", ar: "" }]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Activities</Text>
      {activities.map((activity, index) => (
        <View key={index} style={styles.fieldRow}>
          <TextInput
            style={styles.input}
            value={activity.en}
            onChangeText={(value) => handleFieldChange(index, "en", value)}
            placeholder="Activity (EN)"
          />
          <TextInput
            style={styles.input}
            value={activity.ar}
            onChangeText={(value) => handleFieldChange(index, "ar", value)}
            placeholder="Activity (AR)"
          />
        </View>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={addActivity}>
        <Text style={styles.addButtonText}>+ Add Activity</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TripActivities;

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

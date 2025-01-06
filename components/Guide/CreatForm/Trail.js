import React from "react";
import { View, Text, TextInput, Switch, StyleSheet } from "react-native";

const Trail = ({ isTrail, setIsTrail, trail, setTrail }) => {
  const handleTrailChange = (field, value) => {
    setTrail({ ...trail, [field]: value });
  };

  return (
    <View style={styles.container}>
      <View style={styles.switchRow}>
        <Text style={styles.label}>Is Trail</Text>
        <Switch value={isTrail} onValueChange={setIsTrail} />
      </View>

      {isTrail && (
        <View>
          <Text style={styles.label}>Min Duration (minutes)</Text>
          <TextInput
            style={styles.input}
            value={trail.min_duration_in_minute.toString()}
            onChangeText={(value) =>
              handleTrailChange("min_duration_in_minute", value)
            }
            placeholder="Enter minimum duration"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Max Duration (minutes)</Text>
          <TextInput
            style={styles.input}
            value={trail.max_duration_in_minute.toString()}
            onChangeText={(value) =>
              handleTrailChange("max_duration_in_minute", value)
            }
            placeholder="Enter maximum duration"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Distance (meters)</Text>
          <TextInput
            style={styles.input}
            value={trail.distance_in_meter.toString()}
            onChangeText={(value) =>
              handleTrailChange("distance_in_meter", value)
            }
            placeholder="Enter distance"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Difficulty</Text>
          <TextInput
            style={styles.input}
            value={trail.difficulty.toString()}
            onChangeText={(value) => handleTrailChange("difficulty", value)}
            placeholder="Enter difficulty (0: Easy, 1: Moderate, 2: Hard, 3: Very Hard)"
            keyboardType="numeric"
          />
        </View>
      )}
    </View>
  );
};

export default Trail;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
});

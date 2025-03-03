import React from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Trail = ({ isTrail, setIsTrail, trail, setTrail }) => {
  const handleTrailChange = (field, value) => {
    setTrail({ ...trail, [field]: value });
  };

  // Difficulty levels for better UI
  const difficultyLevels = [
    { value: 0, label: "Easy", color: "#4CAF50" },
    { value: 1, label: "Moderate", color: "#FFC107" },
    { value: 2, label: "Hard", color: "#FF9800" },
    { value: 3, label: "Very Hard", color: "#F44336" },
  ];

  // Get current difficulty info
  const currentDifficulty =
    difficultyLevels.find(
      (level) => level.value === Number(trail.difficulty)
    ) || difficultyLevels[0];

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Trail Information</Text>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Enable Trail Details</Text>
          <Switch
            value={isTrail}
            onValueChange={setIsTrail}
            trackColor={{ false: "#ccc", true: "#FCD228" }}
            thumbColor={isTrail ? "#fff" : "#f4f4f4"}
          />
        </View>
      </View>

      {isTrail && (
        <View style={styles.trailContent}>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Min Duration (minutes)</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={
                  trail.min_duration_in_minute === 60
                    ? ""
                    : trail.min_duration_in_minute.toString()
                }
                onChangeText={(value) =>
                  handleTrailChange("min_duration_in_minute", value)
                }
                placeholder="Enter minimum duration"
                keyboardType="numeric"
              />
              <Ionicons
                name="time-outline"
                size={20}
                color="#777"
                style={styles.inputIcon}
              />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Max Duration (minutes)</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={
                  trail.max_duration_in_minute === 120
                    ? ""
                    : trail.max_duration_in_minute.toString()
                }
                onChangeText={(value) =>
                  handleTrailChange("max_duration_in_minute", value)
                }
                placeholder="Enter maximum duration"
                keyboardType="numeric"
              />
              <Ionicons
                name="time-outline"
                size={20}
                color="#777"
                style={styles.inputIcon}
              />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Distance (meters)</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={
                  trail.distance_in_meter === 10.5
                    ? ""
                    : trail.distance_in_meter.toString()
                }
                onChangeText={(value) =>
                  handleTrailChange("distance_in_meter", value)
                }
                placeholder="Enter distance"
                keyboardType="numeric"
              />
              <Ionicons
                name="resize-outline"
                size={20}
                color="#777"
                style={styles.inputIcon}
              />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Difficulty Level</Text>
            <View style={styles.difficultyContainer}>
              {difficultyLevels.map((level) => (
                <TouchableOpacity
                  key={level.value}
                  style={[
                    styles.difficultyItem,
                    {
                      backgroundColor:
                        level.value === Number(trail.difficulty)
                          ? level.color
                          : "transparent",
                      borderColor: level.color,
                    },
                  ]}
                  onPress={() => handleTrailChange("difficulty", level.value)}
                >
                  <Text
                    style={[
                      styles.difficultyText,
                      {
                        color:
                          level.value === Number(trail.difficulty)
                            ? "#fff"
                            : level.color,
                      },
                    ]}
                  >
                    {level.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default Trail;

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
  sectionHeader: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  switchLabel: {
    fontSize: 16,
    color: "#555",
  },
  trailContent: {
    marginTop: 8,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#444",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: "#333",
  },
  inputIcon: {
    paddingRight: 12,
  },
  difficultyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  difficultyItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    minWidth: 70,
  },
  difficultyText: {
    fontWeight: "600",
    fontSize: 14,
  },
});

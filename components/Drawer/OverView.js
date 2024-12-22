import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const OverView = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Overview</Text>
      <View style={styles.gridContainer}>
        <TouchableOpacity style={styles.card}>
          <Ionicons name="list-outline" size={24} color="#00aaff" />
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>My Posts</Text>
            <Text style={styles.cardSubtitle}>120 Posts</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("SuggestPlace")} // Add this line
        >
          <Ionicons name="add-outline" size={24} color="#00aaff" />
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>Suggest Place</Text>
            <Text style={styles.cardSubtitle}>Suggest new place</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Ionicons name="list-outline" size={24} color="#00aaff" />
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>My Posts</Text>
            <Text style={styles.cardSubtitle}>120 Posts</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Ionicons name="list-outline" size={24} color="#00aaff" />
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>My Posts</Text>
            <Text style={styles.cardSubtitle}>120 Posts</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OverView;

const styles = StyleSheet.create({
  container: {},
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%", // Adjust the width to make two cards per row
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardText: {
    marginLeft: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  cardSubtitle: {
    fontSize: 12,
    color: "gray",
  },
});

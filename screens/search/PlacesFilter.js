import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // For icons like back arrow
import { COLORS } from "../../constants/theme"; // Assuming a theme file exists

const PlacesFilter = ({ route }) => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  const [minCost, setMinCost] = useState("");
  const [maxCost, setMaxCost] = useState("");
  const [minRate, setMinRate] = useState(1);
  const [maxRate, setMaxRate] = useState(5);
  const [regionId, setRegionId] = useState(1);
  const [features, setFeatures] = useState([1]);

  const applyFilters = () => {
    navigation.navigate("PlacesList", {
      filters: {
        categories_id: selectedCategory,
        subcategories_id: selectedSubCategory,
        region_id: regionId,
        min_cost: minCost,
        max_cost: maxCost,
        features_id: features,
        min_rate: minRate,
        max_rate: maxRate,
      },
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header with Back button and Title */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search Filter</Text>
        <TouchableOpacity>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>

      {/* Category Section */}
      <Text style={styles.sectionTitle}>Category</Text>
      <TextInput
        style={styles.input}
        placeholder="Category Search"
        placeholderTextColor={COLORS.gray}
        value={selectedCategory}
        onChangeText={setSelectedCategory}
      />

      {/* Subcategory Section */}
      <Text style={styles.sectionTitle}>Sub Category</Text>
      <TextInput
        style={styles.input}
        placeholder="Sub Category Search"
        placeholderTextColor={COLORS.gray}
        value={selectedSubCategory}
        onChangeText={setSelectedSubCategory}
      />

      {/* Region Section */}
      <Text style={styles.sectionTitle}>Region</Text>
      <TextInput
        style={styles.input}
        placeholder="Region"
        placeholderTextColor={COLORS.gray}
        value={regionId.toString()}
        onChangeText={(text) => setRegionId(parseInt(text))}
      />

      {/* Cost Section */}
      <View style={styles.costSection}>
        <Text style={styles.sectionTitle}>Cost</Text>
        <View style={styles.costInputs}>
          <TextInput
            style={styles.costInput}
            placeholder="Minimum"
            placeholderTextColor={COLORS.gray}
            value={minCost}
            onChangeText={setMinCost}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.costInput}
            placeholder="Maximum"
            placeholderTextColor={COLORS.gray}
            value={maxCost}
            onChangeText={setMaxCost}
            keyboardType="numeric"
          />
        </View>
      </View>

      {/* Rate Section */}
      <View style={styles.rateSection}>
        <Text style={styles.sectionTitle}>Rate</Text>
        {/* Implement star ratings here */}
        {/* Assuming a custom star rating component or simple implementation */}
      </View>

      {/* Features Section */}
      <Text style={styles.sectionTitle}>Features</Text>
      {/* Render feature tags here */}

      {/* Apply Button */}
      <TouchableOpacity onPress={applyFilters} style={styles.applyButton}>
        <Text style={styles.applyButtonText}>Filter</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
    padding: 20,
    top:100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.black,
  },
  clearText: {
    color: COLORS.primary, // Use your theme primary color
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.black,
    marginBottom: 10,
  },
  input: {
    backgroundColor: COLORS.lightGray, // Light background
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    color: COLORS.black,
  },
  costSection: {
    marginBottom: 20,
  },
  costInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  costInput: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
    padding: 12,
    width: "48%",
    color: COLORS.black,
  },
  rateSection: {
    marginBottom: 20,
  },
  applyButton: {
    backgroundColor: COLORS.yellow, // Change to your button color
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  applyButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "600",
  },
});

export default PlacesFilter;

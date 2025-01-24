import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import { COLORS } from "../../constants/theme";

const FilterModal = ({
  visible,
  onClose,
  onApply,
  userLocation,
  setUserLocation,
}) => {
  const [categoriesId, setCategoriesId] = useState("");
  const [subcategoriesId, setSubcategoriesId] = useState("");
  const [area, setArea] = useState("");

const handleApply = () => {
  if (!userLocation.latitude || !userLocation.longitude) {
    Alert.alert("Error", "Location is required to filter places.");
    return;
  }

  const categoriesArray = categoriesId
    .split(",")
    .filter((id) => id.trim() !== "")
    .map((id) => parseInt(id.trim(), 10));

  const subcategoriesArray = subcategoriesId
    .split(",")
    .filter((id) => id.trim() !== "")
    .map((id) => parseInt(id.trim(), 10));

  onApply({
    categories_id: categoriesArray,
    subcategories_id: subcategoriesArray,
    area: area || "12", // Default to "12" if area is not set
    lat: userLocation.latitude,
    lng: userLocation.longitude,
  });
  onClose();
};


  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalHeader}>Filter Places</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Categories IDs (comma-separated)"
            value={categoriesId}
            onChangeText={setCategoriesId}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Subcategories IDs (comma-separated)"
            value={subcategoriesId}
            onChangeText={setSubcategoriesId}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Area"
            value={area}
            onChangeText={setArea}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleApply} style={styles.applyButton}>
              <Text style={styles.buttonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 8,
    width: "80%",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: COLORS.gray,
    padding: 10,
    borderRadius: 5,
    width: "45%",
  },
  applyButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    width: "45%",
  },
  buttonText: {
    textAlign: "center",
    color: COLORS.white,
    fontWeight: "bold",
  },
});

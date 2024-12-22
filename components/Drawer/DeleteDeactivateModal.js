import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import BASE_URL from "../../hook/apiConfig"; // Make sure to replace with your base URL

const DeleteDeactivateModal = ({ visible, onClose }) => {
  const navigation = useNavigation(); // Initialize the navigation hook

const handleDeleteAccount = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/delete/account/`);
    Alert.alert("Success", "Your account has been deleted successfully.");
    onClose();
    navigation.reset({
      index: 0,
      routes: [{ name: "Onboarding" }], // Ensure "Onboarding" is in the stack
    });
  } catch (error) {
    console.error("Error deleting account:", error);
    Alert.alert("Error", "There was a problem deleting your account.");
  }
};

const handleDeactivateAccount = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/user/deactivate-account/`);
    Alert.alert("Success", "Your account has been deactivated successfully.");
    onClose();
    navigation.reset({
      index: 0,
      routes: [{ name: "Onboarding" }], // Ensure "Onboarding" is in the stack
    });
  } catch (error) {
    console.error("Error deactivating account:", error);
    Alert.alert("Error", "There was a problem deactivating your account.");
  }
};


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>

          <Text style={styles.modalTitle}>Delete or Deactivate?</Text>
          <Text style={styles.modalText}>
            Are you sure you want to delete your account or you can deactivate
            it?
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDeleteAccount}
            >
              <Text style={styles.buttonText}>DELETE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deactivateButton}
              onPress={handleDeactivateAccount}
            >
              <Text style={styles.deactivateButtonText}>DEACTIVATE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // To dim the background
  },
  modalView: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "relative", // Ensure the close button is correctly positioned
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 25,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  deleteButton: {
    backgroundColor: "#FF4500",
    padding: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  deactivateButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#FF4500",
    padding: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  deactivateButtonText: {
    color: "#FF4500",
    fontWeight: "bold",
  },
});

export default DeleteDeactivateModal;

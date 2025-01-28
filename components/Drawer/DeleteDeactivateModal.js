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
import { COLORS, TEXT, SIZES } from "../../constants/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"; 
import BASE_URL from "../../hook/apiConfig"; 
import { ReusableText } from "../index";

const DeleteDeactivateModal = ({ visible, onClose }) => {
  const navigation = useNavigation();

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/delete/account/`);
      Alert.alert("Success", "Your account has been deleted successfully.");
      onClose();
      navigation.reset({
        index: 0,
        routes: [{ name: "Onboarding" }],
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
        routes: [{ name: "Onboarding" }],
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
            <Ionicons name="close" size={wp("6%")} color="black" />
          </TouchableOpacity>
          <ReusableText
            text={"Delete or Deactivate?"}
            family={"Bold"}
            size={TEXT.large}
            color={COLORS.black}
            align={"center"}
            style={styles.modalTitle}
          />
          <ReusableText
            text={
              "Are you sure you want to delete your account or you can deactivate it?"
            }
            family={"Medium"}
            size={TEXT.xmedium}
            color={COLORS.black}
            align={"center"}
            style={styles.modalText}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDeleteAccount}
            >
              <ReusableText
                text={"DELETE"}
                family={"SemiBold"}
                size={TEXT.xmedium}
                color={COLORS.white}
                align={"center"}
                style={styles.buttonText}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deactivateButton}
              onPress={handleDeactivateAccount}
            >
              <ReusableText
                text={"DEACTIVATE"}
                family={"SemiBold"}
                size={TEXT.xmedium}
                color={COLORS.black}
                align={"center"}
                style={styles.buttonText}
              />
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: wp("90%"),
    backgroundColor: "white",
    borderRadius: wp("5%"),
    padding: wp("5%"),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: hp("2%"),
    right: wp("5%"),
  },
  modalTitle: {
    marginBottom: hp("1%"),
  },
  modalText: {
    marginBottom: hp("3%"),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: hp("1%"),
    paddingHorizontal: hp("2%"),
  },
  deleteButton: {
    backgroundColor: "#FF4500",
    padding: hp("2%"),
    borderRadius: wp("3%"),
    width: wp("35%"),
    alignItems: "center",
  },
  deactivateButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#FF4500",
    padding: hp("2%"),
    borderRadius: wp("3%"),
    width: wp("35%"),
    alignItems: "center",
  },
});

export default DeleteDeactivateModal;

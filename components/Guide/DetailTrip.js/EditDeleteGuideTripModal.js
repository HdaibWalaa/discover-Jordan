import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS, TEXT, SIZES } from "../../../constants/theme";
import ReusableText from "../../Reusable/ReusableText";
import { AuthContext } from "../../../store/auth-context";
import axios from "axios";
import BASE_URL from "../../../hook/apiConfig";
import { useNavigation, CommonActions } from "@react-navigation/native";

const EditDeleteGuideTripModal = ({ isVisible, onClose, tripId, tripName }) => {
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleEdit = () => {
    // Close the modal
    onClose();
    // Navigate to edit trip screen with the trip ID
    navigation.navigate("EditTrip", { tripId });
  };

  const handleDelete = async () => {
    // Ask for confirmation before deletion
    Alert.alert(
      "Delete Trip",
      `Are you sure you want to delete "${tripName}"? This action cannot be undone.`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => confirmDelete(),
        },
      ]
    );
  };

  const confirmDelete = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `${BASE_URL}/guide/trips/delete/${tripId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-API-KEY": "DISCOVERJO91427",
            Accept: "application/json",
          },
        }
      );

      if (response.data && response.data.status === 200) {
        onClose();

        
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: "AllGuideTrip",
                params: {
                  deletedTripId: tripId,
                  timestamp: Date.now(),
                },
              },
            ],
          })
        );

        // Toast message could be shown here if you have a toast component
      } else {
        throw new Error(response.data?.msg || "Failed to delete trip");
      }
    } catch (error) {
      console.error("Error deleting trip:", error);

      // Provide a user-friendly error message
      let errorMessage = "Failed to delete trip";

      if (error.message.includes("Network Error")) {
        errorMessage =
          "Network connection error. Please check your internet connection.";
      } else if (error.response?.data?.msg) {
        errorMessage = error.response.data.msg;
      }

      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (imageId) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/guide/image/delete/${imageId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-API-KEY": "DISCOVERJO91427",
            Accept: "application/json",
          },
        }
      );

      if (response.data && response.data.status === 200) {
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error deleting image:", error);
      return false;
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <ReusableText
              text="Trip Options"
              family="Medium"
              size={TEXT.large}
              color={COLORS.dark}
            />
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={COLORS.primary} />
              <ReusableText
                text="Processing..."
                family="Regular"
                size={TEXT.small}
                color={COLORS.gray}
                style={{ marginTop: 10 }}
              />
            </View>
          ) : (
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={[styles.optionButton, styles.editButton]}
                onPress={handleEdit}
              >
                <ReusableText
                  text="Edit Trip"
                  family="Medium"
                  size={TEXT.medium}
                  color={COLORS.white}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.optionButton, styles.deleteButton]}
                onPress={handleDelete}
              >
                <ReusableText
                  text="Delete Trip"
                  family="Medium"
                  size={TEXT.medium}
                  color={COLORS.white}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default EditDeleteGuideTripModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: wp("80%"),
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    paddingHorizontal: wp("5%"),
    paddingVertical: hp("3%"),
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp("2%"),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    paddingBottom: hp("1%"),
  },
  closeButton: {
    width: wp("8%"),
    height: wp("8%"),
    borderRadius: wp("4%"),
    backgroundColor: COLORS.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 24,
    color: COLORS.dark,
    fontWeight: "bold",
  },
  loadingContainer: {
    paddingVertical: hp("5%"),
    justifyContent: "center",
    alignItems: "center",
  },
  optionsContainer: {
    paddingVertical: hp("2%"),
    gap: 15,
  },
  optionButton: {
    paddingVertical: hp("1.5%"),
    borderRadius: SIZES.radius,
    alignItems: "center",
  },
  editButton: {
    backgroundColor: COLORS.primary,
  },
  deleteButton: {
    backgroundColor: COLORS.red,
  },
});

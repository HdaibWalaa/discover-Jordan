import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";
import { AuthContext } from "../../store/auth-context";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import BASE_URL from "../../hook/apiConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const PlanAction = ({ planId, onEditPress, disabled = false }) => {
  const [showActionModal, setShowActionModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();

  const handleDeletePlan = async () => {
    if (!planId) {
      Alert.alert("Error", "Plan ID is missing.");
      return;
    }

    Alert.alert(
      "Delete Plan",
      "Are you sure you want to delete this plan? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setIsDeleting(true);
              let token =
                authCtx.token || (await AsyncStorage.getItem("authToken"));
              if (!token) throw new Error("Authentication token is missing.");

              const response = await axios.delete(
                `${BASE_URL}/plan/${planId}/delete`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "X-API-KEY": "DISCOVERJO91427",
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                }
              );

              if (response.data && response.data.status === 200) {
                // Close modal first
                setShowActionModal(false);

                // Show success message
                Alert.alert("Success", "Plan deleted successfully.", [
                  {
                    text: "OK",
                    onPress: () => {
                      // Simply navigate to AllPlans with a refreshTrigger parameter
                      // This will trigger a refresh in the AllPlans screen
                      navigation.navigate("AllPlans", {
                        refreshTrigger: new Date().getTime(),
                      });
                    },
                  },
                ]);
              } else {
                throw new Error(
                  response.data?.msg || "Failed to delete the plan."
                );
              }
            } catch (error) {
              console.error("Delete Error:", error);
              Alert.alert(
                "Error",
                error.response?.data?.msg ||
                  "Failed to delete the plan. Please try again."
              );
            } finally {
              setIsDeleting(false);
            }
          },
        },
      ]
    );
  };

  const handleAction = () => {
    setShowActionModal(true);
  };

  const handleEdit = () => {
    setShowActionModal(false);
    if (onEditPress) {
      onEditPress();
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={handleAction}
        style={styles.actionButton}
        disabled={disabled}
      >
        <Ionicons name="ellipsis-vertical" size={24} color={COLORS.primary} />
      </TouchableOpacity>

      {/* Action Modal */}
      <Modal
        visible={showActionModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowActionModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowActionModal(false)}
        >
          <View style={styles.modalContainer}>
            {/* Edit Plan Button */}
            <TouchableOpacity
              style={styles.modalOption}
              onPress={handleEdit}
              disabled={isDeleting}
            >
              <Ionicons name="pencil" size={20} color={COLORS.primary} />
              <Text style={styles.modalOptionText}>Edit Plan</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* Delete Plan Button */}
            <TouchableOpacity
              style={styles.modalOption}
              onPress={handleDeletePlan}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <ActivityIndicator size="small" color={COLORS.red} />
              ) : (
                <>
                  <Ionicons name="trash" size={20} color={COLORS.red} />
                  <Text style={[styles.modalOptionText, { color: COLORS.red }]}>
                    Delete Plan
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default PlanAction;

const styles = StyleSheet.create({
  actionButton: {
    padding: 8,
    borderRadius: wp(2),
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: wp(60),
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: wp(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: wp(3),
  },
  modalOptionText: {
    marginLeft: wp(3),
    fontFamily: "Medium",
    fontSize: 16,
    color: COLORS.black,
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginHorizontal: wp(2),
  },
});

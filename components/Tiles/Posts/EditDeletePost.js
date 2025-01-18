import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
} from "react-native";
import { COLORS, SIZES } from "../../../constants/theme";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

const EditDeletePost = ({
  visible,
  onClose,
  onEdit,
  onDelete,
  token,
  postId,
}) => {
  const navigation = useNavigation(); // Initialize navigation hook

  const handleDeletePost = async () => {
    try {
      const response = await fetch(
        `https://dashboard.discoverjo.com/api/post/delete/${postId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (response.ok) {
        Alert.alert("Success", "Post deleted successfully.");
        onDelete(); // Callback to update the UI or navigate back
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData?.msg || "Failed to delete post.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again later.");
    } finally {
      onClose();
    }
  };

  const handleEditPost = () => {
    onClose(); // Close the modal
    navigation.navigate("EditUserPost", { postId }); // Navigate to EditUserPost screen with postId
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1} // Prevent closing when tapping inside the modal content
        onPress={onClose}
      >
        <TouchableOpacity
          style={styles.modalContent}
          activeOpacity={1} // Prevent closing when tapping inside the modal content
        >
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <AntDesign name="close" size={24} color={COLORS.dark} />
          </TouchableOpacity>

          {/* Options Container */}
          <View style={styles.optionsContainer}>
            {/* Edit Option */}
            <TouchableOpacity
              onPress={handleEditPost}
              style={[styles.modalOption, styles.editOption]}
            >
              <Text style={styles.modalText}>Edit</Text>
            </TouchableOpacity>

            {/* Delete Option */}
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "Delete Post",
                  "Are you sure you want to delete this post?",
                  [
                    { text: "Cancel", style: "cancel" },
                    { text: "Delete", onPress: handleDeletePost },
                  ],
                  { cancelable: true }
                );
              }}
              style={[styles.modalOption, styles.deleteOption]}
            >
              <Text style={styles.modalText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default EditDeletePost;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    width: "80%",
    padding: 20,
    alignItems: "center",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 5,
    right: 10,
    padding: 10,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
    padding: 10,
  },
  modalOption: {
    flex: 1,
    paddingVertical: 20,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  editOption: {
    backgroundColor: COLORS.primary,
  },
  deleteOption: {
    backgroundColor: COLORS.red,
  },
  modalText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontFamily: "Bold",
  },
});

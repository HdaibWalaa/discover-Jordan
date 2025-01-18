import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../../constants/theme";
import { AuthContext } from "../../../store/auth-context";

const EditDeleteComment = ({
  commentId,
  initialContent,
  onCommentUpdated,
  onCommentDeleted,
}) => {
  const { token } = useContext(AuthContext);
  const [menuVisible, setMenuVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [content, setContent] = useState(initialContent || "");
  const [loading, setLoading] = useState(false);

const handleDelete = async () => {
  Alert.alert(
    "Delete Comment",
    "Are you sure you want to delete this comment?",
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: async () => {
          try {
            console.log("Attempting to delete comment with ID:", commentId);

            setLoading(true);
            const response = await fetch(
              `https://dashboard.discoverjo.com/api/post/comment/delete/${commentId}`,
              {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token}`,
                  Accept: "application/json",
                },
              }
            );

            const responseData = await response.json();

            if (response.ok) {
              Alert.alert("Success", "Comment deleted successfully.");
              setMenuVisible(false);
              onCommentDeleted && onCommentDeleted(commentId);
            } else {
              console.error("Delete Comment Error:", responseData);
              Alert.alert(
                "Error",
                responseData?.msg?.comment_id?.join(", ") ||
                  "Failed to delete comment."
              );
            }
          } catch (error) {
            console.error("Delete Comment Exception:", error);
            Alert.alert(
              "Error",
              "Something went wrong. Please try again later."
            );
          } finally {
            setLoading(false);
          }
        },
      },
    ],
    { cancelable: true }
  );
};


const handleEdit = async () => {
  try {
    setLoading(true);

    const formData = new FormData();
    formData.append("content", content);

    const response = await fetch(
      `https://dashboard.discoverjo.com/api/post/comment/update/${commentId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      }
    );

    const responseData = await response.json();

    if (response.ok) {
      Alert.alert("Success", "Comment updated successfully.");
      setEditModalVisible(false);
      onCommentUpdated && onCommentUpdated(commentId, content);
    } else {
      console.error("Edit Comment Error:", responseData);

      if (responseData?.msg?.comment_id) {
        // Specific error handling for invalid comment ID
        Alert.alert(
          "Error",
          "The specified comment could not be found or does not belong to you."
        );

        // Optionally, refresh the comments list
        onCommentDeleted && onCommentDeleted(commentId);
      } else {
        Alert.alert(
          "Error",
          responseData?.msg || "Failed to update comment. Please try again."
        );
      }
    }
  } catch (error) {
    console.error("Edit Comment Exception:", error);
    Alert.alert("Error", "Something went wrong. Please try again later.");
  } finally {
    setLoading(false);
  }
};



  return (
    <View>
      {/* Dots Icon */}
      <TouchableOpacity onPress={() => setMenuVisible(true)}>
        <Entypo name="dots-three-vertical" size={18} color={COLORS.darkGray} />
      </TouchableOpacity>

      {/* Menu Modal */}
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.menuContainer}>
            <TouchableOpacity
              onPress={() => {
                setMenuVisible(false);
                setEditModalVisible(true);
              }}
              style={styles.menuOption}
            >
              <Text style={styles.menuText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete} style={styles.menuOption}>
              <Text style={styles.menuText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Edit Modal */}
      <Modal
        visible={editModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.editModalContainer}>
          <Text style={styles.modalTitle}>Edit Comment</Text>
          <TextInput
            style={styles.input}
            value={content}
            onChangeText={setContent}
            placeholder="Edit your comment"
            multiline
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => setEditModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleEdit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color={COLORS.white} />
              ) : (
                <Text style={styles.buttonText}>Save</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EditDeleteComment;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  menuContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 10,
    width: 150,
    alignItems: "center",
    elevation: 5,
  },
  menuOption: {
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  menuText: {
    color: COLORS.dark,
    fontSize: 16,
  },
  editModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  input: {
    width: "80%",
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: COLORS.gray,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 10,
  },
});

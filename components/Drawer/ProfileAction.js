import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import editIcon from "../../assets/images/icons/edit-text.png";
import followersIcon from "../../assets/images/icons/followers.png";
import deleteIcon from "../../assets/images/icons/deleteaccount.png";
import DeleteDeactivateModal from "./DeleteDeactivateModal"; // Import the modal

const ProfileAction = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>My Profile</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Image source={editIcon} style={styles.icon} />
            <Text style={styles.actionText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Image source={followersIcon} style={styles.icon} />
            <Text style={styles.actionText}>Followers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={openModal}>
            <Image source={deleteIcon} style={styles.icon} />
            <Text style={styles.actionText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <DeleteDeactivateModal visible={modalVisible} onClose={closeModal} />
    </View>
  );
};

export default ProfileAction;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 0,
    overflow: "visible", // Ensure overflow is visible
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center", // Ensure all buttons are aligned in the center vertically
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    marginRight: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "600",
  },
});

import React from "react";
import {
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

const FollowListModal = ({ visible, onClose, data, title }) => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.posts}>{item.posts} Posts</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          /* Unfollow functionality here */
        }}
      >
        <Text style={styles.buttonText}>Unfollow</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>X</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  posts: {
    fontSize: 14,
    color: "gray",
  },
  button: {
    backgroundColor: "#FFD700",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default FollowListModal;

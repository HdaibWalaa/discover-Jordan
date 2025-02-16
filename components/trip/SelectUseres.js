import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  Modal,
} from "react-native";
import { COLORS, TEXT } from "../../constants/theme";
import ReusableText from "../Reusable/ReusableText";
import { searchUsers } from "../../services/apiService";

const SelectUsers = ({
  label,
  iconSource,
  iconSource2,
  onValueChange,
  value = [], // ✅ Ensure default value is an empty array
  width = 300,
}) => {
  const [selectedUsers, setSelectedUsers] = useState(
    Array.isArray(value) ? value : []
  ); // ✅ Ensure array
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const language = "ar";

  const handleSearchUsers = async (query) => {
    setSearchQuery(query);

    if (query.length < 2) {
      setFilteredUsers([]);
      return;
    }

    setLoading(true);
    try {
      const users = await searchUsers(query, language);
      setFilteredUsers(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      setFilteredUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUserSelect = (user) => {
    if (!selectedUsers) return; // ✅ Prevent undefined error

    const isAlreadySelected = selectedUsers.some((u) => u.id === user.id);

    let updatedUsers;
    if (isAlreadySelected) {
      updatedUsers = selectedUsers.filter((u) => u.id !== user.id);
    } else {
      updatedUsers = [...selectedUsers, user];
    }

    setSelectedUsers(updatedUsers);
    onValueChange(updatedUsers.map((u) => u.id)); // ✅ Send IDs only
  };

  return (
    <View style={[styles.container, { width: width + 10 }]}>
      <ReusableText
        text={label}
        family={"Regular"}
        size={TEXT.medium}
        color={COLORS.black}
      />

      {/* 🔽 Input Field */}
      <TouchableOpacity onPress={() => setIsDropdownVisible(true)}>
        <View style={[styles.pickerWrapper, { width }]}>
          <Image source={iconSource} style={styles.icon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Select users..."
            placeholderTextColor={COLORS.gray}
            value={selectedUsers.map((user) => user.username).join(", ")}
            editable={false}
          />
          <Image source={iconSource2} style={styles.icon2} />
        </View>
      </TouchableOpacity>

      {/* 🔽 Modal for User Selection */}
      <Modal visible={isDropdownVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* 🔍 Search Bar */}
            <TextInput
              style={styles.searchInput}
              placeholder="Search users..."
              placeholderTextColor={COLORS.gray}
              value={searchQuery}
              onChangeText={handleSearchUsers}
            />

            {loading ? (
              <ActivityIndicator size="large" color={COLORS.primary} />
            ) : (
              <FlatList
                data={filteredUsers}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={
                  <Text style={{ padding: 10, color: COLORS.gray }}>
                    No users found
                  </Text>
                }
                renderItem={({ item }) => {
                  const isSelected = selectedUsers.some(
                    (u) => u.id === item.id
                  );
                  return (
                    <TouchableOpacity onPress={() => handleUserSelect(item)}>
                      <View
                        style={[
                          styles.userItem,
                          isSelected && styles.selectedUser,
                        ]}
                      >
                        <Image
                          source={{ uri: item.image }}
                          style={styles.userImage}
                        />
                        <View>
                          <Text style={styles.username}>{item.username}</Text>
                          <Text style={styles.email}>{item.email}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            )}

            {/* ❌ Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsDropdownVisible(false)}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginLeft: 5,
  },
  pickerWrapper: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#8D8D8D",
    backgroundColor: COLORS.white,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  icon2: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 8,
    color: COLORS.black,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    maxHeight: "70%",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 15,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  selectedUser: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.black,
  },
  email: {
    fontSize: 14,
    color: COLORS.gray,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    borderRadius: 5,
  },
  closeText: {
    color: COLORS.white,
    fontSize: 16,
  },
});

export default SelectUsers;

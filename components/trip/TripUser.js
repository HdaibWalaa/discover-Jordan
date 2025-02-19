import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Modal,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useContext } from "react";
import { COLORS, SIZES } from "../../constants/theme";
import axios from "axios";
import { AuthContext } from "../../store/auth-context";
import BASE_URL from "../../hook/apiConfig";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const DEFAULT_AVATAR = require("../../assets/images/icons/people.png");

const TripUser = ({ tripDetails, tripId }) => {
  const { token, user } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [attendees, setAttendees] = useState(tripDetails.attendances);

  
  const isCreator = user?.id === tripDetails?.creator_id;

const handleRemoveUser = async (userId) => {
  if (!tripId) {
    Alert.alert("Error", "Trip ID is missing!");
    return;
  }

  try {
    const response = await axios.post(
      // ✅ Change DELETE to POST
      `${BASE_URL}/trip/remove-user/${tripId}`, 
      { user_id: userId }, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "X-API-KEY": "DISCOVERJO91427",
          "Content-Type": "application/json", 
        },
      }
    );

    if (response.status === 200) {
      Alert.alert("Success", "User removed from trip!");

      // ✅ Update UI dynamically without refresh
      setAttendees((prev) => prev.filter((user) => user.id !== userId));
    }
  } catch (error) {
    console.error(
      "Error removing user:",
      error.response?.data || error.message
    );
    Alert.alert("Error", "Failed to remove user.");
  }
};



  const renderUserList = ({ item }) => (
    <View style={styles.userItem}>
      <Image
        source={item.image ? { uri: item.image } : DEFAULT_AVATAR}
        style={styles.modalAvatar}
      />
      <Text style={styles.username}>{item.username}</Text>

     
      {isCreator && (
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveUser(item.id)}
        >
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.attendanceContainer}>
      <View style={styles.attendanceHeader}>
        <Text style={styles.attendanceText}>
          <Text style={styles.attendanceCount}>{attendees.length}</Text> /{" "}
          {tripDetails.attendance_number}
        </Text>
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.attendanceProgressBarContainer}>
          <View style={styles.attendanceProgressBar}>
            <View
              style={[
                styles.attendanceProgress,
                {
                  width: `${
                    (attendees.length / tripDetails.attendance_number) * 100
                  }%`,
                },
              ]}
            />
          </View>
        </View>
        <Text style={styles.attendancePercentage}>
          {Math.round((attendees.length / tripDetails.attendance_number) * 100)}
          %
        </Text>
      </View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <FlatList
          horizontal
          data={attendees.slice(0, 3)}
          renderItem={({ item }) => (
            <View style={styles.avatarContainer}>
              <Image
                source={item.image ? { uri: item.image } : DEFAULT_AVATAR}
                style={styles.avatar}
              />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          style={styles.avatarList}
        />
        {attendees.length > 3 && (
          <Text style={styles.additionalAttendeesText}>
            +{attendees.length - 3} Going
          </Text>
        )}
      </TouchableOpacity>

     
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Trip Attendees</Text>
            <FlatList
              data={attendees}
              renderItem={renderUserList}
              keyExtractor={(item) => item.id.toString()}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TripUser;

const styles = StyleSheet.create({
  attendanceContainer: {
    paddingHorizontal: wp("1%"),
  },
  attendanceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp("1.5%"),
  },
  attendanceText: {
    fontSize: SIZES.medium,
    color: COLORS.dark,
  },
  attendanceCount: {
    fontFamily: "Bold",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  attendanceProgressBarContainer: {
    flex: 1,
    height: hp("1%"),
    marginRight: wp("3%"),
    justifyContent: "center",
  },
  attendanceProgressBar: {
    height: "100%",
    backgroundColor: COLORS.lightGrey,
    borderRadius: wp("2%"),
    overflow: "hidden",
  },
  attendanceProgress: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: wp("2%"),
  },
  attendancePercentage: {
    fontSize: SIZES.medium,
    color: COLORS.dark,
    fontFamily: "500",
  },
  avatarList: {
    flexDirection: "row",
    marginBottom: hp("1.5%"),
    paddingVertical: hp("1%"),
  },
  avatarContainer: {
    marginRight: wp("2.5%"),
    borderWidth: 2,
    borderColor: COLORS.white,
    borderRadius: wp("10%"),
    overflow: "hidden",
  },
  avatar: {
    width: wp("9%"),
    height: wp("9%"),
    borderRadius: wp("5%"),
  },
  additionalAttendeesText: {
    color: COLORS.primary,
    fontFamily: "Bold",
    marginLeft: wp("2%"),
    fontSize: SIZES.medium,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: COLORS.white,
    padding: wp("5%"),
    borderRadius: wp("4%"),
    alignItems: "center",
  },
  modalTitle: {
    fontSize: wp("5%"),
    fontFamily: "Bold",
    marginBottom: hp("2%"),
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: hp("1.2%"),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  modalAvatar: {
    width: wp("10%"),
    height: wp("10%"),
    borderRadius: wp("5%"),
    marginRight: wp("3%"),
  },
  username: {
    fontSize: SIZES.medium,
    color: COLORS.black,
    flex: 1,
  },
  removeButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: hp("1%"),
    paddingHorizontal: wp("4%"),
    borderRadius: wp("2%"),
  },
  removeButtonText: {
    color: COLORS.white,
    fontFamily: "Bold",
    fontSize: wp("3.5%"),
  },
  closeButton: {
    marginTop: hp("3%"),
    backgroundColor: COLORS.dark,
    paddingVertical: hp("1.5%"),
    paddingHorizontal: wp("6%"),
    borderRadius: wp("2%"),
  },
  closeButtonText: {
    color: COLORS.white,
    fontFamily: "Bold",
    fontSize: SIZES.medium,
  },
  username: {
    color: COLORS.black,
    fontFamily: "SemiBold",
    fontSize: SIZES.medium,
    marginRight: hp("1.5%"),
  },
});

import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  FlatList,
  Image,
} from "react-native";
import TripJoinForm from "./TripJoinForm";
import { COLORS, TEXT, SIZES } from "../../../constants/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  fetchGuideTripSubscribers,
  deleteGuideTripSubscriber,
  updateGuideTripSubscribers,
} from "../../../hook/trip/fetchGuidTripUser";

const GuideTripJoin = ({ trip, token }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [subscribersModalVisible, setSubscribersModalVisible] = useState(false);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleJoinSuccess = () => {
    Alert.alert("Success", "You have successfully joined the trip.");
    setModalVisible(false);
  };

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const fetchedSubscribers = await fetchGuideTripSubscribers(
        trip.id,
        token
      );
      setSubscribers(fetchedSubscribers);
      setSubscribersModalVisible(true);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

 const handleEditSubscriber = async (updatedSubscriber) => {
   try {
     const updatedSubscribers = subscribers.map((subscriber) =>
       subscriber.phone_number === updatedSubscriber.phone_number
         ? updatedSubscriber
         : subscriber
     );

     await updateGuideTripSubscribers(trip.id, updatedSubscribers, token);
     setSubscribers(updatedSubscribers);
     Alert.alert("Success", "Subscriber updated successfully.");
   } catch (error) {
     Alert.alert("Error", error.message);
   }
 };


  const handleDeleteSubscriber = async (phoneNumber) => {
    try {
      await deleteGuideTripSubscriber(trip.id, phoneNumber, token);
      setSubscribers((prev) =>
        prev.filter((subscriber) => subscriber.phone_number !== phoneNumber)
      );
      Alert.alert("Success", "Subscriber deleted successfully.");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.bottomSection}>
        {/* Join Trip Button */}
        <TouchableOpacity
          style={styles.joinButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.joinButtonText}>Join Trip</Text>
        </TouchableOpacity>

        {/* View Subscribers Button */}
        <TouchableOpacity
          style={styles.directionButton}
          onPress={fetchSubscribers}
        >
          <View style={styles.directionButtonContent}>
            <Image
              source={require("../../../assets/images/icons/followers.png")}
              style={styles.icon}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* Join Trip Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Image
                source={require("../../../assets/images/icons/close.png")}
                style={styles.closeIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TripJoinForm
              guideTripId={trip.id}
              token={token}
              onJoinSuccess={handleJoinSuccess}
            />
          </View>
        </View>
      </Modal>

      {/* Subscribers List Modal */}
      <Modal
        visible={subscribersModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSubscribersModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSubscribersModalVisible(false)}
            >
              <Image
                source={require("../../../assets/images/icons/close.png")}
                style={styles.closeIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Subscribers</Text>
            {loading ? (
              <Text>Loading...</Text>
            ) : (
              <FlatList
                data={subscribers}
                keyExtractor={(item, index) => `${item.phone_number}-${index}`}
                renderItem={({ item }) => (
                  <View style={styles.subscriberItem}>
                    {/* Name */}
                    <View style={styles.subscriberDetail}>
                      <Image
                        source={require("../../../assets/images/icons/usernametrip.png")}
                        style={styles.icon}
                        resizeMode="contain"
                      />
                      <Text style={styles.subscriberText}>
                        {item.first_name} {item.last_name}
                      </Text>
                    </View>

                    {/* Age */}
                    <View style={styles.subscriberDetail}>
                      <Image
                        source={require("../../../assets/images/icons/datecalender.png")}
                        style={styles.icon}
                        resizeMode="contain"
                      />
                      <Text style={styles.subscriberText}>
                        {item.age} years old
                      </Text>
                    </View>

                    {/* Phone Number */}
                    <View style={styles.subscriberDetail}>
                      <Image
                        source={require("../../../assets/images/icons/telephone.png")}
                        style={styles.icon}
                        resizeMode="contain"
                      />
                      <Text style={styles.subscriberText}>
                        {item.phone_number}
                      </Text>
                    </View>

                    {/* Buttons for Edit and Delete */}
                    <View style={styles.buttonGroup}>
                      <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => handleEditSubscriber(item)}
                      >
                        <Text style={styles.buttonText}>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() =>
                          handleDeleteSubscriber(item.phone_number)
                        }
                      >
                        <Text style={styles.buttonText}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default GuideTripJoin;

const styles = StyleSheet.create({
  container: {
    marginTop: hp("2%"),
  },
  bottomSection: {
    flexDirection: "row",
    paddingVertical: wp(3),
    justifyContent: "center",
  },
  joinButton: {
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: COLORS.lightGrey,
    padding: hp("2%"),
    borderRadius: wp("4%"),
    alignItems: "center",
    justifyContent: "center",
    marginRight: wp(2),
    width: wp("70%"),
  },
  joinButtonText: {
    fontSize: wp("4.5%"),
    color: COLORS.black,
    fontWeight: "Medium",
  },
  directionButton: {
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: COLORS.lightGrey,
    padding: hp("2%"),
    borderRadius: wp("4%"),
    alignItems: "center",
    justifyContent: "center",
  },
  directionButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: wp("7%"),
    height: wp("7%"),
    tintColor: COLORS.black,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: wp("80%"),
    padding: wp("5%"),
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small,
    position: "relative", // For positioning the close button
  },
  modalTitle: {
    fontSize: TEXT.large,
    fontWeight: "bold",
    marginBottom: hp("2%"),
  },
  subscriberItem: {
    padding: wp("3%"),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  buttonGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp("1%"),
  },

  editButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: hp("1%"),
    paddingHorizontal: wp("4%"),
    borderRadius: SIZES.small,
    marginRight: wp("2%"), // Space between buttons
  },

  deleteButton: {
    backgroundColor: COLORS.red,
    paddingVertical: hp("1%"),
    paddingHorizontal: wp("2%"),
    borderRadius: SIZES.small,
    marginRight: wp("42%"),
  },
  buttonText: {
    color: COLORS.white,
    fontFamily:"Bold"
  },
  closeButton: {
    position: "absolute",
    top: wp("2%"),
    right: wp("2%"),
    padding: wp("2%"),
    zIndex: 1,
  },
  closeIcon: {
    width: wp("5%"),
    height: wp("5%"),
    tintColor: COLORS.black,
  },
  subscriberDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("1%"),
  },
  subscriberText: {
    fontSize: wp("4%"),
    color: COLORS.black,
    marginLeft: wp("2%"),
  },
  icon: {
    width: wp("5%"),
    height: wp("5%"),
    tintColor: COLORS.black,
  },
  subscriberItem: {
    padding: wp("4%"),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
    marginBottom: hp("1%"),
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.base,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp("1%"),
  },
});

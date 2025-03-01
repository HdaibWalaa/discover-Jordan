import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Modal } from "react-native";
import styles from "./ActivityCardStyles"; // Import the styles for the card
import { Ionicons } from "@expo/vector-icons"; // Example for an icon library

const ActivityCard = ({
  activity,
  showConnector,
  isLastCard,
  onEditActivity, // New prop for handling edit action
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const formatTime = (time) => {
    const [hour, minute] = time.split(":");
    let hourInt = parseInt(hour, 10);

    const period = hourInt >= 12 ? "pm" : "am";

    hourInt = hourInt % 12 || 12;
    return `${hourInt}:${minute}${period}`;
  };

  return (
    <>
      <View
        style={isLastCard ? styles.lastCardContainer : styles.cardContainer}
      >
        <View style={styles.timelineContainer}>
          <View style={styles.timelineBackground} />
          <Ionicons
            name="walk"
            size={24}
            color="black"
            style={styles.timelineIcon}
          />
          {showConnector && (
            <>
              <View style={styles.timelineConnector}></View>
              <View style={styles.dot}></View>
            </>
          )}
        </View>
        <View style={styles.cardContent}>
          <Image
            source={{ uri: activity.image }}
            style={styles.activityImage}
          />
          <View style={styles.activityDetails}>
            <Text style={styles.activityTitle}>{activity.name}</Text>
            <Text style={styles.activityLocation}>
              <Ionicons name="location-outline" size={14} color="black" />
              {activity.place}
            </Text>
            <Text style={styles.activityTime}>
              <Ionicons name="time-outline" size={14} color="black" />{" "}
              {`${formatTime(activity.start_time)} - ${formatTime(
                activity.end_time
              )}`}
            </Text>
          </View>
          <View style={styles.activityButtons}>

            {/* View details button */}
            <TouchableOpacity
              style={styles.activityButton}
              onPress={() => setModalVisible(true)}
            >
              <Ionicons name="open-outline" size={22} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Modal for displaying the note */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{activity.name}</Text>
            <Text style={styles.modalText}>
              {activity.note || "No additional information available."}
            </Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ActivityCard;

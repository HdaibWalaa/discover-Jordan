import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS, TEXT, SIZES } from "../../constants/theme";
import SelectPlace from "../../components/trip/SelectPlace";

const ActivityModal = ({
  visible,
  onClose,
  newActivity,
  setNewActivity,
  onSave,
}) => {
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [selectedPlaceName, setSelectedPlaceName] = useState("");

  const handleActivityChange = (field, value) => {
    let formattedValue = value;

    if (field === "start_time" || field === "end_time") {
      const timeParts = formattedValue.match(/(\d+):(\d+)\s*(AM|PM)?/i);
      if (timeParts) {
        let [, hours, minutes, period] = timeParts;
        hours = parseInt(hours, 10);
        minutes = minutes.padStart(2, "0");

        if (period) {
          period = period.toUpperCase();
          if (period === "PM" && hours < 12) hours += 12;
          if (period === "AM" && hours === 12) hours = 0;
        }
        formattedValue = `${hours.toString().padStart(2, "0")}:${minutes}`;
      }
    }

    setNewActivity({ ...newActivity, [field]: formattedValue });
  };

  const formatTimeDisplay = (time) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const parsedHours = parseInt(hours, 10);
    const period = parsedHours >= 12 ? "PM" : "AM";
    const displayHours = parsedHours % 12 || 12;
    return `${displayHours}:${minutes} ${period}`;
  };

  const handleTimeChange = (event, selectedDate, timeType) => {
    // Always close the picker after selection or dismissal
    if (timeType === "start") {
      setShowStartTimePicker(false);
    } else {
      setShowEndTimePicker(false);
    }

    if (event.type === "dismissed") {
      return;
    }

    if (selectedDate) {
      const hours = selectedDate.getHours().toString().padStart(2, "0");
      const minutes = selectedDate.getMinutes().toString().padStart(2, "0");
      const timeString = `${hours}:${minutes}`;

      if (timeType === "start") {
        setNewActivity({ ...newActivity, start_time: timeString });
      } else {
        setNewActivity({ ...newActivity, end_time: timeString });
      }
    }
  };

  const getTimeDate = (timeString) => {
    const date = new Date();
    if (timeString) {
      const [hours, minutes] = timeString.split(":");
      date.setHours(parseInt(hours, 10));
      date.setMinutes(parseInt(minutes, 10));
    }
    return date;
  };

  // Handle place selection from SelectPlace component
  const handlePlaceSelection = (placeId) => {
    setNewActivity({ ...newActivity, place_id: placeId.toString() });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add New Activity</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={COLORS.black} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Activity Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter activity name"
                value={newActivity.name}
                onChangeText={(text) => handleActivityChange("name", text)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Start Time</Text>
              <TouchableOpacity
                style={styles.timeSelector}
                onPress={() => setShowStartTimePicker(true)}
              >
                <Text style={styles.timeSelectorText}>
                  {newActivity.start_time
                    ? formatTimeDisplay(newActivity.start_time)
                    : "Select Start Time"}
                </Text>
                <Ionicons
                  name="time-outline"
                  size={24}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
              {showStartTimePicker && (
                <DateTimePicker
                  value={getTimeDate(newActivity.start_time)}
                  mode="time"
                  is24Hour={false}
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={(event, selectedDate) =>
                    handleTimeChange(event, selectedDate, "start")
                  }
                  style={{ width: Platform.OS === "ios" ? "100%" : "auto" }}
                />
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>End Time</Text>
              <TouchableOpacity
                style={styles.timeSelector}
                onPress={() => setShowEndTimePicker(true)}
              >
                <Text style={styles.timeSelectorText}>
                  {newActivity.end_time
                    ? formatTimeDisplay(newActivity.end_time)
                    : "Select End Time"}
                </Text>
                <Ionicons
                  name="time-outline"
                  size={24}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
              {showEndTimePicker && (
                <DateTimePicker
                  value={getTimeDate(newActivity.end_time)}
                  mode="time"
                  is24Hour={false}
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={(event, selectedDate) =>
                    handleTimeChange(event, selectedDate, "end")
                  }
                  style={{ width: Platform.OS === "ios" ? "100%" : "auto" }}
                />
              )}
            </View>

            {/* Replace the Location ID input with SelectPlace component */}
            <View style={styles.inputGroup}>
              <SelectPlace
                label="place"
                iconSource={require("../../assets/images/icons/place.png")}
                iconSource2={require("../../assets/images/icons/Iconly.png")}
                onValueChange={handlePlaceSelection}
                value={newActivity.place_id}
                placeName={selectedPlaceName}
                width={wp(80)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Note</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Add a note for this activity"
                value={newActivity.note}
                onChangeText={(text) => handleActivityChange("note", text)}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.saveButton,
                  !newActivity.name ||
                  !newActivity.start_time ||
                  !newActivity.end_time
                    ? styles.disabledButton
                    : {},
                ]}
                onPress={onSave}
                disabled={
                  !newActivity.name ||
                  !newActivity.start_time ||
                  !newActivity.end_time
                }
              >
                <Text style={styles.saveButtonText}>Add Activity</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
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
    maxHeight: "80%",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.black,
  },
  closeButton: {
    padding: 5,
  },
  scrollContainer: {
    padding: 15,
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "500",
    color: COLORS.black,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
  },
  timeDisplay: {
    marginTop: 5,
    color: COLORS.gray,
    fontSize: 14,
  },
  timeSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 12,
    backgroundColor: "#f9f9f9",
  },
  timeSelectorText: {
    fontSize: 16,
    color: COLORS.black,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 10,
  },
  cancelButton: {
    flex: 1,
    padding: 15,
    marginRight: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    alignItems: "center",
  },
  saveButton: {
    flex: 1,
    padding: 15,
    marginLeft: 5,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.6,
  },
  cancelButtonText: {
    color: COLORS.black,
    fontWeight: "500",
  },
  saveButtonText: {
    color: COLORS.black,
    fontWeight: "500",
  },
});

export default ActivityModal;

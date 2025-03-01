import React, { useState } from "react";
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS, TEXT } from "../../constants/theme";
import SelectPlace from "../../components/trip/SelectPlace";

const DirectEditModal = ({
  visible,
  onClose,
  activity,
  setActivity,
  onUpdate,
}) => {
  // Time picker states
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  // Format time for display (HH:MM to H:MM AM/PM)
  const formatTimeDisplay = (time) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const parsedHours = parseInt(hours, 10);
    const period = parsedHours >= 12 ? "PM" : "AM";
    const displayHours = parsedHours % 12 || 12;
    return `${displayHours}:${minutes} ${period}`;
  };

  // Get Date object from time string for DateTimePicker
  const getTimeDate = (timeString) => {
    const date = new Date();
    if (timeString) {
      const [hours, minutes] = timeString.split(":");
      date.setHours(parseInt(hours, 10));
      date.setMinutes(parseInt(minutes, 10));
    }
    return date;
  };

  // Handle time selection
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

    if (selectedDate && activity) {
      const hours = selectedDate.getHours().toString().padStart(2, "0");
      const minutes = selectedDate.getMinutes().toString().padStart(2, "0");
      const timeString = `${hours}:${minutes}`;

      if (timeType === "start") {
        setActivity({ ...activity, start_time: timeString });
      } else {
        setActivity({ ...activity, end_time: timeString });
      }
    }
  };

  // Handle place selection from SelectPlace component
  const handlePlaceSelection = (placeId) => {
    if (activity) {
      setActivity({
        ...activity,
        place_id: placeId.toString(),
      });
    }
  };

  if (!activity) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.centeredView}
      >
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Edit Activity</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Activity Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter activity name"
                value={activity.name}
                onChangeText={(text) =>
                  setActivity({
                    ...activity,
                    name: text,
                  })
                }
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Start Time</Text>
              <TouchableOpacity
                style={styles.timeSelector}
                onPress={() => setShowStartTimePicker(true)}
              >
                <Text style={styles.timeSelectorText}>
                  {activity.start_time
                    ? formatTimeDisplay(activity.start_time)
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
                  value={getTimeDate(activity.start_time)}
                  mode="time"
                  is24Hour={false}
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={(event, selectedDate) =>
                    handleTimeChange(event, selectedDate, "start")
                  }
                  style={{
                    width: Platform.OS === "ios" ? "100%" : "auto",
                  }}
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
                  {activity.end_time
                    ? formatTimeDisplay(activity.end_time)
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
                  value={getTimeDate(activity.end_time)}
                  mode="time"
                  is24Hour={false}
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={(event, selectedDate) =>
                    handleTimeChange(event, selectedDate, "end")
                  }
                  style={{
                    width: Platform.OS === "ios" ? "100%" : "auto",
                  }}
                />
              )}
            </View>

            {/* Place Selection Component */}
            <View style={styles.inputGroup}>
              <SelectPlace
                label="place"
                iconSource={require("../../assets/images/icons/place.png")}
                iconSource2={require("../../assets/images/icons/Iconly.png")}
                onValueChange={handlePlaceSelection}
                value={activity.place_id}
                placeName={activity.place}
                width={wp(75)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Notes</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Add a note for this activity"
                value={activity.note}
                onChangeText={(text) =>
                  setActivity({
                    ...activity,
                    note: text,
                  })
                }
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveButton} onPress={onUpdate}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "Bold",
    color: COLORS.black,
  },
  closeButton: {
    padding: 5,
  },
  formContainer: {
    marginTop: 10,
    width: "100%",
  },
  inputLabel: {
    fontFamily: "Medium",
    fontSize: 16,
    color: COLORS.black,
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
    fontFamily: "Regular",
    fontSize: 16,
    marginBottom: 10,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray,
    backgroundColor: "white",
  },
  cancelButtonText: {
    fontFamily: "Medium",
    fontSize: 16,
    color: COLORS.black,
  },
  saveButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
  },
  saveButtonText: {
    fontFamily: "Medium",
    fontSize: 16,
    color: "white",
  },
  inputGroup: {
    marginBottom: 15,
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
});

export default DirectEditModal;

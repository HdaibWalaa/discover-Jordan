import React, { useState, useEffect } from "react";
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS, TEXT } from "../../constants/theme";
import SelectPlace from "../../components/trip/SelectPlace";

const EditPlanModal = ({
  visible,
  onClose,
  editablePlan,
  editingDay,
  setEditingDay,
  selectedActivity,
  setSelectedActivity,
  expandedActivityIndex,
  setExpandedActivityIndex,
  handleActivityItemPress,
  updateActivity,
  handleUpdatePlan,
  isUpdating,
}) => {
  // Time picker states
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  // Create local state to track edits
  const [localPlan, setLocalPlan] = useState(null);

  // Update local state when editablePlan changes
  useEffect(() => {
    if (editablePlan) {
      setLocalPlan(JSON.parse(JSON.stringify(editablePlan)));
    }
  }, [editablePlan]);

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

    if (selectedDate && selectedActivity) {
      const hours = selectedDate.getHours().toString().padStart(2, "0");
      const minutes = selectedDate.getMinutes().toString().padStart(2, "0");
      const timeString = `${hours}:${minutes}`;

      if (timeType === "start") {
        setSelectedActivity({ ...selectedActivity, start_time: timeString });
      } else {
        setSelectedActivity({ ...selectedActivity, end_time: timeString });
      }
    }
  };

  // Handle place selection from SelectPlace component
  const handlePlaceSelection = (placeId) => {
    if (selectedActivity) {
      setSelectedActivity({
        ...selectedActivity,
        place_id: placeId.toString(),
      });
    }
  };

  // Handle saving changes to the parent component
  const saveChanges = () => {
    // Update the parent's editablePlan with our local changes
    if (localPlan) {
      // Make a deep copy to ensure we're not directly modifying props
      const updatedPlan = JSON.parse(JSON.stringify(localPlan));

      // Call the parent component's update function
      handleUpdatePlan(updatedPlan);
    }
  };

  if (!localPlan) return null;

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
            <Text style={styles.modalTitle}>Edit Plan</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.formContainer}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.inputLabel}>Plan Name</Text>
            <TextInput
              style={styles.input}
              value={localPlan.name}
              onChangeText={(text) =>
                setLocalPlan({ ...localPlan, name: text })
              }
              placeholder="Plan Name"
            />

            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={localPlan.description}
              onChangeText={(text) =>
                setLocalPlan({ ...localPlan, description: text })
              }
              placeholder="Description"
              multiline
              numberOfLines={4}
            />

            <Text style={styles.sectionTitle}>
              Day {localPlan.days[editingDay].day_number} Activities
            </Text>

            {localPlan.days[editingDay].activities.map((activity, index) => (
              <View key={index} style={styles.activityEditContainer}>
                {/* Activity Header - Always visible */}
                <TouchableOpacity
                  style={styles.activityItem}
                  onPress={() => handleActivityItemPress(activity, index)}
                >
                  <View style={styles.activityItemContent}>
                    <Text style={styles.activityName}>{activity.name}</Text>
                    <Text style={styles.activityTime}>
                      {activity.start_time} - {activity.end_time}
                    </Text>
                  </View>
                  <Ionicons
                    name={
                      expandedActivityIndex === index
                        ? "chevron-down"
                        : "chevron-forward"
                    }
                    size={20}
                    color={COLORS.gray}
                  />
                </TouchableOpacity>

                {/* Collapsible Activity Edit Form */}
                {expandedActivityIndex === index && selectedActivity && (
                  <View style={styles.activityEditForm}>
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Activity Name</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter activity name"
                        value={selectedActivity.name}
                        onChangeText={(text) =>
                          setSelectedActivity({
                            ...selectedActivity,
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
                          {selectedActivity.start_time
                            ? formatTimeDisplay(selectedActivity.start_time)
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
                          value={getTimeDate(selectedActivity.start_time)}
                          mode="time"
                          is24Hour={false}
                          display={
                            Platform.OS === "ios" ? "spinner" : "default"
                          }
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
                          {selectedActivity.end_time
                            ? formatTimeDisplay(selectedActivity.end_time)
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
                          value={getTimeDate(selectedActivity.end_time)}
                          mode="time"
                          is24Hour={false}
                          display={
                            Platform.OS === "ios" ? "spinner" : "default"
                          }
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
                        value={selectedActivity.place_id}
                        placeName={selectedActivity.place}
                        width={wp(75)}
                      />
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Notes</Text>
                      <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Add a note for this activity"
                        value={selectedActivity.note}
                        onChangeText={(text) =>
                          setSelectedActivity({
                            ...selectedActivity,
                            note: text,
                          })
                        }
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                      />
                    </View>

                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={styles.saveButton}
                        onPress={() => {
                          updateActivity();

                          // Also update the local plan state with this activity
                          const updatedActivities = [
                            ...localPlan.days[editingDay].activities,
                          ];
                          updatedActivities[selectedActivity.index] = {
                            name: selectedActivity.name,
                            start_time: selectedActivity.start_time,
                            end_time: selectedActivity.end_time,
                            place_id: selectedActivity.place_id || "1",
                            note: selectedActivity.note || "",
                            image: selectedActivity.image || "",
                            place: selectedActivity.place,
                          };

                          const updatedDays = [...localPlan.days];
                          updatedDays[editingDay] = {
                            ...updatedDays[editingDay],
                            activities: updatedActivities,
                          };

                          setLocalPlan({
                            ...localPlan,
                            days: updatedDays,
                          });
                        }}
                      >
                        <Text style={styles.saveButtonText}>Save Activity</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            ))}

            {localPlan.days.length > 1 && (
              <View style={styles.daySelector}>
                <Text style={styles.inputLabel}>Select Day:</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {localPlan.days.map((day, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.dayButton,
                        editingDay === index && styles.activeDayButton,
                      ]}
                      onPress={() => {
                        setEditingDay(index);
                        setExpandedActivityIndex(null); // Reset expanded activity when changing day
                      }}
                    >
                      <Text
                        style={[
                          styles.dayButtonText,
                          editingDay === index && styles.activeDayButtonText,
                        ]}
                      >
                        Day {day.day_number}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={saveChanges}
                disabled={isUpdating}
              >
                <Text style={styles.saveButtonText}>
                  {isUpdating ? "Updating..." : "Save Changes"}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
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
  sectionTitle: {
    fontFamily: "Bold",
    fontSize: 18,
    color: COLORS.black,
    marginTop: 20,
    marginBottom: 10,
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
  activityEditContainer: {
    marginBottom: 10,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  activityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f9f9f9",
  },
  activityItemContent: {
    flex: 1,
  },
  activityName: {
    fontFamily: "Bold",
    fontSize: 16,
    color: COLORS.black,
  },
  activityTime: {
    fontFamily: "Regular",
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 4,
  },
  activityEditForm: {
    padding: 15,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  daySelector: {
    marginTop: 20,
  },
  dayButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    marginRight: 10,
  },
  activeDayButton: {
    backgroundColor: COLORS.primary,
  },
  dayButtonText: {
    fontFamily: "Medium",
    fontSize: 14,
    color: COLORS.black,
  },
  activeDayButtonText: {
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

export default EditPlanModal;

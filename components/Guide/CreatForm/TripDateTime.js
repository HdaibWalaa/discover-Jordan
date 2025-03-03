import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

const TripDateTime = ({ label, onDateChange, warningActive = false }) => {
  // Separate state for date and time
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Update parent component when either date or time changes
  useEffect(() => {
    // Combine date and time into a single date object
    const combinedDateTime = new Date(selectedDate);
    combinedDateTime.setHours(
      selectedTime.getHours(),
      selectedTime.getMinutes(),
      0
    );

    // Format and send to parent
    const formattedDateTime = formatDateTime(combinedDateTime);
    onDateChange(formattedDateTime);
  }, [selectedDate, selectedTime]);

  // Function to format the date as "YYYY-MM-DD HH:mm:ss"
  const formatDateTime = (date) => {
    const pad = (num) => (num < 10 ? `0${num}` : num);
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate()
    )} ${pad(date.getHours())}:${pad(date.getMinutes())}:00`;
  };

  // Format date for display (user-friendly)
  const formatDisplayDate = (date) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  // Format time for display
  const formatDisplayTime = (time) => {
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return time.toLocaleTimeString(undefined, options);
  };

  // Handle date change from picker
  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  // Handle time change from picker
  const handleTimeChange = (event, time) => {
    setShowTimePicker(false);
    if (time) {
      setSelectedTime(time);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        {warningActive && (
          <View style={styles.warningBadge}>
            <Ionicons name="alert-circle" size={16} color="#ff6b00" />
            <Text style={styles.warningText}>Conflict</Text>
          </View>
        )}
      </View>

      <View style={styles.dateTimeContainer}>
        {/* Date Selector */}
        <TouchableOpacity
          style={[styles.dateButton, warningActive && styles.warningButton]}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateText}>{formatDisplayDate(selectedDate)}</Text>
          <Ionicons
            name="calendar-outline"
            size={20}
            color={warningActive ? "#ff6b00" : "#666"}
          />
        </TouchableOpacity>

        {/* Time Selector */}
        <TouchableOpacity
          style={[styles.timeButton, warningActive && styles.warningButton]}
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={styles.dateText}>{formatDisplayTime(selectedTime)}</Text>
          <Ionicons
            name="time-outline"
            size={20}
            color={warningActive ? "#ff6b00" : "#666"}
          />
        </TouchableOpacity>
      </View>

      {/* Combined display for clarity */}
      <Text style={[styles.combinedText, warningActive && styles.warningText]}>
        Combined:{" "}
        {formatDateTime(
          new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate(),
            selectedTime.getHours(),
            selectedTime.getMinutes()
          )
        )}
      </Text>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}

      {/* Time Picker Modal */}
      {showTimePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
};

export default TripDateTime;

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  warningBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff3e0",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 8,
  },
  warningText: {
    color: "#ff6b00",
    fontSize: 12,
    marginLeft: 4,
    fontWeight: "500",
  },
  dateTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateButton: {
    flex: 3,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    marginRight: 8,
  },
  timeButton: {
    flex: 2,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  warningButton: {
    borderColor: "#ffcc80",
    backgroundColor: "#fff8e1",
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  combinedText: {
    fontSize: 12,
    color: "#666",
    marginTop: 6,
    fontStyle: "italic",
  },
});

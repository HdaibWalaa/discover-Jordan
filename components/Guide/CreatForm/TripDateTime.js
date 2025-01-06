import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const TripDateTime = ({ label, onDateChange }) => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  // Function to format the date as "YYYY-MM-DD HH:mm:ss"
  const formatDate = (date) => {
    const pad = (num) => (num < 10 ? `0${num}` : num);
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate()
    )} ${pad(date.getHours())}:${pad(date.getMinutes())}:00`;
  };

  // Handle date change from picker
  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
      setShowPicker(false);
      const formattedDate = formatDate(selectedDate);
      onDateChange(formattedDate); // Pass formatted date to parent
    } else {
      setShowPicker(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowPicker(true)}
      >
        <Text style={styles.dateText}>{formatDate(date)}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="datetime"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

export default TripDateTime;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
});

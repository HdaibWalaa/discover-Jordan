import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { COLORS } from "../../../constants/theme";

const DateSelector = ({ dates, onSelectDate }) => {
  const today = new Date().toISOString().split("T")[0]; // Get today's date in 'YYYY-MM-DD' format
  const defaultDate = dates.includes(today) ? today : dates[dates.length - 1]; // Default to today if available, else the most recent date

  const [selectedDate, setSelectedDate] = useState(defaultDate);

  useEffect(() => {
    onSelectDate(selectedDate); // Trigger the onSelectDate callback when the component mounts
  }, [selectedDate, onSelectDate]);

  const handleDatePress = (date) => {
    setSelectedDate(date);
    onSelectDate(date);
  };

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={dates.sort((a, b) => new Date(a) - new Date(b))} // Sort dates from past to future
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleDatePress(item)}>
          <View
            style={[
              styles.dateContainer,
              item === selectedDate ? styles.selectedDate : null,
            ]}
          >
            <Text
              style={[
                styles.dateText,
                item === selectedDate ? styles.selectedDateText : null,
              ]}
            >
              {new Date(item).getDate()}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.dateSelectorContainer}
    />
  );
};

const styles = StyleSheet.create({
  dateSelectorContainer: {
    alignItems: "center",
  },
  dateContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedDate: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  dateText: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: "bold",
  },
  selectedDateText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DateSelector;

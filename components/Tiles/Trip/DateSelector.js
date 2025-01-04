import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { COLORS, TEXT } from "../../../constants/theme";
import { AntDesign } from "@expo/vector-icons";

const DateSelector = ({
  selectedMonth = new Date(), // Default value
  selectedDate = "",
  onChangeMonth,
  onSelectDate,
}) => {
  const daysInMonth = new Date(
    selectedMonth.getFullYear(),
    selectedMonth.getMonth() + 1,
    0
  ).getDate();

  const handlePrevMonth = () => {
    const prevMonth = new Date(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth() - 1,
      1
    );
    onChangeMonth(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth() + 1,
      1
    );
    onChangeMonth(nextMonth);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevMonth}>
          <AntDesign name="left" size={20} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.monthText}>
          {selectedMonth.toLocaleString("default", { month: "long" })}{" "}
          {selectedMonth.getFullYear()}
        </Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <AntDesign name="right" size={20} color={COLORS.black} />
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const dateStr = `${selectedMonth.getFullYear()}-${(
            selectedMonth.getMonth() + 1
          )
            .toString()
            .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

          const isSelected = selectedDate === dateStr;

          return (
            <TouchableOpacity
              key={day}
              style={[
                styles.day,
                isSelected && styles.selectedDay, // Apply selected style if the day matches selectedDate
              ]}
              onPress={() => onSelectDate(dateStr)}
            >
              <Text
                style={[styles.dayText, isSelected && styles.selectedDayText]}
              >
                {day}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default DateSelector;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  monthText: {
    fontSize: TEXT.large,
    fontWeight: "bold",
    color: COLORS.black,
  },
  day: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: COLORS.lightGray,
  },
  selectedDay: {
    backgroundColor: COLORS.primary,
    borderRadius: 50, // Make it circular
  },
  dayText: {
    fontSize: TEXT.medium,
    color: COLORS.black,
  },
  selectedDayText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
});

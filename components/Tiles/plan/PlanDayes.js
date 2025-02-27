import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../../components/Plan/PlanDetailsStyles"; 

const PlanDays = ({ days, selectedDay, onDayPress }) => {
  return (
    <View style={styles.daysTabsContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.dayTabsScrollContainer}
      >
        {days.map((day, index) => (
          <TouchableOpacity
            key={index}
            style={styles.dayTab}
            onPress={() => onDayPress(index)}
          >
            <Text
              style={
                index === selectedDay
                  ? styles.dayTabTextActive
                  : styles.dayTabText
              }
            >
              Day {day.day_number}
            </Text>
            {index === selectedDay && <View style={styles.dayTabIndicator} />}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.dayTabsArrow}>
        <Ionicons name="chevron-forward" size={24} color="black" />
      </View>
    </View>
  );
};

export default PlanDays;

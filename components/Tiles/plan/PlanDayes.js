import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "../../Plan/PlanDetailsStyles";
import { Ionicons } from "@expo/vector-icons";

const PlanDays = ({ days, selectedDay, onDayPress }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {days.map((day, index) => (
        <TouchableOpacity
          key={index}
          style={styles.dayTabContainer}
          onPress={() => onDayPress(index)}
        >
          <Text
            style={index === selectedDay ? styles.dayTabActive : styles.dayTab}
          >
            Day {day.day_number}
          </Text>
          {index === selectedDay && (
            <View style={styles.activeIndicator}></View>
          )}
        </TouchableOpacity>
      ))}
      <View style={styles.iconWrapper}>
        <Ionicons name="chevron-forward" size={24} color="black" />
      </View>
    </ScrollView>
  );
};

export default PlanDays;

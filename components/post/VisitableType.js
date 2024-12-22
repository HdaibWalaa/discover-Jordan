import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "./post.style"; // Ensure this path is correct

const VisitableType = ({ visitableType, setVisitableType }) => {
  return (
    <View style={styles.optionsContainer}>
      <View style={styles.row}>
        {["Trip", "Place", "Plan"].map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => setVisitableType(type)}
            style={[
              styles.optionButton,
              visitableType === type && styles.selectedOption,
            ]}
          >
            <Text
              style={[
                styles.optionText,
                visitableType === type && styles.selectedOptionText,
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.row}>
        {["Event", "Volunteering"].map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => setVisitableType(type)}
            style={[
              styles.optionButton,
              visitableType === type && styles.selectedOption,
            ]}
          >
            <Text
              style={[
                styles.optionText,
                visitableType === type && styles.selectedOptionText,
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default VisitableType;

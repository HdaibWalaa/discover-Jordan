import React, { useState } from "react";
import { TouchableOpacity, Image, StyleSheet, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SIZES } from "../../constants/theme";

const DateBicker = ({ onDateSelected }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const selectedDate = date.toISOString().split("T")[0]; // Format date as "YYYY-MM-DD"
    onDateSelected(selectedDate); // Trigger the parent function to fetch events with the selected date
    hideDatePicker();
  };

  return (
    <View>
      <TouchableOpacity onPress={showDatePicker}>
        <Image
          source={require("../../assets/images/icons/datecalender.png")}
          style={styles.image}
        />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default DateBicker;

const styles = StyleSheet.create({
  image: {
    width: SIZES.xLarge,
    height: SIZES.xLarge,
  },
});

import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import ReusableText from "../Reusable/ReusableText";
import { SIZES } from "../../constants/theme";
import AwesomeAlert from "react-native-awesome-alerts";

export const getPlaceStatus = (openingHours) => {
  const now = new Date();
  const currentDay = now.toLocaleString("en-US", { weekday: "long" });
  const currentTime = now.toTimeString().slice(0, 8);

  const todayHours = openingHours.find(
    (hours) => hours.day_of_week === currentDay
  );

  if (todayHours) {
    const { opening_time, closing_time } = todayHours;

    // Convert times to minutes for easier comparison
    const [openingHour, openingMinute] = opening_time.split(":").map(Number);
    const [closingHour, closingMinute] = closing_time.split(":").map(Number);
    const [currentHour, currentMinute] = currentTime.split(":").map(Number);

    const openingTimeMinutes = openingHour * 60 + openingMinute;
    let closingTimeMinutes = closingHour * 60 + closingMinute;
    const currentTimeMinutes = currentHour * 60 + currentMinute;

    // If closing time is earlier than opening time, it means it goes past midnight
    if (closingTimeMinutes < openingTimeMinutes) {
      closingTimeMinutes += 24 * 60;
    }

    // Check if current time is within the open hours
    if (
      currentTimeMinutes >= openingTimeMinutes &&
      currentTimeMinutes <= closingTimeMinutes
    ) {
      const remainingMinutes = closingTimeMinutes - currentTimeMinutes;
      const hours = Math.floor(remainingMinutes / 60);
      const minutes = remainingMinutes % 60;
      return { status: "Open", hours, minutes };
    }

    // Time until opening next day
    const timeUntilOpeningMinutes =
      openingTimeMinutes + (24 * 60 - currentTimeMinutes);
    const hoursUntilOpen = Math.floor(timeUntilOpeningMinutes / 60);
    const minutesUntilOpen = timeUntilOpeningMinutes % 60;
    return {
      status: "Closed",
      hours: hoursUntilOpen,
      minutes: minutesUntilOpen,
    };
  }

  return { status: "Closed", hours: 0, minutes: 0 };
};

const PlaceStatus = ({ openingHours }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); // "open" or "closed"

  const { status, hours, minutes } = getPlaceStatus(openingHours);

  const handlePress = () => {
    if (status === "Open") {
      setAlertMessage(
        `The place will close in ${hours} hours and ${minutes} minutes`
      );
      setAlertType("open");
    } else {
      setAlertMessage(
        `The place will open in ${hours} hours and ${minutes} minutes`
      );
      setAlertType("closed");
    }
    setShowAlert(true);
  };

  return (
    <View>
      <TouchableOpacity
        style={[
          styles.container,
          status === "Open" ? styles.open : styles.closed,
        ]}
        onPress={handlePress}
      >
        <ReusableText
          text={status}
          family={"Bold"}
          size={SIZES.Large}
          style={status === "Open" ? styles.openText : styles.closedText}
        />
      </TouchableOpacity>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={alertType === "open" ? "Closing Soon" : "Opening Soon"}
        message={alertMessage}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        cancelText="OK"
        cancelButtonStyle={[
          styles.alertButton,
          { backgroundColor: alertType === "open" ? "#FF4D4D" : "#2DE78D" },
        ]}
        onCancelPressed={() => {
          setShowAlert(false);
        }}
        contentContainerStyle={styles.alertContainer}
        titleStyle={styles.alertTitle}
        messageStyle={styles.alertMessage}
        cancelButtonTextStyle={styles.alertButtonText}
      />
    </View>
  );
};

export default PlaceStatus;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: "center",
    flexDirection: "row",
  },
  open: {
    backgroundColor: "#E0F8E4",
  },
  closed: {
    backgroundColor: "#F8E0E0",
  },
  openText: {
    color: "#2DE78D",
    letterSpacing: 2,
  },
  closedText: {
    color: "#FF4D4D",
    letterSpacing: 1,
  },
  alertContainer: {
    borderRadius: 10,
    padding: 20,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  alertMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  alertButton: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  alertButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { AuthContext } from "../../store/auth-context";
import ActivityCard from "../../components/Tiles/plan/ActivityCard";
import fetchCreatPlan from "../../hook/plane/fetchCreatPlan";
import {
  HeightSpacer,
  ReusableBackground,
  ReusableText,
} from "../../components";
import AwesomeAlert from "react-native-awesome-alerts";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import ActivityModal from "./ActivityModal";

const CreatActivies = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { planName, planDescription } = route.params;
  const [days, setDays] = useState(route.params?.days || [{ activities: [] }]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newActivity, setNewActivity] = useState({
    name: "",
    start_time: "",
    end_time: "",
    place_id: "1", // Default place_id
    note: "",
  });

  // Alert states
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); // success, error, warning
  const [isLoading, setIsLoading] = useState(false);

  // Navigation state
  const [pendingNavigation, setPendingNavigation] = useState(null);

  const { token } = useContext(AuthContext);

  // Handle pending navigation after alert is closed
  useEffect(() => {
    if (pendingNavigation && !showAlert) {
      const { screen, params } = pendingNavigation;

      // Clear pending navigation before navigating to avoid loops
      setPendingNavigation(null);

      // Use setTimeout to ensure this happens after component updates
      setTimeout(() => {
        navigation.navigate(screen, params);
      }, 300);
    }
  }, [pendingNavigation, showAlert, navigation]);

  // Show alert helper function
  const showCustomAlert = (title, message, type, navigationTarget = null) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertType(type);

    if (navigationTarget) {
      setPendingNavigation(navigationTarget);
    }

    setShowAlert(true);
  };

  const handleAddDay = () => {
    setDays([...days, { activities: [] }]);
    setSelectedDay(days.length);
  };

  const handleAddActivity = () => {
    // Validate that required fields are filled
    if (!newActivity.name || !newActivity.start_time || !newActivity.end_time) {
      showCustomAlert(
        "Validation Error",
        "Please fill in all required fields.",
        "error"
      );
      return;
    }

    // Validate time format
    if (!validateTimeOrder(newActivity.start_time, newActivity.end_time)) {
      showCustomAlert(
        "Time Error",
        "End time must be after start time.",
        "error"
      );
      return;
    }

    const newDays = [...days];
    newDays[selectedDay].activities.push({ ...newActivity });
    setDays(newDays);

    // Reset the form
    setNewActivity({
      name: "",
      start_time: "",
      end_time: "",
      place_id: "1",
      note: "",
    });

    setModalVisible(false);
  };

  const validateTimeOrder = (startTime, endTime) => {
    if (!startTime || !endTime) return false;

    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);

    return (
      endHours > startHours ||
      (endHours === startHours && endMinutes > startMinutes)
    );
  };

  const handleSaveAndContinue = async () => {
    // Filter out empty days (days with no activities)
    const nonEmptyDays = days.filter((day) => day.activities.length > 0);

    // Check if there are any activities across all days
    if (nonEmptyDays.length === 0) {
      showCustomAlert(
        "Validation Error",
        "Please add at least one activity.",
        "error"
      );
      return;
    }

    // Prepare plan data with only non-empty days
    const planData = {
      name: planName,
      description: planDescription,
      days: nonEmptyDays.map((day, index) => ({
        day_number: index + 1, // Renumber days sequentially
        activities: day.activities.map((activity) => ({
          ...activity,
          place_id: activity.place_id || "1",
        })),
      })),
    };

    setIsLoading(true);

    try {
      console.log(
        "Sending plan data to API:",
        JSON.stringify(planData, null, 2)
      );

      const response = await fetchCreatPlan(planData, token);

      setIsLoading(false);

      if (response.success) {
        // If we have an ID, prepare to navigate to plan details
        if (response.data?.id) {
          showCustomAlert("Success", "Plan created successfully!", "success", {
            screen: "PlanDetails",
            params: { id: response.data.id },
          });
        } else {
          // If successful but no ID was returned (which is the case from your logs)
          // Prepare to navigate to AllPlans screen
          showCustomAlert(
            "Success",
            response.msg || "Plan created successfully!",
            "success",
            { screen: "AllPlans", params: {} }
          );
        }
      } else {
        // Handle error response
        showCustomAlert(
          "Error",
          response.msg || "Failed to create plan",
          "error"
        );
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to create plan:", error);
      showCustomAlert(
        "Error",
        error.message || "Failed to create plan. Please try again.",
        "error"
      );
    }
  };

  // Detect Arabic text in the alert message
  const isArabicText = (text) => {
    const arabicPattern = /[\u0600-\u06FF]/;
    return arabicPattern.test(text);
  };

  // Get the appropriate text alignment based on the language
  const getTextAlignment = (text) => {
    return isArabicText(text) ? "right" : "left";
  };

  return (
    <ReusableBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <ReusableText
          text={planName.toUpperCase()}
          family="Bold"
          size={TEXT.large}
          color={COLORS.black}
          style={{ marginBottom: 5 }}
        />
        <ReusableText
          text={planDescription}
          family="Regular"
          size={TEXT.medium}
          color={COLORS.gray}
          style={{ marginBottom: 20 }}
        />
        <View style={styles.daysHeader}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.daysList}
          >
            {days.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dayTab,
                  selectedDay === index && styles.activeDayTab,
                ]}
                onPress={() => setSelectedDay(index)}
              >
                <ReusableText
                  text={`Day ${index + 1}`}
                  family="Medium"
                  size={TEXT.medium}
                  color={selectedDay === index ? COLORS.primary : COLORS.gray}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Activities Container */}
        <View style={styles.activitiesSection}>
          {days[selectedDay].activities.map((activity, activityIndex) => (
            <ActivityCard key={activityIndex} activity={activity} />
          ))}

          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.addActivityButton}
          >
            <ReusableText
              text="+ Add New Activity"
              family="Medium"
              size={TEXT.medium}
              color={COLORS.black}
            />
          </TouchableOpacity>
        </View>

        {/* Add New Day Button */}
        <TouchableOpacity onPress={handleAddDay} style={styles.addNewDayButton}>
          <ReusableText
            text="+ Add New Day"
            family="Medium"
            size={TEXT.medium}
            color={COLORS.black}
          />
        </TouchableOpacity>

        {/* Save Button */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveAndContinue}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={COLORS.black} />
          ) : (
            <ReusableText
              text="SAVE & CONTINUE"
              family="Bold"
              size={TEXT.medium}
              color={COLORS.black}
            />
          )}
        </TouchableOpacity>

        <HeightSpacer height={120} />

        {/* Activity Modal */}
        <ActivityModal
          visible={isModalVisible}
          onClose={() => setModalVisible(false)}
          newActivity={newActivity}
          setNewActivity={setNewActivity}
          onSave={handleAddActivity}
        />

        {/* Awesome Alert */}
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title={alertTitle}
          message={alertMessage}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor={
            alertType === "success"
              ? COLORS.primary
              : alertType === "error"
              ? "#DD6B55"
              : COLORS.primary
          }
          onConfirmPressed={() => {
            setShowAlert(false);
          }}
          contentContainerStyle={styles.alertContainer}
          titleStyle={[
            styles.alertTitle,
            { textAlign: getTextAlignment(alertMessage) },
          ]}
          messageStyle={[
            styles.alertMessage,
            { textAlign: getTextAlignment(alertMessage) },
          ]}
          confirmButtonStyle={styles.alertButton}
          confirmButtonTextStyle={styles.alertButtonText}
        />
      </ScrollView>
    </ReusableBackground>
  );
};

export default CreatActivies;

const styles = StyleSheet.create({
  container: {
    paddingVertical: hp(4),
    paddingHorizontal: wp(5),
  },
  daysHeader: {
    marginBottom: 20,
  },
  daysList: {
    paddingVertical: 5,
  },
  dayTab: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  activeDayTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  activitiesSection: {
    marginBottom: 20,
  },
  addActivityButton: {
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
    borderRadius: 15,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginVertical: 10,
  },
  addNewDayButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  // Alert styles
  alertContainer: {
    borderRadius: 10,
    width: wp(80),
    padding: 10,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.black,
    marginBottom: 10,
  },
  alertMessage: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 10,
  },
  alertButton: {
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  alertButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.white,
  },
});

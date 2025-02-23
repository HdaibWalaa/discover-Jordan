import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { AuthContext } from "../../store/auth-context";
import ActivityCard from "../../components/Tiles/plan/ActivityCard";
import fetchCreatPlan from "../../hook/plane/fetchCreatPlan";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  HeightSpacer,
  ReusableBackground,
  ReusableText,
} from "../../components";
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
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [newActivity, setNewActivity] = useState({
    name: "",
    start_time: "",
    end_time: "",
    place_id: "",
    note: "",
  });
  const formatTimeDisplay = (time) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const parsedHours = parseInt(hours, 10);
    const period = parsedHours >= 12 ? "PM" : "AM";
    const displayHours = parsedHours % 12 || 12;
    return `${displayHours}:${minutes} ${period}`;
  };

  const getTimeDate = (timeString) => {
    const date = new Date();
    if (timeString) {
      const [hours, minutes] = timeString.split(":");
      date.setHours(parseInt(hours, 10));
      date.setMinutes(parseInt(minutes, 10));
    }
    return date;
  };

  const { token } = useContext(AuthContext);

  const handleAddDay = () => {
    setDays([...days, { activities: [] }]);
    setSelectedDay(days.length);
  };

  const handleAddActivity = () => {
    if (!validateTimeOrder(newActivity.start_time, newActivity.end_time)) {
      alert("End time must be after start time.");
      return;
    }

    const newDays = [...days];
    newDays[selectedDay].activities.push(newActivity);
    setDays(newDays);
    setNewActivity({
      name: "",
      start_time: "",
      end_time: "",
      place_id: "",
      note: "",
    });
    setModalVisible(false);
  };

  const handleActivityChange = (field, value) => {
    let formattedValue = value;

    if (field === "start_time" || field === "end_time") {
      const timeParts = formattedValue.match(/(\d+):(\d+)\s*(AM|PM)?/i);
      if (timeParts) {
        let [, hours, minutes, period] = timeParts;
        hours = parseInt(hours, 10);
        minutes = minutes.padStart(2, "0");

        if (period) {
          period = period.toUpperCase();
          if (period === "PM" && hours < 12) hours += 12;
          if (period === "AM" && hours === 12) hours = 0;
        }
        formattedValue = `${hours.toString().padStart(2, "0")}:${minutes}`;
      }
    }

    setNewActivity({ ...newActivity, [field]: formattedValue });
  };

  const validateTimeOrder = (startTime, endTime) => {
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);
    return (
      endHours > startHours ||
      (endHours === startHours && endMinutes > startMinutes)
    );
  };

  const handleSaveAndContinue = async () => {
    const planData = {
      name: planName,
      description: planDescription,
      days: days.map((day, index) => ({
        day_number: index + 1,
        activities: day.activities.map((activity) => ({
          ...activity,
          start_time: activity.start_time.padStart(5, "0"), // Ensure leading zeros
          end_time: activity.end_time.padStart(5, "0"), // Ensure leading zeros
          place_id: Number(activity.place_id) || null,
        })),
      })),
    };

    try {
      console.log(
        "Sending plan data to API:",
        JSON.stringify(planData, null, 2)
      );

      const response = await fetchCreatPlan(planData, token);

      if (response.data?.id) {
        navigation.navigate("PlanDetails", { id: response.data.id });
      } else {
        alert(
          response.msg || "Plan created successfully, but no ID was returned."
        );
        navigation.navigate("AllPlans");
      }
    } catch (error) {
      console.error("Failed to create plan:", error);
      alert(error.message); // This will show the formatted error messages
    }
  };
  return (
    <ReusableBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <ReusableText
          text={planName.toUpperCase()}
          family="Medium"
          size={TEXT.medium}
          color={COLORS.black}
          style={{ letterSpacing: 1, marginBottom: 5 }}
        />
        <ReusableText
          text={planDescription}
          family="Light"
          size={TEXT.xmedium}
          color={COLORS.lightGreen}
          style={{ textAlign: "justify" }}
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
        <View style={styles.activitiesContainer}>
          {days[selectedDay].activities.map((activity, activityIndex) => (
            <ActivityCard key={activityIndex} activity={activity} />
          ))}
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.activityButton}
          >
            <ReusableText
              text={"+ Add New Activity"}
              family="Medium"
              size={TEXT.larg}
              color={COLORS.black}
              style={styles.addActivityButton}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.activitiesContainer}>
          <TouchableOpacity onPress={handleAddDay} style={styles.NewDayButton}>
            <ReusableText
              text={"+ Add New Day"}
              family="Medium"
              size={TEXT.larg}
              color={COLORS.black}
              style={styles.addDayButton}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.savePlanButton}
          onPress={handleSaveAndContinue}
        >
          <ReusableText
            text={"Save & Continue".toLocaleUpperCase()}
            family="Medium"
            size={TEXT.medium}
            color={COLORS.black}
            style={styles.savePlanText}
          />
        </TouchableOpacity>
        <HeightSpacer height={250} />

        <ActivityModal
          visible={isModalVisible}
          onClose={() => setModalVisible(false)}
          newActivity={newActivity}
          setNewActivity={setNewActivity}
          onSave={handleAddActivity}
        />
        <HeightSpacer height={20} />

        <HeightSpacer height={120} />
      </ScrollView>
    </ReusableBackground>
  );
};

export default CreatActivies;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: hp(4),
    top: hp(2),
    paddingHorizontal: wp(5),
  },
  daysHeader: {
    marginVertical: 15,
  },
  daysList: {
    paddingHorizontal: 15,
  },
  dayTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
  },
  activeDayTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
    marginBottom: -1,
  },
  inactiveTab: {
    fontFamily: "Medium",
    fontSize: SIZES.large,
    color: COLORS.lightGreen,
    paddingHorizontal: 25,
  },
  activityButton: {
    paddingVertical: hp(1),
    borderRadius: wp(3),
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.lightGrey,
  },
  activitiesContainer: {
    paddingHorizontal: wp(5),
    top: hp(2),
    marginBottom: 20,
  },
  addActivityButton: {
    fontFamily: "Medium",
    fontSize: SIZES.large,
    color: COLORS.dark,
    padding: 10,
  },
  NewDayButton: {
    paddingVertical: hp(1),
    borderRadius: wp(3),
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.lightGrey,
    backgroundColor: COLORS.primary,
  },
  NewDayContainer: {
    paddingHorizontal: wp(5),
  },
  addDayButton: {
    fontFamily: "Medium",
    fontSize: SIZES.large,
    color: COLORS.dark,
    padding: 10,
  },
  continueButton: {
    backgroundColor: "#FCD228",
    paddingVertical: hp(2),
    borderRadius: wp(3),
    alignItems: "center",
    marginBottom: 440,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    top: 100,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
  },
  cancelButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#FF4500",
    padding: hp("2%"),
    borderRadius: wp("3%"),
    width: wp("35%"),
    alignItems: "center",
  },
  addButton: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: SIZES.radius,
    alignItems: "center",
    marginTop: 15,
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: TEXT.medium,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: SIZES.radius,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: TEXT.large,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: SIZES.radius,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: SIZES.radius,
    flex: 1,
    alignItems: "center",
    marginRight: 5,
  },
  cancelButton: {
    backgroundColor: COLORS.red,
    padding: 10,
    borderRadius: SIZES.radius,
    flex: 1,
    alignItems: "center",
    marginLeft: 5,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: TEXT.medium,
  },
  savePlanButton: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: SIZES.radius,
    alignItems: "center",
    marginTop: 15,
  },
  savePlan: {
    color: COLORS.white,
    fontSize: TEXT.large,
    fontWeight: "bold",
  },
});

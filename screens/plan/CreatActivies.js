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
import { HeightSpacer, ReusableBackground, ReusableText } from "../../components";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS, SIZES, TEXT } from "../../constants/theme";

const CreatActivies = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { planName, planDescription } = route.params;
  const [days, setDays] = useState([{ activities: [] }]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newActivity, setNewActivity] = useState({
    name: "",
    start_time: "",
    end_time: "",
    place_id: "",
    note: "",
  });

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
    let formattedValue = value.trim();

    if (field === "start_time" || field === "end_time") {
      const timeParts = formattedValue.match(/(\d+):(\d+)\s*(AM|PM)?/i);
      if (timeParts) {
        let [, hours, minutes, period] = timeParts;

        hours = parseInt(hours, 10);
        minutes = minutes.padStart(2, "0");

        if (period) {
          period = period.toUpperCase();
          if (period === "PM" && hours < 12) {
            hours += 12;
          } else if (period === "AM" && hours === 12) {
            hours = 0;
          }
        }

        formattedValue = `${hours.toString().padStart(2, "0")}:${minutes}`;
      }
    }

    setNewActivity({ ...newActivity, [field]: formattedValue });
  };

  const validateTimeOrder = (startTime, endTime) => {
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);

    if (
      endHours < startHours ||
      (endHours === startHours && endMinutes <= startMinutes)
    ) {
      return false;
    }
    return true;
  };

  const handleSaveAndContinue = async () => {
    const planData = {
      name: planName,
      description: planDescription,
      days: days,
    };
    try {
      const response = await fetchCreatPlan(planData, token);
      console.log("Plan created successfully:", response);

      if (response.data && response.data.id) {
        const planId = response.data.id;
        navigation.navigate("PlanDetails", { id: planId });
      } else {
        console.warn(
          "Plan created but no ID returned, redirecting to AllPlans"
        );
        alert(
          response.msg || "Plan created successfully, but no ID was returned."
        );
        navigation.navigate("AllPlans");
      }
    } catch (error) {
      console.error("Failed to create plan:", error);
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
        {days.length > 1 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.daysTabs}
          >
            {days.map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedDay(index)}
              >
                <Text
                  style={
                    selectedDay === index
                      ? styles.activeTab
                      : styles.inactiveTab
                  }
                >
                  Day {index + 1}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
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
          style={styles.continueButton}
          onPress={handleSaveAndContinue}
        >
          <ReusableText
            text={"Save & Continue".toLocaleUpperCase()}
            family="Medium"
            size={TEXT.medium}
            color={COLORS.black}
            style={{ letterSpacing: 1 }}
          />
        </TouchableOpacity>
        <HeightSpacer height={150} />

        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add Activity</Text>
              <TextInput
                style={styles.input}
                placeholder="Activity Name"
                value={newActivity.name}
                onChangeText={(value) => handleActivityChange("name", value)}
              />
              <TextInput
                style={styles.input}
                placeholder="Place ID"
                value={newActivity.place_id}
                onChangeText={(value) =>
                  handleActivityChange("place_id", value)
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Start Time (HH:MM AM/PM)"
                value={newActivity.start_time}
                onChangeText={(value) =>
                  handleActivityChange("start_time", value)
                }
              />
              <TextInput
                style={styles.input}
                placeholder="End Time (HH:MM AM/PM)"
                value={newActivity.end_time}
                onChangeText={(value) =>
                  handleActivityChange("end_time", value)
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Notes"
                value={newActivity.note}
                onChangeText={(value) => handleActivityChange("note", value)}
              />
              <Button title="Add" onPress={handleAddActivity} />
              <Button
                title="Cancel"
                onPress={() => setModalVisible(false)}
                color="red"
              />
            </View>
            <HeightSpacer height={370} />
          </View>
        </Modal>
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
  daysTabs: {
    top: hp(2),
    flexDirection: "row",
  },
  activeTab: {
    color: "#00AEEF",
    paddingHorizontal: 15,
    fontFamily: "Medium",
    fontSize: SIZES.large,
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
    top: hp(22),
    backgroundColor: "#FCD228",
    paddingVertical: hp(2),
    borderRadius: wp(3),
    alignItems: "center",
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
});

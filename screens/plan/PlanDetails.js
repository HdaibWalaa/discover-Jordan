import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  NativeModules,
  Alert,
  StyleSheet
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import fetchPlanDetails from "../../hook/plane/fetchPlandetails";
import { AuthContext } from "../../store/auth-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import planStyles from "../../components/Plan/PlanDetailsStyles";
import BASE_URL from "../../hook/apiConfig";
import { ReusableBackground, ReusableText } from "../../components";
import { COLORS, TEXT } from "../../constants/theme";
import ActivityCard from "../../components/Tiles/plan/ActivityCard";
import PlanDays from "../../components/Tiles/plan/PlanDayes";
import PlanFavorite from "./PlanFavorite";
import PlanAction from "./PlaneAction";
import PlanDetailsSkeleton from "../../components/Skeletons/PlanDetailsSkeleton";
import EditPlanModal from "./EditPlanModal";
import DirectEditModal from "./DirectEditModal";

const PlanDetails = () => {
  const [planDetails, setPlanDetails] = useState(null);
  const [editablePlan, setEditablePlan] = useState(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const [editingDay, setEditingDay] = useState(0);
  const [expandedActivityIndex, setExpandedActivityIndex] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [directEditActivity, setDirectEditActivity] = useState(null);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDirectEditModal, setShowDirectEditModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isUserCreated, setIsUserCreated] = useState(false);

  const authCtx = useContext(AuthContext);
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params || {};

  useEffect(() => {
    const deviceLanguage =
      Platform.OS === "ios"
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0]
        : NativeModules.I18nManager.localeIdentifier;

    let lang = deviceLanguage?.includes("_")
      ? deviceLanguage.split("_")[0]
      : deviceLanguage?.split("-")[0];

    setLanguage(lang || "en");
  }, []);

  useEffect(() => {
    if (language) {
      fetchAndSetPlanDetails();
    }
  }, [authCtx, route.params?.id, language]);

  const fetchAndSetPlanDetails = async () => {
    setLoading(true);
    try {
      let token = authCtx.token;

      if (!token) {
        token = await AsyncStorage.getItem("authToken");
      }

      if (!token) {
        throw new Error("Authentication token is missing.");
      }

      const planId = route.params?.id;
      if (!planId) {
        throw new Error("Plan ID is missing.");
      }

      const details = await fetchPlanDetails(planId, token, language);
      console.log("Plan details fetched:", details);

      // Check favorite status - first check data.favorite, then fall back to is_favorite if needed
      const isFavorited =
        details.favorite === true ||
        details.favorite === 1 ||
        details.is_favorite === true ||
        details.is_favorite === 1;

      setIsFavorite(isFavorited);
      console.log("Favorite status:", isFavorited);

      // Check if plan was created by user
      const createdByUser = details.creator === "user";
      setIsUserCreated(createdByUser);

      setPlanDetails(details);

      // Add a small delay for a smoother transition
      setTimeout(() => {
        setLoading(false);
      }, 300);
    } catch (error) {
      setError("Failed to fetch plan details");
      console.error(error);
      setLoading(false);
    }
  };

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  const handleDayPress = (index) => {
    setSelectedDay(index);
  };

  // Helper function to format time from "HH:MM:SS" to "HH:MM"
  const formatTimeForApi = (timeString) => {
    if (!timeString) return "00:00";

    // If it already has the right format (H:i), return as is
    if (/^\d{1,2}:\d{2}$/.test(timeString)) return timeString;

    // If it has seconds (H:i:s), remove the seconds part
    if (/^\d{1,2}:\d{2}:\d{2}$/.test(timeString)) {
      return timeString.substring(0, 5);
    }

    // If it's in another format or invalid, return a default
    return "00:00";
  };

  const prepareEditablePlan = () => {
    // Create a deep copy of the plan details for editing
    if (!planDetails) return;

    const editableData = JSON.parse(JSON.stringify(planDetails));

    // Format times correctly for editing
    editableData.days.forEach((day) => {
      day.activities.forEach((activity) => {
        activity.start_time = formatTimeForApi(activity.start_time);
        activity.end_time = formatTimeForApi(activity.end_time);
      });
    });

    setEditablePlan(editableData);
    setEditingDay(selectedDay);
    setExpandedActivityIndex(null); // Reset any expanded activity when opening the modal
    setShowEditModal(true);
  };

  const handleActivityItemPress = (activity, index) => {
    if (expandedActivityIndex === index) {
      // If this activity is already expanded, collapse it
      setExpandedActivityIndex(null);
      setSelectedActivity(null);
    } else {
      // Expand this activity and set it as selected
      setExpandedActivityIndex(index);
      setSelectedActivity({ ...activity, index });
    }
  };

  // Handle place selection from SelectPlace component
  const handlePlaceSelection = (placeId) => {
    if (selectedActivity) {
      setSelectedActivity({
        ...selectedActivity,
        place_id: placeId.toString(),
      });
    }
  };

  const updateActivity = () => {
    if (!selectedActivity) return;

    const updatedPlan = { ...editablePlan };
    updatedPlan.days[editingDay].activities[selectedActivity.index] = {
      name: selectedActivity.name,
      start_time: selectedActivity.start_time,
      end_time: selectedActivity.end_time,
      place_id: selectedActivity.place_id || "1",
      note: selectedActivity.note || "",
      image: selectedActivity.image || "",
      place: selectedActivity.place,
    };

    setEditablePlan(updatedPlan);
    setExpandedActivityIndex(null); // Collapse after saving
  };

  // Function to update activity from direct edit
  const updateDirectActivity = () => {
    if (!directEditActivity) return;

    // If editablePlan isn't set yet, create it
    const currentPlan = editablePlan || JSON.parse(JSON.stringify(planDetails));

    // Update activity in the current day
    currentPlan.days[selectedDay].activities[directEditActivity.index] = {
      name: directEditActivity.name,
      start_time: directEditActivity.start_time,
      end_time: directEditActivity.end_time,
      place_id: directEditActivity.place_id || "1",
      note: directEditActivity.note || "",
      image: directEditActivity.image || "",
      place: directEditActivity.place, // Make sure to keep the place field
    };

    setEditablePlan(currentPlan);
    setShowDirectEditModal(false);

    // Immediately send the update to the server
    handleUpdatePlan(currentPlan);
  };

  // New function to handle direct editing from the main screen
  const handleDirectEditActivity = (activity) => {
    // Only allow editing if user created the plan
    if (!isUserCreated) {
      Alert.alert("Not Editable", "You can only edit plans that you created.");
      return;
    }

    // Find the index of this activity in the current day
    const currentDayActivities = planDetails.days[selectedDay].activities;
    const activityIndex = currentDayActivities.findIndex(
      (act) => act.name === activity.name && act.place === activity.place
    );

    if (activityIndex === -1) {
      console.error("Could not find activity to edit");
      return;
    }

    // Create a deep copy of plan details if not already done
    if (!editablePlan) {
      const editableData = JSON.parse(JSON.stringify(planDetails));

      // Format times correctly for editing
      editableData.days.forEach((day) => {
        day.activities.forEach((activity) => {
          activity.start_time = formatTimeForApi(activity.start_time);
          activity.end_time = formatTimeForApi(activity.end_time);
        });
      });

      setEditablePlan(editableData);
    }

    const formattedActivity = {
      ...activity,
      start_time: formatTimeForApi(activity.start_time),
      end_time: formatTimeForApi(activity.end_time),
      index: activityIndex,
    };

    setDirectEditActivity(formattedActivity);
    setEditingDay(selectedDay);
    setShowDirectEditModal(true);
  };

  const handleUpdatePlan = async (planToUpdate = null) => {
    const planData = planToUpdate || editablePlan;

    if (!planData || isUpdating) return;

    try {
      setIsUpdating(true);
      let token = authCtx.token;

      if (!token) {
        token = await AsyncStorage.getItem("authToken");
      }

      if (!token) {
        throw new Error("Authentication token is missing.");
      }

      // Prepare the data for updating with the correct structure
      const updateData = {
        name: planData.name,
        plan_id: parseInt(id),
        description: planData.description,
        days: planData.days.map((day) => ({
          day_number: day.day_number,
          activities: day.activities.map((activity) => ({
            name: activity.name,
            start_time: formatTimeForApi(activity.start_time),
            end_time: formatTimeForApi(activity.end_time),
            place_id: activity.place_id || "1",
            note: activity.note || "",
            image: activity.image || "",
          })),
        })),
      };

      console.log("Sending update data:", JSON.stringify(updateData));

      // Make API call to update plan
      const response = await axios.post(
        `${BASE_URL}/plan/update/${id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-API-KEY": "DISCOVERJO91427",
            Accept: "application/json",
            "Content-Type": "application/json",
            "Content-Language": language || "en",
          },
        }
      );

      console.log("Update response:", response.data);

      if (response.data && response.data.status === 200) {
        Alert.alert("Success", "Plan updated successfully");
        setShowEditModal(false);
        // Refresh plan details
        fetchAndSetPlanDetails();
      } else {
        throw new Error(response.data?.msg || "Failed to update plan");
      }
    } catch (error) {
      console.error("Error updating plan:", error);

      // More detailed error information
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);

        // If there are specific validation errors, show them
        if (error.response.data && Array.isArray(error.response.data.msg)) {
          const errorMessages = error.response.data.msg.join("\n");
          Alert.alert("Validation Error", errorMessages);
        } else {
          Alert.alert(
            "Error",
            error.response.data?.msg ||
              "Failed to update plan. Please try again."
          );
        }
      } else {
        Alert.alert("Error", "Failed to update plan. Please try again.");
      }
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle favorite toggle
  const handleFavoriteToggle = (newState) => {
    setIsFavorite(newState);
  };

  if (error) {
    return (
      <View style={planStyles.container}>
        <Text style={planStyles.errorText}>{error}</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <ReusableBackground>
        <PlanDetailsSkeleton activitiesCount={3} />
      </ReusableBackground>
    );
  }

  const activities = planDetails.days[selectedDay].activities;

  return (
    <ReusableBackground>
      <ScrollView contentContainerStyle={[planStyles.container]}>
        <View style={planStyles.header}>
          <ReusableText
            text={planDetails.name}
            family={"Bold"}
            size={TEXT.xLarge}
            color={COLORS.black}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {/* Only show PlanAction if the creator is "user" */}
            {isUserCreated && (
              <>
                <PlanAction
                  planId={id}
                  onEditPress={prepareEditablePlan}
                  disabled={isUpdating}
                />
                <View style={{ width: 15 }} />
              </>
            )}

            <PlanFavorite
              planId={id}
              token={authCtx?.token}
              initialFavorite={isFavorite}
              onToggle={handleFavoriteToggle}
              iconColor="black"
              size={wp("6%")}
              bgColor={COLORS.lightBlue}
              width={wp("12%")}
              height={hp("5%")}
            />
          </View>
        </View>
        <View>
          <ReusableText
            text={
              showFullDescription
                ? planDetails.description
                : `${planDetails.description.substring(0, 100)}...`
            }
            family={"Medium"}
            size={TEXT.small}
            color={COLORS.gray}
            style={planStyles.description}
          />
          {planDetails.description.length > 100 && (
            <TouchableOpacity onPress={toggleDescription}>
              <Text style={planStyles.readMoreText}>
                {showFullDescription ? "Read Less" : "Read More"}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {planDetails.days.length > 1 && (
          <View style={planStyles.daysTabs}>
            <PlanDays
              days={planDetails.days}
              selectedDay={selectedDay}
              onDayPress={handleDayPress}
            />
          </View>
        )}

        {activities && activities.length > 0 ? (
          activities.map((activity, index) => (
            <ActivityCard
              key={`activity-${index}`}
              activity={activity}
              showConnector={index !== activities.length - 1}
              isLastCard={index === activities.length - 1}
              onEditActivity={isUserCreated ? handleDirectEditActivity : null} // Only enable editing for user-created plans
            />
          ))
        ) : (
          <Text>No activities available for this plan.</Text>
        )}
      </ScrollView>

      {/* Edit Plan Modal */}
      <EditPlanModal
        visible={showEditModal}
        onClose={() => setShowEditModal(false)}
        editablePlan={editablePlan}
        editingDay={editingDay}
        setEditingDay={setEditingDay}
        selectedActivity={selectedActivity}
        setSelectedActivity={setSelectedActivity}
        expandedActivityIndex={expandedActivityIndex}
        setExpandedActivityIndex={setExpandedActivityIndex}
        handleActivityItemPress={handleActivityItemPress}
        updateActivity={updateActivity}
        handleUpdatePlan={handleUpdatePlan}
        isUpdating={isUpdating}
      />

      {/* Direct Edit Modal */}
      <DirectEditModal
        visible={showDirectEditModal}
        onClose={() => setShowDirectEditModal(false)}
        activity={directEditActivity}
        setActivity={setDirectEditActivity}
        onUpdate={updateDirectActivity}
      />
    </ReusableBackground>
  );
};

export default PlanDetails;
const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "Bold",
    color: COLORS.black,
  },
  closeButton: {
    padding: 5,
  },
  formContainer: {
    marginTop: 10,
    width: "100%",
  },
  inputLabel: {
    fontFamily: "Medium",
    fontSize: 16,
    color: COLORS.black,
    marginTop: 10,
    marginBottom: 5,
  },
  sectionTitle: {
    fontFamily: "Bold",
    fontSize: 18,
    color: COLORS.black,
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
    fontFamily: "Regular",
    fontSize: 16,
    marginBottom: 10,
  },
  placeSelector: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
    fontFamily: "Regular",
    fontSize: 16,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  placeSelectorText: {
    color: COLORS.gray,
    fontFamily: "Regular",
    fontSize: 16,
  },
  placeSelectorTextSelected: {
    color: COLORS.black,
    fontFamily: "Regular",
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeField: {
    width: "48%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray,
    backgroundColor: "white",
  },
  cancelButtonText: {
    fontFamily: "Medium",
    fontSize: 16,
    color: COLORS.black,
  },
  saveButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
  },
  saveButtonText: {
    fontFamily: "Medium",
    fontSize: 16,
    color: "white",
  },
  activityEditContainer: {
    marginBottom: 10,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  activityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f9f9f9",
  },
  activityItemContent: {
    flex: 1,
  },
  activityName: {
    fontFamily: "Bold",
    fontSize: 16,
    color: COLORS.black,
  },
  activityTime: {
    fontFamily: "Regular",
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 4,
  },
  activityEditForm: {
    padding: 15,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  daySelector: {
    marginTop: 20,
  },
  dayButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    marginRight: 10,
  },
  activeDayButton: {
    backgroundColor: COLORS.primary,
  },
  dayButtonText: {
    fontFamily: "Medium",
    fontSize: 14,
    color: COLORS.black,
  },
  activeDayButtonText: {
    color: "white",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "Bold",
    color: COLORS.black,
  },
  closeButton: {
    padding: 5,
  },
  formContainer: {
    marginTop: 10,
    width: "100%",
  },
  inputLabel: {
    fontFamily: "Medium",
    fontSize: 16,
    color: COLORS.black,
    marginTop: 10,
    marginBottom: 5,
  },
  sectionTitle: {
    fontFamily: "Bold",
    fontSize: 18,
    color: COLORS.black,
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
    fontFamily: "Regular",
    fontSize: 16,
    marginBottom: 10,
  },
  placeSelector: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
    fontFamily: "Regular",
    fontSize: 16,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  placeSelectorText: {
    color: COLORS.gray,
    fontFamily: "Regular",
    fontSize: 16,
  },
  placeSelectorTextSelected: {
    color: COLORS.black,
    fontFamily: "Regular",
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeField: {
    width: "48%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray,
    backgroundColor: "white",
  },
  cancelButtonText: {
    fontFamily: "Medium",
    fontSize: 16,
    color: COLORS.black,
  },
  saveButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
  },
  saveButtonText: {
    fontFamily: "Medium",
    fontSize: 16,
    color: "white",
  },
  activityEditContainer: {
    marginBottom: 10,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  activityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f9f9f9",
  },
  activityItemContent: {
    flex: 1,
  },
  activityName: {
    fontFamily: "Bold",
    fontSize: 16,
    color: COLORS.black,
  },
  activityTime: {
    fontFamily: "Regular",
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 4,
  },
  activityEditForm: {
    padding: 15,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  daySelector: {
    marginTop: 20,
  },
  dayButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    marginRight: 10,
  },
  activeDayButton: {
    backgroundColor: COLORS.primary,
  },
  dayButtonText: {
    fontFamily: "Medium",
    fontSize: 14,
    color: COLORS.black,
  },
  activeDayButtonText: {
    color: "white",
  },
  // Place search modal styles
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 45,
    fontSize: 16,
    fontFamily: "Regular",
    color: COLORS.black,
  },
  clearButton: {
    padding: 5,
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontFamily: "Regular",
    fontSize: 16,
    color: COLORS.gray,
  },
  placeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  placeItemContent: {
    flex: 1,
  },
  placeItemName: {
    fontFamily: "Medium",
    fontSize: 16,
    color: COLORS.black,
  },
  placeItemRegion: {
    fontFamily: "Regular",
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 2,
  },
  emptyList: {
    padding: 20,
    alignItems: "center",
  },
  emptyListText: {
    fontFamily: "Regular",
    fontSize: 16,
    color: COLORS.gray,
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "Bold",
    color: COLORS.black,
  },
  closeButton: {
    padding: 5,
  },
  formContainer: {
    marginTop: 10,
    width: "100%",
  },
  inputLabel: {
    fontFamily: "Medium",
    fontSize: 16,
    color: COLORS.black,
    marginTop: 10,
    marginBottom: 5,
  },
  sectionTitle: {
    fontFamily: "Bold",
    fontSize: 18,
    color: COLORS.black,
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
    fontFamily: "Regular",
    fontSize: 16,
    marginBottom: 10,
  },
  inputGroup: {
    marginBottom: 15,
  },
  timeSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 12,
    backgroundColor: "#f9f9f9",
  },
  timeSelectorText: {
    fontSize: 16,
    color: COLORS.black,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeField: {
    width: "48%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    flex: 1,
    alignItems: "center",
    marginLeft: 5,
  },
  saveButtonText: {
    fontFamily: "Medium",
    fontSize: 16,
    color: "white",
  },
  activityEditContainer: {
    marginBottom: 10,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  activityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f9f9f9",
  },
  activityItemContent: {
    flex: 1,
  },
  activityName: {
    fontFamily: "Bold",
    fontSize: 16,
    color: COLORS.black,
  },
  activityTime: {
    fontFamily: "Regular",
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 4,
  },
  activityEditForm: {
    padding: 15,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  daySelector: {
    marginTop: 20,
  },
  dayButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    marginRight: 10,
  },
  activeDayButton: {
    backgroundColor: COLORS.primary,
  },
  dayButtonText: {
    fontFamily: "Medium",
    fontSize: 14,
    color: COLORS.black,
  },
  activeDayButtonText: {
    color: "white",
  },
  borderRadius: 8,
  borderWidth: 1,
  borderColor: COLORS.gray,
  backgroundColor: "white",
});

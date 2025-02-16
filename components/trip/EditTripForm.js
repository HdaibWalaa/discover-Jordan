import React, { useState } from "react";
import { FlatList, View } from "react-native";
import Input from "./Input";
import SelectPlace from "./SelectPlace";
import SelectGender from "./SelectGender";
import SelectTags from "./SelectTags";
import SelectType from "./SelectType";
import SelectUsers from "./SelectUseres";
import ReusableBtn from "../Buttons/ReusableBtn";
import styles from "./CreateTripFormStyles";
import { COLORS } from "../../constants/theme";
import AwesomeAlert from "react-native-awesome-alerts";
import HeightSpacer from "../Reusable/HeightSpacer";

const EditTripForm = ({ initialTripData, onUpdateTrip }) => {
  // Initialize states with initial trip data
  const [tripName, setTripName] = useState(initialTripData.name || "");
  const [selectedPlace, setSelectedPlace] = useState(
    initialTripData.place_id || ""
  );
  const [tripDate, setTripDate] = useState(initialTripData.date || "");
  const [tripTime, setTripTime] = useState(initialTripData.time || "");
  const [minAge, setMinAge] = useState(initialTripData.age_min || "");
  const [maxAge, setMaxAge] = useState(initialTripData.age_max || "");
  const [cost, setCost] = useState(initialTripData.cost || "");
  const [description, setDescription] = useState(
    initialTripData.description || ""
  );
  const [attendanceNumber, setAttendanceNumber] = useState(
    initialTripData.attendance_number || ""
  );
  const [selectedTags, setSelectedTags] = useState(initialTripData.tags || []);
  const [selectedGender, setSelectedGender] = useState(
    initialTripData.gender_id || ""
  );
  const [selectType, setSelectType] = useState(initialTripData.tripType || "");
  const [selectUsers, setSelectUsers] = useState(
    initialTripData.selectedUsers || []
  );

  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

const handleEditTrip = async () => {
  const updatedTripData = {
    name: tripName || initialTripData.name,
    place_id: selectedPlace !== "" ? selectedPlace : initialTripData.place_id,
    date: tripDate || initialTripData.date,
    time: tripTime || initialTripData.time,
    age_min: minAge || initialTripData.age_min,
    age_max: maxAge || initialTripData.age_max,
    cost: cost || initialTripData.cost,
    description: description || initialTripData.description,
    attendance_number:
      attendanceNumber !== ""
        ? attendanceNumber
        : initialTripData.attendance_number, // Use initial value if not edited
    tags:
      selectedTags.length > 0
        ? selectedTags
            .filter((tag) => tag !== undefined)
            .map((tag) => (typeof tag === "object" ? tag.id : tag))
        : initialTripData.tags.map((tag) => tag.id), // Use existing tags if not edited
    gender_id:
      selectedGender !== "" ? selectedGender : initialTripData.gender_id, // Use existing gender if not edited
    tripType: selectType !== "" ? selectType : initialTripData.tripType, // Use existing trip type if not edited
    selectedUsers:
      selectUsers !== undefined && selectUsers.length > 0
        ? selectUsers
        : initialTripData.selectedUsers, // Handle undefined selectedUsers
  };

  try {
    console.log("Updated Trip Data:", updatedTripData); // Log to ensure correct data structure
    const response = await onUpdateTrip(updatedTripData);
    setAlertType("success");
    setAlertTitle("Success");
    setAlertMessage("Trip updated successfully!");
    setShowAlert(true);
  } catch (error) {
    setAlertType("error");
    setAlertTitle("Error");
    setAlertMessage("Failed to update the trip. Please try again.");
    setShowAlert(true);
  }
};



  // Define your form fields as an array of objects
  const formFields = [
    {
      id: "tripName",
      component: (
        <Input
          label="Trip Name"
          onUpdateValue={setTripName}
          value={tripName}
          isInvalid={false}
        />
      ),
    },
    {
      id: "selectedPlace",
      component: (
        <SelectPlace
          label="Place"
          onValueChange={setSelectedPlace}
          value={selectedPlace}
          isInvalid={false}
        />
      ),
    },
    {
      id: "tripDate",
      component: (
        <Input
          label="Date"
          onUpdateValue={setTripDate}
          value={tripDate}
          isInvalid={false}
          placeholder="YYYY-MM-DD"
        />
      ),
    },
    {
      id: "tripTime",
      component: (
        <Input
          label="Time"
          onUpdateValue={setTripTime}
          value={tripTime}
          isInvalid={false}
          placeholder="HH:MM:SS"
        />
      ),
    },
    {
      id: "minAge",
      component: (
        <Input
          label="Min Age"
          onUpdateValue={setMinAge}
          value={minAge}
          isInvalid={false}
        />
      ),
    },
    {
      id: "maxAge",
      component: (
        <Input
          label="Max Age"
          onUpdateValue={setMaxAge}
          value={maxAge}
          isInvalid={false}
        />
      ),
    },
    {
      id: "cost",
      component: (
        <Input
          label="Cost"
          onUpdateValue={setCost}
          value={cost}
          isInvalid={false}
          placeholder="35 JOD"
        />
      ),
    },
    {
      id: "attendanceNumber",
      component: (
        <Input
          label="Attendance Number"
          onUpdateValue={setAttendanceNumber}
          value={attendanceNumber}
          isInvalid={false}
        />
      ),
    },
    {
      id: "description",
      component: (
        <Input
          label="Description"
          onUpdateValue={setDescription}
          value={description}
          isInvalid={false}
        />
      ),
    },
    {
      id: "selectedTags",
      component: (
        <SelectTags
          label="Tags"
          onValueChange={setSelectedTags}
          value={selectedTags}
        />
      ),
    },
    {
      id: "selectedGender",
      component: (
        <SelectGender
          label="Gender"
          selectedGender={selectedGender}
          setSelectedGender={setSelectedGender}
        />
      ),
    },
    {
      id: "selectType",
      component: (
        <SelectType
          label="Trip Type"
          onValueChange={setSelectType}
          value={selectType}
        />
      ),
    },
    {
      id: "selectUsers",
      component: selectType === "2" && (
        <SelectUsers
          label="Users"
          onValueChange={setSelectUsers}
          value={selectUsers}
        />
      ),
    },
  ];

  return (
    <>
      <FlatList
        data={formFields}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.formContainer}>{item.component}</View>
        )}
        ListFooterComponent={
          <View>
            <ReusableBtn
              btnText="Update"
              backgroundColor={COLORS.primary}
              textColor={COLORS.white}
              onPress={handleEditTrip}
            />
            <HeightSpacer height={50} />
          </View>
        }
      />
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={alertTitle}
        message={alertMessage}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="Close"
        confirmButtonColor={alertType === "success" ? "#4CAF50" : "#F44336"}
        onConfirmPressed={() => setShowAlert(false)}
      />
    </>
  );
};

export default EditTripForm;

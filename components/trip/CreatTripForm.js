import React, { useState, useContext } from "react";
import { View, ScrollView, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Input from "./Input";
import SelectPlace from "./SelcetPlace";
import SelectGender from "./SelectGender";
import SelectTags from "./SelectTags";
import SelectType from "./SelectType";
import SelectUsers from "./SelectUseres";
import ReusableBtn from "../Buttons/ReusableBtn";
import styles from "./CreateTripFormStyles";
import { COLORS } from "../../constants/theme";
import { AuthContext } from "../../store/auth-context";
import { usePostTrip } from "../../hook/trip/usePostTrip";
import HeightSpacer from "../Reusable/HeightSpacer";
import AwesomeAlert from "react-native-awesome-alerts";

const CreateTripForm = () => {
  const [tripName, setTripName] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  const [tripDate, setTripDate] = useState("");
  const [tripTime, setTripTime] = useState("");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");
  const [attendanceNumber, setAttendanceNumber] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectType, setSelectType] = useState("");
  const [selectUsers, setSelectUsers] = useState([]);

  const [dateError, setDateError] = useState("");
  const [timeError, setTimeError] = useState("");
  const [tagsError, setTagsError] = useState("");

  // State for the alert
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success"); // "success" or "error"

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const navigation = useNavigation();

  const validateDate = (date) => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(date)) {
      setDateError("Please enter the date in this format: YYYY-MM-DD");
      return false;
    }
    setDateError("");
    return true;
  };

  const validateTime = (time) => {
    const timePattern = /^\d{2}:\d{2}:\d{2}$/;
    if (!timePattern.test(time)) {
      setTimeError("Please enter the time in this format: HH:MM:SS");
      return false;
    }
    setTimeError("");
    return true;
  };

  const validateTags = (tags) => {
    if (tags.length < 3) {
      setTagsError("Please select at least three tags.");
      return false;
    }
    setTagsError("");
    return true;
  };

  const handlePostTrip = async () => {
    const isDateValid = validateDate(tripDate);
    const isTimeValid = validateTime(tripTime);
    const areTagsValid = validateTags(selectedTags);

    if (
      !tripName ||
      !selectedPlace ||
      !isDateValid ||
      !isTimeValid ||
      !minAge ||
      !maxAge ||
      !cost ||
      !description ||
      !attendanceNumber ||
      !areTagsValid
    ) {
      setAlertType("error");
      setAlertTitle("Error");
      setAlertMessage("Please correct the highlighted fields.");
      setShowAlert(true);
      return;
    }

    const tripData = {
      tripName,
      placeId: selectedPlace,
      tripDate,
      tripTime,
      minAge,
      maxAge,
      cost,
      description,
      attendanceNumber,
      selectedTags,
      gender: selectedGender,
      tripType: selectType,
    };

    try {
      console.log("Sending trip data:", tripData);
      console.log("Using token:", token);

      const response = await usePostTrip(
        token,
        tripData.tripType,
        tripData.placeId,
        tripData.tripName,
        tripData.description,
        tripData.cost,
        tripData.minAge,
        tripData.maxAge,
        tripData.gender,
        tripData.tripDate,
        tripData.tripTime,
        tripData.attendanceNumber,
        tripData.selectedTags,
        selectUsers
      );

      console.log("Response data:", response);

      setAlertType("success");
      setAlertTitle("Congratulations");
      setAlertMessage(response.msg || "Trip created successfully!");
      setShowAlert(true);

      // Navigate to AllTrip screen after a short delay to let the user see the success message
      setTimeout(() => {
        setShowAlert(false);
        navigation.navigate("AllTrip");
      }, 2000);
    } catch (error) {
      console.error("Error during trip creation:", error);
      setAlertType("error");
      setAlertTitle("Oops");
      setAlertMessage(
        error.message || "Failed to create trip. Please try again."
      );
      setShowAlert(true);
    }
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.formContainer, { gap: 20 }]}>
          <Input
            label="Trip Name"
            onUpdateValue={setTripName}
            value={tripName}
            isInvalid={false}
            secure={false}
            iconSource={require("../../assets/images/icons/text.png")}
            placeholder="Aqaba Trip"
            width={350}
          />
          <SelectGender
            label="Select Gender"
            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
          />
          <SelectType
            label="Select The Type Of The Trip"
            iconSource={require("../../assets/images/icons/checklist.png")}
            onValueChange={setSelectType}
            value={selectType}
            width={350}
          />
          {selectType === "2" && (
            <SelectUsers
              label="Select Users"
              iconSource={require("../../assets/images/icons/add-user.png")}
              iconSource2={require("../../assets/images/icons/Iconly.png")}
              onValueChange={setSelectUsers}
              value={selectUsers}
              width={350}
              userId={authCtx.userId}
            />
          )}
          <SelectPlace
            label="Place Name"
            iconSource={require("../../assets/images/icons/place.png")}
            iconSource2={require("../../assets/images/icons/Iconly.png")}
            onValueChange={setSelectedPlace}
            value={selectedPlace}
            width={350}
          />
          <View style={styles.TimeContainer}>
            <View style={{ width: 170 }}>
              <Input
                label="Trip Date"
                onUpdateValue={(value) => {
                  setTripDate(value);
                  validateDate(value);
                }}
                value={tripDate}
                isInvalid={!!dateError}
                secure={false}
                iconSource={require("../../assets/images/icons/Date.png")}
                placeholder="2024-09-28"
                width={170}
              />
              {dateError ? (
                <Text style={styles.errorText}>{dateError}</Text>
              ) : null}
            </View>
            <View style={{ width: 200 }}>
              <Input
                label="Time"
                onUpdateValue={(value) => {
                  setTripTime(value);
                  validateTime(value);
                }}
                value={tripTime}
                isInvalid={!!timeError}
                secure={false}
                iconSource={require("../../assets/images/icons/Time.png")}
                placeholder="08:00:00"
                width={200}
              />
              {timeError ? (
                <Text style={styles.errorText}>{timeError}</Text>
              ) : null}
            </View>
          </View>
          <View style={styles.AgeContainer}>
            <Input
              label="Min Age"
              onUpdateValue={setMinAge}
              value={minAge}
              isInvalid={false}
              secure={false}
              iconSource={require("../../assets/images/icons/Age.png")}
              placeholder="18"
              width={170}
            />
            <Input
              label="Max Age"
              onUpdateValue={setMaxAge}
              value={maxAge}
              isInvalid={false}
              secure={false}
              iconSource={require("../../assets/images/icons/Age.png")}
              placeholder="65+"
              width={200}
            />
          </View>
          <Input
            label="Number of Attendance"
            onUpdateValue={setAttendanceNumber}
            value={attendanceNumber}
            isInvalid={false}
            secure={false}
            iconSource={require("../../assets/images/icons/people.png")}
            placeholder="15+"
            width={350}
          />
          <Input
            label="Cost"
            onUpdateValue={setCost}
            value={cost}
            isInvalid={false}
            secure={false}
            iconSource={require("../../assets/images/icons/Cost.png")}
            placeholder="35 JOD"
            width={350}
          />
          <Input
            label="Trip Description"
            onUpdateValue={setDescription}
            value={description}
            isInvalid={false}
            secure={false}
            iconSource={require("../../assets/images/icons/text.png")}
            placeholder="Type here ..."
            width={350}
          />

          <SelectTags
            label="Select Tags"
            onValueChange={setSelectedTags}
            value={selectedTags}
          />
          {tagsError ? <Text style={styles.errorText}>{tagsError}</Text> : null}

          <View style={styles.postButtonContainer}>
            <ReusableBtn
              btnText="POST"
              backgroundColor={COLORS.primary}
              textColor={COLORS.white}
              onPress={handlePostTrip}
            />
          </View>
          <HeightSpacer height={50} />
        </View>
      </ScrollView>

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
        onConfirmPressed={() => {
          setShowAlert(false);
        }}
      />
    </>
  );
};

export default CreateTripForm;

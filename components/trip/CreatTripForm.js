import React, { useState, useContext } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-virtualized-view";
import Input from "./Input";
import SelectPlace from "./SelectPlace";
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
import { useLanguage } from "../../store/context/LanguageContext";
import translations from "../../translations/translations";

const CreateTripForm = () => {
  const { language } = useLanguage();
  const localizedText = translations[language] || translations["en"];

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

 
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success"); 

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const navigation = useNavigation();

  const validateDate = (date) => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(date)) {
      setDateError(localizedText.invalidDateFormat);
      return false;
    }
    setDateError("");
    return true;
  };

  const validateTime = (time) => {
    const timePattern = /^\d{2}:\d{2}:\d{2}$/;
    if (!timePattern.test(time)) {
      setTimeError(localizedText.invalidTimeFormat);
      return false;
    }
    setTimeError("");
    return true;
  };

  const validateTags = (tags) => {
    if (tags.length < 3) {
      setTagsError(localizedText.selectAtLeastThreeTags);
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
     setAlertTitle(localizedText.error);
     setAlertMessage(localizedText.correctHighlightedFields);
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
     users:
       selectType === "2"
         ? selectUsers.map((user) => user.id).filter(Boolean)
         : [], 
   };

   try {
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
       tripData.users
     );

     setAlertType("success");
     setAlertTitle(localizedText.congratulations);
     setAlertMessage(response.msg || localizedText.tripCreatedSuccess);
     setShowAlert(true);

     setTimeout(() => {
       setShowAlert(false);
       navigation.navigate("AllTrip");
     }, 2000);
   } catch (error) {
     let errorMessage = localizedText.tripCreationError;

     if (error.response && error.response.data && error.response.data.msg) {
       const apiMessage = error.response.data.msg;
       errorMessage = Array.isArray(apiMessage)
         ? apiMessage.join("\n")
         : apiMessage;
     }

     setAlertType("error");
     setAlertTitle(localizedText.oops);
     setAlertMessage(errorMessage);
     setShowAlert(true);
   }
 };


  return (
    <>
      <View
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.formContainer, { gap: 20 }]}>
          <Input
            label={localizedText.tripName}
            onUpdateValue={setTripName}
            value={tripName}
            isInvalid={false}
            secure={false}
            iconSource={require("../../assets/images/icons/text.png")}
            placeholder="Aqaba Trip"
            width={350}
          />
          <SelectGender
            label={localizedText.gender}
            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
          />
          <SelectType
            label={localizedText.tripType}
            iconSource={require("../../assets/images/icons/checklist.png")}
            onValueChange={setSelectType}
            value={selectType}
            width={350}
          />
          {selectType === "2" && (
            <SelectUsers
              label={localizedText.selectUsers}
              iconSource={require("../../assets/images/icons/add-user.png")}
              iconSource2={require("../../assets/images/icons/Iconly.png")}
              onValueChange={(selected) => {
                const validUsers = selected.filter((user) => user !== null);
                setSelectUsers(validUsers);
              }}
              value={selectUsers}
              width={350}
            />
          )}
          <SelectPlace
            label={localizedText.placeName}
            iconSource={require("../../assets/images/icons/place.png")}
            iconSource2={require("../../assets/images/icons/Iconly.png")}
            onValueChange={setSelectedPlace}
            value={selectedPlace}
            width={350}
          />
          <View style={styles.TimeContainer}>
            <View style={{ width: 170 }}>
              <Input
                label={localizedText.date}
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
                label={localizedText.time}
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
              label={localizedText.minAge}
              onUpdateValue={setMinAge}
              value={minAge}
              isInvalid={false}
              secure={false}
              iconSource={require("../../assets/images/icons/Age.png")}
              placeholder="18"
              width={170}
            />
            <Input
              label={localizedText.maxAge}
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
            label={localizedText.attendanceNumber}
            onUpdateValue={setAttendanceNumber}
            value={attendanceNumber}
            isInvalid={false}
            secure={false}
            iconSource={require("../../assets/images/icons/people.png")}
            placeholder="15+"
            width={350}
          />
          <Input
            label={localizedText.cost}
            onUpdateValue={setCost}
            value={cost}
            isInvalid={false}
            secure={false}
            iconSource={require("../../assets/images/icons/Cost.png")}
            placeholder="35 JOD"
            width={350}
          />
          <Input
            label={localizedText.description}
            onUpdateValue={setDescription}
            value={description}
            isInvalid={false}
            secure={false}
            iconSource={require("../../assets/images/icons/text.png")}
            placeholder="Type here ..."
            width={350}
          />

          <SelectTags
            label={localizedText.tags}
            onValueChange={setSelectedTags}
            value={selectedTags}
          />
          {tagsError ? <Text style={styles.errorText}>{tagsError}</Text> : null}

          <View style={styles.postButtonContainer}>
            <ReusableBtn
              btnText={localizedText.post}
              backgroundColor={COLORS.primary}
              textColor={COLORS.white}
              width={90}
              height={6}
              onPress={handlePostTrip}
            />
          </View>
          <HeightSpacer height={50} />
        </View>
      </View>

      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={alertTitle}
        message={alertMessage}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText={localizedText.close}
        confirmButtonColor={alertType === "success" ? "#4CAF50" : "#F44336"}
        onConfirmPressed={() => {
          setShowAlert(false);
        }}
      />
    </>
  );
};

export default CreateTripForm;

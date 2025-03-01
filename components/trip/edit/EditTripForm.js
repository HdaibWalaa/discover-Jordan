import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { COLORS } from "../../../constants/theme";
import { AuthContext } from "../../../store/auth-context";
import SelectEditGender from "./SelectEditGender";
import SelectEditPlace from "./SelectEditPlace";
import SelectEditTags from "./SelectEditTags";
import SelectEditType from "./SelectEditType";
import SelectEditUser from "./SelectEditUser";
import ReusableText from "../../Reusable/ReusableText";
import axios from "axios";
import BASE_URL from "../../../hook/apiConfig";
import { useLanguage } from "../../../store/context/LanguageContext";
import translations from "../../../translations/translations";

const EditTripForm = ({ initialTripData = {}, onUpdateTrip }) => {
  const { language } = useLanguage();
  const localizedText = translations[language] || translations["en"];
  const authCtx = useContext(AuthContext);

  // Form state
 const [formData, setFormData] = useState({
   place_id: initialTripData?.place_id || "",
   name: initialTripData?.name || "",
   description: initialTripData?.description || "",
   cost: initialTripData?.cost?.toString() || "",
   age_min: initialTripData?.age_min?.toString() || "18",
   age_max: initialTripData?.age_max?.toString() || "60",
   gender: initialTripData?.gender || 0,
   date: initialTripData?.date || "",
   time: initialTripData?.time || "",
   attendance_number: initialTripData?.attendance_number?.toString() || "1",
   tags: initialTripData?.tags || [],
   trip_type: initialTripData?.trip_type?.toString() || "0",
   users: initialTripData?.users || [],
 });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

 useEffect(() => {
   if (initialTripData && Object.keys(initialTripData).length > 0) {
     setFormData({
       ...initialTripData,
       cost: initialTripData.cost?.toString(),
       age_min: initialTripData.age_min?.toString(),
       age_max: initialTripData.age_max?.toString(),
       attendance_number: initialTripData.attendance_number?.toString(),
       tags: initialTripData.tags || [],
       users: initialTripData.users || [],
     });
   }
 }, [initialTripData]);


  const validateForm = () => {
    const newErrors = {};

    if (!formData.place_id) newErrors.place_id = localizedText.placeRequired;
    if (!formData.name) newErrors.name = localizedText.nameRequired;
    if (!formData.date) newErrors.date = localizedText.dateRequired;
    if (!formData.time) newErrors.time = localizedText.timeRequired;
    if (formData.tags.length < 3)
      newErrors.tags = localizedText.selectAtLeastThreeTags;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async () => {
  if (!validateForm()) return;

  setLoading(true);

  try {
    // Convert data to proper formats
    const payload = {
      place_id: Number(formData.place_id),
      name: formData.name,
      description: formData.description,
      cost: Number(formData.cost),
      age_min: Number(formData.age_min),
      age_max: Number(formData.age_max),
      gender: formData.gender,
      date: formData.date,
      time: formData.time,
      attendance_number: Number(formData.attendance_number),
      tags: JSON.stringify(formData.tags.filter((t) => typeof t === "number")),
      trip_type: Number(formData.trip_type),
      users: JSON.stringify(formData.users),
    };

    // Rename FormData variable to avoid conflict
    const formPayload = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      formPayload.append(key, value);
    });

    console.log("📨 Final Payload:", payload);

    const response = await axios.post(
      `${BASE_URL}/trip/update/${initialTripData.id}`,
      formPayload, // Use renamed variable
      {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
          "Content-Type": "multipart/form-data",
          "X-API-KEY": "DISCOVERJO91427",
        },
      }
    );

    if (response.data.success) {
      Alert.alert(localizedText.success, localizedText.tripUpdated);
      onUpdateTrip(response.data.data);
    }
  } catch (error) {
    console.error("Update error:", error);
    Alert.alert(
      localizedText.error,
      error.response?.data?.message || localizedText.updateFailed
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Place Selection */}
      <SelectEditPlace
        label="Place"
        iconSource={require("../../../assets/images/icons/both.png")}
        iconSource2={require("../../../assets/images/icons/both.png")}
        onValueChange={(value) => setFormData({ ...formData, place_id: value })}
        value={formData.place_id}
        placeName={initialTripData.place?.name}
      />
      {errors.place_id && <Text style={styles.error}>{errors.place_id}</Text>}

      {/* Trip Name */}
      <TextInput
        style={styles.input}
        placeholder={localizedText.tripName}
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
      />
      {errors.name && <Text style={styles.error}>{errors.name}</Text>}

      {/* Description */}
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder={localizedText.description}
        multiline
        value={formData.description}
        onChangeText={(text) => setFormData({ ...formData, description: text })}
      />

      {/* Cost */}
      <TextInput
        style={styles.input}
        placeholder={localizedText.cost}
        keyboardType="numeric"
        value={formData.cost}
        onChangeText={(text) => setFormData({ ...formData, cost: text })}
      />

      {/* Age Range */}
      <View style={styles.ageContainer}>
        <TextInput
          style={[styles.input, styles.ageInput]}
          placeholder={localizedText.minAge}
          keyboardType="numeric"
          value={formData.age_min}
          onChangeText={(text) => setFormData({ ...formData, age_min: text })}
        />
        <Text style={styles.ageSeparator}>-</Text>
        <TextInput
          style={[styles.input, styles.ageInput]}
          placeholder={localizedText.maxAge}
          keyboardType="numeric"
          value={formData.age_max}
          onChangeText={(text) => setFormData({ ...formData, age_max: text })}
        />
      </View>

      {/* Gender Selection */}
      <SelectEditGender
        selectedGender={formData.gender}
        setSelectedGender={(value) =>
          setFormData({ ...formData, gender: value })
        }
      />

      {/* Date and Time */}
      <View style={styles.datetimeContainer}>
        <TextInput
          style={[styles.input, styles.dateInput]}
          placeholder="YYYY-MM-DD"
          value={formData.date}
          onChangeText={(text) => setFormData({ ...formData, date: text })}
        />
        {errors.date && <Text style={styles.error}>{errors.date}</Text>}

        <TextInput
          style={[styles.input, styles.timeInput]}
          placeholder="HH:MM:SS"
          value={formData.time}
          onChangeText={(text) => setFormData({ ...formData, time: text })}
        />
        {errors.time && <Text style={styles.error}>{errors.time}</Text>}
      </View>

      {/* Attendance Number */}
      <TextInput
        style={styles.input}
        placeholder={localizedText.attendanceNumber}
        keyboardType="numeric"
        value={formData.attendance_number}
        onChangeText={(text) =>
          setFormData({ ...formData, attendance_number: text })
        }
      />

      {/* Tags Selection */}
      <SelectEditTags
        onValueChange={(tags) => setFormData({ ...formData, tags })}
        value={formData.tags}
      />
      {errors.tags && <Text style={styles.error}>{errors.tags}</Text>}

      {/* Trip Type */}
      <SelectEditType
        label={localizedText.tripType}
        iconSource={require("../../../assets/images/icons/both.png")}
        onValueChange={(value) =>
          setFormData({ ...formData, trip_type: value })
        }
        value={formData.trip_type}
      />

      {/* Selected Users */}
      {formData.trip_type === "2" && (
        <SelectEditUser
          label={localizedText.selectUsers}
          iconSource={require("../../../assets/images/icons/both.png")}
          iconSource2={require("../../../assets/images/icons/both.png")}
          onValueChange={(users) => setFormData({ ...formData, users })}
          value={formData.users}
        />
      )}

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <Button
          title={
            localizedText.updateTrip ? localizedText.updateTrip : "Update Trip"
          }
          onPress={handleSubmit}
          color={COLORS.primary}
        />
      )}

      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 50,
  },
  input: {
    height: 40,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 8,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: "top",
  },
  ageContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  ageInput: {
    flex: 1,
  },
  ageSeparator: {
    fontSize: 18,
    color: COLORS.dark,
  },
  datetimeContainer: {
    flexDirection: "row",
    gap: 10,
  },
  dateInput: {
    flex: 2,
  },
  timeInput: {
    flex: 1,
  },
  error: {
    color: COLORS.red,
    fontSize: 12,
    marginBottom: 8,
  },
  alertContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 20,
  },
  alertTitle: {
    color: COLORS.dark,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  alertMessage: {
    color: COLORS.gray,
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
});

export default EditTripForm;

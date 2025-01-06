import React, { useState, useContext } from "react";
import { Text, TextInput, View, Button, ScrollView, Alert } from "react-native";
import { AuthContext } from "../../../store/auth-context"; // Assuming you have an AuthContext
import TripDateTime from "./TripDateTime";
import TripGallery from "./TripGallery";
import TripActivities from "./TripActivities";
import TripPriceInclude from "./TripPriceInclude";
import PriceAge from "./PriceAge";
import Assembly from "./Assembly";
import RequiredItems from "./RequiredItems";
import Trail from "./Trail";
import { HeightSpacer } from "../../../components";
import styles from "./CreateGuideTripStyles";
import { useNavigation } from "@react-navigation/native";
import BASE_URL from "../../../hook/apiConfig";

const CreatForm = () => {
  const { token } = useContext(AuthContext); // Retrieve the token from context
  const navigation = useNavigation();
  const [nameEn, setNameEn] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [startDatetime, setStartDatetime] = useState("");
  const [endDatetime, setEndDatetime] = useState("");
  const [maxAttendance, setMaxAttendance] = useState("");
  const [mainPrice, setMainPrice] = useState("");
  const [gallery, setGallery] = useState([]);
  const [activities, setActivities] = useState([{ en: "", ar: "" }]);
  const [priceInclude, setPriceInclude] = useState([{ en: "", ar: "" }]);
  const [priceAge, setPriceAge] = useState([
    { min_age: "", max_age: "", cost: "" },
  ]);
  const [assembly, setAssembly] = useState([
    { time: "", place_en: "", place_ar: "" },
  ]);
  const [requiredItems, setRequiredItems] = useState([
    { en: "Passport", ar: "جواز السفر" },
    { en: "Snacks", ar: "وجبات" },
  ]);
  const [isTrail, setIsTrail] = useState(false);
  const [trail, setTrail] = useState({
    min_duration_in_minute: 60,
    max_duration_in_minute: 120,
    distance_in_meter: 10.5,
    difficulty: 2,
  });

const handleSubmit = () => {
  if (!token) {
    Alert.alert("Error", "You are not authenticated. Please log in.");
    return;
  }

  console.log("Token:", token); // Log the token for debugging

  const formData = new FormData();
  formData.append("name_en", nameEn);
  formData.append("name_ar", nameAr);
  formData.append("description_en", descriptionEn);
  formData.append("description_ar", descriptionAr);
  formData.append("start_datetime", startDatetime);
  formData.append("end_datetime", endDatetime);
  formData.append("max_attendance", maxAttendance);
  formData.append("main_price", mainPrice);

  gallery.forEach((image, index) => {
    formData.append(`gallery[${index}]`, {
      uri: image,
      name: `image${index}.jpg`,
      type: "image/jpeg",
    });
  });

  formData.append("activities", JSON.stringify(activities));
  formData.append("price_include", JSON.stringify(priceInclude));
  formData.append("price_age", JSON.stringify(priceAge));
  formData.append("assembly", JSON.stringify(assembly));
  formData.append("required_items", JSON.stringify(requiredItems));
  formData.append("is_trail", isTrail ? 1 : 0);

  if (isTrail) {
    formData.append("trail", JSON.stringify(trail));
  }

  fetch(`${BASE_URL}/guide/trips/store`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    body: formData,
  })
    .then((response) => {
      console.log("Response status:", response.status); // Log status for debugging
      if (!response.ok) {
        throw new Error("Failed to create guide trip");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Trip created successfully:", data);
      Alert.alert("Success", "Guide trip created successfully!", [
        {
          text: "OK",
          onPress: () => navigation.navigate("AllGuideTrip"),
        },
      ]);
    })
    .catch((error) => {
      console.error("Error creating trip:", error);
      Alert.alert("Error", "Failed to create guide trip");
    });
};


  return (
    <ScrollView style={styles.container}>
      {/* Name Fields */}
      <Text style={styles.label}>Trip Name (English)</Text>
      <TextInput
        style={styles.input}
        value={nameEn}
        onChangeText={setNameEn}
        placeholder="Enter trip name in English"
      />

      <Text style={styles.label}>Trip Name (Arabic)</Text>
      <TextInput
        style={styles.input}
        value={nameAr}
        onChangeText={setNameAr}
        placeholder="Enter trip name in Arabic"
      />

      {/* Description Fields */}
      <Text style={styles.label}>Description (English)</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={descriptionEn}
        onChangeText={setDescriptionEn}
        placeholder="Enter description in English"
        multiline
      />

      <Text style={styles.label}>Description (Arabic)</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={descriptionAr}
        onChangeText={setDescriptionAr}
        placeholder="Enter description in Arabic"
        multiline
      />

      {/* Date Fields using TripDateTime */}
      <TripDateTime label="Start Date & Time" onDateChange={setStartDatetime} />
      <TripDateTime label="End Date & Time" onDateChange={setEndDatetime} />

      {/* Max Attendance and Price */}
      <Text style={styles.label}>Max Attendance</Text>
      <TextInput
        style={styles.input}
        value={maxAttendance}
        onChangeText={setMaxAttendance}
        keyboardType="numeric"
        placeholder="Enter max attendance"
      />

      <Text style={styles.label}>Main Price</Text>
      <TextInput
        style={styles.input}
        value={mainPrice}
        onChangeText={setMainPrice}
        keyboardType="numeric"
        placeholder="Enter main price"
      />

      {/* Gallery Section */}
      <TripGallery gallery={gallery} setGallery={setGallery} />

      {/* Activities Section */}
      <TripActivities activities={activities} setActivities={setActivities} />

      {/* Price Include Section */}
      <TripPriceInclude
        priceInclude={priceInclude}
        setPriceInclude={setPriceInclude}
      />

      {/* Price by Age Section */}
      <PriceAge priceAge={priceAge} setPriceAge={setPriceAge} />

      {/* Assembly Section */}
      <Assembly assembly={assembly} setAssembly={setAssembly} />

      {/* Required Items Section */}
      <RequiredItems
        requiredItems={requiredItems}
        setRequiredItems={setRequiredItems}
      />

      {/* Trail Section */}
      <Trail
        isTrail={isTrail}
        setIsTrail={setIsTrail}
        trail={trail}
        setTrail={setTrail}
      />

      <Button title="Submit" onPress={handleSubmit} />
      <HeightSpacer height={150} />
    </ScrollView>
  );
};

export default CreatForm;

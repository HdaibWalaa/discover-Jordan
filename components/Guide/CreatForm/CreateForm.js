import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { AuthContext } from "../../../store/auth-context";
import TripDateTime from "./TripDateTime";
import TripGallery from "./TripGallery";
import TripActivities from "./TripActivities";
import TripPriceInclude from "./TripPriceInclude";
import PriceAge from "./PriceAge";
import Assembly from "./Assembly";
import RequiredItems from "./RequiredItems";
import Trail from "./Trail";
import { HeightSpacer } from "../../../components"; // Fixed import path
import { useNavigation } from "@react-navigation/native";
import BASE_URL from "../../../hook/apiConfig";
import { Ionicons } from "@expo/vector-icons";
import * as ImageManipulator from "expo-image-manipulator"; // Make sure to install this package

const MAX_IMAGE_SIZE_KB = 2000; // 2MB limit

const CreateForm = () => {
  const { token } = useContext(AuthContext);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Error message handling
  const [errors, setErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false);

  const [nameEn, setNameEn] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [startDatetime, setStartDatetime] = useState("");
  const [endDatetime, setEndDatetime] = useState("");
  const [maxAttendance, setMaxAttendance] = useState("");
  const [mainPrice, setMainPrice] = useState("");
  const [gallery, setGallery] = useState([]);
  const [compressedGallery, setCompressedGallery] = useState([]);
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

  // Add warnings flags for validation errors
  const [dateConflictWarning, setDateConflictWarning] = useState(false);
  const [activitiesWarning, setActivitiesWarning] = useState(false);
  const [priceIncludeWarning, setPriceIncludeWarning] = useState(false);
  const [priceAgeWarning, setPriceAgeWarning] = useState(false);
  const [assemblyWarning, setAssemblyWarning] = useState(false);

  // Reset error display when form changes
  useEffect(() => {
    if (errors.length > 0) {
      // Don't clear errors right away to let the user see them
      setTimeout(() => {
        setShowErrors(false);
      }, 8000); // Hide error after 8 seconds
    }
  }, [errors]);

  // Compress images whenever gallery changes
  useEffect(() => {
    const compressImages = async () => {
      if (gallery.length > 0) {
        setIsLoading(true);
        try {
          const compressed = await Promise.all(
            gallery.map(async (imageUri) => {
              return await compressImage(imageUri);
            })
          );
          setCompressedGallery(compressed);
        } catch (error) {
          console.error("Error compressing images:", error);
          setErrors([
            ...errors,
            "Failed to compress images. Please try using smaller images.",
          ]);
          setShowErrors(true);
        } finally {
          setIsLoading(false);
        }
      } else {
        setCompressedGallery([]);
      }
    };

    compressImages();
  }, [gallery]);

  // Image compression function
  const compressImage = async (uri) => {
    try {
      const compressedImage = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 1200 } }], // Resize to max width of 1200px
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG } // 70% quality
      );

      return compressedImage.uri;
    } catch (error) {
      console.error("Error compressing image:", error);
      // Return original if compression fails
      return uri;
    }
  };

  // Parse API error response and format for display
  const parseApiErrors = (errorData) => {
    const errorMessages = [];

    // Reset all warning flags
    setDateConflictWarning(false);
    setActivitiesWarning(false);
    setPriceIncludeWarning(false);
    setPriceAgeWarning(false);
    setAssemblyWarning(false);

    if (!errorData || !errorData.errors) {
      return ["Unknown error occurred. Please try again."];
    }

    const errors = errorData.errors;

    // Handle date conflict errors
    if (errors.start_datetime) {
      errorMessages.push(`📅 ${errors.start_datetime[0]}`);
      setDateConflictWarning(true);
    }

    // Handle image size errors
    Object.keys(errors).forEach((key) => {
      if (key.startsWith("gallery") && errors[key][0].includes("kilobytes")) {
        errorMessages.push(`🖼️ Image too large: ${errors[key][0]}`);
      }
    });

    // Handle activities errors
    if (errors["activities.0"]) {
      errorMessages.push("⚠️ Activities need both English and Arabic values");
      setActivitiesWarning(true);
    }

    // Handle price include errors
    if (errors["price_include.0"]) {
      errorMessages.push(
        "⚠️ Price includes need both English and Arabic values"
      );
      setPriceIncludeWarning(true);
    }

    // Handle price age errors
    if (errors["price_age.0"]) {
      errorMessages.push("⚠️ Age pricing requires all fields to be completed");
      setPriceAgeWarning(true);
    }

    // Handle assembly errors
    if (errors["assembly.0"]) {
      errorMessages.push(
        "⚠️ Assembly points need time, English and Arabic location"
      );
      setAssemblyWarning(true);
    }

    // If there are no specific errors we recognize, add the generic error
    if (errorMessages.length === 0) {
      errorMessages.push(
        "There was an error with your submission. Please check your form and try again."
      );
    }

    return errorMessages;
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = [];
    let isValid = true;

    if (!nameEn || !nameAr) {
      newErrors.push("Trip name is required in both English and Arabic");
      isValid = false;
    }

    if (!descriptionEn || !descriptionAr) {
      newErrors.push("Description is required in both English and Arabic");
      isValid = false;
    }

    if (!startDatetime || !endDatetime) {
      newErrors.push("Start and end dates are required");
      isValid = false;
    }

    if (!maxAttendance) {
      newErrors.push("Maximum attendance is required");
      isValid = false;
    }

    if (!mainPrice) {
      newErrors.push("Main price is required");
      isValid = false;
    }

    if (gallery.length > 0 && compressedGallery.length === 0) {
      newErrors.push("Please wait for image compression to complete");
      isValid = false;
    }

    // Only show errors if there are any
    if (newErrors.length > 0) {
      setErrors(newErrors);
      setShowErrors(true);
    }

    return isValid;
  };

  // Clean and ensure proper data types for numeric fields
  const prepareNumericData = () => {
    // Convert maxAttendance and mainPrice to numbers
    const cleanedMaxAttendance = parseInt(maxAttendance, 10) || 0;
    const cleanedMainPrice = parseFloat(mainPrice) || 0;

    // Clean price age data
    const cleanedPriceAge = priceAge.map((item) => ({
      min_age: parseInt(item.min_age, 10) || 0,
      max_age: parseInt(item.max_age, 10) || 0,
      cost: parseFloat(item.cost) || 0,
    }));

    // Clean trail data
    const cleanedTrail = {
      min_duration_in_minute: parseInt(trail.min_duration_in_minute, 10) || 60,
      max_duration_in_minute: parseInt(trail.max_duration_in_minute, 10) || 120,
      distance_in_meter: parseFloat(trail.distance_in_meter) || 10.5,
      difficulty: parseInt(trail.difficulty, 10) || 2,
    };

    return {
      maxAttendance: cleanedMaxAttendance,
      mainPrice: cleanedMainPrice,
      priceAge: cleanedPriceAge,
      trail: cleanedTrail,
    };
  };

  const handleSubmit = async () => {
    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    if (!token) {
      setErrors(["You are not authenticated. Please log in."]);
      setShowErrors(true);
      return;
    }

    setIsLoading(true);
    setIsSubmitting(true);
    setUploadProgress(0);
    setShowErrors(false);

    try {
      const formData = new FormData();
      const cleanedData = prepareNumericData();

      // Append basic information
      formData.append("name_en", nameEn.trim());
      formData.append("name_ar", nameAr.trim());
      formData.append("description_en", descriptionEn.trim());
      formData.append("description_ar", descriptionAr.trim());
      formData.append("start_datetime", startDatetime);
      formData.append("end_datetime", endDatetime);
      formData.append("max_attendance", cleanedData.maxAttendance.toString());
      formData.append("main_price", cleanedData.mainPrice.toString());

      // Process compressed gallery images
      if (compressedGallery.length > 0) {
        for (let i = 0; i < compressedGallery.length; i++) {
          const imageUri = compressedGallery[i];
          const uriParts = imageUri.split("/");
          const fileName = uriParts[uriParts.length - 1];

          formData.append(`gallery[${i}]`, {
            uri: imageUri,
            name: fileName || `image${i}.jpg`,
            type: "image/jpeg",
          });

          // Update progress
          setUploadProgress(((i + 1) / compressedGallery.length) * 50);
        }
      }

      // Filter out empty activity entries
      const filteredActivities = activities.filter(
        (item) => item.en.trim() !== "" || item.ar.trim() !== ""
      );

      // Filter out empty price include entries
      const filteredPriceInclude = priceInclude.filter(
        (item) => item.en.trim() !== "" || item.ar.trim() !== ""
      );

      // Filter out empty assembly entries
      const filteredAssembly = assembly.filter(
        (item) =>
          item.time.trim() !== "" ||
          item.place_en.trim() !== "" ||
          item.place_ar.trim() !== ""
      );

      // Append JSON data as strings
      formData.append(
        "activities",
        JSON.stringify(
          filteredActivities.length > 0 ? filteredActivities : activities
        )
      );
      formData.append(
        "price_include",
        JSON.stringify(
          filteredPriceInclude.length > 0 ? filteredPriceInclude : priceInclude
        )
      );
      formData.append("price_age", JSON.stringify(cleanedData.priceAge));
      formData.append(
        "assembly",
        JSON.stringify(
          filteredAssembly.length > 0 ? filteredAssembly : assembly
        )
      );
      formData.append("required_items", JSON.stringify(requiredItems));
      formData.append("is_trail", isTrail ? "1" : "0");

      if (isTrail) {
        formData.append("trail", JSON.stringify(cleanedData.trail));
      }

      setUploadProgress(60);

      // Add timeout for the request
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Request timed out")), 60000); // 60 seconds timeout
      });

      // Create fetch promise
      const fetchPromise = fetch(`${BASE_URL}/guide/trips/store`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "X-API-KEY": "DISCOVERJO91427",
        },
        body: formData,
      });

      // Race between fetch and timeout
      const response = await Promise.race([fetchPromise, timeoutPromise]);

      setUploadProgress(90);

      // Handle response
      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);

        try {
          const errorData = JSON.parse(errorText);
          const parsedErrors = parseApiErrors(errorData);
          setErrors(parsedErrors);
          setShowErrors(true);
          throw new Error(parsedErrors[0]); // Use first error message for the Alert
        } catch (parseError) {
          const errorMessage = `Server error (${response.status}): Please try again`;
          setErrors([errorMessage]);
          setShowErrors(true);
          throw new Error(errorMessage);
        }
      }

      const data = await response.json();
      console.log("Trip created successfully:", data);

      setUploadProgress(100);

      Alert.alert("Success", "Guide trip created successfully!", [
        {
          text: "OK",
          onPress: () => navigation.navigate("AllGuideTrip"),
        },
      ]);
    } catch (error) {
      console.error("Error creating trip:", error);
      // Don't show Alert here since we're showing errors in the UI
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  };

  // Error message component
  const ErrorMessage = ({ message }) => (
    <View style={styles.errorItem}>
      <Ionicons name="alert-circle" size={18} color="#ff4757" />
      <Text style={styles.errorItemText}>{message}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Error messages display */}
      {showErrors && errors.length > 0 && (
        <View style={styles.errorContainer}>
          <View style={styles.errorHeader}>
            <Ionicons name="warning" size={20} color="#ff6b6b" />
            <Text style={styles.errorTitle}>
              Please fix the following errors:
            </Text>
            <TouchableOpacity
              onPress={() => setShowErrors(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={20} color="#666" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={errors}
            renderItem={({ item }) => <ErrorMessage message={item} />}
            keyExtractor={(item, index) => `error-${index}`}
            scrollEnabled={false}
          />
        </View>
      )}

      {/* Progress indicator when submitting */}
      {isSubmitting && (
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Submitting: {Math.round(uploadProgress)}%
          </Text>
          <View style={styles.progressBarContainer}>
            <View
              style={[styles.progressBar, { width: `${uploadProgress}%` }]}
            />
          </View>
        </View>
      )}

      {/* Form Fields */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Information</Text>

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
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dates & Capacity</Text>
        {/* Date Fields using TripDateTime */}
        <TripDateTime
          label="Start Date & Time"
          onDateChange={(date) => {
            setStartDatetime(date);
          }}
          warningActive={dateConflictWarning}
        />
        <TripDateTime
          label="End Date & Time"
          onDateChange={(date) => {
            setEndDatetime(date);
          }}
          warningActive={dateConflictWarning}
        />

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
      </View>

      {/* Gallery Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gallery Images</Text>
        <Text style={styles.infoText}>
          Each image must be less than 2MB in size.
        </Text>

        {isLoading && gallery.length > 0 && (
          <View style={styles.compressingContainer}>
            <ActivityIndicator size="small" color="#FCD228" />
            <Text style={styles.compressingText}>Compressing images...</Text>
          </View>
        )}

        <TripGallery gallery={gallery} setGallery={setGallery} />
      </View>

      {/* Activities Section */}
      <TripActivities
        activities={activities}
        setActivities={setActivities}
        hasWarning={activitiesWarning}
      />

      {/* Price Include Section */}
      <TripPriceInclude
        priceInclude={priceInclude}
        setPriceInclude={setPriceInclude}
        hasWarning={priceIncludeWarning}
      />

      {/* Price by Age Section */}
      <PriceAge
        priceAge={priceAge}
        setPriceAge={setPriceAge}
        hasWarning={priceAgeWarning}
      />

      {/* Assembly Section */}
      <Assembly
        assembly={assembly}
        setAssembly={setAssembly}
        hasWarning={assemblyWarning}
      />

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

      {/* Submit Button with Loading Indicator */}
      <TouchableOpacity
        style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>Create Trip</Text>
        )}
      </TouchableOpacity>

      <HeightSpacer height={150} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  errorContainer: {
    backgroundColor: "#fff8f8",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ffcccc",
    marginBottom: 16,
    overflow: "hidden",
  },
  errorHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffebeb",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ffcccc",
  },
  errorTitle: {
    fontWeight: "bold",
    color: "#ff4757",
    flex: 1,
    marginLeft: 8,
  },
  closeButton: {
    padding: 4,
  },
  errorItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ffeeee",
  },
  errorItemText: {
    color: "#333",
    marginLeft: 8,
    flex: 1,
  },
  progressContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  progressText: {
    fontSize: 14,
    marginBottom: 5,
    color: "#555",
    textAlign: "center",
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: "#eee",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#FCD228",
  },
  section: {
    marginBottom: 24,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    paddingBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
    fontStyle: "italic",
  },
  compressingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    padding: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  compressingText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#FCD228",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  submitButtonDisabled: {
    backgroundColor: "#fce088",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default CreateForm;

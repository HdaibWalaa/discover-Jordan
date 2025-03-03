import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Image
} from "react-native";
import { AuthContext } from "../../store/auth-context";
import { COLORS, TEXT, SIZES } from "../../constants/theme";
import TripDateTime from "../../components/Guide/CreatForm/TripDateTime";
import TripGallery from "../../components/Guide/CreatForm/TripGallery";
import TripActivities from "../../components/Guide/CreatForm/TripActivities";
import TripPriceInclude from "../../components/Guide/CreatForm/TripPriceInclude";
import PriceAge from "../../components/Guide/CreatForm/PriceAge";
import Assembly from "../../components/Guide/CreatForm/Assembly";
import RequiredItems from "../../components/Guide/CreatForm/RequiredItems";
import Trail from "../../components/Guide/CreatForm/Trail";
import { RusableWhite, ReusableText, HeightSpacer } from "../../components";
import axios from "axios";
import BASE_URL from "../../hook/apiConfig";
import * as ImageManipulator from "expo-image-manipulator";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import useFetchGuideTrip from "../../hook/trip/useFetchGuideTrip";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TextInput } from "react-native-gesture-handler";

const EditGuideTrip = ({ route }) => {
  const { tripId, tripName } = route.params;
  const navigation = useNavigation();
  const { token } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false);

  // Form state
  const [nameEn, setNameEn] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [startDatetime, setStartDatetime] = useState("");
  const [endDatetime, setEndDatetime] = useState("");
  const [maxAttendance, setMaxAttendance] = useState("");
  const [mainPrice, setMainPrice] = useState("");
  const [gallery, setGallery] = useState([]);
  const [existingGallery, setExistingGallery] = useState([]);
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
  ]);
  const [isTrail, setIsTrail] = useState(false);
  const [trail, setTrail] = useState({
    min_duration_in_minute: 60,
    max_duration_in_minute: 120,
    distance_in_meter: 10.5,
    difficulty: 2,
  });

  // Warning flags for validation errors
  const [dateConflictWarning, setDateConflictWarning] = useState(false);
  const [activitiesWarning, setActivitiesWarning] = useState(false);
  const [priceIncludeWarning, setPriceIncludeWarning] = useState(false);
  const [priceAgeWarning, setPriceAgeWarning] = useState(false);
  const [assemblyWarning, setAssemblyWarning] = useState(false);

  // Fetch trip data on component mount
  useEffect(() => {
    fetchTripDetails();
  }, [tripId]);

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

  // Reset error display when form changes
  useEffect(() => {
    if (errors.length > 0) {
      // Don't clear errors right away to let the user see them
      setTimeout(() => {
        setShowErrors(false);
      }, 8000); // Hide errors after 8 seconds
    }
  }, [errors]);

  const fetchTripDetails = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/user/guide/trips/show/${tripId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "X-API-KEY": "DISCOVERJO91427",
          },
        }
      );

      if (response.data && response.data.status === 200) {
        const tripData = response.data.data;

        // Parse and set basic info
        setNameEn(tripData.name?.en || "");
        setNameAr(tripData.name?.ar || "");
        setDescriptionEn(tripData.description?.en || "");
        setDescriptionAr(tripData.description?.ar || "");
        setStartDatetime(tripData.start_datetime || "");
        setEndDatetime(tripData.end_datetime || "");
        setMaxAttendance(tripData.max_attendance?.toString() || "");
        setMainPrice(tripData.price?.toString() || "");

        // Process gallery
        if (tripData.gallery && Array.isArray(tripData.gallery)) {
          setExistingGallery(tripData.gallery);
        }

        // Process activities
        if (tripData.activities && Array.isArray(tripData.activities)) {
          const formattedActivities = tripData.activities.map((activity) => {
            if (typeof activity === "string") {
              return { en: activity, ar: activity };
            } else if (typeof activity === "object") {
              return { en: activity.en || "", ar: activity.ar || "" };
            }
            return { en: "", ar: "" };
          });
          setActivities(
            formattedActivities.length > 0
              ? formattedActivities
              : [{ en: "", ar: "" }]
          );
        }

        // Process price includes
        if (tripData.price_include && Array.isArray(tripData.price_include)) {
          const formattedPriceIncludes = tripData.price_include.map((item) => {
            if (typeof item === "string") {
              return { en: item, ar: item };
            } else if (typeof item === "object") {
              return { en: item.en || "", ar: item.ar || "" };
            }
            return { en: "", ar: "" };
          });
          setPriceInclude(
            formattedPriceIncludes.length > 0
              ? formattedPriceIncludes
              : [{ en: "", ar: "" }]
          );
        }

        // Process price age
        if (tripData.age_price && Array.isArray(tripData.age_price)) {
          const formattedPriceAge = tripData.age_price.map((item) => ({
            min_age: item.min_age?.toString() || "",
            max_age: item.max_age?.toString() || "",
            cost: item.price?.toString() || "",
          }));
          setPriceAge(
            formattedPriceAge.length > 0
              ? formattedPriceAge
              : [{ min_age: "", max_age: "", cost: "" }]
          );
        }

        // Process assembly points
        if (tripData.assemblies && Array.isArray(tripData.assemblies)) {
          const formattedAssembly = tripData.assemblies.map((item) => ({
            time: item.time || "",
            place_en: item.place?.en || item.place || "",
            place_ar: item.place?.ar || item.place || "",
          }));
          setAssembly(
            formattedAssembly.length > 0
              ? formattedAssembly
              : [{ time: "", place_en: "", place_ar: "" }]
          );
        }

        // Process required items
        if (tripData.requirements && Array.isArray(tripData.requirements)) {
          const formattedRequirements = tripData.requirements.map((item) => {
            if (typeof item === "string") {
              return { en: item, ar: item };
            } else if (typeof item === "object") {
              return { en: item.en || "", ar: item.ar || "" };
            }
            return { en: "", ar: "" };
          });
          setRequiredItems(
            formattedRequirements.length > 0
              ? formattedRequirements
              : [{ en: "Passport", ar: "جواز السفر" }]
          );
        }

        // Process trail info
        if (tripData.trail) {
          setIsTrail(true);
          setTrail({
            min_duration_in_minute: tripData.trail.min_duration_in_minute || 60,
            max_duration_in_minute:
              tripData.trail.max_duration_in_minute || 120,
            distance_in_meter: tripData.trail.distance_in_meter || 10.5,
            difficulty: tripData.trail.difficulty || 2,
          });
        } else {
          setIsTrail(false);
        }
      } else {
        throw new Error(response.data?.msg || "Failed to fetch trip details");
      }
    } catch (error) {
      console.error("Error fetching trip details:", error);
      Alert.alert("Error", "Failed to load trip details. Please try again.");
      navigation.goBack();
    } finally {
      setIsFetching(false);
    }
  };

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

      // Process compressed gallery images - only add new images
      if (compressedGallery.length > 0) {
        for (let i = 0; i < compressedGallery.length; i++) {
          const imageUri = compressedGallery[i];
          const uriParts = imageUri.split("/");
          const fileName = uriParts[uriParts.length - 1];

          formData.append(`gallery_images[${i}]`, {
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
      const fetchPromise = axios.post(
        `${BASE_URL}/guide/trips/update/${tripId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "X-API-KEY": "DISCOVERJO91427",
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(60 + percentCompleted * 0.4); // 60-100%
          },
        }
      );

      // Race between fetch and timeout
      const response = await Promise.race([fetchPromise, timeoutPromise]);

      setUploadProgress(100);

      // Handle response
      if (response.data && response.data.status === 200) {
        Alert.alert("Success", "Trip updated successfully!", [
          {
            text: "OK",
            onPress: () =>
              navigation.navigate("AllGuideTrip", {
                refreshTimestamp: Date.now(),
              }),
          },
        ]);
      } else {
        throw new Error(response.data?.msg || "Failed to update trip");
      }
    } catch (error) {
      console.error("Error updating trip:", error);

      if (error.response?.data) {
        const parsedErrors = parseApiErrors(error.response.data);
        setErrors(parsedErrors);
        setShowErrors(true);
      } else {
        setErrors([
          error.message || "Failed to update trip. Please try again.",
        ]);
        setShowErrors(true);
      }
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

  if (isFetching) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading trip details...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Trip</Text>
      </View>

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
          {errors.map((error, index) => (
            <ErrorMessage key={`error-${index}`} message={error} />
          ))}
        </View>
      )}

      {/* Progress indicator when submitting */}
      {isSubmitting && (
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Updating: {Math.round(uploadProgress)}%
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
          initialDate={startDatetime}
          onDateChange={(date) => {
            setStartDatetime(date);
          }}
          warningActive={dateConflictWarning}
        />
        <TripDateTime
          label="End Date & Time"
          initialDate={endDatetime}
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

        {existingGallery.length > 0 && (
          <View style={styles.existingGallerySection}>
            <Text style={styles.subsectionTitle}>Current Images</Text>
            <Text style={styles.infoText}>
              These are your current trip images. Add new images below if you
              want to add more.
            </Text>
            <View style={styles.existingGalleryContainer}>
              {existingGallery.map((imageUrl, index) => (
                <View
                  key={`existing-${index}`}
                  style={styles.existingImageWrapper}
                >
                  <Image
                    source={{ uri: imageUrl }}
                    style={styles.existingImage}
                  />
                </View>
              ))}
            </View>
          </View>
        )}

        <Text style={styles.subsectionTitle}>Add New Images</Text>
        <Text style={styles.infoText}>
          Each image must be less than 2MB in size. Images will be automatically
          compressed.
        </Text>

        {isLoading && gallery.length > 0 && (
          <View style={styles.compressingContainer}>
            <ActivityIndicator size="small" color={COLORS.primary} />
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
          <Text style={styles.submitButtonText}>Update Trip</Text>
        )}
      </TouchableOpacity>

      <HeightSpacer height={150} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: hp(5),
    paddingBottom: hp(2),
    paddingHorizontal: wp(5),
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    color: COLORS.white,
    marginLeft: wp(3),
  },
  backButton: {
    padding: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: COLORS.gray,
  },
  errorContainer: {
    backgroundColor: "#fff8f8",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ffcccc",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
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
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
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
    backgroundColor: COLORS.primary,
  },
  section: {
    marginHorizontal: 16,
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
  subsectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 16,
    color: "#333",
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
  existingGallerySection: {
    marginBottom: 16,
  },
  existingGalleryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  existingImageWrapper: {
    margin: 4,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#eee",
  },
  existingImage: {
    width: 80,
    height: 80,
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
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 16,
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

export default EditGuideTrip;

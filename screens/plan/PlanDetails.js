import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  NativeModules,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import fetchPlanDetails from "../../hook/plane/fetchPlandetails";
import { AuthContext } from "../../store/auth-context";
import { useRoute } from "@react-navigation/native";
import styles from "../../components/Plan/PlanDetailsStyles";
import {
  ReusableBackground,
  ReusableFavorite,
  ReusableText,
} from "../../components";
import { COLORS, TEXT } from "../../constants/theme";
import ActivityCard from "../../components/Tiles/plan/ActivityCard";
import PlanDays from "../../components/Tiles/plan/PlanDayes";


const PlanDetails = () => {
  const [planDetails, setPlanDetails] = useState(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const authCtx = useContext(AuthContext);
  const route = useRoute();
  const { id } = route.params;
  console.log("Plan ID from route params:", id);

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
      const fetchAndSetPlanDetails = async () => {
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
          console.log("Plan Details:", details);
          setPlanDetails(details);
        } catch (error) {
          setError("Failed to fetch plan details");
          console.error(error);
        }
      };

      fetchAndSetPlanDetails();
    }
  }, [authCtx, route.params?.id, language]);

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  const handleDayPress = (index) => {
    setSelectedDay(index);
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!planDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const activities = planDetails.days[selectedDay].activities;

  return (
    <ReusableBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <ReusableText
            text={planDetails.name}
            family={"Bold"}
            size={TEXT.xLarge}
            color={COLORS.black}
          />
          <ReusableFavorite />
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
            style={styles.description}
          />
          {planDetails.description.length > 100 && (
            <TouchableOpacity onPress={toggleDescription}>
              <Text style={styles.readMoreText}>
                {showFullDescription ? "Read Less" : "Read More"}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {planDetails.days.length > 1 && (
          <View style={styles.daysTabs}>
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
              key={index}
              activity={activity}
              showConnector={index !== activities.length - 1}
            />
          ))
        ) : (
          <Text>No activities available for this plan.</Text>
        )}
      </ScrollView>
    </ReusableBackground>
  );
};

export default PlanDetails;


import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Text,
  Platform,
  NativeModules,
  ActivityIndicator,
  Alert,
} from "react-native";
import reusable from "../../components/Reusable/reusable.style";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from "@react-navigation/native";
import { ReusableText, ReusableBackground } from "../../components";
import FilterCity from "../../components/Plan/FilterCity";
import FilterDays from "../../components/Plan/FilterDays";
import fetchUserAdminPlan from "../../hook/plane/fetchUserAdminPlan";
import PlanCard from "../../components/Tiles/plan/PlanCard";
import { AuthContext } from "../../store/auth-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AllPlans = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const authCtx = useContext(AuthContext); // Get auth context
  const [daysFilter, setDaysFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [data, setData] = useState([]);
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Get the refreshTrigger from route params if available
  const refreshTrigger = route.params?.refreshTrigger;

  // Load plans function with better authentication handling
  const loadPlans = async () => {
    try {
      setLoading(true);

      // Use context token if available (check if it exists and is not empty)
      let token = authCtx?.token || null;
      console.log("Token from authCtx:", token ? "Yes" : "No");

      // If no token in context, try AsyncStorage
      if (!token) {
        token = await AsyncStorage.getItem("authToken");
        console.log("Token from AsyncStorage:", token ? "Yes" : "No");
      }

      // If still no token, handle auth required
      if (!token) {
        console.log("No token found anywhere");
        handleAuthRequired();
        return;
      }

      // Fetch plans with the token
      console.log("Fetching plans with token");
      const fetchedPlans = await fetchUserAdminPlan(language, token);
      console.log(`Retrieved ${fetchedPlans.length} plans`);

      setData(fetchedPlans);
      setError(null);
    } catch (error) {
      console.error("Error in loadPlans:", error.message);

      if (
        error.message.includes("Authentication") ||
        error.message.includes("token") ||
        error.status === 401
      ) {
        handleAuthRequired();
      } else {
        setError("Failed to fetch plans. Please try again.");
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Handle when authentication is required
  const handleAuthRequired = () => {
    setError("You need to log in to view your plans.");

    // Option 1: Alert user and redirect to login
    Alert.alert(
      "Authentication Required",
      "Please log in to view your plans.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Log In",
          onPress: () => navigation.navigate("Login"), // Adjust to your login screen name
        },
      ]
    );

    // Option 2: Just set empty data and don't redirect
    setData([]);
  };

  // Initialize component with language detection
  useEffect(() => {
    const setupLanguage = () => {
      const deviceLanguage =
        Platform.OS === "ios"
          ? NativeModules.SettingsManager.settings.AppleLocale ||
            NativeModules.SettingsManager.settings.AppleLanguages[0]
          : NativeModules.I18nManager.localeIdentifier;

      let lang = deviceLanguage?.includes("_")
        ? deviceLanguage.split("_")[0]
        : deviceLanguage?.split("-")[0];

      return lang || "en";
    };

    // Set language
    const lang = setupLanguage();
    setLanguage(lang);
  }, []);

  // Refresh data when the component gains focus or when refreshTrigger changes
  useFocusEffect(
    useCallback(() => {
      console.log(
        "AllPlans screen is focused or refreshTrigger changed - reloading data"
      );
      loadPlans();
      return () => {
        // Optional cleanup
      };
    }, [language, refreshTrigger]) // Also re-run if refreshTrigger changes
  );

  // Handle pull-to-refresh
  const handleRefresh = () => {
    setRefreshing(true);
    loadPlans();
  };

  const capitalize = (str) =>
    str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const filteredPlans = data.filter((plan) => {
    if (!plan) return false;

    const matchesDays =
      daysFilter === "" || plan.number_of_days === parseInt(daysFilter);

    const matchesCity =
      cityFilter === "" ||
      (plan.place &&
        plan.place.region &&
        plan.place.region.toLowerCase().includes(cityFilter.toLowerCase()));

    return matchesDays && matchesCity;
  });

  const renderEmptyList = () => {
    if (loading && !refreshing) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.emptyText}>Loading plans...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadPlans}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (filteredPlans.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Image
            source={require("../../assets/images/icons/content.png")}
            style={styles.emptyIcon}
          />
          <Text style={styles.emptyText}>No plans found</Text>
          <Text style={styles.emptySubtext}>
            Create your first travel plan!
          </Text>
          <TouchableOpacity
            style={styles.createEmptyButton}
            onPress={() => navigation.navigate("CreatPlan")}
          >
            <Text style={styles.createEmptyButtonText}>Create New Plan</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  };

  return (
    <ReusableBackground>
      <SafeAreaView style={[reusable.container, styles.safeArea]}>
        <View>
          <View style={reusable.header1}>
            <View style={styles.headerTextContainer}>
              <ReusableText
                text={capitalize("planning your upcoming journey")}
                family="Bold"
                size={TEXT.large}
                color={COLORS.black}
              />
            </View>

            <View style={styles.createButtonContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate("CreatPlan")}
              >
                <View style={styles.createButtonContent}>
                  <Image
                    source={require("../../assets/images/icons/creat.png")}
                    style={styles.createIcon}
                  />
                  <ReusableText
                    text={capitalize("create")}
                    family="SemiBold"
                    size={SIZES.small}
                    color={COLORS.black}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <FlatList
          data={filteredPlans}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <PlanCard item={item} token={authCtx?.token} />
            </View>
          )}
          contentContainerStyle={
            filteredPlans.length === 0 ? { flex: 1 } : { paddingBottom: 20 }
          }
          ListEmptyComponent={renderEmptyList}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{ height: 50 }} />}
          onRefresh={handleRefresh}
          refreshing={refreshing}
        />
      </SafeAreaView>
    </ReusableBackground>
  );
};

export default AllPlans;

const styles = StyleSheet.create({
  safeArea: {
    marginTop: hp(5),
  },
  headerTextContainer: {
    width: wp(60),
    marginBottom: hp(2),
  },
  createButtonContainer: {
    justifyContent: "center",
    alignItems: "stretch",
    borderRadius: 8,
    backgroundColor: "#FCD228",
    display: "flex",
    fontSize: 14,
    color: "#000",
    fontWeight: "400",
    padding: 12,
  },
  createButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  createIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
    transform: [{ rotate: "90deg" }],
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: hp(2),
    paddingHorizontal: wp(2),
  },
  cardContainer: {
    paddingHorizontal: wp(2),
    marginBottom: hp(1),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: wp(5),
  },
  emptyIcon: {
    width: wp(20),
    height: wp(20),
    marginBottom: hp(2),
    tintColor: COLORS.gray,
  },
  emptyText: {
    fontFamily: "Medium",
    fontSize: SIZES.medium,
    color: COLORS.black,
    marginBottom: hp(1),
    textAlign: "center",
  },
  emptySubtext: {
    fontFamily: "Regular",
    fontSize: SIZES.small,
    color: COLORS.gray,
    marginBottom: hp(2),
    textAlign: "center",
  },
  errorText: {
    fontFamily: "Medium",
    fontSize: SIZES.medium,
    color: COLORS.red,
    marginBottom: hp(2),
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp(5),
    paddingVertical: hp(1),
    borderRadius: 8,
  },
  retryButtonText: {
    fontFamily: "Medium",
    fontSize: SIZES.small,
    color: COLORS.white,
  },
  createEmptyButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp(5),
    paddingVertical: hp(1.5),
    borderRadius: 8,
    marginTop: hp(1),
  },
  createEmptyButtonText: {
    fontFamily: "Medium",
    fontSize: SIZES.small,
    color: COLORS.white,
  },
});

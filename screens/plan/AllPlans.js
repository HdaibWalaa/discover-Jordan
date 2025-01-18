import React, { useState, useEffect } from "react";
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
} from "react-native";
import reusable from "../../components/Reusable/reusable.style";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { ReusableText, ReusableBackground } from "../../components";
import FilterCity from "../../components/Plan/FilterCity";
import FilterDays from "../../components/Plan/FilterDays";
import fetchPlans from "../../hook/plane/fetchPlanes";
import PlanCard from "../../components/Tiles/plan/PlanCard";

const AllPlans = () => {
  const navigation = useNavigation();
  const [daysFilter, setDaysFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [data, setData] = useState([]);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const deviceLanguage =
      Platform.OS === "ios"
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0]
        : NativeModules.I18nManager.localeIdentifier;

    let lang = deviceLanguage?.includes("_")
      ? deviceLanguage.split("_")[0]
      : deviceLanguage?.split("-")[0];

    lang = lang || "en";
    setLanguage(lang);

    // Fetch the plans
    fetchPlans(lang)
      .then((fetchedPlans) => setData(fetchedPlans))
      .catch((error) => console.error(error));
  }, []);

  const capitalize = (str) =>
    str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const filteredPlans = data.filter((plan) => {
    const matchesDays =
      daysFilter === "" || plan.number_of_days === parseInt(daysFilter);
    const matchesCity =
      cityFilter === "" ||
      plan.place.region.toLowerCase().includes(cityFilter.toLowerCase());
    return matchesDays && matchesCity;
  });

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
        <View style={styles.filterContainer}>
          {/* <FilterDays onFilterChange={setDaysFilter} /> */}
          {/* <FilterCity onFilterChange={setCityFilter} /> */}
        </View>
        <FlatList
          data={filteredPlans}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ marginRight: SIZES.medium }}>
              <PlanCard item={item} />
            </View>
          )}
        />
      </SafeAreaView>
    </ReusableBackground>
  );
};

export default AllPlans;

const styles = StyleSheet.create({
  safeArea: {
    marginTop: 50,
  },
  headerTextContainer: {
    width: 200,
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
    marginVertical: 10,
  },
});

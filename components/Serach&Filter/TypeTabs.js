import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { COLORS,TEXT } from "../../constants/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTheme } from "../../store/context/ThemeContext";
import { useLanguage } from "../../store/context/LanguageContext";
import ReusableText from "../Reusable/ReusableText";

const TypeTabs = ({ selectedType, onSelectType }) => {
  const { mode } = useTheme();
  const isDarkMode = mode === "dark";
  const { translations } = useLanguage(); // Get translations

  const types = [
    { id: "all", label: translations.all || "All", icon: "dashboard" },
    { id: "places", label: translations.places || "Places", icon: "place" },
    {
      id: "trips",
      label: translations.trips || "Trips",
      icon: "directions-car",
    },
    { id: "plans", label: translations.plans || "Plans", icon: "event" },
    { id: "users", label: translations.users || "Users", icon: "people" },
    {
      id: "popular",
      label: translations.popularPlaces || "Popular Places",
      icon: "star",
    },
    {
      id: "topten",
      label: translations.topTenPlaces || "Top Ten Places",
      icon: "format-list-numbered",
    },
    {
      id: "events",
      label: translations.events || "Events",
      icon: "event-note",
    },
    {
      id: "volunteering",
      label: translations.volunteering || "Volunteering",
      icon: "volunteer-activism",
    },
    {
      id: "categories",
      label: translations.categories || "Categories",
      icon: "category",
    },
    {
      id: "guidetrips",
      label: translations.guideTrips || "Guided Trips",
      icon: "explore",
    },
  ];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? COLORS.darkBackground
            : COLORS.lightGray,
        },
      ]}
    >
      <FlatList
        data={types}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.tab,
              selectedType === item.id && styles.selectedTab,
              {
                backgroundColor: isDarkMode ? COLORS.lightGrey : COLORS.white,
              },
            ]}
            onPress={() => onSelectType(item.id)}
          >
            <View style={styles.iconContainer}>
              <Icon
                name={item.icon}
                size={24}
                color={
                  selectedType === item.id
                    ? COLORS.primary
                    : isDarkMode
                    ? COLORS.secondary
                    : COLORS.darkGray
                }
              />
            </View>
            
            <ReusableText
              text={item.label}
              family={"Bold"}
              size={TEXT.large}
              color={COLORS.black}
              style={[
                styles.tabText,
                selectedType === item.id && styles.selectedTabText,
                { color: isDarkMode ? COLORS.black : COLORS.darkGray },
              ]}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingLeft: 10,
    top: wp(5),
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    marginVertical: 5,
    elevation: 3, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 }, // For iOS shadow
    shadowOpacity: 0.2, // For iOS shadow
    shadowRadius: 2, // For iOS shadow
    minWidth: 80,
    height: 70,
  },
  selectedTab: {
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 5,
  },
  tabText: {
    fontSize: 14,
  },
  selectedTabText: {
    color: COLORS.primary,
  },
});

export default TypeTabs;

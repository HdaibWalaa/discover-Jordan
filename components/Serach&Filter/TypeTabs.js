import React from "react";
import { View, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import {
  FontAwesome5,
  MaterialIcons,
  Ionicons,
} from "react-native-vector-icons";
import { COLORS, TEXT } from "../../constants/theme";
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
  const { language } = useLanguage(); // Get language

  const currentLanguage = language || "en";
  const translations = useLanguage().translations || {};

  // Using the card data format you specified
  const types = [
    { id: 1, text: "All", icon: "search", library: FontAwesome5 },
    {
      id: 2,
      text: translations[currentLanguage]?.places || "Places",
      icon: "place",
      library: MaterialIcons,
    },
    {
      id: 3,
      text: translations[currentLanguage]?.trips || "Trips",
      icon: "route",
      library: FontAwesome5,
    },
    {
      id: 4,
      text: translations[currentLanguage]?.events || "Events",
      icon: "event",
      library: MaterialIcons,
    },
    {
      id: 5,
      text: translations[currentLanguage]?.Plans || "Plans",
      icon: "calendar",
      library: Ionicons,
    },
    {
      id: 6,
      text: translations[currentLanguage]?.volunteers || "Volunteers",
      icon: "hand-holding-heart",
      library: FontAwesome5,
    },
    {
      id: 7,
      text: translations[currentLanguage]?.guideTrips || "Guide Trips",
      icon: "map",
      library: FontAwesome5,
    },
    {
      id: 8,
      text: translations[currentLanguage]?.Users || "Users",
      icon: "user",
      library: FontAwesome5,
    },
  ];

  const renderIcon = (item) => {
    const IconComponent = item.library;
    return (
      <IconComponent
        name={item.icon}
        size={20}
        color={
          selectedType === item.id
            ? COLORS.primary
            : isDarkMode
            ? COLORS.secondary
            : COLORS.darkGray
        }
      />
    );
  };

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
        keyExtractor={(item) => item.id.toString()}
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
            <View style={styles.iconContainer}>{renderIcon(item)}</View>

            <ReusableText
              text={item.text}
              family={"semiBold"}
              size={TEXT.small}
              color={
                selectedType === item.id
                  ? COLORS.primary
                  : isDarkMode
                  ? COLORS.white
                  : COLORS.darkGray
              }
              style={styles.tabText}
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

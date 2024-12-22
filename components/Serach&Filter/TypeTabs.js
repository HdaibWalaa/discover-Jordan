import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { COLORS } from "../../constants/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const types = [
  { id: "all", label: "All", icon: "dashboard" },
  { id: "places", label: "Places", icon: "place" },
  { id: "trips", label: "Trips", icon: "directions-car" },
  { id: "plans", label: "Plans", icon: "event" },
  { id: "users", label: "Users", icon: "people" },
  { id: "popular", label: "Popular Places", icon: "star" },
  { id: "topten", label: "Top Ten Places", icon: "format-list-numbered" },
  { id: "events", label: "Events", icon: "event-note" },
  { id: "volunteering", label: "Volunteering", icon: "volunteer-activism" },
  { id: "categories", label: "Categories", icon: "category" },
  { id: "guidetrips", label: "Guided Trips", icon: "explore" },
];

const TypeTabs = ({ selectedType, onSelectType }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={types}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.tab, selectedType === item.id && styles.selectedTab]}
            onPress={() => onSelectType(item.id)}
          >
            <View style={styles.iconContainer}>
              <Icon
                name={item.icon}
                size={24}
                color={
                  selectedType === item.id ? COLORS.primary : COLORS.darkGray
                }
              />
            </View>
            <Text
              style={[
                styles.tabText,
                selectedType === item.id && styles.selectedTabText,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: COLORS.lightGray,
    paddingLeft: 10,
    top: wp(-5),
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    marginHorizontal: 5,
    marginVertical: 5,
    elevation: 3, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 }, // For iOS shadow
    shadowOpacity: 0.2, // For iOS shadow
    shadowRadius: 2, // For iOS shadow
    minWidth: 80, // Ensures consistent width for tabs
    height: 70, // Ensures consistent height for tabs
  },
  selectedTab: {
    backgroundColor: COLORS.lightPrimary,
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 5, // Adds space between icon and text
  },
  tabText: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
  selectedTabText: {
    color: COLORS.primary,
  },
});

export default TypeTabs;

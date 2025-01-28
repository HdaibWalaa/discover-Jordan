import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ReusableText } from "../index";
import { useTheme } from "../../store/context/ThemeContext";
import { useLanguage } from "../../store/context/LanguageContext";
import { COLORS, TEXT } from "../../constants/theme";

const OverView = () => {
  const navigation = useNavigation();
  const { mode } = useTheme(); // Access theme mode
  const { translations } = useLanguage(); // Access translations
  const isDarkMode = mode === "dark";

  return (
    <View style={styles.container}>
      <ReusableText
        text={translations.overview || "Overview"}
        family={"Bold"}
        size={TEXT.xmedium}
        color={isDarkMode ? COLORS.white : COLORS.black} // Dynamic text color
        align={"left"}
        style={styles.sectionTitle}
      />
      <View style={styles.gridContainer}>
        {/* My Posts Card */}
        <TouchableOpacity
          style={[
            styles.card,
            { backgroundColor: isDarkMode ? COLORS.gray : COLORS.white }, // Dynamic card background
          ]}
          onPress={() => navigation.navigate("AllUserPosts")}
        >
          <Ionicons
            name="list-outline"
            size={wp("6%")}
            color={isDarkMode ? COLORS.lightPrimary : "#00aaff"} // Dynamic icon color
          />
          <View style={styles.cardText}>
            <Text
              style={[
                styles.cardTitle,
                { color: isDarkMode ? COLORS.white : COLORS.black }, // Dynamic text color
              ]}
            >
              {translations.myPosts || "My Posts"}
            </Text>
          </View>
        </TouchableOpacity>
        {/* Plans Card */}
        <TouchableOpacity
          style={[
            styles.card,
            { backgroundColor: isDarkMode ? COLORS.gray : COLORS.white }, // Dynamic card background
          ]}
          onPress={() => navigation.navigate("UserAllPlans")}
        >
          <Ionicons
            name="calendar-outline"
            size={wp("6%")}
            color={isDarkMode ? COLORS.lightPrimary : "#00aaff"} // Dynamic icon color
          />
          <View style={styles.cardText}>
            <Text
              style={[
                styles.cardTitle,
                { color: isDarkMode ? COLORS.white : COLORS.black }, // Dynamic text color
              ]}
            >
              {translations.myPlans || "My Plans"}
            </Text>
          </View>
        </TouchableOpacity>
        {/* Trips Card */}
        <TouchableOpacity
          style={[
            styles.card,
            { backgroundColor: isDarkMode ? COLORS.gray : COLORS.white }, // Dynamic card background
          ]}
          onPress={() => navigation.navigate("UserAllTrips")}
        >
          <FontAwesome6
            name="map-location-dot"
            size={wp("5%")}
            color={isDarkMode ? COLORS.lightPrimary : "#00aaff"} // Dynamic icon color
          />
          <View style={styles.cardText}>
            <Text
              style={[
                styles.cardTitle,
                { color: isDarkMode ? COLORS.white : COLORS.black }, // Dynamic text color
              ]}
            >
              {translations.myTrips || "My Trips"}
            </Text>
          </View>
        </TouchableOpacity>
        {/* Favorites Card */}
        <TouchableOpacity
          style={[
            styles.card,
            { backgroundColor: isDarkMode ? COLORS.gray : COLORS.white }, // Dynamic card background
          ]}
          onPress={() => navigation.navigate("Favorites")}
        >
          <Ionicons
            name="heart-outline"
            size={wp("6%")}
            color={isDarkMode ? COLORS.lightPrimary : "#00aaff"} // Dynamic icon color
          />
          <View style={styles.cardText}>
            <Text
              style={[
                styles.cardTitle,
                { color: isDarkMode ? COLORS.white : COLORS.black }, // Dynamic text color
              ]}
            >
              {translations.favorites || "Favorites"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OverView;

const styles = StyleSheet.create({
  container: {
   
  },
  sectionTitle: {
    marginBottom: hp("2%"),
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: hp("1%"),
  },
  card: {
    width: "44%",
    borderRadius: wp("3%"),
    padding: wp("4%"),
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardText: {
    marginLeft: wp("3%"),
  },
  cardTitle: {
    fontSize: wp("4%"),
    fontWeight: "600",
  },
});

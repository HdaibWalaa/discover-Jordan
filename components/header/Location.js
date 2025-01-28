import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useTheme } from "../../store/context/ThemeContext";
import { useLanguage } from "../../store/context/LanguageContext";

const LocationComponent = ({ location, onPress }) => {
  const { translations } = useLanguage();
  const { mode } = useTheme();
  const isDarkMode = mode === "dark";

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.locationContainer, { width: wp(60) }]}>
        <View style={styles.locationRow}>
          <Text
            style={[
              styles.currentLocationText,
              { color: isDarkMode ? "#D3D3D3" : "#5A5A5A", fontSize: wp(3.5) },
            ]}
          >
            {translations.currentlocation}
          </Text>

          <View style={styles.iconWrapper}>
            <AntDesign
              name="down"
              style={[
                styles.icon,
                { color: isDarkMode ? "#D3D3D3" : "#5A5A5A", fontSize: wp(3) },
              ]}
            />
          </View>
        </View>

        <Text
          style={[
            styles.locationText,
            { color: isDarkMode ? "#FFFFFF" : "#000000", fontSize: wp(3.5) },
          ]}
        >
          {location || translations.pressToSaveAddress}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  locationContainer: {
    marginLeft: wp(3),
    borderRadius: wp(1),
    padding: wp(2),
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  currentLocationText: {
    fontFamily: "SemiBold",
    fontWeight: "400",
    lineHeight: wp(4),
    letterSpacing: 0.5,
    textAlign: "left",
  },
  iconWrapper: {
    marginLeft: wp(0.7),
  },
  icon: {},
  locationText: {
    textTransform: "uppercase",
    fontFamily: "SemiBold",
    lineHeight: wp(4.5),
    letterSpacing: 0.1,
    textAlign: "left",
    width: wp(50),
    height: wp(4.5),
    top: wp(1.2),
  },
});

export default LocationComponent;

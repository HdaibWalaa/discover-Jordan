import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import { useLanguage } from "../../store/context/LanguageContext";
import translations from "../../translations/translations";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ReusableText from "../Reusable/ReusableText";

const TripStatus = ({ tripDetails }) => {
  const { language } = useLanguage();
  const t = translations[language]; // Get translated text

  const isActive = tripDetails.status === 1; // Check if the trip is active

  return (
    <View style={styles.placeInfo}>
      <View style={styles.placeNameContainer}>
        <Image
          source={require("../../assets/images/icons/pin.png")}
          style={styles.placeIcon}
        />
        <ReusableText
          text={`${t.place}: ${tripDetails.place_name}`}
          family={"Medium"}
          size={TEXT.medium}
          color={COLORS.dark}
          style={styles.titleText}
        />
      </View>
      <View
        style={[
          styles.statusBadge,
          { backgroundColor: isActive ? "#2DE78D" : "#FF4D4D" }, // Green for active, red for inactive
        ]}
      >
        <Text style={styles.statusText}>
          {isActive ? t.active : t.inactive}
        </Text>
      </View>
    </View>
  );
};

export default TripStatus;

const styles = StyleSheet.create({
  placeInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  placeNameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  placeIcon: {
    marginRight: wp("2%"),
    width: wp("6%"),
    height: wp("6%"),
  },
  statusBadge: {
    paddingHorizontal: wp("4%"),
    paddingVertical: hp("0.5%"),
    borderRadius: wp("8%"),
  },
  statusText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
  },
});

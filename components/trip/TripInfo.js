import { StyleSheet, View, Image } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants/theme";
import ReusableText from "../Reusable/ReusableText";
import { useLanguage } from "../../store/context/LanguageContext";
import translations from "../../translations/translations";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const FEMALE_ICON = require("../../assets/images/icons/female.png");
const MALE_ICON = require("../../assets/images/icons/male.png");
const BOTH_ICON = require("../../assets/images/icons/both.png");
const WALLET_ICON = require("../../assets/images/icons/walletTrip.png");
const SMILE_ICON = require("../../assets/images/icons/smile.png");

const TripInfo = ({ tripDetails }) => {
  const { language } = useLanguage();
  const t = translations[language]; // 🌍 Get translated text

  const genderIcon =
    tripDetails.gender === "Female"
      ? FEMALE_ICON
      : tripDetails.gender === "Male"
      ? MALE_ICON
      : BOTH_ICON;

  return (
    <View style={styles.additionalInfoContainer}>
      <View style={styles.additionalInfoItem}>
        <Image source={genderIcon} style={styles.icon} />
        <ReusableText
          text={tripDetails.gender}
          family={"Regular"}
          size={SIZES.medium}
          color={COLORS.gray}
        />
      </View>

      <View style={styles.additionalInfoItem}>
        <Image source={WALLET_ICON} style={styles.icon} />
        <ReusableText
          text={`${tripDetails.cost} JOD`}
          family={"Regular"}
          size={SIZES.medium}
          color={COLORS.gray}
        />
      </View>

      {/* Age Range Info */}
      <View style={styles.additionalInfoItem}>
        <Image source={SMILE_ICON} style={styles.icon} />
        <ReusableText
          text={`${tripDetails.age_min} - ${tripDetails.age_max}`} // Dynamic translation
          family={"Regular"}
          size={SIZES.medium}
          color={COLORS.gray}
        />
      </View>
    </View>
  );
};

export default TripInfo;

const styles = StyleSheet.create({
  additionalInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp("2%"),
  },
  additionalInfoItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: hp("9%"),
    borderRadius: wp("3%"),
    backgroundColor: "#F6F6F6",
    marginHorizontal: wp("1.5%"),
    borderWidth: 2,
    borderColor: COLORS.lightGrey,
  },
  icon: {
    height: wp("7%"),
    width: wp("7%"),
    marginBottom: hp("1%"),
  },
});

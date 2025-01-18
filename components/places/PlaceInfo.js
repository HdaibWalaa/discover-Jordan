import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { ReusableText, ReusableRegionLocation } from "../../components/index";
import PlaceStatus from "../../components/places/PlaceStatus";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS, SIZES } from "../../constants/theme";

const PlaceInfo = ({ placeData }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const formatDescription = (text) => {
    if (!text) return "";

    text = text.replace(/^"|"$/g, "").replace(/^'|'$/g, "");
    text = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

    return text;
  };

  const truncateDescription = (text) => {
    const maxLength = 120;
    if (text.length > maxLength) {
      return `${text.slice(0, maxLength)}... `;
    }
    return text;
  };

  const formattedDescription = formatDescription(placeData?.description || "");

  return (
    <View style={styles.container}>
      <ReusableText
        text={placeData.name.toUpperCase()}
        family={"SemiBold"}
        size={SIZES.large}
        color={COLORS.black}
        style={styles.placeName}
      />
      <View style={styles.rowContainer}>
        <ReusableRegionLocation
          region={placeData.region}
          textColor={COLORS.black}
          iconColor={COLORS.secondary}
        />
        <View style={styles.statusContainer}>
          <PlaceStatus openingHours={placeData.opening_hours} />
        </View>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          {showFullDescription
            ? formattedDescription
            : truncateDescription(formattedDescription)}
          {!showFullDescription && formattedDescription.length > 150 && (
            <TouchableOpacity onPress={() => setShowFullDescription(true)}>
              <Text style={styles.readMoreText}>Read more</Text>
            </TouchableOpacity>
          )}
          {showFullDescription && (
            <TouchableOpacity onPress={() => setShowFullDescription(false)}>
              <Text style={styles.readMoreText}>Read less</Text>
            </TouchableOpacity>
          )}
        </Text>
      </View>
    </View>
  );
};

export default PlaceInfo;

const styles = StyleSheet.create({
  container: {
    top: hp(1),
    padding: wp("5%"),
  },
  placeName: {
    width: wp("60%"),
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp("1.3%"),
  },
  statusContainer: {
    top: hp(-1),
    right: wp(2),
  },
  descriptionContainer: {
    padding: wp("2%"),
  },
  sectionTitle: {
    marginBottom: hp("1%"),
  },
  description: {
    textAlign: "justify",
    fontFamily: "Regular",
    fontSize: wp("4%"),
    color: COLORS.gray,
    lineHeight: hp("3%"),
    marginBottom: hp("-1%"),
  },
  readMoreText: {
    color: COLORS.secondary,
    textAlign: "justify",
    fontFamily: "Regular",
    fontSize: wp("4%"),
    marginTop: hp("0.5%"),
    lineHeight: hp("3%"),
  },
});

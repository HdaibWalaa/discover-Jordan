import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants/theme";
import ReusableText from "../Reusable/ReusableText";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const PlaceFeatures = ({ features }) => {
  const [showAll, setShowAll] = useState(false);

  const handleShowMore = () => {
    setShowAll(!showAll);
  };

  const featuresToDisplay = showAll ? features : features.slice(0, 3);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ReusableText
          text={"Features"}
          family={"SemiBold"}
          size={wp("4%")}
          color={COLORS.black}
          style={styles.sectionTitle}
        />
      </View>
      <View style={styles.featuresContainer}>
        {featuresToDisplay.map((feature, index) => (
          <View key={index} style={styles.featureTag}>
            <Text style={styles.featureText}>{feature.name}</Text>
          </View>
        ))}
        {features.length > 3 && (
          <TouchableOpacity
            onPress={handleShowMore}
            style={styles.showMoreButton}
          >
            <Text style={styles.showMoreText}>
              {showAll ? "Show Less" : "Show More"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default PlaceFeatures;

const styles = StyleSheet.create({
  container: {
    marginBottom: hp("2%"),
    marginHorizontal: wp("2%"),
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("1%"),
  },
  sectionTitle: {
    marginRight: wp("2%"),
  },
  featuresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  featureTag: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: wp("5%"),
    paddingVertical: hp("0.5%"),
    paddingHorizontal: wp("3%"),
    margin: wp("1%"),
  },
  featureText: {
    fontSize: wp("3.5%"),
    color: COLORS.black,
  },
  showMoreButton: {
    margin: wp("1%"),
    paddingVertical: hp("0.5%"),
    paddingHorizontal: wp("3%"),
    borderRadius: wp("5%"),
    borderWidth: 1,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.lightGray,
  },
  showMoreText: {
    fontSize: wp("3.5%"),
    color: COLORS.secondary,
  },
});

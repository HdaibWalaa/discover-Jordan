import React from "react";
import { View, ScrollView, StyleSheet, Animated } from "react-native";
import { useSkeletonAnimation } from "./skeletonAnimation";
import PlanDaysSkeleton from "./PlanDaysSkeleton";
import ActivityCardSkeleton from "./ActivityCardSkeleton";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const PlanDetailsSkeleton = ({ activitiesCount = 3 }) => {
  const animatedColor = useSkeletonAnimation();

  return (
    <ScrollView style={styles.container}>
      {/* Header Skeleton */}
      <View style={styles.header}>
        <Animated.View
          style={[styles.titleSkeleton, { backgroundColor: animatedColor }]}
        />
        <View style={styles.headerButtonsContainer}>
          <Animated.View
            style={[styles.headerButton, { backgroundColor: animatedColor }]}
          />
          <Animated.View
            style={[styles.headerButton, { backgroundColor: animatedColor }]}
          />
        </View>
      </View>

      {/* Description Skeleton */}
      <View style={styles.descriptionContainer}>
        <Animated.View
          style={[
            styles.descriptionLine,
            { backgroundColor: animatedColor, width: "95%" },
          ]}
        />
        <Animated.View
          style={[
            styles.descriptionLine,
            { backgroundColor: animatedColor, width: "90%" },
          ]}
        />
        <Animated.View
          style={[
            styles.descriptionLine,
            { backgroundColor: animatedColor, width: "80%" },
          ]}
        />
        <Animated.View
          style={[styles.readMoreSkeleton, { backgroundColor: animatedColor }]}
        />
      </View>

      {/* Days Tabs Skeleton */}
      <PlanDaysSkeleton dayCount={3} />

      {/* Activities Skeleton */}
      {Array(activitiesCount)
        .fill(0)
        .map((_, index) => (
          <ActivityCardSkeleton
            key={index}
            showConnector={index !== activitiesCount - 1}
            isLastCard={index === activitiesCount - 1}
          />
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(5),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(2),
  },
  titleSkeleton: {
    width: wp(50),
    height: hp(4),
    borderRadius: 5,
  },
  headerButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerButton: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
    marginLeft: wp(3),
  },
  descriptionContainer: {
    marginBottom: hp(3),
  },
  descriptionLine: {
    height: hp(2),
    borderRadius: 4,
    marginBottom: hp(1),
  },
  readMoreSkeleton: {
    width: wp(20),
    height: hp(2),
    borderRadius: 4,
    marginTop: hp(0.5),
    alignSelf: "flex-end",
  },
});

export default PlanDetailsSkeleton;

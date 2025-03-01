import React from "react";
import { View, StyleSheet, Animated, ScrollView } from "react-native";
import { useSkeletonAnimation } from "./skeletonAnimation";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const PlanDaysSkeleton = ({ dayCount = 5 }) => {
  const animatedColor = useSkeletonAnimation();

  return (
    <View style={styles.daysTabsContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.dayTabsScrollContainer}
      >
        {Array(dayCount)
          .fill(0)
          .map((_, index) => (
            <View key={index} style={styles.dayTab}>
              <Animated.View
                style={[
                  styles.dayTabSkeleton,
                  { backgroundColor: animatedColor },
                ]}
              />
              {index === 0 && <View style={styles.dayTabIndicator} />}
            </View>
          ))}
      </ScrollView>

      <View style={styles.dayTabsArrow}>
        <Animated.View
          style={[styles.arrowSkeleton, { backgroundColor: animatedColor }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  daysTabsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    paddingVertical: hp(1.5),
    marginBottom: hp(2),
    borderRadius: 10,
  },
  dayTabsScrollContainer: {
    flex: 1,
    paddingHorizontal: wp(3),
  },
  dayTab: {
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    marginRight: wp(2),
    alignItems: "center",
    position: "relative",
  },
  dayTabSkeleton: {
    width: wp(15),
    height: hp(2.5),
    borderRadius: 4,
  },
  dayTabIndicator: {
    position: "absolute",
    bottom: 0,
    height: 2,
    width: "80%",
    backgroundColor: "#FCD228",
    borderRadius: 2,
  },
  dayTabsArrow: {
    padding: wp(2),
  },
  arrowSkeleton: {
    width: wp(6),
    height: wp(6),
    borderRadius: wp(3),
  },
});

export default PlanDaysSkeleton;

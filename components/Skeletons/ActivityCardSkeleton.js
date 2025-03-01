import React from "react";
import { View, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSkeletonAnimation } from "./skeletonAnimation";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "../../constants/theme";

const ActivityCardSkeleton = ({ showConnector = true, isLastCard = false }) => {
  const animatedColor = useSkeletonAnimation();

  return (
    <View style={isLastCard ? styles.lastCardContainer : styles.cardContainer}>
      <View style={styles.timelineContainer}>
        <View style={styles.timelineBackground} />
        <View style={styles.timelineIconPlaceholder}>
          <Animated.View
            style={[styles.iconPlaceholder, { backgroundColor: animatedColor }]}
          />
        </View>
        {showConnector && (
          <>
            <View style={styles.timelineConnector}></View>
            <View style={styles.dot}></View>
          </>
        )}
      </View>

      <View style={styles.cardContent}>
        <Animated.View
          style={[styles.imageSkeleton, { backgroundColor: animatedColor }]}
        />

        <View style={styles.activityDetails}>
          <Animated.View
            style={[styles.titleSkeleton, { backgroundColor: animatedColor }]}
          />
          <Animated.View
            style={[
              styles.locationSkeleton,
              { backgroundColor: animatedColor },
            ]}
          />
          <Animated.View
            style={[styles.timeSkeleton, { backgroundColor: animatedColor }]}
          />
        </View>

        <View style={styles.activityButtons}>
          <Animated.View
            style={[styles.buttonSkeleton, { backgroundColor: animatedColor }]}
          />
          <Animated.View
            style={[styles.buttonSkeleton, { backgroundColor: animatedColor }]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    marginVertical: hp(1),
    paddingHorizontal: wp(3),
  },
  lastCardContainer: {
    flexDirection: "row",
    marginVertical: hp(1),
    paddingHorizontal: wp(3),
    marginBottom: hp(5),
  },
  timelineContainer: {
    width: wp(10),
    alignItems: "center",
    position: "relative",
  },
  timelineBackground: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: "#e0e0e0",
    left: "50%",
    marginLeft: -1,
  },
  timelineIconPlaceholder: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  iconPlaceholder: {
    width: wp(6),
    height: wp(6),
    borderRadius: wp(3),
  },
  timelineConnector: {
    position: "absolute",
    top: wp(8),
    bottom: 0,
    width: 2,
    backgroundColor: "#e0e0e0",
    left: "50%",
    marginLeft: -1,
  },
  dot: {
    position: "absolute",
    bottom: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#e0e0e0",
    left: "50%",
    marginLeft: -4,
  },
  cardContent: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: wp(3),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  imageSkeleton: {
    width: wp(15),
    height: wp(15),
    borderRadius: 8,
    marginRight: wp(3),
  },
  activityDetails: {
    flex: 1,
    justifyContent: "center",
  },
  titleSkeleton: {
    height: hp(2.5),
    width: wp(30),
    borderRadius: 4,
    marginBottom: hp(1),
  },
  locationSkeleton: {
    height: hp(2),
    width: wp(25),
    borderRadius: 4,
    marginBottom: hp(1),
  },
  timeSkeleton: {
    height: hp(2),
    width: wp(20),
    borderRadius: 4,
  },
  activityButtons: {
    justifyContent: "space-around",
    alignItems: "center",
    paddingLeft: wp(2),
  },
  buttonSkeleton: {
    width: wp(7),
    height: wp(7),
    borderRadius: wp(3.5),
    marginVertical: hp(0.5),
  },
});

export default ActivityCardSkeleton;

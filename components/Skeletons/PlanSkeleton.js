import React from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "../../constants/theme";

// Skeleton animation hook
const useSkeletonAnimation = () => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.bezier(0.65, 0, 0.35, 1),
        useNativeDriver: false,
      })
    ).start();
  }, [animatedValue]);

  const interpolatedBackgroundColor = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [COLORS.lightGrey, "#e5e7eb", COLORS.lightGrey],
  });

  return interpolatedBackgroundColor;
};

// Plan Card Skeleton
export const PlanCardSkeleton = () => {
  const animatedColor = useSkeletonAnimation();

  return (
    <View style={styles.planCardContainer}>
      <Animated.View
        style={[styles.imageSkeleton, { backgroundColor: animatedColor }]}
      />
      <View style={styles.detailsContainer}>
        <Animated.View
          style={[
            styles.titleSkeleton,
            { backgroundColor: animatedColor, width: "80%" },
          ]}
        />
        <Animated.View
          style={[
            styles.textSkeleton,
            { backgroundColor: animatedColor, width: "60%" },
          ]}
        />
        <Animated.View
          style={[
            styles.textSkeleton,
            { backgroundColor: animatedColor, width: "70%" },
          ]}
        />
        <Animated.View
          style={[
            styles.textSkeleton,
            { backgroundColor: animatedColor, width: "50%" },
          ]}
        />
      </View>
    </View>
  );
};

// Plans List Skeleton - renders multiple card skeletons
export const PlansListSkeleton = ({ count = 5 }) => {
  return (
    <View style={styles.listContainer}>
      <View style={styles.cardsContainer}>
        {[...Array(count)].map((_, index) => (
          <PlanCardSkeleton key={index} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Plan card skeleton styles
  planCardContainer: {
    flexDirection: "row",
    borderRadius: wp("2.5%"),
    padding: wp("3%"),
    marginVertical: hp("1%"),
    marginHorizontal: wp("2%"),
    alignItems: "center",
    backgroundColor: COLORS.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  imageSkeleton: {
    width: wp("20%"),
    height: wp("20%"),
    borderRadius: wp("3%"),
    marginRight: wp("4%"),
  },
  detailsContainer: {
    flex: 1,
    gap: hp(1),
  },
  titleSkeleton: {
    height: hp(3),
    width: wp(30),
    borderRadius: wp(1),
  },
  textSkeleton: {
    height: hp(1.5),
    borderRadius: wp(1),
    marginTop: hp(0.5),
  },
  listContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  cardsContainer: {
    paddingTop: hp(3),
  },
});

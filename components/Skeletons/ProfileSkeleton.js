import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { COLORS } from "../../constants/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ProfileSkeleton = () => {
  const shimmerAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Create a looping animation
    const startShimmerAnimation = () => {
      Animated.loop(
        Animated.timing(shimmerAnimation, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        })
      ).start();
    };

    startShimmerAnimation();

    // Clean up animation on unmount
    return () => {
      shimmerAnimation.stopAnimation();
    };
  }, []);

  // Create a shimmer effect that moves from left to right
  const shimmerTranslate = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-wp(100), wp(100)],
  });

  // Reusable shimmer component
  const ShimmerEffect = ({ style }) => (
    <View style={[style, { overflow: "hidden" }]}>
      <Animated.View
        style={[
          styles.shimmer,
          {
            transform: [{ translateX: shimmerTranslate }],
          },
        ]}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Banner background */}
      <ShimmerEffect style={styles.header} />

      {/* Profile image */}
      <View style={styles.profileImageContainer}>
        <ShimmerEffect style={styles.profileImage} />
      </View>

      {/* User name */}
      <ShimmerEffect style={styles.textLine} />

      {/* Username */}
      <ShimmerEffect style={styles.textLineSmall} />

      {/* Followers and following */}
      <View style={styles.followContainer}>
        <View style={styles.followBoxContainer}>
          <ShimmerEffect style={styles.followBoxNumber} />
          <ShimmerEffect style={styles.followBoxText} />
        </View>

        <View style={styles.followBoxContainer}>
          <ShimmerEffect style={styles.followBoxNumber} />
          <ShimmerEffect style={styles.followBoxText} />
        </View>
      </View>

      {/* Tab bar skeleton */}
      <ShimmerEffect style={styles.tabBar} />

      {/* Content area skeleton */}
      <View style={styles.contentArea}>
        <ShimmerEffect style={styles.contentLine} />
        <ShimmerEffect style={styles.contentLine} />
        <ShimmerEffect style={styles.contentLine} />
        <ShimmerEffect style={styles.contentLineLast} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  shimmer: {
    width: "50%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    position: "absolute",
    transform: [{ translateX: -100 }],
  },
  header: {
    width: "100%",
    height: hp(25),
    backgroundColor: COLORS.lightGrey,
  },
  profileImageContainer: {
    alignItems: "center",
    marginTop: -hp(8),
  },
  profileImage: {
    width: wp(30),
    height: wp(30),
    borderRadius: wp(15),
    backgroundColor: COLORS.lightGrey,
    borderWidth: 4,
    borderColor: COLORS.white,
  },
  textLine: {
    width: wp(60),
    height: hp(3),
    borderRadius: wp(1),
    backgroundColor: COLORS.lightGrey,
    alignSelf: "center",
    marginTop: hp(2),
  },
  textLineSmall: {
    width: wp(40),
    height: hp(2),
    borderRadius: wp(1),
    backgroundColor: COLORS.lightGrey,
    alignSelf: "center",
    marginTop: hp(1),
  },
  followContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: hp(4),
    paddingHorizontal: wp(10),
    paddingVertical: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  followBoxContainer: {
    alignItems: "center",
  },
  followBoxNumber: {
    width: wp(15),
    height: hp(3),
    borderRadius: wp(1),
    backgroundColor: COLORS.lightGrey,
    marginBottom: hp(1),
  },
  followBoxText: {
    width: wp(20),
    height: hp(2),
    borderRadius: wp(1),
    backgroundColor: COLORS.lightGrey,
  },
  tabBar: {
    width: "100%",
    height: hp(5),
    backgroundColor: COLORS.lightGrey,
    marginTop: hp(1),
  },
  contentArea: {
    paddingHorizontal: wp(5),
    marginTop: hp(3),
  },
  contentLine: {
    width: "100%",
    height: hp(2),
    borderRadius: wp(1),
    backgroundColor: COLORS.lightGrey,
    marginBottom: hp(2),
  },
  contentLineLast: {
    width: "70%",
    height: hp(2),
    borderRadius: wp(1),
    backgroundColor: COLORS.lightGrey,
  },
});

export default ProfileSkeleton;

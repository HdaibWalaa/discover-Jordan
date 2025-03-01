import React from "react";
import { Animated, Easing } from "react-native";
import { COLORS } from "../../constants/theme";

export const useSkeletonAnimation = () => {
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

    return () => {
      animatedValue.stopAnimation();
    };
  }, [animatedValue]);

  const interpolatedBackgroundColor = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [COLORS.lightGrey, "#e5e7eb", COLORS.lightGrey],
  });

  return interpolatedBackgroundColor;
};

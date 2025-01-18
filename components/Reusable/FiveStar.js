
import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Assuming you're using Ionicons for stars
import { COLORS } from "../../constants/theme";

const FiveStar = ({ rating }) => {
  // Determine the number of filled stars
  const filledStars = Math.floor(rating);
  // Determine if there's a half-filled star
  const hasHalfStar = rating % 1 !== 0;

  // Create an array with the length of 5 for the total number of stars
  const starsArray = Array.from({ length: 5 }, (_, index) => {
    // Determine if the star should be filled, half-filled, or empty based on the index and the rating
    let iconName = "star-outline";
    let color = COLORS.primary;

    if (index < filledStars) {
      iconName = "star";
      color = COLORS.primary;
    } else if (index === filledStars && hasHalfStar) {
      iconName = "star-half";
      color = COLORS.primary;
    } else {
      // If the star is not filled, set its color to grey and the icon to filled star
      iconName = "star";
      color = COLORS.grey;
    }

    // Use Ionicons for stars, change the name as per your icon set
    return <Ionicons key={index} name={iconName} size={20} color={color} />;
  });

  return <View style={{ flexDirection: "row" }}>{starsArray}</View>;
};

export default FiveStar;

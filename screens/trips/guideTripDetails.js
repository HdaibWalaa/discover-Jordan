import React from "react";
import { View, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import useFetchGuideTrip from "../../hook/trip/useFetchGuideTrip"; // Import custom hook
import GuideTripDetailCard from "../../components/Guide/DetailTrip.js/GuideTripDetailcard";
import { COLORS } from "../../constants/theme";
import { RusableWhite, ReusableText, HeightSpacer } from "../../components"; // Import RusableWhite and other components

const GuideTripDetail = ({ route }) => {
  const { tripId } = route.params; // Get tripId from route params
  const { GuideTripDetails, isLoading, error } = useFetchGuideTrip(tripId); // Use custom hook to fetch trip details

  if (isLoading) {
    return (
      <RusableWhite>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      </RusableWhite>
    );
  }

  if (error) {
    return (
      <RusableWhite>
        <View style={styles.centered}>
          <ReusableText
            text={`Error: ${error.message}`}
            family="Medium"
            size={16}
            color={COLORS.red}
          />
        </View>
      </RusableWhite>
    );
  }

  if (!GuideTripDetails) {
    return (
      <RusableWhite>
        <View style={styles.centered}>
          <ReusableText
            text="No trip details available."
            family="Medium"
            size={16}
            color={COLORS.gray}
          />
        </View>
      </RusableWhite>
    );
  }

  return (
    <RusableWhite>
      <FlatList
        data={[GuideTripDetails]} // Pass trip details as an array with one item
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <GuideTripDetailCard trip={item} />}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </RusableWhite>
  );
};

export default GuideTripDetail;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

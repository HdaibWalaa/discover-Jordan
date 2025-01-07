import React from "react";
import { View, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import useFetchGuideTrip from "../../hook/trip/useFetchGuideTrip"; // Import custom hook
import GuideTripDetailCard from "../../components/Guide/DetailTrip.js/GuideTripDetailcard";

const GuideTripDetail = ({ route }) => {
  const { tripId } = route.params; // Get tripId from route params
  const { GuideTripDetails, isLoading, error } = useFetchGuideTrip(tripId); // Use custom hook to fetch trip details

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  if (!GuideTripDetails) {
    return (
      <View style={styles.centered}>
        <Text>No trip details available.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={[GuideTripDetails]} // Pass trip details as an array with one item
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => <GuideTripDetailCard trip={item} />}
    />
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

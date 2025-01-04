import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import useFetchGuideTrip from "../../hook/trip/useFetchGuideTrip";

const guideTripDetails = ({ route }) => {
  const { tripId } = route.params;
  const { guideTripDetails, isLoading, error } = useFetchGuideTrip(tripId);

  console.log("GuideTripDetails Component - tripId:", tripId);
  console.log("Loading Status:", isLoading);
  console.log("Guide Trip Data:", guideTripDetails);
  console.log("Error:", error);

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

  if (!guideTripDetails) {
    return (
      <View style={styles.centered}>
        <Text>No trip details available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{guideTripDetails.name}</Text>
      <Text style={styles.description}>{guideTripDetails.description}</Text>
      <Text style={styles.info}>
        Start Date: {guideTripDetails.start_datetime}
      </Text>
      <Text style={styles.info}>End Date: {guideTripDetails.end_datetime}</Text>
      <Text style={styles.info}>Price: {guideTripDetails.price} JOD</Text>
      <Text style={styles.info}>
        Max Attendance: {guideTripDetails.max_attendance}
      </Text>
      <Text style={styles.info}>
        Guide: {guideTripDetails.guide_username} (
        {guideTripDetails.guide_phone_number})
      </Text>

      <Text style={styles.subtitle}>Activities:</Text>
      <FlatList
        data={guideTripDetails.activities}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.listItem}>• {item}</Text>}
      />

      <Text style={styles.subtitle}>Assemblies:</Text>
      <FlatList
        data={guideTripDetails.assemblies}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.listItem}>
            • {item.place} at {item.time}
          </Text>
        )}
      />

      <Text style={styles.subtitle}>Gallery:</Text>
      <FlatList
        horizontal
        data={guideTripDetails.gallery}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.image} />
        )}
      />
    </View>
  );
};

export default guideTripDetails;



const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "gray",
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  listItem: {
    fontSize: 16,
    marginLeft: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 8,
  },
});

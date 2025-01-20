import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from "react-native";
import axios from "axios";
import BASE_URL from "../../hook/apiConfig";

const PlaceForLocation = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPlaces = async () => {
    const url = `${BASE_URL}/user/current-location/places`;
    const params = {
      area: 20,
      categories_id: JSON.stringify([1]),
      subcategories_id: JSON.stringify([2]),
      lat: 31.968461,
      lng: 35.88096,
    };

    const headers = {
      "X-API-KEY": "DISCOVERJO91427",
    };

    try {
      const response = await axios.get(url, { headers, params });
      if (response.data.status === 200) {
        setPlaces(response.data.data);
      } else {
        setError("Failed to fetch places.");
      }
    } catch (err) {
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  const renderPlace = ({ item }) => (
    <TouchableOpacity
      onPress={() => Linking.openURL(item.google_map_url)}
      style={styles.placeCard}
    >
      <Image source={{ uri: item.image }} style={styles.placeImage} />
      <View style={styles.placeInfo}>
        <Text style={styles.placeName}>{item.name}</Text>
        <Text style={styles.placeRegion}>{item.region}</Text>
        <Text style={styles.placeRating}>Rating: {item.rating}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Nearby Places</Text>
      <FlatList
        data={places}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPlace}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default PlaceForLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  listContainer: {
    paddingBottom: 20,
  },
  placeCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 8,
    overflow: "hidden",
    elevation: 2,
  },
  placeImage: {
    width: 100,
    height: 100,
  },
  placeInfo: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  placeName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  placeRegion: {
    fontSize: 14,
    color: "#777",
  },
  placeRating: {
    fontSize: 14,
    color: "#333",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});

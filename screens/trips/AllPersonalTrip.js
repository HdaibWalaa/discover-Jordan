import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  Platform,
  NativeModules,
} from "react-native";
import { AuthContext } from "../../store/auth-context";
import fetchPersonalTrips from "../../hook/trip/fetchPersonalTrips";

const AllPersonalTrip = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const authCtx = useContext(AuthContext);
  const token = authCtx.token; 
  const deviceLanguage =
    Platform.OS === "ios"
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;

  const language = deviceLanguage.includes("_")
    ? deviceLanguage.split("_")[0]
    : deviceLanguage.split("-")[0];
  useEffect(() => {
    const getTrips = async () => {
      setLoading(true);
      const fetchedTrips = await fetchPersonalTrips(token, language);
      setTrips(fetchedTrips);
      setLoading(false);
    };
    getTrips();
  }, [token, language]);

  const renderTrip = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.placeName}>{item.place_name}</Text>
        <Text style={styles.date}>Date: {item.date}</Text>
        <Text style={styles.price}>Price: {item.price} JOD</Text>
        <Text style={styles.location}>Location: {item.location}</Text>
        <Text style={styles.attendance}>
          Attendance: {item.attendance_number}
        </Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#FCD228" style={styles.loader} />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={trips}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTrip}
      />
    </View>
  );
};

export default AllPersonalTrip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 10,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#FCD228",
    marginVertical: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: 100,
    height: 100,
  },
  details: {
    flex: 1,
    padding: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  placeName: {
    color: "#555",
  },
  date: {
    color: "#777",
  },
  price: {
    color: "#555",
  },
  location: {
    color: "#777",
  },
  attendance: {
    color: "#555",
  },
});

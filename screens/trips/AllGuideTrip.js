import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { AuthContext } from "../../store/auth-context";
import { GuideTripContext } from "../../store/guide-trip-context";
import AllGuideCard from "../../components/Tiles/Trip/AllGuideCard";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import DateSelector from "../../components/Tiles/Trip/DateSelector";

const AllGuideTrip = () => {
  const { token, user } = useContext(AuthContext);
  const { guideTrips, isLoading, error, fetchGuideTrips } =
    useContext(GuideTripContext);
  const navigation = useNavigation();
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  useEffect(() => {
    if (token) {
      fetchGuideTrips(token, user.lang);
    }
  }, [token, user.lang]);

  useEffect(() => {
    if (selectedDate) {
      const tripsOnSelectedDate = guideTrips.filter(
        (trip) => trip.start_time.split(" ")[0] === selectedDate
      );
      setFilteredTrips(tripsOnSelectedDate);
    }
  }, [selectedDate, guideTrips]);

  const handleMonthChange = (newMonth) => {
    console.log("Month changed to:", newMonth.toISOString().slice(0, 7));
    setSelectedMonth(newMonth);
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pick your perfect trip day</Text>

        {user?.is_guide === 1 && (
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => navigation.navigate("CreateGuideTrip")}
          >
            <Image
              source={require("../../assets/images/icons/creat.png")}
              style={styles.createIcon}
            />
            <Text style={styles.createText}>Create</Text>
          </TouchableOpacity>
        )}
      </View>

      <DateSelector
        selectedMonth={selectedMonth}
        selectedDate={selectedDate}
        onChangeMonth={handleMonthChange}
        onSelectDate={setSelectedDate}
      />

      {filteredTrips.length > 0 ? (
        <FlatList
          data={filteredTrips}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <AllGuideCard item={item} />}
        />
      ) : (
        <View style={styles.centered}>
          <Text>No trips available for this day.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default AllGuideTrip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    top: 50,
    paddingHorizontal: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  createButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 8,
  },
  createIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  createText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

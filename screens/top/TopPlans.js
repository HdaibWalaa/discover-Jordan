import React, { useContext } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { PlanContext } from "../../store/context/PlanContext";

const TopPlans = () => {
  const { plan } = useContext(PlanContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Plans</Text>
      <FlatList
        data={[plan]}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.planItem}>
            <Text style={styles.planName}>{item.name}</Text>
            <Text>{item.description}</Text>
            {item.days.map((day, dayIndex) => (
              <View key={dayIndex}>
                <Text style={styles.dayTitle}>Day {dayIndex + 1}</Text>
                {day.activities.map((activity, activityIndex) => (
                  <Text key={activityIndex} style={styles.activity}>
                    {activity.name} ({activity.start_time} - {activity.end_time}
                    )
                  </Text>
                ))}
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
};

export default TopPlans;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  planItem: {
    padding: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 20,
  },
  planName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  activity: {
    paddingLeft: 10,
  },
});

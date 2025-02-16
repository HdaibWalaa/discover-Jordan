import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants/theme";

// Import the default avatar image
const DEFAULT_AVATAR = require("../../assets/images/icons/people.png");

const TripUser = ({ tripDetails }) => {
  const renderUser = ({ item }) => (
    <View style={styles.avatarContainer}>
      <Image
        source={item.image ? { uri: item.image } : DEFAULT_AVATAR}
        style={styles.avatar}
      />
    </View>
  );

  return (
    <View style={styles.attendanceContainer}>
      <View style={styles.attendanceHeader}>
        <Text style={styles.attendanceText}>
          <Text style={styles.attendanceCount}>
            {tripDetails.attendances.length}
          </Text>{" "}
          / {tripDetails.attendance_number}
        </Text>
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.attendanceProgressBarContainer}>
          <View style={styles.attendanceProgressBar}>
            <View
              style={[
                styles.attendanceProgress,
                { width: `${(tripDetails.attendances.length / 52) * 100}%` },
              ]}
            />
          </View>
        </View>
        <Text style={styles.attendancePercentage}>
          {Math.round((tripDetails.attendances.length / 52) * 100)}%
        </Text>
      </View>
      <FlatList
        horizontal
        data={tripDetails.attendances.slice(0, 3)} // Show up to 3 avatars
        renderItem={renderUser}
        keyExtractor={(item) => item.id.toString()}
        style={styles.avatarList}
      />
      {tripDetails.attendances.length > 3 && (
        <Text style={styles.additionalAttendeesText}>
          +{tripDetails.attendances.length - 3} Going
        </Text>
      )}
    </View>
  );
};

export default TripUser;

const styles = StyleSheet.create({
  attendanceContainer: {},
  attendanceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  attendanceText: {
    fontSize: SIZES.medium,
    color: COLORS.dark,
  },
  attendanceCount: {
    fontWeight: "bold",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  attendanceProgressBarContainer: {
    flex: 1,
    height: 10, // Adjust height for visibility
    marginRight: 10, // Add some space between the bar and the percentage
    justifyContent: "center",
   
  },
  attendanceProgressBar: {
    height: "100%",
    backgroundColor: COLORS.lightGrey,
    borderRadius: 5,
    overflow: "hidden",
    
  },
  attendanceProgress: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 5, // Rounded ends
    
  },
  attendancePercentage: {
    fontSize: SIZES.medium,
    color: COLORS.dark,
    fontWeight: "500",
  },
  avatarList: {
    flexDirection: "row",
    marginBottom: 10,
   paddingVertical:10,
  },
  avatarContainer: {
    marginRight: 10,
    borderWidth: 2,
    borderColor: COLORS.white,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  additionalAttendeesText: {
    color: COLORS.primary,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

import React from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { GoBack } from "../index"; // Ensure the correct path for GoBack component

const ChatHeader = ({ groupMembers }) => {
  return (
    <View style={styles.header}>
      {/* Row for Title and GoBack Button */}
      <View style={styles.titleRow}>
        <GoBack style={styles.goBackButton} />
        <Text style={styles.headerTitle}>TRIP CHAT GROUP</Text>
      </View>

      {/* Scrollable list of group members */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.membersContainer}
      >
        {groupMembers.map((member) => (
          <View key={member.id} style={styles.memberBox}>
            <Image source={{ uri: member.image }} style={styles.avatar} />
            <Text style={styles.memberName} numberOfLines={1}>
              {member.username}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  header: {
    gap: 10,
    padding: 50,
    backgroundColor: "#FFD700",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
    top: 30,
  },
  goBackButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    flex: 1,
    marginLeft: 10,
  },
  membersContainer: {
    flexDirection: "row",
    top: 30,
    padding: 5,
  },
  memberBox: {
    alignItems: "center",
    marginRight: 15,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
    borderWidth: 2,
    borderColor: "#fff",
  },
  memberName: {
    fontSize: 12,
    color: "#333",
    textAlign: "center",
    maxWidth: 60,
  },
});

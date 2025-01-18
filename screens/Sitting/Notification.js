import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Animated,
  TouchableOpacity,
} from "react-native";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";

const notificationsData = [
  {
    id: "1",
    title: "Notification Title",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    icon: require("../../assets/images/icons/rating.png"),
    time: "now",
  },
  {
    id: "2",
    title: "Notification Title",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    icon: require("../../assets/images/icons/rating.png"),
    time: "6 days ago",
  },
  {
    id: "3",
    title: "Notification Title",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    icon: require("../../assets/images/icons/rating.png"),
    time: "9 days ago",
  },
  // Add more notifications as needed
];

const Notification = () => {
  const [notifications, setNotifications] = useState(notificationsData);

  const renderRightActions = (progress, dragX, id) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0.5],
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity
        onPress={() => handleDeleteNotification(id)}
        style={styles.deleteButton}
      >
        <Animated.Text
          style={[styles.deleteButtonText, { transform: [{ scale }] }]}
        >
          Delete
        </Animated.Text>
      </TouchableOpacity>
    );
  };

  const handleDeleteNotification = (id) => {
    const updatedNotifications = notifications.filter(
      (notification) => notification.id !== id
    );
    setNotifications(updatedNotifications);
  };

  const renderItem = ({ item }) => (
    <Swipeable
      renderRightActions={(progress, dragX) =>
        renderRightActions(progress, dragX, item.id)
      }
    >
      <View style={styles.notificationItem}>
        <Image source={item.icon} style={styles.notificationIcon} />
        <View style={styles.textContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text style={styles.notificationTime}>{item.time}</Text>
          </View>
          <Text style={styles.notificationDescription}>{item.description}</Text>
        </View>
      </View>
    </Swipeable>
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.noNotificationsContainer}>
          <Image
            source={require("../../assets/images/icons/no-notifications.png")}
            style={styles.noNotificationsIcon}
          />
          <Text style={styles.noNotificationsTitle}>No Notifications</Text>
          <Text style={styles.noNotificationsText}>
            We'll let you know when there will be something to update you.
          </Text>
        </View>
      )}
    </GestureHandlerRootView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
  },
  listContainer: {
    paddingBottom: 20,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  notificationTime: {
    fontSize: 12,
    color: "#999",
  },
  notificationDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
    borderRadius: 10,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  noNotificationsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noNotificationsIcon: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  noNotificationsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  noNotificationsText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});

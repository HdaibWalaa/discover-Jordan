import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons
import { useNavigation } from "@react-navigation/native"; // Import useNavigation for navigation
import languageIcon from "../../assets/images/icons/language.png";
import privacyPolicyIcon from "../../assets/images/icons/privacypolicy.png";
import contactUsIcon from "../../assets/images/icons/contactUs.png";
import logoutIcon from "../../assets/images/icons/logout.png";
import darkLightModeIcon from "../../assets/images/icons/darklightmood.png"; // Add the dark/light mode icon

const ActionButtons = () => {
  const navigation = useNavigation(); // Initialize navigation

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.actionButton}>
        <View style={styles.iconContainer}>
          <Image source={languageIcon} style={styles.icon} />
        </View>
        <Text style={styles.actionText}>Change Language</Text>
        <Ionicons
          name="chevron-forward-outline"
          size={24}
          color="#999"
          style={styles.arrowIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => navigation.navigate("Privacypolicy")} // Navigate to Privacy Policy
      >
        <View style={styles.iconContainer}>
          <Image source={privacyPolicyIcon} style={styles.icon} />
        </View>
        <Text style={styles.actionText}>Privacy & Policy</Text>
        <Ionicons
          name="chevron-forward-outline"
          size={24}
          color="#999"
          style={styles.arrowIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => navigation.navigate("ContactUs")} // Navigate to Contact Us
      >
        <View style={styles.iconContainer}>
          <Image source={contactUsIcon} style={styles.icon} />
        </View>
        <Text style={styles.actionText}>Contact Us</Text>
        <Ionicons
          name="chevron-forward-outline"
          size={24}
          color="#999"
          style={styles.arrowIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton}>
        <View style={styles.iconContainer}>
          <Image source={darkLightModeIcon} style={styles.icon} />
        </View>
        <Text style={styles.actionText}>Dark/Light Mode</Text>
        <Ionicons
          name="chevron-forward-outline"
          size={24}
          color="#999"
          style={styles.arrowIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton}>
        <View style={styles.iconContainer}>
          <Image source={logoutIcon} style={styles.icon} />
        </View>
        <Text style={styles.actionText}>Logout</Text>
        <Ionicons
          name="chevron-forward-outline"
          size={24}
          color="#999"
          style={styles.arrowIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ActionButtons;

const styles = StyleSheet.create({
  container: {},
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 30,
    marginBottom: 15, // Space between buttons
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0", // Background color for the icon container
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  icon: {
    width: 24,
    height: 24,
  },
  actionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1, // Allows text to expand and the arrow icon to stay on the right
  },
  arrowIcon: {
    marginLeft: "auto", // Ensure the arrow icon stays on the right side
  },
});

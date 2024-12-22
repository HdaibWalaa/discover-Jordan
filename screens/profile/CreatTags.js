import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../constants/theme";
import ReusableBtn from "../../components/Buttons/ReusableBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";

const tags = ["Films", "Trips", "Natural"];

const CreatTags = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { formData } = route.params;

  const handleTagPress = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleDone = async () => {
    const profileData = { ...formData, tags: selectedTags };
    try {
      await AsyncStorage.setItem("profileData", JSON.stringify(profileData));
      navigation.navigate("Profile", { profileData });
    } catch (error) {
      console.error("Failed to save profile data", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>A</Text>
        </View>
        <Pressable style={styles.editButton}>
          <Text style={styles.editButtonText}>✏️</Text>
        </Pressable>
      </View>
      <Text style={styles.title}>Tags Options: Make Your Choices</Text>
      <Text style={styles.subtitle}>2/2</Text>
      <View style={styles.tagsContainer}>
        {tags.map((tag) => (
          <Pressable
            key={tag}
            style={[
              styles.tagButton,
              selectedTags.includes(tag) && styles.tagButtonSelected,
            ]}
            onPress={() => handleTagPress(tag)}
          >
            <Text
              style={[
                styles.tagButtonText,
                selectedTags.includes(tag) && styles.tagButtonTextSelected,
              ]}
            >
              {tag}
            </Text>
          </Pressable>
        ))}
      </View>
      <ReusableBtn
        btnText="Done"
        onPress={handleDone}
        style={styles.doneButton}
      />
    </View>
  );
};

export default CreatTags;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.white,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 40,
    color: COLORS.black,
  },
  editButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 5,
  },
  editButtonText: {
    fontSize: 12,
    color: COLORS.white,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  tagButton: {
    padding: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 5,
    margin: 5,
  },
  tagButtonSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  tagButtonText: {
    fontSize: 16,
    color: COLORS.black,
  },
  tagButtonTextSelected: {
    color: COLORS.white,
  },
  doneButton: {
    width: Dimensions.get("window").width - 40,
    alignSelf: "center",
  },
});

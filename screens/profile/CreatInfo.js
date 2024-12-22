import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constants/theme";
import ReusableBtn from "../../components/Buttons/ReusableBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreatInfo = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    birthday: "",
    aboutMe: "",
    gender: "Male",
  });

  const navigation = useNavigation();

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNext = async () => {
    try {
      await AsyncStorage.setItem("profileData", JSON.stringify(formData));
      navigation.navigate("CreatTags", { formData });
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
      <Text style={styles.title}>Personal Information Registration</Text>
      <Text style={styles.subtitle}>1/2</Text>
      <View style={styles.formContainer}>
        {[
          "username",
          "firstName",
          "lastName",
          "phoneNumber",
          "birthday",
          "aboutMe",
        ].map((field) => (
          <TextInput
            key={field}
            placeholder={field.split(/(?=[A-Z])/).join(" ")}
            style={styles.input}
            value={formData[field]}
            onChangeText={(text) => handleInputChange(field, text)}
          />
        ))}
        <Text style={styles.genderLabel}>Gender</Text>
        <View style={styles.genderContainer}>
          {["Male", "Female"].map((gender) => (
            <Pressable
              key={gender}
              style={[
                styles.genderButton,
                formData.gender === gender && styles.genderButtonSelected,
              ]}
              onPress={() => handleInputChange("gender", gender)}
            >
              <Text style={styles.genderButtonText}>{gender}</Text>
            </Pressable>
          ))}
        </View>
      </View>
      <ReusableBtn
        btnText="Next"
        onPress={handleNext}
        style={styles.nextButton}
      />
    </View>
  );
};

export default CreatInfo;

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
  formContainer: {
    flex: 1,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: COLORS.lightGray,
    marginBottom: 10,
    padding: 10,
    fontSize: 16,
  },
  genderLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  genderButton: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  genderButtonSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  genderButtonText: {
    fontSize: 16,
    color: COLORS.black,
  },
  nextButton: {
    width: Dimensions.get("window").width - 40,
    alignSelf: "center",
  },
});

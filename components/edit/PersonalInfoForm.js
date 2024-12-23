import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { COLORS } from "../../constants/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const PersonalInfoForm = ({
  firstName,
  lastName,
  username,
  birthday,
  gender,
  phoneNumber,
  description,
  setFirstName,
  setLastName,
  setUsername,
  setBirthday,
  setGender,
  setPhoneNumber,
  setDescription,
  handleNext,
  birthdayWarning,
}) => {
  return (
    <View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Birthday (YYYY-MM-DD)"
          value={birthday}
          onChangeText={setBirthday}
        />
        {birthdayWarning ? (
          <Text style={styles.warningText}>{birthdayWarning}</Text>
        ) : null}
      </View>
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[
            styles.genderButton,
            gender === "1" ? styles.genderSelected : null,
          ]}
          onPress={() => setGender("1")}
        >
          <Text style={styles.genderText}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.genderButton,
            gender === "2" ? styles.genderSelected : null,
          ]}
          onPress={() => setGender("2")}
        >
          <Text style={styles.genderText}>Female</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline={true}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PersonalInfoForm;



const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center", // Center align the header text
    color: "#000", // Black text color
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#D1D1D1", // Lighter grey for borders
    marginVertical: 15, // More margin between inputs
    paddingBottom: 5,
    paddingHorizontal: 10, // Add horizontal padding
    backgroundColor: "#F9F9F9", // Slight background color for input
    borderRadius: 10, // Rounded corners
  },
  input: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
    paddingVertical: 10,
    color: "#000", // Black text color
  },
  icon: {
    width: 20, // Icon size matching the design
    height: 20,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  genderButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderWidth: 2,
    borderRadius: 12,
    width: "45%",
    justifyContent: "center",

    borderColor: COLORS.gray, // Yellow border for non-selected buttons
  },
  genderSelected: {
    borderColor: "#FCD228",
    backgroundColor: "#FCD22820", // Light transparent yellow when selected
  },
  selectedTags: {
    borderColor: "#FCD228",
    backgroundColor: "#FCD22820",
  },
  genderText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "#000", // Black text color for gender options
  },
  button: {
    backgroundColor: "#FCD228", // Primary yellow button color
    paddingVertical: hp("2%"),
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
    width: "100%", // Full-width button
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000", // Black text color for button
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  avatarImage: {
    width: 100, // Avatar size
    height: 100,
    borderRadius: 50, // Round avatar
    backgroundColor: "#FCD228", // Background color matching the theme
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 10,
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 25,
    borderColor: "#FCD228",
    borderWidth: 2,
  },
  formHeader: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 10,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  tag: {
    backgroundColor: "#F5F5F5", // Light gray background for non-selected tags
    padding: 10,
    margin: 5,
    borderRadius: 25, // Rounded shape
    borderWidth: 2,
    borderColor: "transparent", // No border by default
    flexDirection: "row", // Icon and text in row
    alignItems: "center", // Vertically center the content
    justifyContent: "center",
    width: wp("22%"),
    height: wp("10%"), // Adjust size as needed
  },
  selectedTag: {
    backgroundColor: "#FCD22820", // Light yellow background for selected tag
    borderColor: "#FCD228", // Yellow border for selected tags
  },
  tagIcon: {
    width: 20, // Adjust icon size
    height: 20,
    marginRight: 5, // Space between icon and text
  },
  tagText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000", // Black text color
  },
  button: {
    backgroundColor: "#FCD228",
    paddingVertical: hp("2%"),
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
    width: "100%",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  warningText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});

import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { COLORS, TEXT } from "../../constants/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ReusableText from "../../components/Reusable/ReusableText";
import ReusableBtn from "../Buttons/ReusableBtn";

// Icon imports phoneIcon
import PeopleIcon from "../../assets/images/icons/people.png";
import DateIcon from "../../assets/images/icons/datecalender.png";
import phoneIcon from "../../assets/images/icons/telephone.png";

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
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <ReusableText
          text={"Personal Information Registration"}
          family={"Bold"}
          size={TEXT.medium}
          color={COLORS.black}
          align={"left"}
        />
        <View style={styles.stepIndicator}>
          <Text style={styles.stepText}>1/2</Text>
        </View>
      </View>

      {/* Form Section */}
      <View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputTitle}>First Name</Text>
          <View style={styles.inputContainer}>
            <Image source={PeopleIcon} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your first name"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputTitle}>Last Name</Text>
          <View style={styles.inputContainer}>
            <Image source={PeopleIcon} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your last name"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputTitle}>Username</Text>
          <View style={styles.inputContainer}>
            <Image source={PeopleIcon} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
            />
          </View>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputTitle}>Birthday</Text>
          <View style={styles.inputContainer}>
            <Image source={DateIcon} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={birthday}
              onChangeText={setBirthday}
            />
          </View>
          {birthdayWarning ? (
            <Text style={styles.warningText}>{birthdayWarning}</Text>
          ) : null}
        </View>
        <View style={styles.genderContainer}>
          <Text style={styles.inputTitle}>Gender</Text>
          <View style={styles.genderButtons}>
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
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputTitle}>Phone Number</Text>
          <View style={styles.inputContainer}>
            <Image source={phoneIcon} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputTitle}>Description</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter a short description"
              value={description}
              onChangeText={setDescription}
              multiline={true}
            />
          </View>
        </View>
        <ReusableBtn
          btnText={"Next"}
          backgroundColor={COLORS.primary}
          width={75}
          height={6}
          borderColor={COLORS.primary}
          borderWidth={0}
          textColor={COLORS.black}
          onPress={handleNext} // Directly pass the onPress event
        />
      </View>
    </View>
  );
};

export default PersonalInfoForm;

const styles = StyleSheet.create({
  container: {
    padding: wp("5%"),
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: hp("2%"),
    width: wp(70),
  },
  stepIndicator: {
    backgroundColor: COLORS.black,
    borderRadius: wp("12.5%"),
    width: wp("12.5%"),
    height: wp("12.5%"),
    alignItems: "center",
    justifyContent: "center",
    left: hp("1%"),
  },
  stepText: {
    color: COLORS.white,
    fontSize: wp("4%"),
    fontWeight: "bold",
  },
  inputGroup: {
    marginBottom: hp("2%"),
  },
  inputTitle: {
    fontFamily: "Medium",
    color: "#858585",
    fontSize: wp("3.5%"),
    fontWeight: "400",
    marginBottom: hp("1%"),
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#8D8D8D",
    borderStyle: "solid",
  },
  input: {
    flex: 1,
    fontSize: wp("4%"),
    paddingVertical: hp("1%"),
    color: "#000",
    marginLeft: wp("2%"),
  },
  icon: {
    width: wp("5%"),
    height: wp("5%"),
  },
  genderContainer: {
    marginBottom: hp("3%"),
  },
  genderButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  genderButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: wp("4%"),
    borderWidth: 2,
    borderRadius: wp("3%"),
    width: wp("35%"),
    justifyContent: "center",
    borderColor: COLORS.gray,
  },
  genderSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + "20",
  },
  genderText: {
    fontSize: wp("4%"),
    fontWeight: "600",
    color: "#000",
  },
  warningText: {
    color: "red",
    fontSize: wp("3.5%"),
    marginTop: hp("0.5%"),
  },
});

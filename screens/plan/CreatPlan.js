import React, { useState, useContext } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../store/auth-context";
import { ReusableBackground, ReusableText } from "../../components";
import { COLORS, TEXT } from "../../constants/theme";
import AwesomeAlert from "react-native-awesome-alerts";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const CreatPlan = () => {
  const { token } = useContext(AuthContext); // Retrieve token from AuthContext
  const navigation = useNavigation(); // Get navigation object
  const [planName, setPlanName] = useState("");
  const [planDescription, setPlanDescription] = useState("");

  // Alert states
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); // success, error, warning
  const [successCallback, setSuccessCallback] = useState(null);

  // Show alert helper function
  const showCustomAlert = (title, message, type, callback = null) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertType(type);
    setSuccessCallback(callback);
    setShowAlert(true);
  };

  // Detect Arabic text in the alert message
  const isArabicText = (text) => {
    const arabicPattern = /[\u0600-\u06FF]/;
    return arabicPattern.test(text);
  };

  // Get the appropriate text alignment based on the language
  const getTextAlignment = (text) => {
    return isArabicText(text) ? "right" : "left";
  };

  const handleContinue = () => {
    if (!planName.trim()) {
      showCustomAlert(
        "Missing Information",
        "Please enter a plan name.",
        "error"
      );
      return;
    }

    if (!planDescription.trim()) {
      showCustomAlert(
        "Missing Information",
        "Please enter a plan description.",
        "error"
      );
      return;
    }

    // If both name and description are provided, navigate to next screen
    navigation.navigate("CreatActivies", {
      planName: planName,
      planDescription: planDescription,
    });
  };

  return (
    <ReusableBackground>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <ReusableText
            text={"Plan Name"}
            family="Medium"
            size={TEXT.medium}
            color={COLORS.dark}
          />
          <View style={styles.inputWrapper}>
            <Image
              source={require("../../assets/images/icons/text.png")} // Replace with your icon path
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Plan name"
              value={planName}
              onChangeText={setPlanName}
              placeholderTextColor="#333333"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <ReusableText
            text={"Plan Description"}
            family="Medium"
            size={TEXT.medium}
            color={COLORS.dark}
          />
          <View style={styles.textAreaWrapper}>
            <TextInput
              style={styles.textArea}
              placeholder="Type here ..."
              value={planDescription}
              onChangeText={setPlanDescription}
              placeholderTextColor="#333333"
              multiline={true}
              textAlignVertical="top"
              numberOfLines={4}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <ReusableText
            text={"Continue".toLocaleUpperCase()}
            family="Medium"
            size={TEXT.medium}
            color={COLORS.black}
            style={{ letterSpacing: 1 }}
          />
        </TouchableOpacity>

        {/* Awesome Alert */}
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title={alertTitle}
          message={alertMessage}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor={
            alertType === "success"
              ? COLORS.primary
              : alertType === "error"
              ? "#DD6B55"
              : COLORS.primary
          }
          onConfirmPressed={() => {
            setShowAlert(false);
            if (alertType === "success" && successCallback) {
              setTimeout(() => {
                successCallback();
              }, 300);
            }
          }}
          contentContainerStyle={styles.alertContainer}
          titleStyle={[
            styles.alertTitle,
            { textAlign: getTextAlignment(alertMessage) },
          ]}
          messageStyle={[
            styles.alertMessage,
            { textAlign: getTextAlignment(alertMessage) },
          ]}
          confirmButtonStyle={styles.alertButton}
          confirmButtonTextStyle={styles.alertButtonText}
        />
      </View>
    </ReusableBackground>
  );
};

export default CreatPlan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: hp(4),
    top: hp(2),
    paddingHorizontal: wp(5),
  },
  inputContainer: {
    marginBottom: hp(2.5),
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  textAreaWrapper: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginTop: hp(1),
  },
  icon: {
    width: wp(6),
    height: wp(6),
    marginRight: wp(2.5),
  },
  input: {
    flex: 1,
    paddingVertical: hp(1.5),
    fontSize: wp(4),
  },
  textArea: {
    paddingVertical: hp(1.5),
    fontSize: wp(4),
    minHeight: hp(15),
  },
  continueButton: {
    backgroundColor: "#FCD228",
    paddingVertical: hp(2),
    borderRadius: wp(3),
    alignItems: "center",
    marginTop: hp(3),
  },
  // Alert styles
  alertContainer: {
    borderRadius: 10,
    width: wp(80),
    padding: 10,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.black,
    marginBottom: 10,
  },
  alertMessage: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 10,
  },
  alertButton: {
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  alertButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.white,
  },
});

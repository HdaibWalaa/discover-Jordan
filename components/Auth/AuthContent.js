import React, { useState } from "react";
import { Alert, StyleSheet, View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuthForm from "./AuthForm";
import { COLORS, TEXT } from "../../constants/theme";
import ReusableText from "../Reusable/ReusableText";
import { validateCredentials } from "../../util/validation";

const AuthContent = ({ isLogin, onAuthenticate, errorMessages = [] }) => {
  const navigation = useNavigation();

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    emailOrUsername: false,
    email: false,
    username: false,
    password: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace("Signup");
    } else {
      navigation.replace("Login");
    }
  }

  function submitHandler(credentials) {
    const validationResults = validateCredentials(credentials, isLogin);

    if (isLogin) {
      if (
        !validationResults.emailOrUsernameIsValid ||
        !validationResults.passwordIsValid
      ) {
        setAlertMessage(
          "Invalid input. Please check your entered credentials."
        );
        setShowAlert(true);
        setCredentialsInvalid({
          emailOrUsername: !validationResults.emailOrUsernameIsValid,
          email: false,
          username: false,
          password: !validationResults.passwordIsValid,
          confirmPassword: false,
        });
        return;
      }
    } else {
      if (
        !validationResults.emailIsValid ||
        !validationResults.usernameIsValid ||
        !validationResults.passwordIsValid ||
        !validationResults.passwordsAreEqual
      ) {
        setAlertMessage(
          "Invalid input. Please check your entered credentials."
        );
        setShowAlert(true);
        setCredentialsInvalid({
          emailOrUsername: false,
          email: !validationResults.emailIsValid,
          username: !validationResults.usernameIsValid,
          password: !validationResults.passwordIsValid,
          confirmPassword: !validationResults.passwordsAreEqual,
        });
        return;
      }
    }

    onAuthenticate(credentials);
  }

  return (
    <View style={[styles.authContent, { gap: 30 }]}>
      {errorMessages.length > 0 && (
        <View style={styles.errorContainer}>
          {errorMessages.map((msg, index) => (
            <Text key={index} style={styles.errorText}>
              {msg}
            </Text>
          ))}
        </View>
      )}
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <View style={styles.switchContainer}>
          <ReusableText
            text={isLogin ? "Not registered yet?" : "Already have account?"}
            family={"Medium"}
            size={TEXT.xSmall}
            color={COLORS.black}
            align={"center"}
          />
          <Pressable onPress={switchAuthModeHandler}>
            <ReusableText
              text={isLogin ? "Create an Account" : "Login Now"}
              family={"Medium"}
              size={TEXT.xSmall}
              color={COLORS.secondary}
              align={"center"}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    alignItems: "center",
  },
  errorContainer: {
    marginBottom: 16,
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
  buttons: {
    marginTop: 8,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

import React, { useState, useContext } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  Alert,
  Platform,
  NativeModules,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import AuthContent from "../../components/Auth/AuthContent";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import { COLORS } from "../../constants/theme";
import GoBack from "../../components/Buttons/GoBack";
import { createUser } from "../../util/auth";
import { AuthContext } from "../../store/auth-context";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();

  async function signupHandler({ email, username, password, confirmPassword }) {
    const deviceLanguage =
      Platform.OS === "ios"
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0]
        : NativeModules.I18nManager.localeIdentifier;

    let language = deviceLanguage.includes("_")
      ? deviceLanguage.split("_")[0]
      : deviceLanguage.split("-")[0];
    language = language || "en";

    email = email.toLowerCase();

    setIsAuthenticating(true);
    try {
      await createUser(username, email, password, confirmPassword, language);
      Alert.alert(
        "Registration Successful",
        "You have successfully registered! Please verify your email."
      );
      navigation.replace("Login");
    } catch (error) {
      const responseErrors = error.response?.data?.msg || [
        "An error occurred while registering. Please try again later.",
      ];
      setErrorMessages(responseErrors);
      Alert.alert("Registration Failed", responseErrors.join("\n"));
    }
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return (
    <LinearGradient style={{ flex: 1 }} colors={[COLORS.white, COLORS.white]}>
      <View style={{ flex: 1 }}>
        <View style={{ position: "absolute", top: 54, left: 26, zIndex: 999 }}>
          <GoBack />
        </View>
        <View style={styles.container}>
          <ImageBackground
            source={require("../../assets/images/welcom1.png")}
            style={styles.imageBackground}
            resizeMode="cover"
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Discover Jordan</Text>
            <View style={styles.formContainer}>
              <AuthContent
                onAuthenticate={signupHandler}
                errorMessages={errorMessages}
              />
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 200,
  },
  imageBackground: {
    height: "100%",
    width: "100%",
    borderRadius: 20,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    overflow: "hidden",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textContainer: {
    alignItems: "center",
    width: 247,
    height: 151,
    position: "absolute",
    top: 116,
    left: 64,
    gap: 15,
  },
  title: {
    fontFamily: "Bold",
    fontSize: 40,
    fontWeight: "700",
    lineHeight: 56,
    letterSpacing: 0,
    textAlign: "center",
    width: 247,
    height: 112,
  },
  formContainer: {
    backgroundColor: "white",
    width: 340,
    height: 428,
    position: "absolute",
    top: 220,
    borderRadius: 24,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: -9,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    padding: 30,
    justifyContent: "space-between",
  },
});

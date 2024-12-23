import React, { useState, useContext } from "react";
import {
  View,
  ImageBackground,
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
import styles from "./SignupStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";


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
        <View style={styles.goBackContainer}>
          <GoBack />
        </View>
        <View style={styles.container}>
          <ImageBackground
            source={require("../../assets/images/welcom1.png")}
            style={{
              height: "100%",
              width: "100%",
              borderRadius: wp("5%"),
              borderBottomLeftRadius: wp("10%"),
              borderBottomRightRadius: wp("10%"),
              overflow: "hidden",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
            resizeMode="cover"
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Discover Jordan</Text>
            <View style={styles.formContainer}>
              <View
                style={{
                  marginVertical: hp("2%"),
                  marginTop: -hp("0.5%"),
                  left: wp("1%"),
                }}
              >
                <Text
                  style={{
                    fontSize: wp("5%"),
                    fontWeight: "bold",
                    marginVertical: hp("1.5%"),
                    color: COLORS.black,
                  }}
                >
                  Sign Up to Explore Jordan Like Never Before
                </Text>
              </View>
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

import React, { useState, useContext } from "react";
import {
  View,
  ImageBackground,
  Text,
  Alert,
  Platform,
  NativeModules,
  Modal,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import AuthContent from "../../components/Auth/AuthContent";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import { COLORS } from "../../constants/theme";
import GoBack from "../../components/Buttons/GoBack";
import { authenticate, resendVerificationEmail } from "../../util/auth";
import { AuthContext } from "../../store/auth-context";
import styles from "./LoginStyle";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [token, setToken] = useState(null);
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();

  async function loginHandler({ emailOrUsername, password }) {
    const deviceLanguage =
      Platform.OS === "ios"
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0]
        : NativeModules.I18nManager.localeIdentifier;

    const language = deviceLanguage.split(/[_-]/)[0] || "en";
    setIsAuthenticating(true);

    try {
      const { token, first_login, verified_email } = await authenticate(
        emailOrUsername,
        password,
        "device_token_example",
        language
      );

      if (verified_email) {
        authCtx.authenticate(token, first_login);

        if (first_login) {
          navigation.reset({ index: 0, routes: [{ name: "EditProfile" }] });
        } else {
          navigation.reset({ index: 0, routes: [{ name: "BottomTabs" }] });
        }
      } else {
        setToken(token);
        Alert.alert(
          "Email Verification Required",
          "Your email is not verified. Please verify your email to proceed.",
          [
            {
              text: "Resend Verification Email",
              onPress: () => handleResendVerification(),
            },
            { text: "Cancel", style: "cancel" },
          ]
        );
      }
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Check your credentials or try again!"
      );
      setIsAuthenticating(false);
      console.log("Error during login:", error);
    }
  }

  async function handleResendVerification() {
    try {
      await resendVerificationEmail(token);
      Alert.alert(
        "Verification Email Sent",
        "A new verification email has been sent to your email address."
      );
    } catch (error) {
      Alert.alert(
        "Resend Failed",
        "An error occurred while resending the verification email. Please try again later."
      );
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
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
          </View>
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
                Hi Welcome Back ! 👋
              </Text>
              <Text
                style={{
                  fontSize: wp("4%"),
                  color: COLORS.black,
                }}
              >
                Hello again you have been missed!
              </Text>
            </View>
            <AuthContent isLogin onAuthenticate={loginHandler} />
          </View>
        </View>
      </View>
      <Modal
        transparent={true}
        visible={showVerificationModal}
        animationType="slide"
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Pressable
              style={styles.closeButton}
              onPress={() => setShowVerificationModal(false)}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </Pressable>
            <Text style={styles.modalTitle}>Email Verification</Text>
            <Text style={styles.modalMessage}>
              You should verify your email to login.
            </Text>
            <Pressable
              style={styles.resendButton}
              onPress={handleResendVerification}
            >
              <Text style={styles.resendButtonText}>
                RESEND VERIFICATION LINK
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

export default LoginScreen;

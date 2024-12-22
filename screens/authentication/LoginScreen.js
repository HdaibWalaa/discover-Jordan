import React, { useState, useContext } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
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
import { authenticate, resendVerificationEmail,getUserProfile } from "../../util/auth";
import { AuthContext } from "../../store/auth-context";


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
      setToken(token); // Store the token for further actions if needed
      setShowVerificationModal(true);
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
      </View>
    </LinearGradient>
  );
}

export default LoginScreen;


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
    height: 328,
    position: "absolute",
    top: 320,
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
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: COLORS.primary,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  resendButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
  },
  resendButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  ImageBackground,
  Text,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constants/theme";
import { forgotPassword } from "../../util/auth"; // Updated to use the correct function
import GoBack from "../../components/Buttons/GoBack";

function ResetPasswordScreen() {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  async function resetPasswordHandler() {
    try {
      await forgotPassword(email); // Call the forgotPassword function with email
      Alert.alert(
        "Success",
        "Check your email for password reset instructions."
      );
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert(
        "Failed",
        `Could not reset password: ${
          error.response?.data || error.message
        }. Please try again later.`
      );
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/images/welcom1.png")}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <View style={{ position: "absolute", top: 54, left: 26, zIndex: 999 }}>
          <GoBack />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Explorer Jordan</Text>
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Forgot your password?</Text>
            <Text style={styles.formSubtitle}>
              Please enter your email address to reset the password.
            </Text>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              placeholderTextColor="#999"
            />
            <Pressable onPress={resetPasswordHandler} style={styles.button}>
              <Text style={styles.buttonText}>RESET PASSWORD</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  imageBackground: {
    height: "100%",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textContainer: {
    alignItems: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 116,
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: "Bold",
    fontSize: 40,
    fontWeight: "700",
    lineHeight: 56,
    textAlign: "center",
    color: "#fff",
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: "white",
    width: "100%",
    padding: 30,
    borderRadius: 24,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: -9,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  formTitle: {
    fontFamily: "Bold",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "left",
    marginBottom: 10,
  },
  formSubtitle: {
    fontFamily: "Regular",
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 16,
    borderColor: COLORS.grey,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#f8f8f8",
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "bold",
  },
});

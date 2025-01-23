import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "./apiConfig";


const fetchRegestration = (language,) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/register`,
        {
          username,
          email,
          password,
          password_confirmation: passwordConfirmation,
          device_token: "your-device-token", // Replace with actual device token if needed
        },
        {
          headers: {
            "Content-Type": "application/json",
             "X-API-KEY": "DISCOVERJO91427",
          },
        }
      );

      const { token } = response.data;
      await AsyncStorage.setItem('token', token);

      Alert.alert("Success", "Your account has been created successfully!", [
        { text: "OK", onPress: () => navigation.navigate("Login") },
      ]);
    } catch (error) {
      console.error("Error signing up:", error);
      Alert.alert("Error", "Failed to create account. Please try again later.");
    }
  };

export default fetchRegestration;


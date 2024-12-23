import React, { useState } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Input from "./Input";
import { COLORS, TEXT } from "../../constants/theme";
import ReusableBtn from "../Buttons/ReusableBtn";
import ReusableText from "../Reusable/ReusableText";
import sms from "../../assets/images/icons/sms.png";
import username from "../../assets/images/icons/username.png";
import Key from "../../assets/images/icons/Key.png";

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const [enteredEmailOrUsername, setEnteredEmailOrUsername] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const navigation = useNavigation();

  const {
    email: emailIsInvalid,
    username: usernameIsInvalid,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "emailOrUsername":
        setEnteredEmailOrUsername(enteredValue);
        break;
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "username":
        setEnteredUsername(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      emailOrUsername: enteredEmailOrUsername,
      email: enteredEmail,
      username: enteredUsername,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <View style={{ gap: 20 }}>
      {!isLogin && (
        <>
          <Input
            label="Username"
            onUpdateValue={updateInputValueHandler.bind(this, "username")}
            value={enteredUsername}
            isInvalid={usernameIsInvalid}
            iconSource={username}
          />
          <Input
            label="Email Address"
            onUpdateValue={updateInputValueHandler.bind(this, "email")}
            value={enteredEmail}
            keyboardType="email-address"
            isInvalid={emailIsInvalid}
            iconSource={sms}
          />
        </>
      )}

      {isLogin && (
        <Input
          label="Email Address or Username"
          onUpdateValue={updateInputValueHandler.bind(this, "emailOrUsername")}
          value={enteredEmailOrUsername}
          isInvalid={emailIsInvalid || usernameIsInvalid}
          iconSource={sms}
        />
      )}

      <Input
        label="Password"
        onUpdateValue={updateInputValueHandler.bind(this, "password")}
        secure
        value={enteredPassword}
        isInvalid={passwordIsInvalid}
        iconSource={Key}
      />

      {!isLogin && (
        <Input
          label="Confirm Password"
          onUpdateValue={updateInputValueHandler.bind(this, "confirmPassword")}
          secure
          value={enteredConfirmPassword}
          isInvalid={passwordsDontMatch}
          iconSource={Key}
        />
      )}

      <View>
        <ReusableBtn
          onPress={submitHandler}
          btnText={isLogin ? "LogIn" : "Sign Up"}
          backgroundColor={COLORS.primary}
          width={75}
          borderColor={COLORS.primary}
          borderWidth={0}
          textColor={COLORS.black}
        />
      </View>
      {isLogin && (
        <View>
          <Pressable onPress={() => navigation.navigate("ResetPassword")}>
            <ReusableText
              text={"Forgot Your Password?"}
              family={"Medium"}
              size={TEXT.medium}
              color={COLORS.secondary}
              align={"center"}
            />
          </Pressable>
        </View>
      )}
    </View>
  );
}

export default AuthForm;

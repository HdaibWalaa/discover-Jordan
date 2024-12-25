import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  ImageBackground,
  Text,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import ReusableText from "../../components/Reusable/ReusableText";
import ReusableBtn from "../../components/Buttons/ReusableBtn";
import { COLORS, TEXT } from "../../constants/theme";
import { forgotPassword } from "../../util/auth";
import GoBack from "../../components/Buttons/GoBack";
import Input from "../../components/Auth/Input";
import sms from "../../assets/images/icons/sms.png"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

function ResetPasswordScreen() {
  const [email, setEmail] = useState("");
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const navigation = useNavigation();

async function resetPasswordHandler() {
  if (!email || !email.includes("@")) {
    setEmailIsInvalid(true);
    Alert.alert("Invalid Input", "Please enter a valid email address.");
    return;
  }
  setEmailIsInvalid(false);

  try {
    const response = await forgotPassword(email);
    if (response.status === 200) {
      Alert.alert(
        "Success",
        response.msg || "Check your email for password reset instructions."
      );
      navigation.navigate("Login");
    } else {
      Alert.alert(
        "Error",
        response.msg || "Something went wrong. Please try again."
      );
    }
  } catch (error) {
    Alert.alert(
      "Failed",
      `Could not reset password: ${
        error.response?.data?.msg || error.message
      }. Please try again later.`
    );
  }
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
            <View style={styles.formTitle}>
              <ReusableText
                text={"Forgot your password?"}
                family={"Bold"}
                size={TEXT.medium}
                color={COLORS.black}
                align={"left"}
              />
              <View style={styles.formSubtitle}>
                <ReusableText
                  text={"Please enter your email address to reset the password"}
                  family={"Medium"}
                  size={TEXT.small}
                  color={COLORS.black}
                  align={"left"}
                />
              </View>
            </View>
            <Input
              label="Email"
              onUpdateValue={setEmail}
              value={email}
              isInvalid={emailIsInvalid}
              placeholder="Enter your email"
              iconSource={sms}
            />
            <Pressable onPress={resetPasswordHandler} style={styles.button}>
              <ReusableBtn
                btnText={"RESET PASSWORD"}
                backgroundColor={COLORS.primary}
                width={75}
                height={3}
                borderColor={COLORS.primary}
                borderWidth={0}
                textColor={COLORS.black}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  textContainer: {
    alignItems: "center",
    width: wp(20),
    height: hp(20),
    position: "absolute",
    top: hp(15),
    gap: hp(1),
  },
  title: {
    fontFamily: "Bold",
    fontSize: wp(10),
    lineHeight: hp(7),
    letterSpacing: 0,
    textAlign: "center",
    width: wp(50),
    height: hp(40),
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: hp("25%"),
  },
  formContainer: {
    backgroundColor: "white",
    width: wp("85%"),
    height: hp("33%"),
    position: "absolute",
    top: hp("55%"),
    borderRadius: wp("6%"),
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: -9,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    padding: wp("5%"),
    justifyContent: "space-between",
  },
  goBackContainer: {
    position: "absolute",
    top: hp("6%"),
    left: wp("6%"),
    zIndex: 999,
  },
  formSubtitle: {
    top: hp("1%"),
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: hp("2%"),
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

});

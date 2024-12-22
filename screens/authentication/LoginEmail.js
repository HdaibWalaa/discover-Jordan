import React from "react";
import { View, Text, ImageBackground, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../constants/theme";
import styles from "./LoginStyles";
import {
  GoBack,
  ReusableBtn,
  FacebookButton,
  GoogleButton,
  InstagramButton,
} from "../../components";

const LoginEmail = ({ navigation }) => {
  return (
    <LinearGradient style={{ flex: 1 }} colors={[COLORS.white, COLORS.white]}>
      <View style={{ flex: 1 }}>
        <View style={{ position: "absolute", top: 54, left: 26, zIndex: 999 }}>
          <GoBack />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 200,
          }}
        >
          <ImageBackground
            source={require("../../assets/images/welcom1.png")}
            style={{
              height: "100%",
              width: "100%",
              borderRadius: 20,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
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
            <View style={{ marginVertical: 22, marginTop: -5, left: 5 }}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                  marginVertical: 12,
                  color: COLORS.black,
                }}
              >
                Hi Welcome Back ! 👋
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.black,
                }}
              >
                Hello again you have been missed!
              </Text>
            </View>

            <ReusableBtn
              onPress={() => {
                navigation.navigate("Login");
              }}
              btnText={"Continue with the email"}
              backgroundColor={COLORS.primary}
              width={294}
              borderColor={COLORS.primary}
              borderWidth={0}
              textColor={COLORS.black}
            />
            <View style={styles.orContainer}>
              <View style={styles.line}></View>
              <Text style={styles.orText}>Or Continue with</Text>
              <View style={styles.line}></View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                width: 186,
                height: 52,
                left: 54.88,
              }}
            >
              <FacebookButton
                onPress={() => console.log("Facebook button pressed")}
              />
              <GoogleButton
                onPress={() => console.log("Google button pressed")}
              />
              <InstagramButton
                onPress={() => console.log("Instagram button pressed")}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 22,
              top: 130,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: COLORS.black,
                fontWeight: 300,
              }}
            >
              Not registered yet?
            </Text>
            <Pressable onPress={() => navigation.navigate("Signup")}>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.secondary,
                  fontWeight: 700,
                  marginLeft: 6,
                }}
              >
                Create an Account
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default LoginEmail;

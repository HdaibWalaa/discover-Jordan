import React from "react";
import { View, Text, ImageBackground, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../constants/theme";
import styles from "./LoginEmailStyles";
import {
  GoBack,
  ReusableBtn,
  FacebookButton,
  GoogleButton,
  InstagramButton,
} from "../../components";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const LoginEmail = ({ navigation }) => {
  return (
    <LinearGradient style={{ flex: 1 }} colors={[COLORS.white, COLORS.white]}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            position: "absolute",
            top: hp("6%"),
            left: wp("6%"),
            zIndex: 999,
          }}
        >
          <GoBack />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: hp("20%"),
          }}
        >
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

            <ReusableBtn
              onPress={() => {
                navigation.navigate("Login");
              }}
              btnText={"Continue with the email"}
              backgroundColor={COLORS.primary}
              width={75}
              height={7}
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
                width: wp("30%"),
                height: hp("7%"),
                left: wp("23%"),
              }}
            >
              <FacebookButton
                onPress={() => console.log("Facebook button pressed")}
              />
              <GoogleButton
                onPress={() => console.log("Google button pressed")}
              />
              {/* <InstagramButton
                onPress={() => console.log("Instagram button pressed")}
              /> */}
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: hp("2%"),
              top: hp("12%"),
            }}
          >
            <Text
              style={{
                fontSize: wp("4%"),
                color: COLORS.black,
                fontWeight: "300",
              }}
            >
              Not registered yet?
            </Text>
            <Pressable onPress={() => navigation.navigate("Signup")}>
              <Text
                style={{
                  fontSize: wp("4%"),
                  color: COLORS.secondary,
                  fontWeight: "700",
                  marginLeft: wp("1%"),
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

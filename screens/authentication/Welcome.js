import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ReusableBtn, HeightSpacer } from "../../components";
import { COLORS, SIZES } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {
  const navigation = useNavigation();
  return (
    <LinearGradient style={styles.gradient} colors={["#FFFFFF", "#FFFFFF"]}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/welcom1.png")}
          style={styles.imageBackground}
        >
          <View style={styles.textContainer}>
            <Text style={styles.title}>Explore</Text>
            <Text style={styles.title}>Jordan</Text>
            <Text style={styles.subtitle}>Let’s start here!</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <ReusableBtn
              btnText={"Continue as visitor"}
              backgroundColor={COLORS.white}
              width={90}
              height={7}
              borderColor={COLORS.white}
              borderWidth={0}
              textColor={COLORS.black}
              onPress={() => navigation.navigate("BottomTabs")}
            />
            <HeightSpacer height={20} />
            <ReusableBtn
              btnText={"Join Us"}
              backgroundColor={COLORS.primary}
              width={90}
              height={7}
              borderColor={COLORS.primary}
              borderWidth={0}
              textColor={COLORS.black}
              onPress={() => navigation.navigate("LoginEmail")}
            />
          </View>
        </ImageBackground>
      </View>
    </LinearGradient>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    overflow: "hidden",
  },
  imageBackground: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  textContainer: {
    alignItems: "center",
    position: "absolute",
    top: Dimensions.get("window").height * 0.2,
  },
  title: {
    fontFamily: "Red Hat Display",
    fontSize: 40,
    fontWeight: "700",
    lineHeight: 56,
    textAlign: "center",
    color: COLORS.black,
  },
  subtitle: {
    fontFamily: "Red Hat Display",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 24,
    textAlign: "center",
    color: COLORS.black,
    marginTop: 10,
  },
  buttonsContainer: {
    position: "absolute",
    bottom: Dimensions.get("window").height * 0.15,
    alignItems: "center",
  },
});

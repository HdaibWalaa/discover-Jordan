import React, { useState, useContext } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../store/auth-context";
import { ReusableBackground, ReusableText } from "../../components";
import { COLORS, TEXT } from "../../constants/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const CreatPlan = () => {
  const { token } = useContext(AuthContext); // Retrieve token from AuthContext
  const navigation = useNavigation(); // Get navigation object
  const [planName, setPlanName] = useState("");
  const [planDescription, setPlanDescription] = useState("");

  const handleContinue = () => {
    if (planName.trim() && planDescription.trim()) {
      navigation.navigate("CreatActivies", {
        planName: planName,
        planDescription: planDescription,
      });
    } else {
      // Optionally handle empty inputs
      alert("Please enter both plan name and description.");
    }
  };

  return (
    <ReusableBackground>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <ReusableText
            text={"Plan Name"}
            family="Medium"
            size={TEXT.medium}
            color={COLORS.dark}
          />
          <View style={styles.inputWrapper}>
            <Image
              source={require("../../assets/images/icons/text.png")} // Replace with your icon path
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Plan name"
              value={planName}
              onChangeText={setPlanName}
              placeholderTextColor="#333333"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <ReusableText
            text={"Plan Description"}
            family="Medium"
            size={TEXT.medium}
            color={COLORS.dark}
          />
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Type here ..."
              value={planDescription}
              onChangeText={setPlanDescription}
              placeholderTextColor="#333333"
              multiline={true} 
              textAlignVertical="top" 
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <ReusableText
            text={"Continue".toLocaleUpperCase()}
            family="Medium"
            size={TEXT.medium}
            color={COLORS.black}
            style={{ letterSpacing: 1 }}
          />
        </TouchableOpacity>
      </View>
    </ReusableBackground>
  );
};

export default CreatPlan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: hp(4), 
    top: hp(2), 
    paddingHorizontal: wp(5), 
  },
  inputContainer: {
    marginBottom: hp(2.5), 
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  icon: {
    width: wp(6), 
    height: wp(6), 
    marginRight: wp(2.5), 
  },
  input: {
    flex: 1,
    paddingVertical: hp(1.5),
    fontSize: wp(4), 
  },
  continueButton: {
    backgroundColor: "#FCD228",
    paddingVertical: hp(2), 
    borderRadius: wp(3), 
    alignItems: "center",
  },
});

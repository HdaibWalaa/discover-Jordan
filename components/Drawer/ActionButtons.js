import React, { useContext } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import languageIcon from "../../assets/images/icons/language.png";
import privacyPolicyIcon from "../../assets/images/icons/privacypolicy.png";
import contactUsIcon from "../../assets/images/icons/contactUs.png";
import SuggestPlace from "../../assets/images/icons/map.png";
import logoutIcon from "../../assets/images/icons/logout.png";
import darkLightModeIcon from "../../assets/images/icons/darklightmood.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS, TEXT } from "../../constants/theme";
import { ReusableText } from "../index";
import { AuthContext } from "../../store/auth-context";
import { useTheme } from "../../store/context/ThemeContext";
import { useLanguage } from "../../store/context/LanguageContext";

const ActionButtons = () => {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);
  const { translations, toggleLanguage } = useLanguage();
  const { mode, toggleTheme } = useTheme();
  const isDarkMode = mode === "dark";

  const handleLogout = async () => {
    try {
      authCtx.logout(); // Clear the token
      navigation.reset({
        index: 0,
        routes: [{ name: "Onboarding" }],
      });
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Logout Error", "An error occurred during logout.");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        {/* Change Language */}
        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: isDarkMode ? COLORS.dark : COLORS.white },
          ]}
          onPress={toggleLanguage}
        >
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: isDarkMode ? COLORS.gray : COLORS.grey2 },
            ]}
          >
            <Image source={languageIcon} style={styles.icon} />
          </View>
          <ReusableText
            text={translations.changeLanguage}
            family={"Medium"}
            size={TEXT.small}
            color={isDarkMode ? COLORS.white : COLORS.black}
            align={"left"}
            style={styles.actionText}
          />
          <Ionicons
            name="chevron-forward-outline"
            size={wp("6%")}
            color={isDarkMode ? COLORS.white : "#999"}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>

        {/* Toggle Theme */}
        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: isDarkMode ? COLORS.dark : COLORS.white },
          ]}
          onPress={toggleTheme}
        >
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: isDarkMode ? COLORS.gray : COLORS.grey2 },
            ]}
          >
            <Image source={darkLightModeIcon} style={styles.icon} />
          </View>
          <ReusableText
            text={
              mode === "dark"
                ? translations.switchToLight
                : translations.switchToDark
            }
            family={"Medium"}
            size={TEXT.small}
            color={isDarkMode ? COLORS.white : COLORS.black}
            align={"left"}
            style={styles.actionText}
          />
          <Ionicons
            name="chevron-forward-outline"
            size={wp("6%")}
            color={isDarkMode ? COLORS.white : "#999"}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>

        {/* Contact Us */}
        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: isDarkMode ? COLORS.dark : COLORS.white },
          ]}
          onPress={() => navigation.navigate("ContactUs")}
        >
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: isDarkMode ? COLORS.gray : COLORS.grey2 },
            ]}
          >
            <Image source={contactUsIcon} style={styles.icon} />
          </View>
          <ReusableText
            text={translations.contactUs}
            family={"Medium"}
            size={TEXT.small}
            color={isDarkMode ? COLORS.white : COLORS.black}
            align={"left"}
            style={styles.actionText}
          />
          <Ionicons
            name="chevron-forward-outline"
            size={wp("6%")}
            color={isDarkMode ? COLORS.white : "#999"}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>

        {/* Suggest Place */}
        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: isDarkMode ? COLORS.dark : COLORS.white },
          ]}
          onPress={() => navigation.navigate("SuggestPlace")}
        >
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: isDarkMode ? COLORS.gray : COLORS.grey2 },
            ]}
          >
            <Image source={SuggestPlace} style={styles.icon} />
          </View>
          <ReusableText
            text={translations.suggestPlace}
            family={"Medium"}
            size={TEXT.small}
            color={isDarkMode ? COLORS.white : COLORS.black}
            align={"left"}
            style={styles.actionText}
          />
          <Ionicons
            name="chevron-forward-outline"
            size={wp("6%")}
            color={isDarkMode ? COLORS.white : "#999"}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>

        {/* Privacy Policy */}
        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: isDarkMode ? COLORS.dark : COLORS.white },
          ]}
          onPress={() => navigation.navigate("Privacypolicy")}
        >
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: isDarkMode ? COLORS.gray : COLORS.grey2 },
            ]}
          >
            <Image source={privacyPolicyIcon} style={styles.icon} />
          </View>
          <ReusableText
            text={translations.privacyPolicy}
            family={"Medium"}
            size={TEXT.small}
            color={isDarkMode ? COLORS.white : COLORS.black}
            align={"left"}
            style={styles.actionText}
          />
          <Ionicons
            name="chevron-forward-outline"
            size={wp("6%")}
            color={isDarkMode ? COLORS.white : "#999"}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: isDarkMode ? COLORS.dark : COLORS.white },
          ]}
          onPress={handleLogout}
        >
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: isDarkMode ? COLORS.gray : COLORS.grey2 },
            ]}
          >
            <Image source={logoutIcon} style={styles.icon} />
          </View>
          <ReusableText
            text={translations.logout}
            family={"Medium"}
            size={TEXT.small}
            color={isDarkMode ? COLORS.white : COLORS.black}
            align={"left"}
            style={styles.actionText}
          />
          <Ionicons
            name="chevron-forward-outline"
            size={wp("6%")}
            color={isDarkMode ? COLORS.white : "#999"}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ActionButtons;

const styles = StyleSheet.create({
  scrollContainer: {},
  container: {
    paddingHorizontal: wp(".5%"),
    paddingVertical: hp("1%"),
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp("4%"),
    paddingVertical: hp("2%"),
    borderRadius: wp("6%"),
    marginBottom: hp("2%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: hp("0.5%") },
    shadowOpacity: 0.1,
    shadowRadius: wp("1%"),
    elevation: 2,
    width: wp("72%"),
  },
  iconContainer: {
    width: wp("10%"),
    height: wp("10%"),
    borderRadius: wp("5%"),
    justifyContent: "center",
    alignItems: "center",
    marginRight: wp("4%"),
  },
  icon: {
    width: wp("6%"),
    height: wp("6%"),
  },
  actionText: {
    flex: 1,
  },
  arrowIcon: {
    marginLeft: "auto",
  },
});

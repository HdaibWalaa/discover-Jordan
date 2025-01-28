import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Platform,
  NativeModules,
} from "react-native";
import axios from "axios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import BASE_URL from "../../hook/apiConfig";
import { ReusableText } from "../../components";
import { COLORS, TEXT, SIZES } from "../../constants/theme";

const PrivacyPolicy = () => {
  const [privacyData, setPrivacyData] = useState([]);
  const [loading, setLoading] = useState(true);

  const deviceLanguage =
    Platform.OS === "ios"
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;

  let language = deviceLanguage.includes("_")
    ? deviceLanguage.split("_")[0]
    : deviceLanguage.split("-")[0];

  language = language || "en";

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/legal/document`, {
          headers: {
            "Content-Language": language,
            "X-API-KEY": "DISCOVERJO91427",
          },
        });
        const policyData = response.data.data[0]["Privacy And Policy"];
        setPrivacyData(policyData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching privacy policy:", error);
        setLoading(false);
      }
    };

    fetchPrivacyPolicy();
  }, [language]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator="false"
      >
        {privacyData.map((section, index) => (
          <View key={index} style={styles.section}>
            <ReusableText
              text={section.title}
              family={"Bold"}
              size={TEXT.large}
              color={COLORS.black}
              align={"left"}
              style={styles.sectionTitle}
            />
            <ReusableText
              text={section.content}
              family={"Medium"}
              size={TEXT.small}
              color={COLORS.black}
              align={"left"}
              style={styles.sectionContent}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: wp("5%"),
    paddingVertical: hp("2%"),
    marginBottom: hp("5%"),
  },
  contentContainer: {
    paddingBottom: hp("3%"),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    marginBottom: hp("3%"),
  },
  sectionTitle: {
    marginBottom: hp("1%"),
  },
  sectionContent: {
    lineHeight: hp("3.5%"),
  },
});

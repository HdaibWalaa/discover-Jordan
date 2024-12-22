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
import BASE_URL from "../../hook/apiConfig";

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
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        {privacyData.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionContent}>{section.content}</Text>
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
    backgroundColor: "#fff",
  },
  contentContainer: {
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 16,
    lineHeight: 24,
  },
});

import { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator ,Text} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import reusable from "../../components/Reusable/reusable.style";
import ReusableText from "../../components/Reusable/ReusableText";
import { COLORS, TEXT } from "../../constants/theme";
import AllCategories from "../../components/Category/AllCategories";
import { ReusableBackground, ReusableShuffle } from "../../components";
import axios from "axios";
import BASE_URL from "../../hook/apiConfig";
import { Platform, NativeModules } from "react-native";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const deviceLanguage =
    Platform.OS === "ios"
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;

  let language = deviceLanguage.includes("_")
    ? deviceLanguage.split("_")[0]
    : deviceLanguage.split("-")[0];

  language = language || "en"; // Set default language to "en"

  // Initial fetch to get categories
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch categories function
  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/all-categories`, {
        headers: {
          "Content-Language": language,
          "X-API-KEY": "DISCOVERJO91427",
        },
      });
      setCategories(response.data.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Shuffle categories function
  const shuffleCategories = async () => {
    console.log("Shuffle button pressed!");
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/shuffle/all-categories`, {
        headers: { "Content-Language": language },
      });
      setCategories(response.data.data);
      console.log(response.data.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <ActivityIndicator color="black" size={60} />;
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <ReusableBackground>
      <SafeAreaView style={reusable.container}>
        <View>
          <View style={reusable.header1}>
            <View style={{ width: 150 }}>
              <ReusableText
                text={"Where do you wanna go?"}
                family={"Bold"}
                size={TEXT.large}
                color={COLORS.black}
              />
            </View>
            <ReusableShuffle onPress={shuffleCategories} />
          </View>

          {/* Pass the categories to AllCategories component */}
          <AllCategories categories={categories} />
        </View>
      </SafeAreaView>
    </ReusableBackground>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});

import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  Platform,
  NativeModules,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import reusable from "../../components/Reusable/reusable.style";
import ReusableText from "../../components/Reusable/ReusableText";
import { COLORS, TEXT } from "../../constants/theme";
import AllCategories from "../../components/Category/AllCategories";
import { ReusableBackground, ReusableShuffle } from "../../components";
import fetchCategory from "../../hook/category/fetchCategory";

const CategoryList = () => {
  const deviceLanguage =
    Platform.OS === "ios"
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;

  let language = deviceLanguage.includes("_")
    ? deviceLanguage.split("_")[0]
    : deviceLanguage.split("-")[0];

  language = language || "en"; // Set default language to "en"

  const { categoryData, isLoading, error, shuffleData } =
    fetchCategory(language);

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
            <ReusableShuffle onPress={shuffleData} />
          </View>

          {/* Pass the categories to AllCategories component */}
          <AllCategories categories={categoryData} />
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

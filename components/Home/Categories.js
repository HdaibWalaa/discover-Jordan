import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  VirtualizedList,
  Platform,
  NativeModules,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ReusableText from "../Reusable/ReusableText";
import { TEXT, COLORS, SIZES } from "../../constants/theme";
import Category from "../Tiles/category/Category";
import ReusableArrow from "../Buttons/ReusableArrow";
import fetchCategory from "../../hook/category/fetchCategory";

const Categories = () => {
  const navigation = useNavigation();
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const deviceLanguage =
      Platform.OS === "ios"
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0]
        : NativeModules.I18nManager.localeIdentifier;

    let lang = deviceLanguage.includes("_")
      ? deviceLanguage.split("_")[0]
      : deviceLanguage.split("-")[0];

    lang = lang || "en";
    setLanguage(lang);
  }, []);

  const { categoryData, isLoading, error } = fetchCategory(language);

  if (isLoading) {
    return <ActivityIndicator color="black" size={60} />;
  }

  if (error) {
    return (
      <View>
        <Text>Error occurred: {error.message}</Text>
      </View>
    );
  }

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  return (
    <View>
      <View style={[styles.header, { marginTop: -5 }]}>
        <ReusableText
          text={"Categories".toUpperCase()}
          family={"SemiBold"}
          size={TEXT.large}
          color={COLORS.black}
          align={"left"}
          style={{ letterSpacing: 2 }}
        />

        <ReusableArrow
          onPress={() => navigation.navigate("CategoryList")}
          size={24}
          color="black"
        />
      </View>
      <VirtualizedList
        data={categoryData}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        getItemCount={(data) => data.length}
        getItem={(data, index) => data[index]}
        renderItem={({ item, index }) => (
          <View style={{ marginRight: SIZES.medium }}>
            <Category item={item} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 15,
  },
});

export default Categories;

import React, { useState, useEffect } from "react";
import {
  View,
  VirtualizedList,
  StyleSheet,
  Platform,
  NativeModules,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ReusableText from "../Reusable/ReusableText";
import reusable from "../Reusable/reusable.style";
import { TEXT, COLORS, SIZES } from "../../constants/theme";
import ReusableArrow from "../Buttons/ReusableArrow";
import PlanCard from "../Tiles/plan/PlanCard";
import fetchPlans from "../../hook/plane/fetchPlanes";

const Plans = () => {
  const [data, setData] = useState([]);
  const [language, setLanguage] = useState("en");
  const navigation = useNavigation();

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

    // Fetch the plans
    fetchPlans(lang)
      .then((fetchedPlans) => setData(fetchedPlans))
      .catch((error) => console.error(error));
  }, []);

  return (
    <View>
      <View
        style={[reusable.rowWithSpace("space-between"), { paddingBottom: 20 }]}
      >
        <ReusableText
          text={"Plans".toUpperCase()}
          family={"medium"}
          size={TEXT.large}
          color={COLORS.black}
        />
        <ReusableArrow
          onPress={() => navigation.navigate("AllPlans")}
          size={24}
          color="black"
        />
      </View>
      <VirtualizedList
        data={data}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        getItemCount={(data) => data.length}
        getItem={(data, index) => data[index]}
        renderItem={({ item }) => (
          <View style={{ marginRight: SIZES.medium }}>
            <PlanCard item={item} />
          </View>
        )}
      />
    </View>
  );
};

export default Plans;

const styles = StyleSheet.create({});

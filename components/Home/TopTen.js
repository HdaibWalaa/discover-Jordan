import {
  FlatList,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Text,
  Platform,
  NativeModules,
} from "react-native";
import React from "react";
import reusable from "../Reusable/reusable.style";
import ReusableText from "../Reusable/ReusableText";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import ReusableArrow from "../Buttons/ReusableArrow";
import TopTenCard from "../Tiles/Places/TopTenCard";
import fetchTopTenPlaces from "../../hook/fetchTopTenPlaces";

const TopTen = () => {
  const navigation = useNavigation();
  const deviceLanguage =
    Platform.OS === "ios"
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;

  let language = deviceLanguage.includes("_")
    ? deviceLanguage.split("_")[0]
    : deviceLanguage.split("-")[0];

  language = language || "en";
  const { topTenData, isLoading, error } = fetchTopTenPlaces(language);

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

  return (
    <View>
      <View
        style={[reusable.rowWithSpace("space-between"), { paddingBottom: 20 }]}
      >
        <ReusableText
          text={"Top 10 Places".toUpperCase()}
          family={"medium"}
          size={TEXT.large}
          color={COLORS.black}
        />
        <ReusableArrow
          onPress={() => navigation.navigate("AllTopTen")}
          size={24}
          color="black"
        />
      </View>
      <View>
        <FlatList
          data={topTenData}
          horizontal
          keyExtractor={(item) => item.place_id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ columnGap: SIZES.medium }}
          renderItem={({ item }) => <TopTenCard item={item} />}
        />
      </View>
    </View>
  );
};

export default TopTen;

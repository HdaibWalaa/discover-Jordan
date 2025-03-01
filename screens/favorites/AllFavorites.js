import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import reusable from "../../components/Reusable/reusable.style";
import ReusableText from "../../components/Reusable/ReusableText";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import {
  FavoritCards,
  HeightSpacer,
  ReusableBackground,
  ReusableShuffle,
} from "../../components";
import AllCards from "../../components/favorite/AllCards";
import { useLanguage } from "../../store/context/LanguageContext";
import { useTheme } from "../../store/context/ThemeContext";

const AllFavorites = () => {
  const { mode } = useTheme();
  const { translations, language, toggleLanguage } = useLanguage();
  return (
    <ReusableBackground>
      <SafeAreaView style={[reusable.container, { gap: 30 }]}>
        <View>
          <View style={[reusable.header1, { marginBottom: 15 }]}>
            <View style={{ width: 300 }}>
              <ReusableText
                text={translations.FavoritesTitles}
                family={"Bold"}
                size={TEXT.large}
                color={mode === "dark" ? COLORS.white : COLORS.black}
              />
            </View>
          </View>
          <AllCards />
        </View>
      </SafeAreaView>
    </ReusableBackground>
  );
};

export default AllFavorites;

import { StyleSheet, View } from "react-native";
import React from "react";
import { useTheme } from "../../store/context/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";
import reusable from "../../components/Reusable/reusable.style";
import ReusableText from "../../components/Reusable/ReusableText";
import { COLORS, TEXT } from "../../constants/theme";
import { ReusableBackground } from "../../components";
import FavoritCards from "../../components/favorite/FavoritCards";
import { useLanguage } from "../../store/context/LanguageContext";


const Favorites = () => {
  const { mode } = useTheme();
  const { translations, language, toggleLanguage } = useLanguage();
  return (
    <ReusableBackground>
      <SafeAreaView style={reusable.container}>
        <View>
          <View style={[reusable.header1, { marginBottom: -15 }]}>
            <View style={{ width: 200 }}>
              <ReusableText
                text={translations.FavoritesTitles}
                family={"Bold"}
                size={TEXT.large}
                color={mode === "dark" ? COLORS.white : COLORS.black}
              />
            </View>
          </View>
          <FavoritCards />
        </View>
      </SafeAreaView>
    </ReusableBackground>
  );
};

export default Favorites;

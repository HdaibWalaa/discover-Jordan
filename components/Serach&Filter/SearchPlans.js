import React from "react";
import { View, Image, FlatList, StyleSheet } from "react-native";
import { COLORS, TEXT } from "../../constants/theme";
import { ReusableText } from "../../components";
import { useTheme } from "../../store/context/ThemeContext";
import { useLanguage } from "../../store/context/LanguageContext";
import translations from "../../translations/translations";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const SearchPlans = ({ plans = [] }) => {
  const { mode } = useTheme();
  const { language } = useLanguage();
  const translatedText = translations[language] || translations["en"];

  if (!plans.length) {
    return (
      <View style={styles.noDataContainer}>
        <ReusableText
          text={translatedText.noPlans || "No plans found"}
          family="Bold"
          size={TEXT.medium}
          color={COLORS.secondary}
        />
      </View>
    );
  }

  return (
    <FlatList
      data={plans}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={<View style={{ height: hp(10) }} />} // Dynamic spacing
      keyExtractor={(item, index) =>
        item.id ? `plan-${item.id}` : `index-${index}`
      }
      renderItem={({ item }) => (
        <View style={[styles.planCard, mode === "dark" && styles.planCardDark]}>
          <Image source={{ uri: item.image }} style={styles.planImage} />
          <View style={styles.planDetails}>
            <ReusableText
              text={item.name}
              family="Bold"
              size={TEXT.medium}
              color={mode === "dark" ? COLORS.white : COLORS.black}
            />
            <ReusableText
              text={`${translatedText.startDay}: ${item.start_day}`}
              family="Regular"
              size={TEXT.small}
              color={mode === "dark" ? COLORS.lightGrey : COLORS.gray}
            />
            <ReusableText
              text={`${translatedText.endDay}: ${item.end_day}`}
              family="Regular"
              size={TEXT.small}
              color={mode === "dark" ? COLORS.lightGrey : COLORS.gray}
            />
            <ReusableText
              text={`${translatedText.address}: ${item.address}`}
              family="Regular"
              size={TEXT.small}
              color={mode === "dark" ? COLORS.lightGrey : COLORS.gray}
            />
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  noDataContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: wp(5),
  },
  planCard: {
    
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: wp(3),
    padding: wp(3),
    marginVertical: hp(1.5),
    width: wp(90),
    alignSelf: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  planCardDark: {
    backgroundColor: COLORS.lightGrey,
  },
  planImage: {
    width: wp(18),
    height: wp(18),
    borderRadius: wp(3),
    marginRight: wp(3),
  },
  planDetails: {
    flex: 1,
  },
});

export default SearchPlans;

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

const SearchTrips = ({ trips }) => {
  const { mode } = useTheme();
  const { language } = useLanguage();
  const translatedText = translations[language] || translations["en"];

  if (!trips || trips.length === 0) {
    return (
      <View style={[styles.noDataContainer]}>
        <ReusableText
          text={translatedText.noTrips || "No trips found"}
          family="Bold"
          size={TEXT.medium}
          color={mode === "dark" ? COLORS.white : COLORS.secondary}
        />
      </View>
    );
  }

  return (
    <FlatList
      data={trips}
      showsVerticalScrollIndicator="false"
      ListFooterComponent={<View style={{ height: hp(40) }} />}
      keyExtractor={(item, index) =>
        item.id ? `trip-${item.id}` : `index-${index}`
      }
      renderItem={({ item }) => (
        <View style={[styles.tripCard, mode === "dark" && styles.tripCardDark]}>
          <Image source={{ uri: item.image }} style={styles.tripImage} />
          <View style={styles.tripDetails}>
            <ReusableText
              text={item.name}
              family="Bold"
              size={TEXT.medium}
              color={mode === "dark" ? COLORS.black : COLORS.black}
            />
            <ReusableText
              text={`${translatedText.place}: ${item.place_name}`}
              family="Regular"
              size={TEXT.small}
              color={mode === "dark" ? COLORS.lightGreen : COLORS.lightGrey}
            />
            <ReusableText
              text={`${translatedText.when}: ${item.date}`}
              family="Regular"
              size={TEXT.small}
              color={mode === "dark" ? COLORS.lightGreen : COLORS.lightGrey}
            />
            <ReusableText
              text={`${translatedText.cost}: ${item.price} JD`}
              family="Regular"
              size={TEXT.small}
              color={mode === "dark" ? COLORS.lightGreen : COLORS.lightGrey}
            />
          </View>
        </View>
      )}
    />
  );
};

export default SearchTrips;

const styles = StyleSheet.create({
  noDataContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: wp(5),
  },
  darkContainer: {
    backgroundColor: COLORS.lightGrey,
    flex: 1,
  },
  tripCard: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: wp(2.5),
    padding: wp(2.5),
    marginVertical: hp(0.6),
    width: wp(90),
    marginLeft: wp(2),
    alignSelf: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: hp(0.3) },
    shadowOpacity: 0.1,
    shadowRadius: wp(1),
    elevation: 2,
  },
  tripCardDark: {
    backgroundColor: COLORS.lightGrey,
  },
  tripImage: {
    width: wp(20),
    height: wp(20),
    borderRadius: wp(2.5),
    marginRight: wp(2.5),
  },
  tripDetails: {
    flex: 1,
  },
});

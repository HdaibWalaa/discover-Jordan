import React from "react";
import { View, Image, FlatList, StyleSheet } from "react-native";
import { COLORS, TEXT } from "../../constants/theme";
import { ReusableText } from "../../components";
import { useTheme } from "../../store/context/ThemeContext";
import { useLanguage } from "../../store/context/LanguageContext";
import translations from "../../translations/translations";

const FavoriteTrips = ({ trips }) => {
  const { mode } = useTheme();
  const { language } = useLanguage();
  const translatedText = translations[language] || translations["en"];

  if (!trips || trips.length === 0) {
    return (
      <View style={[styles.noDataContainer]}>
        <ReusableText
          text={translatedText.noTrips || "No favorite trips found"}
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
     ListFooterComponent={<View style={{ height: 350 }} />}
      keyExtractor={(item) => item.id.toString()}
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

export default FavoriteTrips;

const styles = StyleSheet.create({
  noDataContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  darkContainer: {
    backgroundColor: COLORS.lightGrey,
  },
  tripCard: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    width: 370,
    left: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  tripCardDark: {
    backgroundColor: COLORS.lightGrey,
  },
  tripImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  tripDetails: {
    flex: 1,
  },
});

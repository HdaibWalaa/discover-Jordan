import React from "react";
import { View, Image, FlatList, StyleSheet } from "react-native";
import { COLORS, TEXT } from "../../constants/theme";
import { ReusableText } from "../../components";
import { useTheme } from "../../store/context/ThemeContext";
import { useLanguage } from "../../store/context/LanguageContext";
import translations from "../../translations/translations";

const FavoritePlaces = ({ places }) => {
  const { mode } = useTheme();
  const { language } = useLanguage();
  const translatedText = translations[language] || translations["en"];

  if (!places || places.length === 0) {
    return (
      <View style={[styles.noDataContainer]}>
        <ReusableText
          text={translatedText.noPlaces || "No places found"}
          family="Bold"
          size={TEXT.medium}
          color={mode === "dark" ? COLORS.white : COLORS.secondary}
        />
      </View>
    );
  }

  return (
    <FlatList
      data={places}
      ListFooterComponent={<View style={{ height: 350 }} />}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View
          style={[styles.placeCard, mode === "dark" && styles.placeCardDark]}
        >
          <Image source={{ uri: item.image }} style={styles.placeImage} />
          <View style={styles.placeDetails}>
            <ReusableText
              text={item.name}
              family="Bold"
              size={TEXT.medium}
              color={mode === "dark" ? COLORS.black : COLORS.black}
            />
            <ReusableText
              text={`${translatedText.Region}: ${item.region}`}
              family="Regular"
              size={TEXT.small}
              color={mode === "dark" ? COLORS.lightGreen : COLORS.lightGrey}
            />
            <ReusableText
              text={`${translatedText.Address}: ${item.address}`}
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

export default FavoritePlaces;

const styles = StyleSheet.create({
  noDataContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  placeCard: {
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
  placeCardDark: {
    backgroundColor: COLORS.lightGrey,
  },
  placeImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  placeDetails: {
    flex: 1,
  },
});

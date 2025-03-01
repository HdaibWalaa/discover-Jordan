import React from "react";
import { View, Image, FlatList, StyleSheet } from "react-native";
import { COLORS, TEXT } from "../../constants/theme";
import { ReusableText } from "../../components";
import { useTheme } from "../../store/context/ThemeContext";
import { useLanguage } from "../../store/context/LanguageContext";
import translations from "../../translations/translations";

const FavoriteVolunteers = ({ volunteers }) => {
  const { mode } = useTheme();
  const { language } = useLanguage();
  const translatedText = translations[language] || translations["en"];

  if (!volunteers || volunteers.length === 0) {
    return (
      <View style={[styles.noDataContainer]}>
        <ReusableText
          text={translatedText.noVolunteers || "No favorite volunteers found"}
          family="Bold"
          size={TEXT.medium}
          color={COLORS.secondary}
        />
      </View>
    );
  }

  return (
    <FlatList
      data={volunteers}
      ListFooterComponent={<View style={{ height: 350 }} />}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View
          style={[
            styles.volunteerCard,
            mode === "dark" && styles.volunteerCardDark,
          ]}
        >
          <Image source={{ uri: item.image }} style={styles.volunteerImage} />
          <View style={styles.volunteerDetails}>
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
              color={mode === "dark" ? COLORS.lightGreen : COLORS.gray}
            />
            <ReusableText
              text={`${translatedText.endDay}: ${item.end_day}`}
              family="Regular"
              size={TEXT.small}
              color={mode === "dark" ? COLORS.lightGreen : COLORS.gray}
            />
            <ReusableText
              text={`${translatedText.address}: ${item.address}`}
              family="Regular"
              size={TEXT.small}
              color={mode === "dark" ? COLORS.lightGreen : COLORS.gray}
            />
          </View>
        </View>
      )}
    />
  );
};

export default FavoriteVolunteers;

const styles = StyleSheet.create({
  noDataContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  darkContainer: {
    backgroundColor: COLORS.lightGreen,
  },
  volunteerCard: {
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
  volunteerCardDark: {
    backgroundColor: COLORS.lightGreen,
  },
  volunteerImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  volunteerDetails: {
    flex: 1,
  },
});

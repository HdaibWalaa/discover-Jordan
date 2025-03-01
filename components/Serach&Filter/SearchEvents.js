import React from "react";
import { View, Image, FlatList, StyleSheet } from "react-native";
import { COLORS, TEXT } from "../../constants/theme";
import { ReusableText } from "../../components";
import { useTheme } from "../../store/context/ThemeContext";
import { useLanguage } from "../../store/context/LanguageContext";
import translations from "../../translations/translations";

const SearchEvents = ({ events }) => {
  const { mode } = useTheme();
  const { language } = useLanguage();
  const translatedText = translations[language] || translations["en"];

  if (!events || events.length === 0) {
    return (
      <View style={[styles.noDataContainer]}>
        <ReusableText
          text={translatedText.noEvents || "No events found"}
          family="Bold"
          size={TEXT.medium}
          color={COLORS.secondary}
        />
      </View>
    );
  }

  return (
    <FlatList
      data={events}
      ListFooterComponent={<View style={{ height: 350 }} />}
      keyExtractor={(item, index) =>
        item.id ? `event-${item.id}` : `index-${index}`
      }
      renderItem={({ item }) => (
        <View
          style={[styles.eventCard, mode === "dark" && styles.eventCardDark]}
        >
          <Image source={{ uri: item.image }} style={styles.eventImage} />
          <View style={styles.eventDetails}>
            <ReusableText
              text={item.name}
              family="Bold"
              size={TEXT.medium}
              color={mode === "dark" ? COLORS.black : COLORS.black}
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

export default SearchEvents;

const styles = StyleSheet.create({
  noDataContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  eventCard: {
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
  eventCardDark: {
    backgroundColor: COLORS.lightGrey,
  },
  eventImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  eventDetails: {
    flex: 1,
  },
});

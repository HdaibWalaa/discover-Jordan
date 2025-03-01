import React from "react";
import { View, Image, FlatList, StyleSheet } from "react-native";
import { COLORS, TEXT } from "../../constants/theme";
import { ReusableText } from "../../components";
import { useTheme } from "../../store/context/ThemeContext";
import { useLanguage } from "../../store/context/LanguageContext";
import translations from "../../translations/translations";

const FavoriteGuideTrips = (guide_trip) => {
  const { mode } = useTheme();
  const { language } = useLanguage();
  const translatedText = translations[language] || translations["en"];

  if (!guide_trip || guide_trip.length === 0) {
    return (
      <View
        style={[
          styles.noDataContainer,
          mode === "dark" && styles.darkContainer,
        ]}
      >
        <ReusableText
          text={translatedText.noPosts || "No favorite posts found"}
          family="Bold"
          size={TEXT.medium}
          color={mode === "dark" ? COLORS.white : COLORS.secondary}
        />
      </View>
    );
  }

  return (
    <FlatList
      data={guide_trip}
      ListFooterComponent={<View style={{ height: 350 }} />}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={[styles.postCard, mode === "dark" && styles.postCardDark]}>
          <Image source={{ uri: item.media[0] }} style={styles.postImage} />
          <View style={styles.postDetails}>
            <ReusableText
              text={item.name}
              family="Bold"
              size={TEXT.medium}
              color={mode === "dark" ? COLORS.black : COLORS.black}
            />
            <ReusableText
              text={`${translatedText.by}: ${item.creator}`}
              family="Regular"
              size={TEXT.small}
              color={mode === "dark" ? COLORS.lightGreen : COLORS.gray}
            />
            <ReusableText
              text={`${translatedText.location}: ${item.visitable_id}`}
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

export default FavoriteGuideTrips;

const styles = StyleSheet.create({
  noDataContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: COLORS.white,
  },
  darkContainer: {
    backgroundColor: COLORS.lightGrey,
  },
  postCard: {
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
  postCardDark: {
    backgroundColor: COLORS.lightGrey,
  },
  postImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  postDetails: {
    flex: 1,
  },
});

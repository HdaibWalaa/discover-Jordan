import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  ActivityIndicator,
  Platform,
  NativeModules,
} from "react-native";
import { TEXT, COLORS } from "../../constants/theme";
import { useRoute } from "@react-navigation/native";
import { ReusableText } from "../../components";
import { useTheme } from "../../store/context/ThemeContext";
import { useLanguage } from "../../store/context/LanguageContext";
import translations from "../../translations/translations";
import FavoriteTrips from "./FavoriteTrips";
import FavoriteEvents from "./FavoriteEvents";
import FavoritePlans from "./FavoritePlans";
import FavoritePlaces from "./FavoritePlaces";
import FavoriteVolunteers from "./FavoriteVolunteers";
import FavoriteGuideTrips from "./FavoriteGuideTrips";
import FavoritePosts from "./FavoritePosts";
import useFetchFavorites from "../../hook/favorite/fetchFavorites";
import {
  FontAwesome5,
  MaterialIcons,
  Ionicons,
} from "react-native-vector-icons";

const AllCards = () => {
  const { mode } = useTheme();
  const { language } = useLanguage();
  const route = useRoute();
  const { favorites, loading, error } = useFetchFavorites(language);

  const initialCard = route.params?.selectedCardId || null;
  const [selectedCard, setSelectedCard] = useState(initialCard);
  const deviceLanguage =
    Platform.OS === "ios"
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;

  const detectedLanguage = deviceLanguage.includes("_")
    ? deviceLanguage.split("_")[0]
    : deviceLanguage.split("-")[0];

  const currentLanguage = language || detectedLanguage || "en";

  const cardsData = [
    {
      id: 1,
      text: translations[currentLanguage].trips,
      icon: "route",
      library: FontAwesome5,
    },
    {
      id: 2,
      text: translations[currentLanguage].places,
      icon: "place",
      library: MaterialIcons,
    },
    {
      id: 3,
      text: translations[currentLanguage].events,
      icon: "event",
      library: MaterialIcons,
    },
    {
      id: 4,
      text: translations[currentLanguage].Plans,
      icon: "calendar",
      library: Ionicons,
    },
    {
      id: 5,
      text: translations[currentLanguage].volunteers,
      icon: "hand-holding-heart",
      library: FontAwesome5,
    },
    {
      id: 6,
      text: translations[currentLanguage].guideTrips,
      icon: "map",
      library: FontAwesome5,
    },
    {
      id: 7,
      text: translations[currentLanguage].Posts,
      icon: "newspaper",
      library: FontAwesome5,
    },
  ];

  const renderCard = (card) => {
    const IconComponent = card.library;
    return (
      <TouchableOpacity
        key={card.id}
        style={[
          styles.card,
          selectedCard === card.id && { borderColor: COLORS.primary },
        ]}
        onPress={() => setSelectedCard(card.id)}
      >
        <View style={styles.cardContent}>
          <IconComponent
            name={card.icon}
            size={18}
            color={
              selectedCard === card.id
                ? COLORS.primary
                : mode === "dark"
                ? COLORS.white
                : COLORS.black
            }
            style={styles.icon}
          />
          <ReusableText
            text={card.text}
            family="semiBold"
            size={TEXT.medium}
            color={
              selectedCard === card.id
                ? COLORS.primary
                : mode === "dark"
                ? COLORS.white
                : COLORS.black
            }
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        ListFooterComponent={<View style={{ height: 200 }} />}
        contentContainerStyle={styles.scrollView}
      >
        {cardsData.map(renderCard)}
      </ScrollView>
      {loading && <ActivityIndicator size="large" color={COLORS.primary} />}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {selectedCard === 1 && <FavoriteTrips trips={favorites?.trip || []} />}
      {selectedCard === 2 && (
        <FavoritePlaces places={favorites?.places || []} />
      )}
      {selectedCard === 3 && <FavoriteEvents events={favorites?.event || []} />}
      {selectedCard === 4 && <FavoritePlans plans={favorites?.plan || []} />}
      {selectedCard === 5 && (
        <FavoriteVolunteers volunteers={favorites?.volunteering || []} />
      )}
      {selectedCard === 6 && (
        <FavoriteGuideTrips guideTrips={favorites?.guide_trip || []} />
      )}
      {selectedCard === 7 && <FavoritePosts posts={favorites?.post || []} />}
    </View>
  );
};

export default AllCards;

const styles = StyleSheet.create({
  scrollView: {
    alignItems: "center",
    paddingVertical: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: COLORS.gray,
    padding: 8,
    paddingHorizontal: 15,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  errorText: {
    color: COLORS.red,
    textAlign: "center",
    marginTop: 10,
  },
});

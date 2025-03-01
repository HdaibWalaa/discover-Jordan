import React from "react";
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { COLORS, TEXT } from "../../constants/theme";
import { ReusableText } from "../../components";
import { useTheme } from "../../store/context/ThemeContext";
import { useLanguage } from "../../store/context/LanguageContext";
import translations from "../../translations/translations";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const SearchPlaces = ({ places = [] }) => {
  const { mode } = useTheme();
  const { language } = useLanguage();
  const navigation = useNavigation();
  const translatedText = translations[language] || translations["en"];

  const handlePlacePress = (placeId) => {
    navigation.navigate("PlaceDetails", { id: placeId });
  };

  if (!places || places.length === 0) {
    return (
      <View
        style={[
          styles.noDataContainer,
          mode === "dark" && styles.darkContainer,
        ]}
      >
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
      keyExtractor={(item, index) =>
        item.id ? String(item.id) : `place-${index}`
      }
      ListFooterComponent={<View style={{ height: 350 }} />}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[styles.placeCard, mode === "dark" && styles.placeCardDark]}
          onPress={() => handlePlacePress(item.id)}
        >
      
          <Image
            source={
              item.image &&
              typeof item.image === "string" &&
              item.image.trim() !== ""
                ? { uri: item.image }
                : require("../../assets/images/icons/google-maps.png")
            }
            style={styles.placeImage}
          />
          <View style={styles.placeDetails}>
            <ReusableText
              text={item.name || "Unknown Place"}
              family="Bold"
              size={TEXT.medium}
              color={mode === "dark" ? COLORS.white : COLORS.black}
            />

            <View style={styles.locationRow}>
              <ReusableText
                text={item.region || "Location unavailable"}
                family="Regular"
                size={TEXT.small}
                color={mode === "dark" ? COLORS.lightGreen : COLORS.gray}
              />
            </View>

           
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  noDataContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginVertical: hp(2),
  },
  darkContainer: {
    backgroundColor: COLORS.lightGrey,
  },
  placeCard: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: wp(3),
    marginVertical: hp(0.7),
    marginHorizontal: wp(1),
    width: wp(90),
    alignSelf: "center",
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
    width: wp(20),
    height: wp(20),
    borderRadius: wp(2),
    marginRight: wp(3),
  },
  placeDetails: {
    flex: 1,
    justifyContent: "center",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: hp(0.5),
  },
});

export default SearchPlaces;

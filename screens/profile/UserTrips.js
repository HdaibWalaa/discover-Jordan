import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS, TEXT } from "../../constants/theme";
import { useTheme } from "../../store/context/ThemeContext";
import { useLanguage } from "../../store/context/LanguageContext";
import translations from "../../translations/translations";
import { ReusableText, RusableWhite } from "../../components";
import { AuthContext } from "../../store/auth-context";
import BASE_URL from "../../hook/apiConfig";

const UserTrips = () => {
  const { mode } = useTheme();
  const { language } = useLanguage();
  const { token } = useContext(AuthContext);
  const navigation = useNavigation();
  const translatedText = translations[language] || translations["en"];

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch(`${BASE_URL}/trip/private`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
            "Content-Language": language,
            "X-API-KEY": "DISCOVERJO91427",
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP Error: ${response.status} - ${errorText}`);
        }

        const result = await response.json();

        if (result?.status === 200) {
          setTrips(result.data || []);
        }
      } catch (error) {
        console.error("Error fetching trips:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [token, language]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!trips.length) {
    return (
      <View style={styles.noDataContainer}>
        <ReusableText
          text={translatedText.noTrips || "No trips found"}
          family="Bold"
          size={TEXT.medium}
          color={COLORS.secondary}
        />
      </View>
    );
  }

  return (
    <RusableWhite>
      <FlatList
        data={trips}
        ListFooterComponent={<View style={{ height: hp("12%") }} />}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.tripCard,
              mode === "dark" ? styles.tripCardDark : styles.tripCardLight,
            ]}
            onPress={() =>
              navigation.navigate("TripDetails", { tripId: item.id })
            }
          >
            <Image
              source={{
                uri: item.image || "https://via.placeholder.com/80",
              }}
              style={styles.tripImage}
            />
            <View style={styles.tripDetails}>
              <ReusableText
                text={item.name || translatedText.unknown}
                family="Bold"
                size={TEXT.medium}
                color={mode === "dark" ? COLORS.white : COLORS.black}
              />
              <ReusableText
                text={`${translatedText.place}: ${
                  item.place_name || translatedText.unknown
                }`}
                family="Regular"
                size={TEXT.small}
                color={mode === "dark" ? COLORS.lightGrey : COLORS.gray}
              />
              <ReusableText
                text={`${translatedText.when}: ${item.date}`}
                family="Regular"
                size={TEXT.small}
                color={mode === "dark" ? COLORS.lightGrey : COLORS.gray}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </RusableWhite>
  );
};

export default UserTrips;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  noDataContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: wp("5%"),
  },
  tripCard: {
    flexDirection: "row",
    borderRadius: wp("2.5%"),
    padding: wp("3%"),
    marginVertical: hp("1%"),
    marginHorizontal: wp("2%"),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
    top: hp("3%"),
  },
  tripCardLight: {
    backgroundColor: COLORS.white,
  },
  tripCardDark: {
    backgroundColor: COLORS.lightGrey,
  },
  tripImage: {
    width: wp("20%"),
    height: wp("20%"),
    borderRadius: wp("3%"),
    marginRight: wp("4%"),
  },
  tripDetails: {
    flex: 1,
  },
});

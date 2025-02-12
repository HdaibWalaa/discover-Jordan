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
import { COLORS, TEXT } from "../../constants/theme";
import { useTheme } from "../../store/context/ThemeContext";
import { useLanguage } from "../../store/context/LanguageContext";
import translations from "../../translations/translations";
import { ReusableText, RusableWhite } from "../../components";
import { AuthContext } from "../../store/auth-context";
import BASE_URL from "../../hook/apiConfig";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const UserPlans = () => {
  const { mode } = useTheme();
  const { language } = useLanguage();
  const { token } = useContext(AuthContext);
  const navigation = useNavigation();
  const translatedText = translations[language] || translations["en"];

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch(`${BASE_URL}/plan`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
            "Content-Language": language,
            "X-API-KEY": "DISCOVERJO91427",
          },
        });

        console.log("Response Status:", response.status);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP Error: ${response.status} - ${errorText}`);
        }

        const result = await response.json();
        console.log("API Response:", result);

        if (result?.status === 200) {
          setPlans(result.data || []);
        } else {
          console.error("Error fetching plans:", result.msg || "Unknown error");
        }
      } catch (error) {
        console.error("Error fetching plans:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [token, language]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!plans.length) {
    return (
      <View style={styles.noDataContainer}>
        <ReusableText
          text={translatedText.noPlans || "No favorite plans found"}
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
        data={plans}
        ListFooterComponent={<View style={{ height: hp("12%") }} />}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.planCard,
              mode === "dark" ? styles.planCardDark : styles.planCardLight,
            ]}
            onPress={() => navigation.navigate("PlanDetails", { id: item.id })}
          >
            <Image
              source={{
                uri: item.image || "https://via.placeholder.com/80",
              }}
              style={styles.planImage}
            />
            <View style={styles.planDetails}>
              <ReusableText
                text={item.name || translatedText.unknown}
                family="Bold"
                size={TEXT.medium}
                color={mode === "dark" ? COLORS.white : COLORS.black}
              />
              <ReusableText
                text={`${translatedText.numofdayes}: ${
                  item.number_of_days || translatedText.unknown
                }`}
                family="Regular"
                size={TEXT.small}
                color={mode === "dark" ? COLORS.lightGrey : COLORS.gray}
              />
              <ReusableText
                text={`${translatedText.activities}: ${
                  item.number_of_activities || 0
                }`}
                family="Regular"
                size={TEXT.small}
                color={mode === "dark" ? COLORS.lightGrey : COLORS.gray}
              />
              <ReusableText
                text={`${translatedText.places}: ${item.number_of_place || 0}`}
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

export default UserPlans;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: wp("5%"),
  },
  planCard: {
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
  planCardLight: {
    backgroundColor: COLORS.white,
  },
  planCardDark: {
    backgroundColor: COLORS.lightGrey,
  },
  planImage: {
    width: wp("20%"),
    height: wp("20%"),
    borderRadius: wp("3%"),
    marginRight: wp("4%"),
  },
  planDetails: {
    flex: 1,
  },
});

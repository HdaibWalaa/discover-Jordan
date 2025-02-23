import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTheme } from "../../store/context/ThemeContext";
import { useLanguage } from "../../store/context/LanguageContext";
import translations from "../../translations/translations";
import { ReusableText, RusableWhite } from "../../components";
import { AuthContext } from "../../store/auth-context";
import BASE_URL from "../../hook/apiConfig";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS, TEXT } from "../../constants/theme";

const UserAllPlans = () => {
  const { mode } = useTheme();
  const { language } = useLanguage();
  const { token } = useContext(AuthContext);
  const navigation = useNavigation();
  const translatedText = translations[language] || translations["en"];
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("User Token: ", token); // Log the user token

    const fetchPlans = async () => {
      try {
        const response = await fetch(`${BASE_URL}/plan/my-plans`, {
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
          setPlans(result.data || []);
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
          text={translatedText.noTrips || "No trips found"}
          family="Bold"
          size={TEXT.medium}
          color={COLORS.secondary}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <ImageBackground
          source={require("../../assets/images/header1.png")}
          style={styles.headerImage}
          imageStyle={{ resizeMode: "cover" }}
        >
          <View style={styles.TopHeader}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color={COLORS.black} />
            </TouchableOpacity>

            <View style={styles.LeftRow}>
              <View style={styles.textContainer}>
                <View style={styles.titleRow}>
                  <ReusableText
                    text={translatedText.yourTrips}
                    family={"Bold"}
                    size={TEXT.large}
                    color={COLORS.black}
                    align={"left"}
                    style={styles.mainTitle}
                  />

                  <Image
                    source={require("../../assets/images/icons/distance-icon.png")}
                    style={styles.icon}
                  />
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
      <FlatList
        data={plans}
        ListFooterComponent={<View style={{ height: hp(30) }} />}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          console.log("Plan ID: ", item.id); // Log the plan ID

          return (
            <TouchableOpacity
              style={[
                styles.tripCard,
                mode === "dark" ? styles.tripCardDark : styles.tripCardLight,
              ]}
              onPress={() =>
                navigation.navigate("PlanDetails", { id: item.id })
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
                  text={`${translatedText.numberOfDays}: ${item.number_of_days}`}
                  family="Regular"
                  size={TEXT.small}
                  color={mode === "dark" ? COLORS.lightGrey : COLORS.gray}
                />
                <ReusableText
                  text={`${translatedText.numberOfActivities}: ${item.number_of_activities}`}
                  family="Regular"
                  size={TEXT.small}
                  color={mode === "dark" ? COLORS.lightGrey : COLORS.gray}
                />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default UserAllPlans;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  headerWrapper: {
    borderBottomLeftRadius: hp(4),
    borderBottomRightRadius: hp(4),
    overflow: "hidden",
    width: "100%",
  },
  headerImage: {
    width: "100%",
    height: hp(20),
  },
  TopHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(7),
    paddingTop: hp(10),
  },
  backButton: {
    marginRight: wp(3),
    padding: 8,
    backgroundColor: COLORS.lightBlue,
    borderRadius: 8,
  },
  LeftRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: wp(2),
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: wp(75),
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: wp(7),
  },
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
    marginHorizontal: wp("5%"),
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

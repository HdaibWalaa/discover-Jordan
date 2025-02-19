import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS, SIZES, TEXT } from "../../../constants/theme";
import ReusableText from "../../Reusable/ReusableText";
import { useLanguage } from "../../../store/context/LanguageContext";
import translations from "../../../translations/translations";
import { AuthContext } from "../../../store/auth-context";
import BASE_URL from "../../../hook/apiConfig";

const heartImage = require("../../../assets/images/icons/heart.png");
const heartFilledImage = require("../../../assets/images/icons/heart-filled.png"); // Add a filled heart icon
const pinImage = require("../../../assets/images/icons/pin.png");
const walletImage = require("../../../assets/images/icons/money.png");

const AllTripCard = ({ item, isFirst }) => {
  const { language } = useLanguage();
  const localizedText = translations[language] || translations["en"];
  const navigation = useNavigation();
  const { token } = useContext(AuthContext);
  const users = item.users_number || [];

  // ✅ State for favorite status
  const [isFavorite, setIsFavorite] = useState(item.favorite);
  const [loadingFavorite, setLoadingFavorite] = useState(false);

  // ✅ Toggle Favorite Status (POST or DELETE API)
  const handleToggleFavorite = async () => {
    if (loadingFavorite) return; // Prevent multiple clicks while loading

    setLoadingFavorite(true);
    try {
      if (isFavorite) {
       
        await axios.delete(`${BASE_URL}/trip/favorite/${item.id}/delete`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "X-API-KEY": "DISCOVERJO91427",
          },
        });
      } else {
       
        await axios.post(
          `${BASE_URL}/trip/favorite/${item.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "X-API-KEY": "DISCOVERJO91427",
            },
          }
        );
      }

      // ✅ Update UI State
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error(
        "Error toggling favorite:",
        error.response?.data || error.message
      );
    } finally {
      setLoadingFavorite(false);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.tripCard, isFirst ? styles.firstTripCard : null]}
      onPress={() => navigation.navigate("TripDetails", { tripId: item.id })}
    >
      <View style={styles.rowContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          onError={() => {
            console.warn("Failed to load image, using fallback.");
          }}
        />
        <View style={styles.cardContent}>
          <View style={styles.header}>
            <ReusableText
              text={item.name}
              family={"Bold"}
              size={SIZES.large}
              color={COLORS.black}
            />

          
            <TouchableOpacity
              style={styles.heartContainer}
              onPress={handleToggleFavorite}
              disabled={loadingFavorite}
            >
              {loadingFavorite ? (
                <ActivityIndicator size="small" color={COLORS.primary} />
              ) : (
                <Image
                  source={isFavorite ? heartFilledImage : heartImage}
                  style={styles.heartIcon}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Image source={pinImage} style={[styles.icon, styles.grayTint]} />
              <ReusableText
                text={item.location}
                family="Medium"
                size={TEXT.small}
                color={COLORS.lightGreen}
              />
            </View>
            <View style={styles.detailItem}>
              <Image
                source={walletImage}
                style={[styles.icon, styles.grayTint]}
              />
              <ReusableText
                text={`${item.price} ${localizedText.currency}`}
                family="Medium"
                size={TEXT.small}
                color={COLORS.lightGreen}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.attendanceContainer}>
        <View style={styles.avatars}>
          {users.slice(0, 3).map((user, index) => (
            <Image
              key={index}
              source={{ uri: user.avatar }}
              style={[styles.avatar, { marginLeft: index > 0 ? -10 : 0 }]}
            />
          ))}
        </View>
        {users.length > 3 && (
          <Text style={styles.moreAttendees}>+{users.length - 3}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default AllTripCard;

const styles = StyleSheet.create({
  tripCard: {
    marginBottom: hp("2%"),
    backgroundColor: COLORS.primary,
    borderRadius: wp("4%"),
    overflow: "hidden",
    paddingVertical: hp("1%"),
    paddingHorizontal: wp("3%"),
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  firstTripCard: {
    marginTop: hp("-2%"),
    borderRadius: wp("4%"),
    backgroundColor: COLORS.primary,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: wp("24%"),
    height: wp("25%"),
    borderRadius: wp("2%"),
   
  },
  cardContent: {
    flex: 1,
    paddingLeft: wp("3%"),
    justifyContent: "center",
  },
  grayTint: {
    tintColor: COLORS.lightGreen,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heartContainer: {
    padding: wp("2%"),
  },
  heartIcon: {
    width: wp("6%"),
    height: wp("6%"),
  },
  detailsContainer: {
    marginTop: hp("1%"),
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("0.5%"),
  },
  icon: {
    width: wp("4.5%"),
    height: wp("4.5%"),
    marginRight: wp("2%"),
  },
  attendanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp("1.5%"),
  },
  avatars: {
    flexDirection: "row",
  },
  avatar: {
    width: wp("6%"),
    height: wp("6%"),
    borderRadius: wp("3%"),
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  moreAttendees: {
    fontSize: wp("3.5%"),
    color: COLORS.black,
    marginLeft: wp("2%"),
  },
});

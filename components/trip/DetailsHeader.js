import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { SIZES, COLORS, TEXT } from "../../constants/theme";
import GoBack from "../Buttons/GoBack";
import ReusableText from "../Reusable/ReusableText";
import ReusableRegionLocation from "../Reusable/ReusableRegionLocation";
import { AuthContext } from "../../store/auth-context";
import { useLanguage } from "../../store/context/LanguageContext";
import translations from "../../translations/translations";
import axios from "axios";
import BASE_URL from "../../hook/apiConfig";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

const heartImage = require("../../assets/images/icons/heart.png");
const heartFilledImage = require("../../assets/images/icons/heart-filled.png");

const DetailsHeader = ({
  tripDetails,
  isCreator,
  onEdit,
  onDelete,
  onHandPress,
  onLeaveTrip,
  isUserJoined,
}) => {
  const { token } = useContext(AuthContext);
  const { language } = useLanguage();
  const t = translations[language]; // Use translated text

  // ✅ State for favorite
  const [isFavorite, setIsFavorite] = useState(tripDetails.favorite);
  const [loadingFavorite, setLoadingFavorite] = useState(false);

  // ✅ Toggle Favorite Status (POST or DELETE API)
  const handleToggleFavorite = async () => {
    if (loadingFavorite) return;

    setLoadingFavorite(true);
    try {
      if (isFavorite) {
        await axios.delete(
          `${BASE_URL}/trip/favorite/${tripDetails.id}/delete`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "X-API-KEY": "DISCOVERJO91427",
              "Content-Language": language,
            },
          }
        );
      } else {
        await axios.post(
          `${BASE_URL}/trip/favorite/${tripDetails.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "X-API-KEY": "DISCOVERJO91427",
              "Content-Language": language,
            },
          }
        );
      }

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
    <View style={styles.header}>
      <View style={styles.TopHeader}>
        <GoBack style={styles.goBack} />
        <View style={styles.rightButtonsContainer}>
          {isCreator ? (
            <>
              {/* More Menu */}
              <Menu>
                <MenuTrigger customStyles={triggerStyles}>
                  <Image
                    source={require("../../assets/images/icons/more.png")}
                    style={styles.moreIcon}
                  />
                </MenuTrigger>
                <MenuOptions>
                  <MenuOption onSelect={onEdit}>
                    <Text style={styles.menuText}>{t.edit}</Text>
                  </MenuOption>
                  <MenuOption onSelect={onDelete}>
                    <Text style={styles.menuText}>{t.delete}</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>

              {/* Requests (Hand) Button */}
              <TouchableOpacity style={styles.handButton} onPress={onHandPress}>
                <Image
                  source={require("../../assets/images/icons/hand.png")}
                  style={styles.handIcon}
                />
              </TouchableOpacity>
            </>
          ) : (
            isUserJoined && (
              <TouchableOpacity
                style={styles.leaveButton}
                onPress={onLeaveTrip}
              >
                <Text style={styles.leaveButtonText}>{t.leaveTrip}</Text>
              </TouchableOpacity>
            )
          )}

          {/* ✅ Favorite Button */}
          <TouchableOpacity
            style={styles.favoriteButton}
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
      </View>

      <View style={styles.ButtomHeader}>
        <ReusableText
          text={tripDetails.name.toUpperCase()}
          family={"Medium"}
          size={TEXT.large}
          color={COLORS.dark}
          style={styles.titleText}
        />
        <ReusableRegionLocation region={tripDetails.region} />
      </View>
    </View>
  );
};

export default DetailsHeader;

const styles = StyleSheet.create({
  header: {
    paddingTop: hp("5%"),
    paddingHorizontal: wp("5%"),
  },
  TopHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp("5%"),
    paddingVertical: hp("3%"),
  },
  rightButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
    marginRight: wp("-5%"),
  },
  goBack: {
    padding: wp("1.5%"),
    borderColor: COLORS.dark,
    borderRadius: wp("3%"),
    borderWidth: 1,
  },
  favoriteButton: {
    padding: wp("2%"),
    borderColor: COLORS.dark,
    borderRadius: wp("3%"),
    borderWidth: 1,
    marginLeft: wp("2%"),
  },
  handButton: {
    padding: wp("2%"),
    borderColor: COLORS.dark,
    borderRadius: wp("3%"),
    borderWidth: 1,
    marginLeft: wp("2%"),
  },
  moreButton: {
    padding: wp("2%"),
    borderColor: COLORS.dark,
    borderRadius: wp("3%"),
    borderWidth: 1,
    marginLeft: wp("2%"),
  },
  heartIcon: {
    width: wp("5%"),
    height: hp("2%"),
  },
  handIcon: {
    width: wp("5%"),
    height: hp("2%"),
  },
  moreIcon: {
    width: wp("5%"),
    height: hp("2%"),
  },
  leaveButton: {
    padding: wp("2%"),
    backgroundColor: "red",
    borderRadius: wp("3%"),
    marginLeft: wp("2%"),
  },
  leaveButtonText: {
    color: "#fff",
    fontSize: SIZES.small,
  },
  ButtomHeader: {
    alignItems: "center",
    marginBottom: hp("2%"),
    top: hp(-2),
  },
  titleText: {
    textAlign: "center",
  },
  menuText: {
    padding: 10,
    fontSize: SIZES.medium,
    color: COLORS.dark,
  },
});

const triggerStyles = {
  triggerTouchable: {
    style: {
      padding: wp("2%"),
      borderColor: COLORS.dark,
      borderRadius: wp("3%"),
      borderWidth: 1,
      marginLeft: wp("2%"),
    },
  },
};

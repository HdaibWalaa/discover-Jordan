import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal,
} from "react-native";
import { COLORS, TEXT, SIZES } from "../../constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { ReusableText } from "../index";
import GoBack from "../Buttons/GoBack";
import { AuthContext } from "../../store/auth-context";
import { useLanguage } from "../../store/context/LanguageContext";
import translations from "../../translations/translations";
import axios from "axios";
import BASE_URL from "../../hook/apiConfig";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const heartImage = require("../../assets/images/icons/heart.png");
const heartFilledImage = require("../../assets/images/icons/heart-filled.png");
const handImage = require("../../assets/images/icons/hand.png");
const moreImage = require("../../assets/images/icons/more.png");

const DetailsHeader = ({
  tripDetails,
  isCreator,
  onEdit,
  onDelete,
  onHandPress,
  onLeaveTrip,
  isUserJoined,
  pendingRequestsCount,
}) => {
  const { token } = useContext(AuthContext);
  const { language } = useLanguage();
  const t = translations[language];

  // ✅ State for favorite
  const [isFavorite, setIsFavorite] = useState(tripDetails.favorite);
  const [loadingFavorite, setLoadingFavorite] = useState(false);

  // ✅ State for modal
  const [modalVisible, setModalVisible] = useState(false);

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
              {/* More Menu Button (Opens Modal) */}
              <TouchableOpacity
                style={styles.moreButton}
                onPress={() => setModalVisible(true)}
              >
                <Image source={moreImage} style={styles.moreIcon} />
              </TouchableOpacity>

              {/* Requests (Hand) Button with Badge */}
              <TouchableOpacity style={styles.handButton} onPress={onHandPress}>
                <Image source={handImage} style={styles.handIcon} />
                {pendingRequestsCount > 0 && (
                  <View style={styles.requestBadge}>
                    <Text style={styles.badgeText}>{pendingRequestsCount}</Text>
                  </View>
                )}
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
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
                <ReusableText
                  text={"DELETE"}
                  family={"SemiBold"}
                  size={TEXT.xmedium}
                  color={COLORS.white}
                  align={"center"}
                  style={styles.buttonText}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deactivateButton}
                onPress={onEdit}
              >
                <ReusableText
                  text={"EDIT"}
                  family={"SemiBold"}
                  size={TEXT.xmedium}
                  color={COLORS.black}
                  align={"center"}
                  style={styles.buttonText}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.closeButtonContainer}
              onPress={() => setModalVisible(false)}
            >
              <ReusableText
                text={"close"}
                family={"SemiBold"}
                size={TEXT.xmedium}
                color={COLORS.black}
                align={"center"}
                style={styles.closeButton}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DetailsHeader;

const styles = StyleSheet.create({
  header: {
    paddingTop: hp("6%"),
    paddingHorizontal: wp("5%"),
    marginBottom: hp("2%"),
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
  requestBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: wp("4%"),
    width: wp("5%"),
    height: wp("5%"),
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: COLORS.white,
    fontSize: SIZES.small,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: wp("90%"),
    backgroundColor: "white",
    borderRadius: wp("5%"),
    padding: wp("7%"),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "relative",
  },
  closeButtonContainer: {
    alignItems: "center",
    paddingVertical: wp("2%"),
    top: wp("2%"),
  },
  closeButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: COLORS.primary,
    padding: hp("2%"),
    borderRadius: wp("3%"),
    width: wp("35%"),
    alignItems: "center",
  },
  modalTitle: {
    marginBottom: hp("1%"),
  },
  modalText: {
    marginBottom: hp("3%"),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: hp("1%"),
    paddingHorizontal: hp("2%"),
  },
  deleteButton: {
    backgroundColor: "#FF4500",
    padding: hp("2%"),
    borderRadius: wp("3%"),
    width: wp("35%"),
    alignItems: "center",
  },
  deactivateButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#FF4500",
    padding: hp("2%"),
    borderRadius: wp("3%"),
    width: wp("35%"),
    alignItems: "center",
  },
});

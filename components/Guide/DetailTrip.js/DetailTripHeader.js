import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import { SIZES, COLORS, TEXT } from "../../../constants/theme";
import GoBack from "../../Buttons/GoBack";
import ReusableText from "../../Reusable/ReusableText";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AddGuideTripFavorite from "../../Tiles/Trip/AddGuideTripFavorite";
import { useNavigation } from "@react-navigation/native";
import JoinedUserModal from "./JoinedUserModal";
import EditDeleteGuideTripModal from "./EditDeleteGuideTripModal";
import axios from "axios";
import { AuthContext } from "../../../store/auth-context";
import BASE_URL from "../../../hook/apiConfig";

const DetailTripHeader = ({ tripDetails }) => {
  const navigation = useNavigation();
  const [joinModalVisible, setJoinModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [joinedUsersCount, setJoinedUsersCount] = useState(0);
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (tripDetails?.id) {
      fetchJoinedUsersCount();
    }
  }, [tripDetails]);

  const fetchJoinedUsersCount = async () => {
    if (!tripDetails?.id) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/guide/join/requests/list/${tripDetails.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-API-KEY": "DISCOVERJO91427",
          },
        }
      );

      if (response.data && response.data.status === 200) {
        const requests = response.data.data;
        const approvedRequests = requests.filter(
          (request) => request.status === 1
        );
        const pendingRequests = requests.filter(
          (request) => request.status === 0
        );

        setJoinedUsersCount(approvedRequests.length);
        setPendingRequestsCount(pendingRequests.length);
      }
    } catch (error) {
      console.error("Error fetching joined users count:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleJoinModal = () => {
    setJoinModalVisible(!joinModalVisible);
    if (joinModalVisible) {
      fetchJoinedUsersCount();
    }
  };

  const toggleEditModal = () => {
    setEditModalVisible(!editModalVisible);
  };

  const onJoinModalClose = () => {
    setJoinModalVisible(false);
    fetchJoinedUsersCount();
  };

  const onEditModalClose = () => {
    setEditModalVisible(false);
  };

  return (
    <View style={styles.header}>
      <View style={styles.header1}>
        <View style={styles.headerTextContainer}>
          <GoBack style={styles.goBack} />
        </View>

        <View style={styles.createButtonsWrapper}>
          {tripDetails.is_creator && (
            <>
              {/* 🔥 Edit Trip Button */}
              <TouchableOpacity onPress={toggleEditModal}>
                <View style={styles.editTripButton}>
                  <Image
                    source={require("../../../assets/images/icons/edit.png")}
                    style={styles.icon}
                  />
                </View>
              </TouchableOpacity>
              {/* 🔥 Joined Users Button */}
              <TouchableOpacity onPress={toggleJoinModal}>
                <View style={styles.joinedUsersButton}>
                  <Image
                    source={require("../../../assets/images/icons/joineduser.png")}
                    style={styles.icon}
                  />
                  {pendingRequestsCount > 0 && (
                    <View style={styles.countBadge}>
                      <Text style={styles.countText}>
                        {pendingRequestsCount > 99
                          ? "99+"
                          : pendingRequestsCount}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            </>
          )}

          {/* Favorite Button */}
          <AddGuideTripFavorite
            tripId={tripDetails.id}
            isFavoritedInitially={tripDetails.favorite}
            size={24}
            style={styles.favoriteIcon}
          />
        </View>
      </View>

      {/* Trip Name */}
      <View style={styles.ButtomHeader}>
        <ReusableText
          text={(tripDetails?.name || "").toUpperCase()}
          family={"Medium"}
          size={TEXT.large}
          color={COLORS.dark}
          style={styles.titleText}
        />
      </View>

      {/* Joined User Modal */}
      <JoinedUserModal
        isVisible={joinModalVisible}
        onClose={onJoinModalClose}
        tripId={tripDetails.id}
      />

      {/* Edit Delete Guide Trip Modal */}
      <EditDeleteGuideTripModal
        isVisible={editModalVisible}
        onClose={onEditModalClose}
        tripId={tripDetails.id}
        tripName={tripDetails?.name || ""}
      />
    </View>
  );
};

export default DetailTripHeader;

const styles = StyleSheet.create({
  header: {
    paddingTop: hp("9%"),
    paddingHorizontal: wp("3%"),
  },
  headerTextContainer: {
    width: 170,
    top: hp(-2),
  },
  header1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: hp(1),
    marginTop: hp(1),
    width: wp("87%"),
  },
  goBack: {
    padding: wp("1.5%"),
    borderColor: COLORS.dark,
    borderRadius: wp("3%"),
    borderWidth: 1,
  },
  ButtomHeader: {
    alignItems: "center",
    marginBottom: hp(2),
  },
  titleText: {
    textAlign: "center",
  },
  createButtonsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  joinedUsersButton: {
    borderColor: COLORS.dark,
    borderRadius: wp("3%"),
    borderWidth: 1,
    padding: wp(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: hp(0.5),
    },
    shadowOpacity: 0.1,
    shadowRadius: hp(0.5),
    elevation: 3,
    backgroundColor: COLORS.white,
    position: "relative",
  },
  editTripButton: {
    borderColor: COLORS.dark,
    borderRadius: wp("3%"),
    borderWidth: 1,
    padding: wp(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: hp(0.5),
    },
    shadowOpacity: 0.1,
    shadowRadius: hp(0.5),
    elevation: 3,
    backgroundColor: COLORS.white,
    position: "relative",
  },
  favoriteIcon: {
    borderColor: COLORS.dark,
    borderRadius: wp("3%"),
    borderWidth: 1,
    padding: wp(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: hp(0.5),
    },
    shadowOpacity: 0.1,
    shadowRadius: hp(0.5),
    elevation: 3,
  },
  icon: {
    width: 25,
    height: 25,
  },
  countBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: COLORS.red,
    borderRadius: 12,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  countText: {
    color: COLORS.white,
    fontSize: 10,
    fontFamily: "Bold",
    textAlign: "center",
  },
});

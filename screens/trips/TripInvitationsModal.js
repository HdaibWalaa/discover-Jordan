import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  I18nManager,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constants/theme";
import styles from "./AllTrip.styles";
import BASE_URL from "../../hook/apiConfig";
import { useLanguage } from "../../store/context/LanguageContext";
import translations from "../../translations/translations";
import { TripContext } from "../../store/trip-context";

const TripInvitationsModal = ({
  token,
  visible,
  onClose,
  updateInvitationCount,
}) => {
  const [invitationTrips, setInvitationTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { language } = useLanguage();
  const t = translations[language];
  const { addTrip } = useContext(TripContext); // Access trip context

  useEffect(() => {
    if (visible) {
      fetchInvitations();
    }
  }, [visible]);

  const fetchInvitations = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/trip/invitations`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "X-API-KEY": "DISCOVERJO91427",
        },
      });

      const data =
        response.status === 200 && Array.isArray(response.data.data)
          ? response.data.data
          : [];

      setInvitationTrips(data);
      updateInvitationCount(data.length);
    } catch (error) {
      console.error("Error fetching invitations:", error.message);
      setInvitationTrips([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptInvitation = async (tripId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/trip/invitation-status/accept`,
        { trip_id: tripId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "X-API-KEY": "DISCOVERJO91427",
          },
        }
      );

      const updatedTrips = invitationTrips.map((trip) =>
        trip.id === tripId ? { ...trip, status: 2 } : trip
      );

      setInvitationTrips(updatedTrips);

      const acceptedTrip = updatedTrips.find((trip) => trip.id === tripId);
      if (acceptedTrip) {
        addTrip(acceptedTrip); // ✅ Add trip to AllTrips immediately
      }

      updateInvitationCount(
        updatedTrips.filter((trip) => trip.status !== 2).length
      );
    } catch (error) {
      console.error("Error accepting invitation:", error.message);
    }
  };

  const handleCancelInvitation = async (tripId) => {
    try {
      await axios.post(
        `${BASE_URL}/trip/invitation-status/cancel`,
        { trip_id: tripId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "X-API-KEY": "DISCOVERJO91427",
          },
        }
      );

      const updatedTrips = invitationTrips.map((trip) =>
        trip.id === tripId ? { ...trip, status: 3 } : trip
      );

      setInvitationTrips(updatedTrips);
      updateInvitationCount(
        updatedTrips.filter((trip) => trip.status !== 3).length
      );
    } catch (error) {
      console.error("Error cancelling invitation:", error.message);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{t.invitations}</Text>
          {loading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : invitationTrips.length > 0 ? (
            <FlatList
              data={invitationTrips}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.tripCard,
                    I18nManager.isRTL && styles.tripCardRTL,
                  ]}
                  onPress={() =>
                    navigation.navigate("TripDetails", { id: item.id })
                  }
                >
                  <Image
                    source={{ uri: item.image }}
                    style={styles.tripImage}
                  />
                  <View style={styles.tripInfo}>
                    <Text style={styles.tripName}>{item.name}</Text>
                    <Text style={styles.tripPlace}>{item.place_name}</Text>
                    <Text style={styles.tripPrice}>
                      {t.cost}: {item.price} {t.currency}
                    </Text>
                    <Text style={styles.tripDate}>
                      {t.date}: {item.date}
                    </Text>
                    <View style={styles.buttonGroup}>
                      <TouchableOpacity
                        style={[
                          styles.acceptButton,
                          item.status === 2 && styles.disabledButton,
                        ]}
                        onPress={() => handleAcceptInvitation(item.id)}
                        disabled={item.status === 2}
                      >
                        <Text style={styles.acceptText}>
                          {item.status === 2 ? t.accepted : t.accept}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.cancelButton,
                          item.status === 3 && styles.disabledButton,
                        ]}
                        onPress={() => handleCancelInvitation(item.id)}
                        disabled={item.status === 3}
                      >
                        <Text style={styles.cancelText}>
                          {item.status === 3 ? t.cancelled : t.decline}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text style={styles.noInvitationsText}>{t.noInvitations}</Text>
          )}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>{t.close}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default TripInvitationsModal;

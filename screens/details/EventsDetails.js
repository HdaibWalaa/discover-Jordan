import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  Platform,
  NativeModules,
  TouchableOpacity,
  Linking,
} from "react-native";
import {
  NetworkImage,
  GoBack,
  ReusableText,
  ReusableRegionLocation,
  RusableWhite,
} from "../../components/index";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { COLORS, SIZES } from "../../constants/theme";
import { useRoute, useNavigation } from "@react-navigation/native";
import Loader from "../../components/Shimmers/Loader";
import styles from "../../components/events/Events.styles";
import fetchEventDetails from "../../hook/event/fetchEventDetails";
import AllIntresetUser from "../../components/Tiles/Volunteer/AllIntresetUser";
import EventOrganizer from "../../components/Tiles/Events/EventOrganizer";
import EventInfo from "../../components/Tiles/Events/EventInfo";
import EventStatus from "../../components/Tiles/Events/EventStatus";
import AddFavorite from "../../components/events/addFavorite";
import InterestButton from "../../components/events/InterestButton";

const EventsDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();

  // Get device language
  const deviceLanguage =
    Platform.OS === "ios"
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;

  let language = deviceLanguage.includes("_")
    ? deviceLanguage.split("_")[0]
    : deviceLanguage.split("-")[0];
  language = language || "en";

  // Fetch event details using custom hook
  const { eventDetails, isLoading, error, refetch } = fetchEventDetails(
    route.params.id,
    language
  );

  // Show loader while data is being fetched
  if (isLoading) {
    return <Loader />;
  }

  // Show error if there's an issue
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  // If no event details found
  if (!eventDetails) {
    return (
      <View style={{ alignItems: "center", top: 100 }}>
        <Text>Error: Event data not found</Text>
      </View>
    );
  }

  // Helper functions to format time, date, and price
  const formatTime = (startTime, endTime) => {
    const start = new Date(`1970-01-01T${startTime}Z`).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const end = new Date(`1970-01-01T${endTime}Z`).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return `${start} - ${end}`;
  };

  const formatDate = (startDate, endDate) => {
    const start = new Date(startDate).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const end = new Date(endDate).getDate();
    return `${start.split(" ")[0]}-${end} ${start.split(" ")[1]} ${
      start.split(" ")[2]
    }`;
  };

  const formatPrice = (price) => {
    return price ? parseFloat(price).toFixed(2).replace(/\.00$/, "") : "Free";
  };

  return (
    <RusableWhite>
      <View style={styles.imageContainer}>
        <NetworkImage
          source={eventDetails.image}
          width={"100%"}
          height={300}
          radius={30}
        />
        <View style={styles.topRow}>
          <View style={styles.backButton}>
            <GoBack />
          </View>
          <AddFavorite
            eventId={eventDetails.id} // Pass eventId
            favorite={eventDetails.favorite} // Initial favorite status
            refresh={refetch} // Refresh data when favorite status changes
            iconColor="black"
            size={24}
            width={40}
            height={40}
            bgColor="rgba(255, 255, 255, 0.7)"
            style={styles.favoriteIcon}
          />
        </View>
        <View style={styles.textContainer}>
          <ReusableText
            text={eventDetails.name.toUpperCase()}
            family={"SemiBold"}
            size={wp("5%")}
            color={COLORS.black}
            align={"left"}
          />
          <View>
            <View style={styles.locationContainer}>
              <ReusableRegionLocation region={eventDetails.region} />
            </View>
            <View style={styles.userContainer}>
              <AllIntresetUser users={eventDetails.interested_users} />
            </View>
          </View>
        </View>
      </View>
      <ScrollView style={styles.scrollContent}>
        <View style={styles.contentContainer}>
          <View style={styles.infoContainer}>
            <EventInfo
              time={formatTime(eventDetails.start_time, eventDetails.end_time)}
              date={formatDate(eventDetails.start_day, eventDetails.end_day)}
              capacity={eventDetails.attendance_number || "N/A"}
              price={formatPrice(eventDetails.price)}
            />
            <View style={styles.StatuseContaine}>
              <EventStatus status={eventDetails.status} />
            </View>
          </View>
          <View>
            <ReusableText
              text={"Organizers"}
              family={"SemiBold"}
              size={SIZES.large}
              color={COLORS.black}
              style={styles.sectionTitle}
            />
            <EventOrganizer organizers={eventDetails.organizers} />
          </View>
          <View>
            <ReusableText
              text={"Description"}
              family={"SemiBold"}
              size={SIZES.large}
              color={COLORS.black}
              style={styles.sectionTitle}
            />
            <ReusableText
              text={eventDetails.description}
              family={"Regular"}
              size={SIZES.medium}
              color={COLORS.gray}
              style={styles.description}
            />
          </View>
          <View style={styles.linkContainer}>
            <ReusableText
              text={"Link of event reservation"}
              family={"SemiBold"}
              size={SIZES.large}
              color={COLORS.black}
              style={styles.sectionTitle}
            />

            <TouchableOpacity
              onPress={() => Linking.openURL(eventDetails.link)}
            >
              <ReusableText
                text={eventDetails.link}
                family={"Light"}
                size={SIZES.large}
                color={COLORS.secondary}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.interestButton}>
            <InterestButton
              eventId={eventDetails.id}
              interestedUsers={eventDetails.interested_users} 
            />
          </View>
        </View>
      </ScrollView>
    </RusableWhite>
  );
};

export default EventsDetails;

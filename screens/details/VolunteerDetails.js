import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  Platform,
  NativeModules,
  TouchableOpacity,
  Linking,
  Image,
} from "react-native";
import {
  NetworkImage,
  GoBack,
  ReusableFavorite,
  ReusableText,
  ReusableRegionLocation,
  RusableWhite,
} from "../../components/index";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS, SIZES } from "../../constants/theme";
import { useRoute, useNavigation } from "@react-navigation/native";
import Loader from "../../components/Shimmers/Loader";
import styles from "../../components/events/Events.styles";
import fetchVolunteerDetails from "../../hook/volunteer/fetchVolunteerDetails";
import AllIntresetUser from "../../components/Tiles/Volunteer/AllIntresetUser";
import EventOrganizer from "../../components/Tiles/Events/EventOrganizer";
import EventInfo from "../../components/Tiles/Events/EventInfo";
import EventStatus from "../../components/Tiles/Events/EventStatus";
import InterestButton from "../../components/Tiles/Volunteer/InterestButton"; // Import the InterestButton

const VolunteerDetails = () => {
  const route = useRoute();
  const deviceLanguage =
    Platform.OS === "ios"
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;

  let language = deviceLanguage.includes("_")
    ? deviceLanguage.split("_")[0]
    : deviceLanguage.split("-")[0];

  language = language || "en";
  const { volunteerDetails, isLoading, error, refetch } = fetchVolunteerDetails(
    route.params.id,
    language
  );

  const navigation = useNavigation();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  if (!volunteerDetails) {
    return (
      <View style={{ alignItems: "center", top: 100 }}>
        <Text>Error: Volunteer details not found</Text>
      </View>
    );
  }

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

  return (
    <RusableWhite>
      <View style={styles.imageContainer}>
        <NetworkImage
          source={volunteerDetails.image}
          width={"100%"}
          height={300}
          radius={30}
        />
        <View style={styles.topRow}>
          <View style={styles.backButton}>
            <GoBack />
          </View>
          <ReusableFavorite
            iconColor="black"
            size={25}
            bgColor="white"
            width={40}
            height={40}
          />
        </View>
        <View style={styles.textContainer}>
          <ReusableText
            text={volunteerDetails.name.toUpperCase()}
            family={"SemiBold"}
            size={wp("5%")}
            color={COLORS.black}
            align={"left"}
          />
          <View>
            <View style={styles.locationContainer}>
              <ReusableRegionLocation region={volunteerDetails.region} />
            </View>
            <View style={styles.userContainer}>
              <AllIntresetUser users={volunteerDetails.interested_users} />
            </View>
          </View>
        </View>
      </View>
      <ScrollView style={styles.scrollContent}>
        <View style={styles.contentContainer}>
          <View style={styles.infoContainer}>
            <EventInfo
              time={formatTime(
                volunteerDetails.start_time,
                volunteerDetails.end_time
              )}
              date={formatDate(
                volunteerDetails.start_day,
                volunteerDetails.end_day
              )}
              capacity={volunteerDetails.attendance_number || "N/A"}
            />
            <View style={styles.StatuseContaine}>
              <EventStatus status={volunteerDetails.status} />
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
            <EventOrganizer organizers={volunteerDetails.organizers} />
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
              text={volunteerDetails.description}
              family={"Regular"}
              size={SIZES.medium}
              color={COLORS.gray}
              style={styles.description}
            />
          </View>
          <View style={styles.linkContainer}>
            <ReusableText
              text={"Volunteer Registration Link"}
              family={"SemiBold"}
              size={SIZES.large}
              color={COLORS.black}
              style={styles.sectionTitle}
            />

            <TouchableOpacity
              onPress={() => Linking.openURL(volunteerDetails.link)}
            >
              <ReusableText
                text={volunteerDetails.link}
                family={"Light"}
                size={SIZES.large}
                color={COLORS.secondary}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.interestButton}>
            <InterestButton
              volunteerId={route.params.id}
              interestedUsers={volunteerDetails.interested_users}
            />
          </View>
        </View>
      </ScrollView>
    </RusableWhite>
  );
};

export default VolunteerDetails;

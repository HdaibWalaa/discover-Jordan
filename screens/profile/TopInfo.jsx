import React from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./topTab.style";
import { ReusableText, RusableWhite } from "../../components";
import { COLORS, TEXT } from "../../constants/theme";
import ProfileTags from "../../components/Profile/ProfileTags";
import VisitedPlaces from "../../components/Profile/VisitedPlaces";

const TopInfo = ({ route }) => {
  const profile = route?.params?.profile;

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text>No profile data available.</Text>
      </View>
    );
  }

  // Ensure profile.tags is always an array
  const tags = profile.tags || [];

  const sections = [
    {
      id: "tags",
      component: <ProfileTags tags={tags} />, // Pass an empty array if profile.tags is undefined
      title: "Interests Tags",
    },
    {
      id: "about",
      component: (
        <ReusableText
          text={profile.description || "No description available"}
          family={"Regular"}
          size={TEXT.medium}
          color={COLORS.gray}
        />
      ),
      title: "About me",
    },
    {
      id: "visited",
      component: (
        <VisitedPlaces
          visitedPlaces={profile.visited_places || []} // Ensure visitedPlaces is an array
          refreshProfile={() => {}}
        />
      ),
    },
  ];

  return (
    <RusableWhite>
      <SafeAreaView style={styles.aboutContainer}>
        <FlatList
          data={sections}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 15 }}>
              <ReusableText
                text={item.title}
                family={"Medium"}
                size={TEXT.large}
                color={COLORS.black}
              />
              {item.component}
            </View>
          )}
          contentContainerStyle={styles.scrollContainer}
          ListFooterComponent={<View style={styles.bottomSpacing} />}
        />
      </SafeAreaView>
    </RusableWhite>
  );
};

export default TopInfo;

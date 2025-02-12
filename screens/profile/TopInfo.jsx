import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./topTab.style";
import { ReusableText, RusableWhite } from "../../components";
import { COLORS, TEXT } from "../../constants/theme";
import ProfileTags from "../../components/Profile/ProfileTags";
import VisitedPlaces from "../../components/Profile/VisitedPlaces";
import { useLanguage } from "../../store/context/LanguageContext";
import translations from "../../translations/translations";

const TopInfo = ({ route }) => {
  const { language } = useLanguage(); // Get selected language
  const translatedText = translations[language] || translations["en"];

  // ✅ Ensure profile updates dynamically when language changes
  const [profile, setProfile] = useState(route?.params?.profile || null);

  useEffect(() => {
    if (route.params?.profile) {
      setProfile(route.params.profile);
    }
  }, [route.params?.profile, language]); 

  if (!profile) {
    return (
      <View style={styles.container}>
        <ReusableText
          text={translatedText.noProfileData || "No profile data available"}
          family="Regular"
          size={TEXT.medium}
          color={COLORS.gray}
        />
      </View>
    );
  }

  const tags = profile.tags || [];

  const sections = [
    {
      id: "tags",
      component: <ProfileTags tags={tags} />,
      title: translatedText.interestTags || "Interest Tags",
    },
    {
      id: "about",
      component: (
        <ReusableText
          text={
            profile.description ||
            translatedText.noDescription ||
            "No description available"
          }
          family="Regular"
          size={TEXT.medium}
          color={COLORS.gray}
        />
      ),
      title: translatedText.about || "About me",
    },
    {
      id: "visited",
      component: (
        <VisitedPlaces
          visitedPlaces={profile.visited_places || []}
          refreshProfile={() => {}}
        />
      ),
      title: translatedText.visitedPlaces || "Visited Places",
    },
  ];

  return (
    <RusableWhite>
      <SafeAreaView style={styles.aboutContainer}>
        <FlatList
          data={sections}
          showsVerticalScrollIndicator="false"
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 15 }}>
              <ReusableText
                text={item.title}
                family="Medium"
                size={TEXT.large}
                color={COLORS.black}
                style={styles.aboutTitleContainer}
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

import React from "react";
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { COLORS, TEXT } from "../../constants/theme";
import { ReusableText, RusableWhite } from "../../components";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../store/context/ThemeContext";
import { useLanguage } from "../../store/context/LanguageContext";
import translations from "../../translations/translations";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const UserPosts = ({ route }) => {
  const profile = route?.params?.profile;
  const posts = profile?.posts || [];
  const navigation = useNavigation();

  const { mode } = useTheme();
  const { language } = useLanguage();
  const translatedText = translations[language] || translations["en"];

  if (!posts.length) {
    return (
      <View
        style={[
          styles.noDataContainer,
          mode === "dark" && styles.darkContainer,
        ]}
      >
        <ReusableText
          text={translatedText.noPosts || "No posts found"}
          family="Bold"
          size={TEXT.medium}
          color={mode === "dark" ? COLORS.white : COLORS.secondary}
        />
      </View>
    );
  }

  return (
    <RusableWhite>
      <FlatList
        data={posts}
       ListFooterComponent={<View style={{ height: hp("12%") }} />}
        showsVerticalScrollIndicator="false"
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.postCard,
              mode === "dark" ? styles.postCardDark : styles.postCardLight,
            ]}
            onPress={() => navigation.navigate("AllUserPosts")}
          >
            <Image
              source={{
                uri: item.images?.[0]?.url || "https://via.placeholder.com/80",
              }}
              style={styles.postImage}
            />
            <View style={styles.postDetails}>
              <ReusableText
                text={item.name || translatedText.unknown}
                family="Bold"
                size={TEXT.medium}
                color={mode === "dark" ? COLORS.white : COLORS.black}
              />
              <ReusableText
                text={`${translatedText.when}: ${
                  item.created_at || translatedText.unknown
                }`}
                family="Regular"
                size={TEXT.small}
                color={mode === "dark" ? COLORS.lightGrey : COLORS.gray}
              />
              <ReusableText
                text={`${translatedText.Category}: ${
                  item.visitable_type || translatedText.unknown
                }`}
                family="Regular"
                size={TEXT.small}
                color={mode === "dark" ? COLORS.lightGrey : COLORS.gray}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </RusableWhite>
  );
};

export default UserPosts;

const styles = StyleSheet.create({
  noDataContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: wp("5%"),
  },
  postCard: {
    flexDirection: "row",
    borderRadius: wp("2.5%"),
    padding: wp("3%"),
    marginVertical: hp("1%"),
    marginHorizontal: wp("2%"),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
    top: hp("3%"),
  },
  postImage: {
    width: wp("20%"),
    height: wp("20%"),
    borderRadius: wp("3%"),
    marginRight: wp("4%"),
  },
  postDetails: {
    flex: 1,
  },
});

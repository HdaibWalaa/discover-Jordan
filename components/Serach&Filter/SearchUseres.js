import React from "react";
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { COLORS, TEXT } from "../../constants/theme";
import { ReusableText } from "../../components";
import { useTheme } from "../../store/context/ThemeContext";
import { useLanguage } from "../../store/context/LanguageContext";
import translations from "../../translations/translations";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const SearchUsers = ({ users = [] }) => {
  const { mode } = useTheme();
  const { language } = useLanguage();
  const navigation = useNavigation();
  const translatedText = translations[language] || translations["en"];

  // Navigate to user profile when a user card is pressed
  const handleUserPress = (userId) => {
    navigation.navigate("OtherUserProfile", { userId });
  };

  if (!users || users.length === 0) {
    return (
      <View
        style={[
          styles.noDataContainer,
          mode === "dark" && styles.darkContainer,
        ]}
      >
        <ReusableText
          text={translatedText.noUsers || "No users found"}
          family="Bold"
          size={TEXT.medium}
          color={mode === "dark" ? COLORS.white : COLORS.secondary}
        />
      </View>
    );
  }

  return (
    <FlatList
      data={users}
      ListFooterComponent={<View style={{ height: 350 }} />}
      keyExtractor={(item, index) =>
        item.id ? String(item.id) : `user-${index}`
      }
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[styles.userCard, mode === "dark" && styles.userCardDark]}
          onPress={() => handleUserPress(item.id)}
        >
          {/* FIX: Check if image URI exists and isn't empty before using it */}
          <Image
            source={
              item.image &&
              typeof item.image === "string" &&
              item.image.trim() !== ""
                ? { uri: item.image }
                : require("../../assets/images/icons/userdefault.png")
            }
            style={styles.userImage}
          />
          <View style={styles.userDetails}>
            <ReusableText
              text={item.username || "User"}
              family="Bold"
              size={TEXT.medium}
              color={mode === "dark" ? COLORS.white : COLORS.black}
            />
            <ReusableText
              text={item.email || "No email available"}
              family="Regular"
              size={TEXT.small}
              color={mode === "dark" ? COLORS.lightGreen : COLORS.gray}
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  noDataContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginVertical: hp(2),
  },
  darkContainer: {
    backgroundColor: COLORS.lightGrey,
  },
  userCard: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: wp(3),
    marginVertical: hp(0.7),
    marginHorizontal: wp(1),
    width: wp(90),
    alignSelf: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  userCardDark: {
    backgroundColor: COLORS.lightGrey,
  },
  userImage: {
    width: wp(15),
    height: wp(15),
    borderRadius: wp(7.5),
    marginRight: wp(3),
  },
  userDetails: {
    flex: 1,
    justifyContent: "center",
  },
});

export default SearchUsers;

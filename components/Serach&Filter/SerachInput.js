import React from "react";
import { View, TextInput, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "../../screens/search/search.style";
import { useTheme } from "../../store/context/ThemeContext";
import { useLanguage } from "../../store/context/LanguageContext";
import { COLORS } from "../../constants/theme";

const SearchInput = ({
  searchKey,
  setSearchKey,
}) => {
  const { mode } = useTheme();
  const isDarkMode = mode === "dark";
  const { translations } = useLanguage();
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View
      style={[
        styles.searchContainer,
        { backgroundColor: isDarkMode ? COLORS.darkBackground : COLORS.white },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.backButton,
          {
            backgroundColor: isDarkMode ? COLORS.lightGrey : COLORS.white,
            borderColor: isDarkMode ? COLORS.lightGrey : COLORS.gray,
          },
        ]}
        onPress={handleGoBack}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color={isDarkMode ? COLORS.black : COLORS.black}
        />
      </TouchableOpacity>

      <View
        style={[
          styles.searchWrapper,
          {
            backgroundColor: isDarkMode ? COLORS.lightGrey : COLORS.white,
            borderColor: isDarkMode ? COLORS.lightGrey : COLORS.gray,
          },
        ]}
      >
        <TextInput
          style={[
            styles.input,
            { color: isDarkMode ? COLORS.black : COLORS.black },
          ]}
          value={searchKey}
          onChangeText={setSearchKey}
          placeholder={translations.searchPlaceholder}
          placeholderTextColor={isDarkMode ? COLORS.black : "#999"}
        />

        {searchKey.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setSearchKey("")}
          >
            <Image
              source={require("../../assets/images/icons/close.png")}
              style={[
                styles.clearIcon,
                { tintColor: isDarkMode ? COLORS.black : COLORS.black },
              ]}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SearchInput;

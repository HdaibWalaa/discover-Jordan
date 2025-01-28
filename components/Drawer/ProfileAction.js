import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import editIcon from "../../assets/images/icons/edit-text.png";
import ProfileIcon from "../../assets/images/icons/userdefault.png";
import deleteIcon from "../../assets/images/icons/deleteaccount.png";
import DeleteDeactivateModal from "./DeleteDeactivateModal";
import { ReusableText } from "../index";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../store/context/ThemeContext";
import { useLanguage } from "../../store/context/LanguageContext";
import { COLORS } from "../../constants/theme";

const ProfileAction = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const { translations } = useLanguage(); // Access translations
  const { mode } = useTheme(); // Access theme mode
  const isDarkMode = mode === "dark";

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={[styles.container]}>
      <ReusableText
        text={translations.myprofile}
        family={"Bold"}
        size={16}
        color={isDarkMode ? COLORS.white : COLORS.black} // Dynamic text color
        align={"left"}
        style={styles.sectionTitle}
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: isDarkMode ? COLORS.gray : COLORS.lightWhite },
            ]}
            onPress={() => navigation.navigate("Profile")}
          >
            <Image source={ProfileIcon} style={styles.icon} />
            <ReusableText
              text={translations.profile}
              family={"Medium"}
              size={14}
              color={isDarkMode ? "#fff" : "#000"} // Dynamic text color
              align={"left"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: isDarkMode ? COLORS.gray : COLORS.lightWhite }, // Dynamic button background
            ]}
            onPress={() => navigation.navigate("EditUserProfile")}
          >
            <Image source={editIcon} style={styles.icon} />
            <ReusableText
              text={translations.editprofile}
              family={"Medium"}
              size={14}
              color={isDarkMode ? "#fff" : "#000"} // Dynamic text color
              align={"left"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: isDarkMode ? COLORS.gray : COLORS.lightWhite }, // Dynamic button background
            ]}
            onPress={openModal}
          >
            <Image source={deleteIcon} style={styles.icon} />
            <ReusableText
              text={translations.delete} // Assuming you want this for delete or add a new key for delete
              family={"Medium"}
              size={14}
              color={isDarkMode ? "#fff" : "#000"} // Dynamic text color
              align={"left"}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <DeleteDeactivateModal visible={modalVisible} onClose={closeModal} />
    </View>
  );
};

export default ProfileAction;

const styles = StyleSheet.create({
  container: {
    overflow: "visible",
    borderRadius: wp("3%"),
  },
  sectionTitle: {
    marginBottom: hp(".5%"),
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: hp("1%"),
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp("3%"),
    paddingVertical: hp("1.5%"),
    borderRadius: wp("7%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    marginRight: wp("2%"),
  },
  icon: {
    width: wp("5%"),
    height: wp("5%"),
    marginRight: wp("2%"),
  },
});

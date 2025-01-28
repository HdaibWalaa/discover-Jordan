import React, { useContext, useState } from "react";
import { TouchableOpacity, Image, Dimensions } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useTheme } from "../store/context/ThemeContext";
import { AuthContext } from "../store/auth-context";
import { COLORS } from "../constants/theme";
import AwesomeAlert from "react-native-awesome-alerts";
import { useLanguage } from "../store/context/LanguageContext";

const SideMenu = () => {
  const navigation = useNavigation();
  const { translations, language, toggleLanguage } = useLanguage();
  const { mode } = useTheme();
  const authCtx = useContext(AuthContext);
  const isAuthenticated = authCtx.isAuthenticated;
  const [showAlert, setShowAlert] = useState(false);

  const imageWidth = wp(6);
  const imageHeight = imageWidth * (19.2 / 24);

  const handleMenuPress = () => {
    if (!isAuthenticated) {
      setShowAlert(true); // Show the custom alert
      return;
    }
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <>
      <TouchableOpacity onPress={handleMenuPress} style={{ marginLeft: wp(2) }}>
        <Image
          source={require("../assets/images/icons/sidemenu.png")}
          style={{
            width: imageWidth,
            height: imageHeight,
            tintColor: mode === "dark" ? COLORS.white : COLORS.black,
            opacity: 0.94,
          }}
        />
      </TouchableOpacity>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={translations.joinUsTitle}
        message={translations.joinUsMessage}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText={translations.cancel || "Cancel"}
        confirmText={translations.signup || "Signup"}
        cancelButtonColor={COLORS.grey}
        confirmButtonColor={COLORS.primary}
        onCancelPressed={() => setShowAlert(false)}
        onConfirmPressed={() => {
          setShowAlert(false);
          navigation.navigate("Signup");
        }}
      />
    </>
  );
};

export default SideMenu;

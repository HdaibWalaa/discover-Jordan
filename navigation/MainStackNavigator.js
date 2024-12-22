import React from "react";
import { TouchableOpacity, Image, Dimensions } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const SideMenu = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get("window").width;

  const imageWidth = wp(6);
  const imageHeight = imageWidth * (19.2 / 24);

  return (
    <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      style={{ marginLeft: wp(2) }}
    >
      <Image
        source={require("../assets/images/icons/sidemenu.png")}
        style={{
          width: imageWidth,
          height: imageHeight,
          opacity: 0.94,
        }}
      />
    </TouchableOpacity>
  );
};

export default SideMenu;

import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabNavigation from "./BottomTabNavigation";
import CustomDrawerContent from "../components/Drawer/CustomDrawerContent";
import { Dimensions } from "react-native";
import { COLORS } from "../constants/theme";
import { useTheme } from "../store/context/ThemeContext";

const Drawer = createDrawerNavigator();
const { width } = Dimensions.get("window");

const DrawerNavigation = () => {
  const { mode } = useTheme(); // Access the current theme

  const isDarkMode = mode === "dark";

  return (
    <Drawer.Navigator
      initialRouteName="BottomTabs"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          width: width * 0.8,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          overflow: "hidden",
          backgroundColor: isDarkMode ? COLORS.navey : COLORS.white,
        },
        drawerLabelStyle: {
          color: isDarkMode ? COLORS.white : COLORS.navey,
        },
      }}
    >
      <Drawer.Screen
        name="BottomTabs"
        component={BottomTabNavigation}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

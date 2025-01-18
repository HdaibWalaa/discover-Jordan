// DrawerNavigation.js
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabNavigation from "./BottomTabNavigation";
import CustomDrawerContent from "../components/Drawer/CustomDrawerContent";
import { Dimensions } from "react-native";

const Drawer = createDrawerNavigator();
const { width } = Dimensions.get("window");

const DrawerNavigation = () => {
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
          marginBottom: 30,
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

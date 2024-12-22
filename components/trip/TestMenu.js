import React from "react";
import { View, Text } from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from "react-native-popup-menu";

const TestMenu = () => (
  <MenuProvider>
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Menu>
        <MenuTrigger text="Open Menu" />
        <MenuOptions>
          <MenuOption onSelect={() => alert("Edit Trip")} text="Edit Trip" />
          <MenuOption
            onSelect={() => alert("Delete Trip")}
            text="Delete Trip"
          />
        </MenuOptions>
      </Menu>
    </View>
  </MenuProvider>
);

export default TestMenu;

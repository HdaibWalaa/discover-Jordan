import React from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import UserInfo from "./UserInfo";
import ProfileAction from "./ProfileAction";
import OverView from "./OverView";
import ActionButtons from "./ActionButtons";
import styles from "./CustomDrawerContent.styles";

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContent}
    >
      <UserInfo />
      <ProfileAction />
      <OverView />
      <ActionButtons />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;

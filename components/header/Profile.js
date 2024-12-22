import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const ProfileIcon = ({ onPress, avatar }) => {
  const iconSize = wp(10);
  const defaultAvatar = require("../../assets/images/icons/guestProfile.png");

  const avatarSource = avatar ? { uri: avatar } : defaultAvatar;

  return (
    <TouchableOpacity onPress={onPress} style={{ marginLeft: wp(12) }}>
      <Image
        source={avatarSource}
        style={{
          width: iconSize,
          height: iconSize,
          borderRadius: iconSize / 2,
        }}
      />
    </TouchableOpacity>
  );
};

export default ProfileIcon;

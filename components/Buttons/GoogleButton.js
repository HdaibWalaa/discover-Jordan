import React from "react";
import { TouchableOpacity, Image, View, ImageBackground } from "react-native";
import { SIZES, COLORS } from "../../constants/theme";

const GoogleButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        height: 52,
        borderColor: COLORS.grey,
        marginRight: 4,
        borderRadius: 10,
      }}
    >
      <View
        style={{
          // backgroundColor: COLORS.blue,
          borderRadius: 10,
          padding: 8,
        }}
      >
        <ImageBackground
          source={require("../../assets/images/icons/Rectangle.png")}
          style={{
            height: 52,
            width: 52,
            justifyContent: "center",
            alignItems: "center",
          }}
          resizeMode="cover"
        >
          <Image
            source={require("../../assets/images/icons/google.png")}
            style={{
              height: 27,
              width: 27,
            }}
            resizeMode="contain"
          />
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

export default GoogleButton;

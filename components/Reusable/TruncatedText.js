import React from "react";
import { Text } from "react-native";

const TruncatedText = ({ style, numberOfLines, children }) => {
  return (
    <Text numberOfLines={numberOfLines} ellipsizeMode="tail" style={style}>
      {children}
    </Text>
  );
};

export default TruncatedText;

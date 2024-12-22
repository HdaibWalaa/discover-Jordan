import React from "react";
import { View, TextInput, Text } from "react-native";
import styles from "./post.style";

const VisitableId = ({ visitableType, visitableId, setVisitableId }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{`${visitableType} ID`}</Text>
      <TextInput
        style={styles.input}
        placeholder={`${visitableType} ID`}
        value={visitableId}
        onChangeText={setVisitableId}
      />
    </View>
  );
};

export default VisitableId;

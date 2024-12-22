import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import styles from "./post.style";

const PostPrivacy = ({ privacy, setPrivacy }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const privacyOptions = [
    { label: "Public", value: 1 },
    { label: "Only me", value: 0 },
  ];

  return (
    <View>
      <Text style={styles.privacyLabel}>Privacy</Text>
      <Dropdown
        style={[
          styles.privacyContainer,
          dropdownVisible && localStyles.dropdownActive,
        ]}
        data={privacyOptions}
        labelField="label"
        valueField="value"
        placeholder="Select Privacy"
        value={privacy}
        onChange={(item) => {
          setPrivacy(item.value);
          setDropdownVisible(false);
        }}
        renderItem={(item) => (
          <View style={localStyles.dropdownItem}>
            <Text style={localStyles.dropdownText}>{item.label}</Text>
          </View>
        )}
        renderRightIcon={() => (
          <Image
            source={require("../../assets/images/icons/Iconly.png")}
            style={styles.dropdownIcon}
          />
        )}
        renderLeftIcon={() => (
          <Image
            source={require("../../assets/images/icons/user-lock.png")}
            style={styles.privacyIcon}
          />
        )}
        onFocus={() => setDropdownVisible(true)}
        onBlur={() => setDropdownVisible(false)}
      />
    </View>
  );
};

export default PostPrivacy;

const localStyles = StyleSheet.create({
  dropdownItem: {
    padding: 10,
  },
  dropdownText: {
    fontSize: 16,
  },
  dropdownActive: {
    zIndex: 10,
  },
});

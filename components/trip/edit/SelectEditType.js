import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  FlatList,
} from "react-native";
import { COLORS, TEXT } from "../../../constants/theme";
import ReusableText from "../../Reusable/ReusableText";
import { useLanguage } from "../../../store/context/LanguageContext";
import translations from "../../../translations/translations";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const SelectEditType = ({
  label,
  iconSource,
  onValueChange,
  value,
  width = wp(80),
}) => {
  const { language } = useLanguage();
  const localizedText = translations[language] || translations["en"];

  const [isModalVisible, setIsModalVisible] = useState(false);

  const types = [
    { label: localizedText.public, value: "0" },
    { label: localizedText.followers, value: "1" },
    { label: localizedText.specificUsers, value: "2" },
  ];

  const handleSelectType = (selectedValue) => {
    if (onValueChange) {
      onValueChange(selectedValue);
    }
    setIsModalVisible(false);
  };

  const selectedLabel =
    types.find((type) => type.value === value)?.label ||
    localizedText.selectTypePlaceholder;

  return (
    <View style={[styles.container, { width: width + wp(2) }]}>
      <ReusableText
        text={label}
        family={"Regular"}
        size={TEXT.small}
        color={COLORS.dark}
      />

      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <View style={[styles.pickerWrapper, { width }]}>
          <Image source={iconSource} style={styles.icon} />
          <Text style={styles.selectedText}>{selectedLabel}</Text>
        </View>
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={types}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelectType(item.value)}>
                  <View style={styles.optionItem}>
                    <Text style={styles.optionText}>{item.label}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.closeText}>{localizedText.close}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: hp(1),
    marginLeft: wp(1),
  },
  pickerWrapper: {
    height: hp(6),
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    borderRadius: wp(2),
    paddingHorizontal: wp(3),
    backgroundColor: COLORS.white,
  },
  icon: {
    width: wp(6),
    height: wp(6),
    marginRight: wp(2),
  },
  selectedText: {
    fontFamily: "Medium",
    color: COLORS.lightGreen,
    fontSize: 14,
    fontWeight: "400",
    marginBottom: -15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: wp(90),
    maxHeight: hp(70),
    backgroundColor: COLORS.white,
    borderRadius: wp(3),
    padding: wp(4),
  },
  optionItem: {
    padding: wp(4),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  optionText: {
    fontSize: wp(4),
    color: COLORS.black,
  },
  closeButton: {
    marginTop: hp(2),
    padding: hp(1.5),
    backgroundColor: COLORS.primary,
    alignItems: "center",
    borderRadius: wp(2),
  },
  closeText: {
    color: COLORS.white,
    fontSize: wp(4),
  },
});

export default SelectEditType;






import React from "react";
import { SafeAreaView, FlatList, View } from "react-native";
import reusable from "../../components/Reusable/reusable.style";
import ReusableText from "../../components/Reusable/ReusableText";
import { COLORS, TEXT } from "../../constants/theme";
import EditTripForm from "../../components/trip/edit/EditTripForm";

const EditTrip = ({ route }) => {
  const { tripDetails, onUpdateTrip } = route.params;

  const capitalize = (str) =>
    str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <SafeAreaView style={reusable.container}>
      <View>
        <ReusableText
          text={capitalize("Edit Your Trip")}
          family={"Bold"}
          size={TEXT.large}
          color={COLORS.black}
        />
      </View>
      <FlatList
        data={[{ key: "form" }]} // Dummy data to use FlatList for entire screen
        renderItem={() => (
          <EditTripForm
            initialTripData={tripDetails}
            onUpdateTrip={onUpdateTrip}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default EditTrip;

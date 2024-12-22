import { StyleSheet, Text, View } from "react-native";
import React from "react";

const SubCatergory = () => {
  const data = {
    id: 2,
    name: "park",
    image:
      "http://127.0.0.1:8000/media/4/conversions/ekkk-subcategory_app.webp",
    places: [
      {
        id: 1,
        name: "Petra",
        image:
          "http://127.0.0.1:8000/media/5/conversions/Wave-Logo-Projects-__-Photos,-videos,-logos,-illustrations-and-branding---Copy-main_place_app.webp",
        region: "Amman",
        address: "maan",
        rating: "5.00",
        distance: null,
      },
      {
        id: 3,
        name: "Ryan Leach",
        image:
          "http://127.0.0.1:8000/media/11/conversions/logo-main_place_app.webp",
        region: "irbid",
        address: "Rerum eum duis sed d",
        rating: "4.00",
        distance: null,
      },
      {
        id: 4,
        name: "Caleb Lang",
        image:
          "http://127.0.0.1:8000/media/12/conversions/ekkk-main_place_app.webp",
        region: "irbid",
        address: "Magna tenetur nisi e",
        rating: "2.00",
        distance: null,
      },
      {
        id: 6,
        name: "Chaim Doyle",
        image:
          "http://127.0.0.1:8000/media/14/conversions/Resin-Artist-Logo-and-Branding-Design-(1)-main_place_app.webp",
        region: "irbid",
        address: "Molestiae nobis magn",
        rating: "3.00",
        distance: null,
      },
    ],
  };
  return (
    <View>
      <Text>SubCatergory</Text>
    </View>
  );
};

export default SubCatergory;

const styles = StyleSheet.create({});

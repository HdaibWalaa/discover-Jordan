import React from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { COLORS, SIZES } from "../../../constants/theme";
import HeightSpacer from "../../Reusable/HeightSpacer";
import NetworkImage from "../../Reusable/NetworkImage";
import ReusableText from "../../Reusable/ReusableText";
import { useNavigation } from "@react-navigation/native";
import { addFavourite, removeFavourite } from "../../../store/redux/favorites";
import ReusableFavorite from "../../Reusable/reusableFavorite";
import DateComponent from "../../Reusable/DateComponent";
import styles from "../Events/eventVolunteerStyles";
import IntresetUser from "../Events/IntresetUser";
import EventLocation from "../Events/EventLocation";

const VolunteerCard = ({ item, margin, volunteerId }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const favoriteVolunteers = useSelector((state) => state.favoriteEvents.ids);
  const volunteerFavourited = favoriteVolunteers.includes(volunteerId);

  const handleFavoritePress = () => {
    if (volunteerFavourited) {
      dispatch(removeFavourite(volunteerId));
    } else {
      dispatch(addFavourite(volunteerId));
    }
  };

  return (
    <TouchableOpacity
      style={[styles.cardContainer, { marginRight: margin }]}
      onPress={() => navigation.navigate("VolunteerDetails", { id: item.id })}
    >
      <View style={styles.imageContainer}>
        <NetworkImage
          source={item.image}
          width={"100%"}
          height={150}
          radius={16}
          style={{ resizeMode: "cover" }}
        />
        <View style={styles.iconContainer}>
          <DateComponent date={item.start_day} />
          <ReusableFavorite
            iconColor={volunteerFavourited ? COLORS.red : "black"}
            bgColor="rgba(255, 255, 255, 0.7)"
            onPress={handleFavoritePress}
            isFavourited={volunteerFavourited}
            style={styles.favoriteIcon}
          />
        </View>
      </View>

      <View style={[styles.contentContainer, { gap: 5 }]}>
        <ReusableText
          text={item.name}
          family={"SemiBold"}
          size={SIZES.medium}
          color={COLORS.black}
        />
        <IntresetUser users={item.interested_users} />
        <EventLocation region={item.region} />
      </View>
    </TouchableOpacity>
  );
};

export default VolunteerCard;

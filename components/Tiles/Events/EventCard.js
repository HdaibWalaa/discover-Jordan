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
import styles from "./eventVolunteerStyles";
import IntresetUser from "./IntresetUser";
import EventLocation from "./EventLocation";
import AddFavorite from "../../events/addFavorite";


const EventCard = ({ item, margin, eventId, refresh }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const favoriteEvents = useSelector((state) => state.favoriteEvents.ids);
  const eventFavourited = favoriteEvents.includes(eventId);
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const handleFavoritePress = () => {
    if (eventFavourited) {
      dispatch(removeFavourite(eventId));
    } else {
      dispatch(addFavourite(eventId));
    }
  };

  return (
    <TouchableOpacity
      style={[styles.cardContainer, { marginRight: margin }]}
      onPress={() => navigation.navigate("EventsDetails", { id: item.id })}
    >
      <View style={styles.imageContainer}>
        <NetworkImage
          source={item.image}
          width={"100%"}
          height={150}
          radius={16}
          style={{ resizeMode: "cover" }} // Just add resizeMode as an inline style
        />
        <View style={styles.iconContainer}>
          <DateComponent date={item.start_day} />
          <AddFavorite
            eventId={eventId} // Pass eventId
            favorite={item.favorite} // Pass initial favorite status
            refresh={refresh} // Optional refresh function
            iconColor="black"
            size={20}
            bgColor="rgba(255, 255, 255, 0.7)"
            style={styles.favoriteIcon}
          />
        </View>
      </View>

      <View style={[styles.contentContainer, { gap: 5 }]}>
        <ReusableText
          text={truncateText(item.name, 24)}
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

export default EventCard;

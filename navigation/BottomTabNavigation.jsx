import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { PlanProvider } from "../store/context/PlanContext";
import { Ionicons } from "@expo/vector-icons";
import {
  Home,
  Profile,
  CreatePostScreen,
  Following,
  CategoryList,
  PlacesList,
  PlaceDetails,
  AllTopTen,
  EventsList,
  VolunteerList,
  EventsDetails,
  VolunteerDetails,
  AllTrip,
  AllPlans,
  PlanDetails,
  Privacypolicy,
  ContactUs,
  Notification,
  SuggestPlace,
  CreatTrip,
  TripDetails,
  EditTrip,
  CreatActivies,
  CreatPlan
} from "../screens";
import { COLORS } from "../constants/theme";
import Header from "../components/header/Header";
import ReusableHeader from "../components/Reusable/ReusableHeader";
import PrivacyPolicyHeader from "../components/header/privacyPolicyHeader";
import ContactusHeader from "../components/header/ContactusHeader";
import NotificationHeader from "../components/header/NotificationHeader";
import CustomDrawerContent from "../components/Drawer/CustomDrawerContent";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const iconName =
          route.name === "Home"
            ? isFocused
              ? "home"
              : "home-outline"
            : route.name === "Favorites"
            ? isFocused
              ? "heart"
              : "heart-outline"
            : route.name === "Following"
            ? isFocused
              ? "people"
              : "people-outline"
            : route.name === "Profile"
            ? isFocused
              ? "person"
              : "person-outline"
            : "";

        const icon = (
          <Ionicons
            name={iconName}
            size={26}
            color={isFocused ? COLORS.secondary : COLORS.gray}
          />
        );

        if (route.name === "Post") {
          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.fabButton}
            >
              <ImageBackground
                source={require("../assets/images/tabs/Ellipse.png")}
                style={styles.backgroundImage}
              >
                <View style={styles.fabIconContainer}>
                  <Ionicons name="add" size={40} color="white" />
                </View>
              </ImageBackground>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
          >
            {icon}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const HomeStack = () => {
  return (
    <PlanProvider>
      <Stack.Navigator
        screenOptions={({ navigation, route }) => ({
          header: (props) => (
            <Header {...props} route={route} navigation={navigation} />
          ),
          headerShown: true,
        })}
      >
        <Stack.Screen
          name="HomeScreen"
          component={Home}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="CategoryList"
          component={CategoryList}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="PlacesList"
          component={PlacesList}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="AllTopTen"
          component={AllTopTen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="EventsList"
          component={EventsList}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="VolunteerList"
          component={VolunteerList}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="EventsDetails"
          component={EventsDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VolunteerDetails"
          component={VolunteerDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AllTrip"
          component={AllTrip}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="TripDetails"
          component={TripDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AllPlans"
          component={AllPlans}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="PlanDetails"
          component={PlanDetails}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Privacypolicy"
          component={Privacypolicy}
          options={{
            header: () => <PrivacyPolicyHeader />,
          }}
        />
        <Stack.Screen
          name="ContactUs"
          component={ContactUs}
          options={{
            header: () => <ContactusHeader />,
          }}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{
            header: () => <NotificationHeader />,
          }}
        />
        <Stack.Screen
          name="SuggestPlace"
          component={SuggestPlace}
          options={{
            tabBarShowLabel: false,
            header: () => (
              <ReusableHeader headerText={"SuggestPlace".toUpperCase()} />
            ),
          }}
        />
        <Stack.Screen
          name="CreatTrip"
          component={CreatTrip}
          options={{
            tabBarShowLabel: false,
            header: () => (
              <ReusableHeader headerText={"CreatTrip".toUpperCase()} />
            ),
          }}
        />
        <Stack.Screen
          name="EditTrip"
          component={EditTrip}
          options={{
            tabBarShowLabel: false,
            header: () => (
              <ReusableHeader headerText={"EditTrip".toUpperCase()} />
            ),
          }}
        />
        <Stack.Screen
          name="CreatActivies"
          component={CreatActivies}
          options={{
            tabBarShowLabel: false,
            header: () => (
              <ReusableHeader headerText={"CreatActivies".toUpperCase()} />
            ),
          }}
        />
        <Stack.Screen
          name="CreatPlan"
          component={CreatPlan}
          options={{
            tabBarShowLabel: false,
            header: () => (
              <ReusableHeader headerText={"CreatPlan".toUpperCase()} />
            ),
          }}
        />
      </Stack.Navigator>
    </PlanProvider>
  );
};

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: ({ route }) => <Header route={route} />, // Use the Header here
      }}
      tabBar={(props) => <CustomTabBar {...props} />} // Use CustomTabBar instead of CustomDrawerContent
    >
      <Tab.Screen
        name="Home"
        component={HomeStack} // Use HomeStack for nested navigation
        options={{
          tabBarShowLabel: false,
          headerShown: false, // Set to true if you want the header in the tab
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Home}
        options={{
          tabBarShowLabel: false,
          headerShown: false, // Set to true if you want the header in the tab
        }}
      />
      <Tab.Screen
        name="Post"
        component={CreatePostScreen}
        options={{
          tabBarShowLabel: false,
          header: () => (
            <ReusableHeader headerText={"Create Post".toUpperCase()} />
          ),
        }}
      />
      <Tab.Screen
        name="Following"
        component={Following}
        options={{
          tabBarShowLabel: false,
          headerShown: false, // Set to true if you want the header in the tab
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarShowLabel: false,
          headerShown: false, // Set to true if you want the header in the tab
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 85,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  tabButton: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  fabButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
    top: -30,
  },
  fabIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
  },
});

export default BottomTabNavigation;

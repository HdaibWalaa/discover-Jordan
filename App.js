import React, { useState, useContext, useEffect, useCallback } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import store from "./store/redux/store";
import { COLORS } from "./constants/theme";
import {
  Onboarding,
  Welcome,
  LoginEmail,
  LoginScreen,
  SignupScreen,
  ResetPasswordScreen,
  AllPopular,
  Search,
  EditUserProfile,
  ChatScreen,
  PlaceDetails,
  OtherUserProfile,
  PlacesFilter,
} from "./screens";
import DrawerNavigation from "./navigation/DrawerNavigation";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import BottomTabNavigation from "./navigation/BottomTabNavigation";
import { TripProvider } from "./store/trip-context";
import { Provider } from "react-redux";
import * as Location from "expo-location";
import Loader from "./components/Shimmers/Loader";
import ReusableHeader from "./components/Reusable/ReusableHeader";
import ChatHeader from "./components/Chats/ChatHeader";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.white },
        headerTintColor: "white",
        contentStyle: { backgroundColor: COLORS.white },
      }}
    >
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditUserProfile}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="LoginEmail"
        component={LoginEmail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <TripProvider>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.white },
          headerTintColor: "white",
          contentStyle: { backgroundColor: COLORS.white },
        }}
      >
        <Stack.Screen
          name="DrawerNavigation"
          component={DrawerNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BottomTabs"
          component={BottomTabNavigation}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </TripProvider>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated ? (
        <AuthStack />
      ) : authCtx.firstLogin ? (
        <Stack.Navigator>
          <Stack.Screen
            name="EditProfile"
            component={EditUserProfile}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <AppStack />
      )}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        if (storedToken) {
          authCtx.authenticate(storedToken);
        }
      } catch (error) {
        console.error("Error fetching token:", error);
        await AsyncStorage.removeItem("token");
      } finally {
        setIsTryingLogin(false);
      }
    }

    fetchToken();
  }, []);

  useEffect(() => {
    async function hideSplashScreen() {
      if (!isTryingLogin) {
        await SplashScreen.hideAsync();
      }
    }

    hideSplashScreen();
  }, [isTryingLogin]);

  if (isTryingLogin) {
    return null;
  }

  return <Navigation />;
}

export default function App() {
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      console.log("User Latitude:", location.coords.latitude);
      console.log("User Longitude:", location.coords.longitude);
    })();
  }, []);

  const [fontsLoaded] = useFonts({
    Bold: require("./assets/fonts/RedHatDisplayBold.ttf"),
    Medium: require("./assets/fonts/RedHatDisplayMedium.ttf"),
    Light: require("./assets/fonts/RedHatDisplayLight.ttf"),
    ExtraBold: require("./assets/fonts/RedHatDisplayExtraBold.ttf"),
    SemiBold: require("./assets/fonts/RedHatDisplaySemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || !userLocation.latitude || !userLocation.longitude) {
    return <Loader />;
  }

  return (
    <AuthContextProvider>
      <Provider store={store}>
        <View style={styles.container} onLayout={onLayoutRootView}>
          <Root />
        </View>
      </Provider>
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

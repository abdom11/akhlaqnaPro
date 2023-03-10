import { useEffect } from "react";
import {
  BackHandler,
  Alert,
  Image,
  View,
  StyleSheet,
  I18nManager,
} from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import SearchPage from "../screens/search/SearchPage";
import AddPostPage from "../screens/AddpostPage";
import commentPage from "../screens/comment/CommentPage";
import NotificationsPage from "../screens/notification/NotificationsPage";
import AppHeader from "../components/AppHeader";
import ChatNavigator from "./ChatNavigator";
import PostNavigator from "./PostNavigator";
import AppDrawerNavigator from "./AppDrawerNavigator";

import logo from "../../assets/logo.js";
import Svg, { Ellipse, Path, SvgXml } from "react-native-svg";

const Tab = createBottomTabNavigator();
const iconsize = 30;
const iconcolor = "#660032";
const isRTL = I18nManager.isRTL;

export default function AppBottomTabNavigator({ navigation }) {
  useEffect(() => {
    const backAction = () => {
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  });

  return (
    <Tab.Navigator
      initialRouteName={"Post"}
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "black",
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: "white",
          borderTopColor: "#660032",
          borderTopWidth: 3,
        },
        header: () => <AppHeader navigation={navigation} isDrawer={true} />,
      }}
      backBehavior={"initialRoute"}
      screenListeners={{beforeRemove: null}}
      tabbarop
      barStyle={{ backgroundColor: "black" }} //This is where you can manipulate its look.
    >
      <Tab.Screen
        name="Search"
        component={SearchPage}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              color={iconcolor}
              size={iconsize}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationsPage}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "notifications" : "notifications-outline"}
              color={iconcolor}
              size={iconsize}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={PostNavigator}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <View>
                {!focused ? (
                  <Image
                    source={require("../../assets/Logo1.png")}
                    style={styles.imageLogo}
                  />
                ) : (
                  <Image
                    source={require("../../assets/akhlaqna.png")}
                    style={styles.imageLogo}
                  />
                )}
              </View>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Chat"
        component={ChatNavigator}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "chatbubbles" : "chatbubbles-outline"}
              color={iconcolor}
              size={iconsize}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Add"
        component={AddPostPage}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "add-circle" : "add-circle-outline"}
              color={iconcolor}
              size={iconsize}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 70,
    height: 85,
    borderRadius: 800,
    borderColor: "#660032",
    borderWidth: 2,
    alignSelf: "center",
    marginTop: -700,
  },

  logo: {
    // position: "absolute",
    height: 42,
    width: 42,
    alignSelf: "center",
    borderColor: "#660032",
    borderWidth: 2,
    borderRadius: 150 / 2,

    alignItems: "center",
    justifyContent: "center",
  },
  imageLogo: {
    height: 33,
    width: 32,
    marginBottom: 2,
    marginLeft: isRTL ? -2 : 2,
  },
});

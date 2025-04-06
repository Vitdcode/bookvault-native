import { Tabs } from "expo-router";
/* icons */
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";

import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";

import { useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";

export default function TabLayout() {
  const theme = useTheme();

  const screenOptions = {
    tabBarStyle: {
      position: "absolute",
      bottom: 30,
      marginLeft: "5%",
      marginRight: "5%",
      backgroundColor: theme.colors.surface,
      borderRadius: 15,
      height: 60,
      width: "90%",
      borderTopWidth: 0,
      elevation: 5,
    },
    tabBarActiveTintColor: theme.colors.primary,
    tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
    tabBarLabelStyle: {
      fontSize: 12,
      fontFamily: theme.fonts.regular.fontFamily,
    },
    headerStyle: {
      backgroundColor: theme.colors.secondary, // Header color for all screens
    },
  };

  const tabIconStyleFunc = (focused) => ({
    backgroundColor: focused ? theme.colors.secondary : "transparent",
    borderRadius: 20,
    padding: 4,
  });

  useEffect(() => {
    const setNavBarTransparent = async () => {
      try {
        NavigationBar.setPositionAsync("absolute");
        NavigationBar.setBackgroundColorAsync("rgba(0, 0, 0, 0)");
      } catch (error) {
        console.error("Failed to set navigation bar color:", error);
      }
    };

    setNavBarTransparent();
  }, [theme]);

  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen
        name="FavoritesScreen"
        options={{
          title: "Favorites",
          tabBarIcon: ({ focused, color }) => (
            <MaterialIcons name="favorite-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="BookmarksScreen"
        options={{
          title: "Bookmarks",
          tabBarIcon: ({ focused, color }) => <Feather name="bookmark" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="CompletedScreen"
        options={{
          title: "Completed",
          tabBarIcon: ({ focused, color }) => <AntDesign name="check" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="StatisticsScreen"
        options={{
          title: "Statistics",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name="stats-chart-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Search",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name="search-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

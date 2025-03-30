import { Tabs } from "expo-router";
/* icons */
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";

import { useTheme } from "react-native-paper";

export default function TabLayout() {
  const theme = useTheme();

  const screenOptions = {
    tabBarStyle: {
      position: "absolute",
      bottom: 20,
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

  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen
        name="FavoritesScreen"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="favorite-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="BookmarksScreen"
        options={{
          title: "Bookmarks",
          tabBarIcon: ({ color }) => <Feather name="bookmark" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="CompletedScreen"
        options={{
          title: "Completed",
          tabBarIcon: ({ color }) => <AntDesign name="check" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="StatisticsScreen"
        options={{
          title: "Statistics",
          tabBarIcon: ({ color }) => (
            <Ionicons name="stats-chart-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => <Ionicons name="search-outline" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

import { Stack } from "expo-router";
import { AppProvider } from "./context/context";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
  useTheme,
} from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import Colors from "../constants/Colors";
import merge from "deepmerge";

const customLightTheme = { ...MD3LightTheme, colors: Colors.light };
const customDarkTheme = { ...MD3DarkTheme, colors: Colors.dark };

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(LightTheme, customLightTheme);
const CombinedDarkTheme = merge(DarkTheme, customDarkTheme);

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const paperTheme = colorScheme === "dark" ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider value={paperTheme}>
        <AppProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false, title: "Home Screen" }} />
          </Stack>
          <StatusBar
            style={colorScheme === "dark" ? "light" : "dark"} // Dynamically set style
            backgroundColor={
              colorScheme === "dark"
                ? Colors.dark.secondary // Use your dark theme background
                : Colors.light.secondary // Use your light theme background
            }
          />
        </AppProvider>
      </ThemeProvider>
    </PaperProvider>
  );
}

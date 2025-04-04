import { MaterialCommunityIcons } from "@expo/vector-icons";
import BookStatusMenu from "../components/BookStatusMenu";
import { useTheme } from "react-native-paper";

export default function FavoritesScreen() {
  const theme = useTheme();
  return (
    <BookStatusMenu
      searchTerm="isFavorite"
      icon={
        <MaterialCommunityIcons
          name="thumb-up"
          size={27}
          color={theme.colors.primary}
          style={{ position: "absolute", top: 0, right: 0 }}
        />
      }
    />
  );
}

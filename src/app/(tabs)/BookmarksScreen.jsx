import { MaterialCommunityIcons } from "@expo/vector-icons";
import BookStatusMenu from "../components/BookStatusMenu";
import { useTheme } from "react-native-paper";

export default function BookmarksScreen() {
  const theme = useTheme();

  return (
    <BookStatusMenu
      searchTerm="isBookmarked"
      icon={
        <MaterialCommunityIcons
          name="bookmark"
          size={30}
          color={theme.colors.primary}
          style={{ position: "absolute", top: 0, right: 0 }}
        />
      }
    />
  );
}

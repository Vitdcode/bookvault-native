import { useAppContext } from "../../context/context";
import { MaterialIcons } from "@expo/vector-icons";
import toggleProperty from "../../functional functions_components/toggleProperty";
import { useTheme } from "react-native-paper";
import { useRouter } from "expo-router";

const AddToFavorites = ({ bookData }) => {
  const router = useRouter();
  const theme = useTheme();
  const { books, setBooks } = useAppContext();
  const isFavorite =
    books.find((book) => book.googleBooksId === bookData.googleBooksId)?.isFavorite || false;

  const handleFavoritesToggle = () => {
    toggleProperty(books, setBooks, bookData, "isFavorite", "isCompleted", "isBookmarked", router);
  };

  return (
    <>
      {isFavorite ? (
        <MaterialIcons
          name="thumb-up"
          size={34}
          color={theme.colors.blue}
          onPress={handleFavoritesToggle}
        />
      ) : (
        <MaterialIcons
          name="thumb-up-off-alt"
          size={34}
          onPress={handleFavoritesToggle}
          color={theme.colors.gray}
        />
      )}
    </>
  );
};

export default AddToFavorites;

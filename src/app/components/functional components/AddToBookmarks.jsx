import { useAppContext } from "../../context/context";
import { MaterialIcons } from "@expo/vector-icons";
import toggleProperty from "../../functional functions_components/toggleProperty";
import { useTheme } from "react-native-paper";
import { useRouter } from "expo-router";

const AddToBookmarks = ({ bookData }) => {
  const router = useRouter();
  const theme = useTheme();
  const { books, setBooks } = useAppContext();
  const isBookmarked =
    books.find((book) => book.googleBooksId === bookData.googleBooksId)?.isBookmarked || false;

  const handleBookmarkToggle = () => {
    toggleProperty(books, setBooks, bookData, "isBookmarked", "isCompleted", "isFavorite", router);
  };

  return (
    <>
      {isBookmarked ? (
        <MaterialIcons
          name="bookmark"
          size={34}
          color={theme.colors.blue}
          onPress={handleBookmarkToggle}
        />
      ) : (
        <MaterialIcons
          name="bookmark-border"
          size={34}
          onPress={handleBookmarkToggle}
          color={theme.colors.gray}
        />
      )}
    </>
  );
};

export default AddToBookmarks;

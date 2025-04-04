import { useAppContext } from "../../context/context";
import { MaterialIcons } from "@expo/vector-icons";
import toggleProperty from "../../functional functions_components/toggleProperty";
import { useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import { Animated, Easing } from "react-native"; // Import Animated
import { useRef, useEffect } from "react";

const AddToFavorites = ({ bookData }) => {
  const router = useRouter();
  const theme = useTheme();
  const { books, setBooks } = useAppContext();
  const isFavorite =
    books.find((book) => book.googleBooksId === bookData.googleBooksId)?.isFavorite || false;

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current; // Controls opacity
  const scaleAnim = useRef(new Animated.Value(0.8)).current; // Controls scale

  // Run animation when isFavorite changes
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1, // Fade in
        duration: 300, // 300ms duration
        easing: Easing.out(Easing.ease), // Smooth easing
        useNativeDriver: true, // Better performance
      }),
      Animated.spring(scaleAnim, {
        toValue: 1, // Scale to full size
        friction: 5, // Spring tension
        useNativeDriver: true,
      }),
    ]).start();

    // Reset animation values before next toggle
    return () => {
      fadeAnim.setValue(0); // Start faded out
      scaleAnim.setValue(0.8); // Start slightly scaled down
    };
  }, [isFavorite]); // Trigger on isFavorite change

  const handleFavoritesToggle = () => {
    toggleProperty(books, setBooks, bookData, "isFavorite", "isCompleted", "isBookmarked", router);
  };

  return (
    <Animated.View
      style={{
        opacity: fadeAnim, // Bind opacity to animation
        transform: [{ scale: scaleAnim }], // Bind scale to animation
      }}
    >
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
          color={theme.colors.gray}
          onPress={handleFavoritesToggle}
        />
      )}
    </Animated.View>
  );
};

export default AddToFavorites;

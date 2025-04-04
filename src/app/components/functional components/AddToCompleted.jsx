import { useAppContext } from "../../context/context";
import { MaterialIcons } from "@expo/vector-icons";
import toggleProperty from "../../functional functions_components/toggleProperty";
import { Text, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import { Button, Icon } from "react-native-paper";
import { Animated, Easing, View } from "react-native"; // Import Animated and Easing
import { useState, useRef } from "react";
import bookApis from "../../../../api";

const AddToCompleted = ({ bookData }) => {
  const router = useRouter();
  const theme = useTheme();
  const { books, setBooks } = useAppContext();
  const isCompleted =
    books.find((book) => book.googleBooksId === bookData.googleBooksId)?.isCompleted || false;

  const handleCompletedToggle = () => {
    let updatedBooks = toggleProperty(
      books,
      setBooks,
      bookData,
      "isCompleted",
      "isBookmarked",
      "isFavorite",
      router
    );

    if (!isCompleted) {
      updatedBooks = updatedBooks?.map((book) =>
        book.googleBooksId === bookData.googleBooksId
          ? { ...book, yearCompleted: new Date().getFullYear() }
          : book
      );
    } else {
      updatedBooks = updatedBooks?.map((book) =>
        book?.googleBooksId === bookData?.googleBooksId ? { ...book, yearCompleted: "" } : book
      );
    }
    const updatedBook = updatedBooks?.find(
      (book) => book?.googleBooksId === bookData?.googleBooksId
    );
    setBooks(updatedBooks);
    if (updatedBook) {
      bookApis.updateProperty(
        updatedBook.googleBooksId,
        "yearCompleted",
        updatedBook?.yearCompleted
      );
    }
  };

  const animationValue = useRef(new Animated.Value(0)).current; // Animation value (0 to 1)

  // Animation function
  const startAnimation = () => {
    Animated.timing(animationValue, {
      toValue: 1, // Animate to full opacity/scale
      duration: 300, // 300ms duration
      easing: Easing.ease, // Smooth easing
      useNativeDriver: true, // Better performance
    }).start(() => {
      // Optional: Reset animation after completion if desired
      /*   animationValue.setValue(0); */
      /*   setIsPressed(false); */
    });
  };

  return (
    <Button
      mode="contained-tonal"
      textColor={theme.colors.textColor}
      buttonColor={theme.colors.secondary}
      onPress={() => {
        handleCompletedToggle();
      }}
      icon={
        ({ size, color }) =>
          isCompleted ? ( // Only show icon after press
            <Animated.View
              style={{
                opacity: animationValue, // Fade in
                transform: [
                  {
                    scale: animationValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.5, 1], // Scale from 50% to 100%
                    }),
                  },
                ],
              }}
            >
              <Icon source="check-decagram" size={25} color="rgb(255, 255, 255)" />
            </Animated.View>
          ) : null // No icon before press
      }
      style={{
        width: 200,
        padding: 6,
        justifyContent: "center",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "white",
      }}
      labelStyle={{
        fontSize: 15,
      }}
    >
      {!isCompleted ? (
        "Mark completed"
      ) : (
        <>
          {startAnimation()}
          Book completed
        </>
      )}
    </Button>
  );
};

export default AddToCompleted;

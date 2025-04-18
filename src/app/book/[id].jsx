import { View, ScrollView, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useAppContext } from "../context/context";
import { Text, Button, Icon, Card, useTheme, Portal } from "react-native-paper";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Stack } from "expo-router";
import Fab from "../components/Fab";

import AddToFavorites from "../components/functional components/AddToFavorites";
import AddToBookmarks from "../components/functional components/AddToBookmarks";
import AddToCompleted from "../components/functional components/AddToCompleted";
import ToggleReviewEdit from "../components/functional components/ToggleReviewEdit";
import Review from "../components/Review";
import { useState } from "react";
import MarkdownControls from "../components/functional components/MarkdownControls";
import StarRating from "react-native-star-rating-widget";
import HandleRating from "../components/functional components/HandleRating";

const Bookpage = () => {
  const theme = useTheme();
  const { id } = useLocalSearchParams();
  const { fetchedBooks, books, reviewBtnIsPressed } = useAppContext();
  const [selection, setSelection] = useState({ start: 0, end: 0 });

  const book =
    books.find((b) => b.googleBooksId == id) || fetchedBooks.find((b) => b.googleBooksId === id);

  if (!book) return;
  const [review, setReview] = useState(book.review);
  function convertToMetricDate(americanDate) {
    if (!americanDate) return "";
    if (!americanDate.includes("-")) return americanDate;

    const [year, month, day] = americanDate.split("-");
    return `${day}.${month}.${year}`;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: book.title, // Dynamic title from book data
          headerStyle: {
            backgroundColor: theme.colors.secondary, // Your primary colorr
          },
          headerTintColor: "white", // Back button and title color
          headerTitleStyle: {
            fontFamily: "OpenSans-Regular", // Match your app's font
          },
        }}
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        {/* book details section */}
        <Card
          mode="contained"
          style={{
            borderRadius: 20,
            width: "95%",
            marginHorizontal: "auto",
            marginBlock: 20,
          }}
        >
          <Card.Content style={{ flexDirection: "row", gap: 40 }}>
            <View style={{ alignItems: "center", gap: 10, width: 190 }}>
              <Image
                source={{ uri: book.coverUrl }}
                resizeMethod="contain"
                style={{
                  height: 250,
                  width: 160,
                  borderRadius: 10,
                  elevation: 10,
                  borderWidth: 2,
                  borderColor: "white",
                }}
              />

              <HandleRating bookData={book} />
            </View>
            <View style={{ width: "40%", gap: 10, justifyContent: "space-between" }}>
              <Text variant="titleLarge" style={{ fontWeight: "bold", color: theme.colors.gray }}>
                {book.title}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: "10" }}>
                <MaterialIcons name="person" size={24} color={theme.colors.blue} />
                <Text
                  variant="bodyLarge"
                  style={{
                    color: theme.colors.gray,
                    width: "80%",
                  }}
                  numberOfLines={1}
                >
                  {book.authors.join(", ")}
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", gap: "10" }}>
                <MaterialIcons name="calendar-month" size={24} color={theme.colors.blue} />
                <Text variant="bodyLarge" style={{ color: theme.colors.gray }}>
                  {convertToMetricDate(book.publishedDate)}
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", gap: "10" }}>
                <MaterialIcons name="menu-book" size={24} color={theme.colors.blue} />
                <Text variant="bodyLarge" style={{ color: theme.colors.gray }}>
                  {book.pageCount} pages
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  gap: 20,
                  marginTop: 10,
                }}
              >
                <AddToBookmarks bookData={book} />
                <AddToFavorites bookData={book} />
              </View>
            </View>
          </Card.Content>
        </Card>
        {/* buttons section */}
        <View
          style={{
            flexDirection: "row",
            gap: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ToggleReviewEdit googleBooksId={book.googleBooksId} review={review} />
          <AddToCompleted bookData={book} />
        </View>

        <Card
          mode="contained"
          style={{
            width: "95%",
            marginHorizontal: "auto",
            marginBlock: 20,
          }}
        >
          <Card.Content>
            <Text variant="titleLarge" style={{ marginBottom: 10 }}>
              {!reviewBtnIsPressed ? "Review" : "Edit Review"}
            </Text>
            {reviewBtnIsPressed && (
              <MarkdownControls
                review={review}
                setReview={setReview}
                selection={selection}
                setSelection={setSelection}
              />
            )}
            <Review
              review={review}
              setReview={setReview}
              selection={selection}
              setSelection={setSelection}
            />
          </Card.Content>
        </Card>

        <Card
          mode="contained"
          style={{
            width: "95%",
            marginHorizontal: "auto",
            marginTop: 20,
            /*            marginBottom: 90, */
          }}
        >
          <Card.Content>
            <Text variant="titleLarge" style={{ marginBottom: 10 }}>
              Description
            </Text>
            <Text variant="bodyMedium">{book.description}</Text>
          </Card.Content>
        </Card>
        <Fab book={book} />
      </ScrollView>
    </>
  );
};

export default Bookpage;

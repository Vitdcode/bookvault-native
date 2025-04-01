import { View, ScrollView, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useAppContext } from "../context/context";
import { Text, Button, Icon, Card, useTheme, Portal } from "react-native-paper";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CompletedButton from "../components/animatedButtons/CompletedButton";
import FavoriteButton from "../components/animatedButtons/FavoriteButton";
import AnimateIcons from "../components/animatedButtons/AnaimateBetweenIcons";
import BookMarkButton from "../components/animatedButtons/BookmarkButton";
import { Stack } from "expo-router";
import { useRef, useState } from "react";
import { Animated, Easing } from "react-native";
import Fab from "../components/Fab";
import ReviewButton from "../components/animatedButtons/ReviewButton";

const Bookpage = () => {
  const theme = useTheme();
  const { id } = useLocalSearchParams();
  const { fetchedBooks } = useAppContext();

  const { isLiked, setIsLiked } = useAppContext();
  const { isBookmarked, setIsBookmarked } = useAppContext();

  const book = fetchedBooks.find((b) => b.googleBooksId === id);

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
            backgroundColor: theme.colors.secondary, // Your primary color
          },
          headerTintColor: "white", // Back button and title color
          headerTitleStyle: {
            fontFamily: "OpenSans-Regular", // Match your app's font
          },
        }}
      />
      <ScrollView>
        {/* book details section */}
        <View
          style={{
            flexDirection: "row",
            padding: 40,
            gap: 40,
            marginBottom: 10,
          }}
        >
          <View>
            <Image
              source={{ uri: book.coverUrl }}
              resizeMethod="contain"
              style={{
                height: 250,
                width: 160,
                borderRadius: 5,
                elevation: 10,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                gap: 20,
                marginTop: 10,
                borderRadius: 10,
                borderBlockColor: "black",
              }}
            >
              {isBookmarked ? (
                <MaterialIcons
                  name="bookmark"
                  size={30}
                  color={theme.colors.secondary}
                  onPress={() => setIsBookmarked(!isBookmarked)}
                />
              ) : (
                <MaterialIcons
                  name="bookmark-border"
                  size={30}
                  color={theme.colors.gray}
                  onPress={() => setIsBookmarked(!isBookmarked)}
                />
              )}
              {isLiked ? (
                <MaterialIcons
                  name="thumb-up"
                  size={30}
                  color={theme.colors.secondary}
                  onPress={() => setIsLiked(!isLiked)}
                />
              ) : (
                <MaterialIcons
                  name="thumb-up-off-alt"
                  size={30}
                  color={theme.colors.gray}
                  onPress={() => setIsLiked(!isLiked)}
                />
              )}
            </View>
          </View>
          <View style={{ width: "60%", gap: 10 }}>
            <Text variant="titleLarge" style={{ fontWeight: "bold", color: theme.colors.gray }}>
              {book.title}
            </Text>
            <Text variant="bodyLarge" style={{ color: theme.colors.gray }}>
              Author: {book.authors.join(", ")}
            </Text>
            <Text variant="bodyLarge" style={{ color: theme.colors.gray }}>
              Published: {convertToMetricDate(book.publishedDate)}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: "10" }}>
              <FontAwesome5 name="book" size={20} color="#rgb(150, 197, 168)" />
              <Text variant="bodyLarge" style={{ color: theme.colors.gray }}>
                {book.pageCount} pages
              </Text>
            </View>
          </View>
        </View>
        {/* buttons section */}
        <View
          style={{
            flexDirection: "row",
            gap: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ReviewButton />
          <CompletedButton />
        </View>

        <Card
          style={{
            width: "95%",
            marginHorizontal: "auto",
            marginBlock: 20,
          }}
        >
          <Card.Content>
            <Text variant="titleLarge" style={{ marginBottom: 10 }}>
              review
            </Text>
            <Text variant="bodyMedium">This will be a review</Text>
          </Card.Content>
        </Card>

        <Card
          style={{
            width: "95%",
            marginHorizontal: "auto",
            marginTop: 20,
            marginBottom: 90,
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

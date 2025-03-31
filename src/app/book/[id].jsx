import { View, ScrollView, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useAppContext } from "../context/context";
import { Text, Button, Icon } from "react-native-paper";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CompletedButton from "../components/animatedButtons/CompletedButton";
import FavoriteButton from "../components/animatedButtons/FavoriteButton";
import AnimateIcons from "../components/animatedButtons/AnaimateBetweenIcons";
import BookMarkButton from "../components/animatedButtons/BookmarkButton";
import { useTheme } from "react-native-paper";
import { Stack } from "expo-router";

const Bookpage = () => {
  const theme = useTheme();
  const { id } = useLocalSearchParams();
  const { fetchedBooks } = useAppContext();

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
        <View style={{ flexDirection: "row", padding: 40, gap: 20, marginBottom: 10 }}>
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
          <View style={{ width: "60%", justifyContent: "space-between", gap: 10 }}>
            <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
              {book.title}
            </Text>
            <Text variant="bodyLarge" style={{ color: "gray" }}>
              Author: {book.authors.join(", ")}
            </Text>
            <Text variant="bodyLarge" style={{ color: "gray" }}>
              Published: {convertToMetricDate(book.publishedDate)}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: "10" }}>
              <FontAwesome5 name="book" size={20} color="#rgb(150, 197, 168)" />
              <Text variant="bodyLarge" style={{ color: "gray" }}>
                {book.pageCount} pages
              </Text>
            </View>
          </View>
        </View>
        {/* buttons section */}
        <View
          style={{
            gap: 30,
            alignItems: "flex-end",
            marginRight: 20,
          }}
        >
          <CompletedButton />
          <View
            style={{
              flexDirection: "row",
              marginLeft: "auto",
              marginRight: 25,
              alignItems: "center",
              justifyContent: "center",
              width: "30%",
              gap: 20,
              backgroundColor: "#e8e8e8",
              borderRadius: 10,
              padding: 10,
              /*    elevation: 1, */
            }}
          >
            <FavoriteButton />
            <BookMarkButton />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Bookpage;

import { View, ScrollView, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useAppContext } from "../context/context";
import { Text } from "react-native-paper";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
const Bookpage = () => {
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
    <ScrollView>
      <View style={{ flexDirection: "row", padding: 40, gap: 20 }}>
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
    </ScrollView>
  );
};

export default Bookpage;

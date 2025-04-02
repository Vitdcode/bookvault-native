import { Image, View, ScrollView } from "react-native";
import { useAppContext } from "../context/context";
import { Card, Text, TouchableRipple } from "react-native-paper";
import { useRouter } from "expo-router";

export default function FavoritesScreen() {
  const router = useRouter();
  const { books } = useAppContext();
  const favoriteBooks = books?.filter((b) => b.isFavorite);

  return (
    <ScrollView>
      <View style={{ gap: 20, marginTop: 20 }}>
        {favoriteBooks?.map((book) => (
          <Card
            key={book.googleBooksId}
            mode="contained"
            style={{
              width: "95%",
              marginHorizontal: "auto",
              padding: 10,
            }}
          >
            <TouchableRipple
              onPress={() => router.push(`/book/${book.googleBooksId}`)}
              rippleColor="rgba(214, 214, 214, 0.32)"
              key={book.googleBooksId}
            >
              <Card.Content style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
                <Image
                  source={{ uri: book.coverUrl }}
                  resizeMethod="contain"
                  style={{
                    height: 150,
                    width: 100,
                    borderRadius: 10,
                    elevation: 10,
                    borderWidth: 2,
                    borderColor: "white",
                  }}
                />
                <View style={{ width: "50%", gap: "10" }}>
                  <Text variant="titleMedium">{book.title}</Text>
                  <Text variant="bodyMedium">{book.authors.join(", ")}</Text>
                </View>
              </Card.Content>
            </TouchableRipple>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

import { useState } from "react";
import { TextInput, Text, TouchableRipple } from "react-native-paper";
import { useAppContext } from "../context/context";
import handleFetch from "../functional functions_components/fetchBooks";
import { View, ScrollView, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function SearchScreen() {
  const { searchInput, setSearchInput, fetchedBooks, setFetchedBooks } = useAppContext();

  const fetchBooks = async () => {
    const books = await handleFetch(searchInput);
    setFetchedBooks(books);
  };

  const router = useRouter();

  return (
    <View>
      <TextInput
        label="Search Book"
        value={searchInput}
        onChangeText={setSearchInput}
        onSubmitEditing={fetchBooks}
        returnKeyType="search"
      />
      <ScrollView style={{ marginBottom: 150 }}>
        {fetchedBooks.map((book) => (
          <TouchableRipple
            onPress={() => router.push(`/book/${book.googleBooksId}`)}
            rippleColor="rgba(214, 214, 214, 0.32)"
            key={book.googleBooksId}
          >
            <View style={{ padding: 20, flexDirection: "row", gap: 10 }}>
              <Image
                source={{ uri: book.coverUrl }}
                resizeMethod="contain"
                style={{
                  height: 200,
                  width: 130,
                  borderRadius: 5,
                  elevation: 3,
                }}
              />
              <View style={{ padding: 5, width: "60%", gap: 10 }}>
                <Text variant="titleLarge">{book.title}</Text>
                <Text variant="bodySmall" style={{ color: "gray" }}>
                  {book.authors.join(", ")}
                </Text>
              </View>
            </View>
          </TouchableRipple>
        ))}
      </ScrollView>
    </View>
  );
}

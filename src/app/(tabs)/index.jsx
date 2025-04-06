import { TextInput, Text, TouchableRipple, Searchbar } from "react-native-paper";
import { useAppContext } from "../context/context";
import handleFetch from "../functional functions_components/fetchBooks";
import { View, ScrollView, Image, RefreshControl } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import fetchBooksPi from "../functional functions_components/fetchBookDataPi";
import onRefresh from "../functional functions_components/refreshApp";
import fetchStatistics from "../functional functions_components/fetchStatistics";

export default function SearchScreen() {
  const {
    searchInput,
    setSearchInput,
    fetchedBooks,
    setFetchedBooks,
    books,
    setBooks,
    refreshing,
    setRefreshing,
    statisticsData,
    setStatisticsData,
  } = useAppContext();

  useEffect(() => {
    fetchBooksPi(setBooks);
    fetchStatistics(setStatisticsData);
  }, []);

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
      <ScrollView
        contentContainerStyle={{ paddingBottom: 130 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing} // Controls the spinner visibility
            onRefresh={() => onRefresh(setBooks, setRefreshing)} // Triggered when user pulls down
            tintColor="#0000ff" // Optional: Spinner color (iOS)
            colors={["#0000ff"]} // Optional: Spinner color (Android)
          />
        }
      >
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

import { Picker } from "@react-native-picker/picker";
import BookStatusMenu from "../components/BookStatusMenu";
import groupBooksByYear from "../functional functions_components/groupBooksByYear";
import { useState } from "react";
import { useAppContext } from "../context/context";
import { Image, ScrollView, View } from "react-native";
import { Card, Text, TouchableRipple } from "react-native-paper";
import { useRouter } from "expo-router";

export default function CompletedScreen() {
  const router = useRouter();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const { books } = useAppContext();
  const groupedBooksByYears = groupBooksByYear(books);

  if (Object.keys(groupedBooksByYears).length === 0) return;

  return (
    <ScrollView>
      <View>
        <Picker
          selectedValue={selectedYear}
          onValueChange={(itemValue, itemIndex) => setSelectedYear(itemValue)}
          mode="dropdown" // 'dialog' or 'dropdown' (Android only)
        >
          {Object.keys(groupedBooksByYears).map((year) => (
            <Picker.Item key={year} label={String(year)} value={year} />
          ))}
        </Picker>
      </View>
      {groupedBooksByYears[selectedYear].map((book) => (
        <View key={book.googleBooksId} style={{ gap: 20, marginTop: 20 }}>
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
        </View>
      ))}
    </ScrollView>
  );
}

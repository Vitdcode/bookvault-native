import { Picker } from "@react-native-picker/picker";
import groupBooksByYear from "../functional functions_components/groupBooksByYear";
import { useState } from "react";
import { useAppContext } from "../context/context";
import { Image, RefreshControl, ScrollView, View, StyleSheet } from "react-native";
import { Card, Text, TouchableRipple, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import onRefresh from "../functional functions_components/refreshApp";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CompletedScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [selectedYear, setSelectedYear] = useState(String(new Date().getFullYear()));
  const { books, refreshing, setBooks, setRefreshing } = useAppContext();
  const groupedBooksByYears = groupBooksByYear(books);

  if (Object.keys(groupedBooksByYears).length === 0) return;
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 90 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing} // Controls the spinner visibility
          onRefresh={() => onRefresh(setBooks, setRefreshing)} // Triggered when user pulls down
          tintColor="#0000ff" // Optional: Spinner color (iOS)
          colors={["#0000ff"]} // Optional: Spinner color (Android)
        />
      }
    >
      <View
        style={{
          backgroundColor: theme.colors.pickerColor,
          elevation: 5,
          borderRadius: 20,
          width: "80%",
          marginHorizontal: "auto",
          marginTop: "10",
        }}
      >
        <Picker
          selectedValue={selectedYear}
          onValueChange={(itemValue) => setSelectedYear(itemValue)} // Simplified, itemIndex not needed
          mode="dropdown" // Android-specific, ignored on iOS
          style={{ color: theme.colors.textColor }}
        >
          {Object.keys(groupedBooksByYears).map((year) => (
            <Picker.Item key={year} label={String(year)} value={year} />
          ))}
        </Picker>
      </View>
      {groupedBooksByYears[selectedYear].map(
        (book) =>
          book.isCompleted && (
            <View key={book.googleBooksId} style={{ gap: 20, marginTop: 20 }}>
              <Card
                key={book.googleBooksId}
                mode="contained"
                style={{
                  width: "95%",
                  marginHorizontal: "auto",
                  padding: 10,
                  position: "relative",
                }}
              >
                <MaterialCommunityIcons
                  name="check-decagram"
                  size={24}
                  color={theme.colors.primary}
                  style={{ position: "absolute", top: 0, right: 0 }}
                />
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
          )
      )}
    </ScrollView>
  );
}

import { useState } from "react";
import { Text, View } from "react-native";
import { TextInput } from "react-native-paper";

export default function SearchScreen() {
  const [input, setInput] = useState("");
  return (
    <View style={{}}>
      <TextInput label="Search Book" value={input} onChangeText={setInput} />
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}

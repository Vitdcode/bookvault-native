import { Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function SearchScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button icon="search" mode="contained">
        Hello World
      </Button>
    </View>
  );
}

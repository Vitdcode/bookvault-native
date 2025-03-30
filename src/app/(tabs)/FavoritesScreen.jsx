import { Text, View } from "react-native";
import { useAppContext } from "../context/context";

export default function FavoritesScreen() {
  const { searchInput } = useAppContext();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{searchInput}</Text>
    </View>
  );
}

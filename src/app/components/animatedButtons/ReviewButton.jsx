import { useState } from "react";
import { Button, Icon, useTheme } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const ReviewButton = () => {
  const [isPressed, setIsPressed] = useState(false); // Track button press
  const theme = useTheme();
  return (
    <Button
      mode="contained-tonal"
      buttonColor="rgb(151, 196, 168)"
      icon={() =>
        !isPressed ? (
          <MaterialCommunityIcons name="typewriter" size={27} color="white" />
        ) : (
          <MaterialCommunityIcons name="content-save-check-outline" size={27} color="white" />
        )
      }
      style={{
        width: 200,
        padding: 6,
        justifyContent: "center",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "white",
      }}
      labelStyle={{
        fontSize: 15,
      }}
      onPress={() => setIsPressed(!isPressed)}
    >
      {!isPressed ? "Write review" : "Save review"}
    </Button>
  );
};

export default ReviewButton;

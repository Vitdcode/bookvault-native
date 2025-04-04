import { useState } from "react";
import { Button, Icon, useTheme } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const ReviewButton = () => {
  const [isPressed, setIsPressed] = useState(false); // Track button press
  const theme = useTheme();
  return (
    <Button
      mode="contained-tonal"
      textColor={theme.colors.textColor}
      buttonColor={theme.colors.secondary}
      icon={() =>
        !isPressed ? (
          <MaterialCommunityIcons
            name="circle-edit-outline"
            size={27}
            color="white"
            style={{ marginRight: 5 }}
          />
        ) : (
          <MaterialCommunityIcons
            name="check-circle"
            size={27}
            color="white"
            style={{ marginRight: 5 }}
          />
        )
      }
      style={{
        width: 200,
        padding: 6,
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

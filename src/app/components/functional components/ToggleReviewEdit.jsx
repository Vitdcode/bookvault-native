import { useState } from "react";
import { Button, Icon, useTheme } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useAppContext } from "../../context/context";
import bookApis from "../../../../api";

const ToggleReviewEdit = ({ googleBooksId, review }) => {
  const { reviewBtnIsPressed, setReviewBtnIsPressed } = useAppContext();

  const sendReviewToDb = async () => {
    reviewBtnIsPressed ? bookApis.updateProperty(googleBooksId, "review", review) : null;
  };

  const theme = useTheme();
  return (
    <Button
      mode="contained-tonal"
      textColor={theme.colors.textColor}
      buttonColor={theme.colors.secondary}
      icon={() =>
        !reviewBtnIsPressed ? (
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
      onPress={async () => {
        await sendReviewToDb();
        setReviewBtnIsPressed(!reviewBtnIsPressed);
      }}
    >
      {!reviewBtnIsPressed ? "Write review" : "Save review"}
    </Button>
  );
};

export default ToggleReviewEdit;

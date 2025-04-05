import { TextInput, useTheme } from "react-native-paper";
import { useAppContext, review, setReview } from "../context/context";
import Markdown from "react-native-markdown-display";

const Review = ({ review, setReview, selection, setSelection }) => {
  const { reviewBtnIsPressed } = useAppContext();
  const theme = useTheme();

  return (
    <>
      {reviewBtnIsPressed ? (
        <TextInput
          label="Write review"
          value={review}
          onChangeText={setReview}
          selection={selection}
          multiline={true}
          onSelectionChange={(e) => setSelection(e.nativeEvent.selection)}
        />
      ) : (
        <Markdown
          style={{
            text: { color: theme.colors.textColor },
            blockquote: {
              borderLeftWidth: 4,
              backgroundColor: theme.colors.lightGray,
              paddingLeft: 16,
              paddingVertical: 8,
              paddingRight: 8,
              marginVertical: 10,
              borderRadius: 6,
              color: theme.colors.textColor,
              fontStyle: "italic",
            },
            bullet_list: {
              color: theme.colors.textColor,
            },
          }}
        >
          {review}
        </Markdown>
      )}
    </>
  );
};

export default Review;

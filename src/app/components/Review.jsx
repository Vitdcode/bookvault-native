import { TextInput, useTheme } from "react-native-paper";
import { useAppContext, review, setReview } from "../context/context";
import Markdown from "react-native-markdown-display";

const Review = ({ review, setReview }) => {
  const { reviewBtnIsPressed } = useAppContext();
  const theme = useTheme();

  return (
    <>
      {reviewBtnIsPressed ? (
        <TextInput label="Write review" value={review} onChangeText={setReview} multiline={true} />
      ) : (
        <Markdown style={{ text: { color: theme.colors.textColor } }}>{review}</Markdown>
      )}
    </>
  );
};

export default Review;

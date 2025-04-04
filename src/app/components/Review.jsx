import { TextInput } from "react-native-paper";
import { useAppContext, review, setReview } from "../context/context";
import { Text } from "react-native";
import { useState } from "react";

const Review = ({ review, setReview }) => {
  const { reviewBtnIsPressed } = useAppContext();
  /* const [review, setReview] = useState(reviewText); */

  return (
    <>
      {reviewBtnIsPressed ? (
        <TextInput label="Write review" value={review} onChangeText={setReview} />
      ) : (
        <Text>{review}</Text>
      )}
    </>
  );
};

export default Review;

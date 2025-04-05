import StarRating from "react-native-star-rating-widget";
import bookApis from "../../../../api";
import { useAppContext } from "../../context/context";

const HandleRating = ({ bookData }) => {
  const { books, setBooks } = useAppContext();

  const handleRatingChange = (newRating) => {
    const updatedBook = books.map((book) =>
      book.googleBooksId === bookData.googleBooksId ? { ...book, rating: newRating } : book
    );
    bookApis.updateProperty(bookData.googleBooksId, "rating", newRating); //send data to sql server
    setBooks(updatedBook);
  };

  return (
    <>
      {bookData.isCompleted && (
        <StarRating
          rating={bookData.rating || 3}
          onChange={handleRatingChange}
          starSize={28} // Customize star size
          color="#FFD700" // Gold color for filled stars
          emptyColor="#D3D3D3" // Gray for empty stars
          enableHalfStar={false}
        />
      )}
    </>
  );
};

export default HandleRating;

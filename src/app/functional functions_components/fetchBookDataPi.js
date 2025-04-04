import bookApis from "../../../api";
import { useAppContext } from "../context/context";

const fetchBooksPi = async (setBooks) => {
  const booksData = await bookApis.fetchBooks();
  if (booksData) setBooks(booksData);
};

export default fetchBooksPi;

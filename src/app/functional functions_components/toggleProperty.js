import bookApis from "../../../api.js";
import handleFetch from "./fetchBooks.js";

const toggleProperty = (
  books,
  setBooks,
  bookData,
  activeProperty,
  propertyCheck1,
  propertyCheck2,
  router
) => {
  const booksExists = books.find((book) => book.googleBooksId === bookData.googleBooksId);

  let updatedBooks;

  if (
    booksExists &&
    (booksExists[propertyCheck1] || booksExists[propertyCheck2] || booksExists.review)
  ) {
    // Case 1: Toggle the property for an existing book

    updatedBooks = books.map((book) =>
      book.googleBooksId === booksExists.googleBooksId
        ? { ...book, [activeProperty]: !book[activeProperty] }
        : book
    );

    bookApis.updateProperty(bookData.googleBooksId, activeProperty);
  } else if (
    booksExists &&
    !booksExists[propertyCheck1] &&
    !booksExists[propertyCheck2] &&
    !booksExists.review
  ) {
    // Case 2: Remove the book if it has no other flags or review
    bookApis.deleteBook(bookData.googleBooksId);
    updatedBooks = books.filter((book) => book.googleBooksId !== booksExists.googleBooksId);
    router.back();
  } else {
    // Case 3: Add a new book with the active property set to true
    let bookWithUpdatedFlag;
    if (activeProperty === "isCompleted") {
      bookWithUpdatedFlag = {
        ...bookData,
        [activeProperty]: true,
        yearCompleted: new Date().getFullYear(),
      };
    } else {
      bookWithUpdatedFlag = { ...bookData, [activeProperty]: true };
    }

    bookApis.insertBook(bookWithUpdatedFlag);
    updatedBooks = [...books, bookWithUpdatedFlag]; // updates data for front end
  }
  // Update the state with the new array
  setBooks(updatedBooks);
  // Return the updated array for immediate use
  return updatedBooks;
};

export default toggleProperty;

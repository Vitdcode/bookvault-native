const groupBooksByYear = (books) => {
  return books.reduce((acc, book) => {
    const year = book.yearCompleted;

    if (!acc[year] && year !== "") {
      acc[year] = [];
    }
    acc[year]?.push(book);

    return acc;
  }, {});
};

export default groupBooksByYear;

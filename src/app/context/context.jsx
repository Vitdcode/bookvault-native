import React, { createContext, useState, useContext, ReactNode } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [searchInput, setSearchInput] = useState("");
  const [fetchedBooks, setFetchedBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [isLiked, setIsLiked] = React.useState(false); //TODO - replace later with live data
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const [review, setReview] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  return (
    <AppContext.Provider
      value={{
        searchInput,
        setSearchInput,
        fetchedBooks,
        setFetchedBooks,
        books,
        setBooks,
        isLiked,
        setIsLiked,
        isBookmarked,
        setIsBookmarked,
        review,
        setReview,
        refreshing,
        setRefreshing,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};

import React, { createContext, useState, useContext, ReactNode } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [searchInput, setSearchInput] = useState("");
  const [fetchedBooks, setFetchedBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [review, setReview] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [reviewBtnIsPressed, setReviewBtnIsPressed] = useState(false);
  const [statisticsData, setStatisticsData] = useState(null);

  return (
    <AppContext.Provider
      value={{
        searchInput,
        setSearchInput,
        fetchedBooks,
        setFetchedBooks,
        books,
        setBooks,
        review,
        setReview,
        refreshing,
        setRefreshing,
        reviewBtnIsPressed,
        setReviewBtnIsPressed,
        statisticsData,
        setStatisticsData,
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

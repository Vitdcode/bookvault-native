import Constants from "expo-constants";

const handleFetch = async (query) => {
  if (!query) return [];
  const apiKey = Constants.expoConfig.extra.EXPO_PUBLIC_API_KEY;
  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=20&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return (
      data.items
        ?.filter((item) => {
          const info = item.volumeInfo;

          return (
            info.description && info.imageLinks?.thumbnail && info.title && info.authors?.length > 0
          );
        })
        .map((item) => {
          const bookData = item.volumeInfo;
          return {
            googleBooksId: item.id,
            title: bookData.title || "No Title Available",
            coverUrl: bookData.imageLinks?.thumbnail || "No image available",
            description: bookData.description || "No dews",
            authors: bookData.authors || ["No atuthor available"],
            pageCount: bookData.pageCount || 0,
            publishedDate: bookData.publishedDate || "No data available",
            rating: null,
            review: "",
            isFavorite: false,
            isBookmarked: false,
            isCompleted: false,
            yearCompleted: "",
          };
        }) || []
    );
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error; // Let components handle the error
  }
};

export default handleFetch;

import fetchBooksPi from "./fetchBookDataPi";

const onRefresh = async (setBooks, setRefreshing) => {
  setRefreshing(true); // Show the refresh spinner
  await fetchBooksPi(setBooks); // Re-fetch the data
  setRefreshing(false); // Hide the spinner
};

export default onRefresh;

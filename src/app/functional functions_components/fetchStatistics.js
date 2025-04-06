import bookApis from "../../../api";

const fetchStatistics = async (setStatisticsData) => {
  try {
    const jsonResponse = await bookApis.getStatisticsData();
    setStatisticsData(jsonResponse);
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error; // Let components handle the error
  }
};

export default fetchStatistics;

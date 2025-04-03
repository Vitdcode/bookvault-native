const bookApis = {
  apiUrl: process.env.EXPO_PUBLIC_API_URL,
  insertBook: async (book) => {
    if (Object.keys(book).length === 0) return;
    try {
      const response = await fetch(`${bookApis.apiUrl}/books/addbook`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });
      response;
      bookApis.errorResponse(response);
      return await response.json();
    } catch (error) {
      console.error("Error inserting book:", error.message);
      throw error; // Re-throw the error so the caller can handle it
    }
  },

  deleteBook: async (id) => {
    if (!id) return;
    try {
      const response = await fetch(`${bookApis.apiUrl}/books/${id}`, {
        method: "DELETE",
      });
      response;
      bookApis.errorResponse(response);
      return await response.json();
    } catch (error) {
      if (error) {
        console.error(error);
      }
    }
  },

  fetchBooks: async () => {
    console.log(bookApis.apiUrl);
    try {
      const response = await fetch(`${bookApis.apiUrl}/books`);
      bookApis.errorResponse(response);
      return await response.json(); // Return the list of books
    } catch (error) {
      console.error("Error fetching books:", error.message);
      throw error;
    }
  },

  updateProperty: async (id, property, content = null) => {
    try {
      const response = await fetch(`${bookApis.apiUrl}/books/updateProperty`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id, property: property, content }),
      });
      bookApis.errorResponse(response);
    } catch (error) {
      console.error("Error patching property", property, error);
    }
  },

  getStatisticsData: async () => {
    try {
      const response = await fetch(`${bookApis.apiUrl}/books/statisticsData`);
      bookApis.errorResponse(response);
      return await response.json();
    } catch (error) {
      console.error("Error fetching count:", error.message);
      throw error;
    }
  },

  errorResponse: async (response) => {
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }
  },
};

export const themeApis = {
  apiUrl: process.env.EXPO_PUBLIC_API_URL,

  getTheme: async () => {
    try {
      const response = await fetch(`${themeApis.apiUrl}/theme`);
      themeApis.errorResponse(response);
      return await response.json();
    } catch (error) {
      console.error("Error fetching Theme", error);
      throw error;
    }
  },

  changeTheme: async (themeName) => {
    try {
      const response = await fetch(`${themeApis.apiUrl}/theme/changeTheme`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ themeName: themeName }),
      });
      themeApis.errorResponse(response);
    } catch (error) {
      console.error("Error fetching Theme", error);
      throw error;
    }
  },

  errorResponse: async (response) => {
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }
  },
};

export default bookApis;

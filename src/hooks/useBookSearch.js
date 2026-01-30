import { useEffect, useState } from "react";
const PAGE_SIZE = 10;


function useBookSearch(query, page) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!query) {
      setBooks([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    async function fetchBooks() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `https://openlibrary.org/search.json?q=${query}&page=${page}`,
          { signal: controller.signal }
        );

        const data = await res.json();
        const allBooks = Array.isArray(data.docs) ? data.docs : [];

// sirf 10 books dikhane ke liye
setBooks(allBooks.slice(0, PAGE_SIZE));

      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Network error. Please try again.");
          setBooks([]);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
    return () => controller.abort();
  }, [query, page, retryCount]);

  return {
    books,
    loading,
    error,
    retry: () => setRetryCount(c => c + 1),
  };
}

export default useBookSearch;

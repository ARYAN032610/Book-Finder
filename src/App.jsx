import { useEffect, useState } from "react";
import useBookSearch from "./hooks/useBookSearch";
import BookCard from "./components/BookCard";
import Pagination from "./components/Pagination";

function App() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [page, setPage] = useState(1);

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length >= 3) {
        setDebouncedQuery(query);
        setPage(1);
      } else {
        setDebouncedQuery("");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const { books, loading, error, retry } = useBookSearch(debouncedQuery, page);

  return (
    <div className="container">
      <h1>📚 BOOK FINDER</h1>

      <input
        type="text"
        placeholder="Search books..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Skeleton loader */}
      {loading &&
  Array.from({ length: 5 }).map((_, i) => (
    <div key={i} className="skeleton-card">
      <div className="skeleton-title"></div>
      <div className="skeleton-author"></div>
    </div>
  ))

}


      

      {/* Error + Retry */}
      {error && (
        <div>
          <p>{error}</p>
          <button onClick={retry}>Try Again</button>
        </div>
      )}

      {/* No results */}
      {!loading &&
        Array.isArray(books) &&
        books.length === 0 &&
        debouncedQuery && (
          <p>No Results Found</p>
        )}

      {/* Real book cards */}
      {!loading &&
        Array.isArray(books) &&
        
        books.length > 0 &&
        books.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}

      {/* Pagination */}
      {!loading &&
        Array.isArray(books) &&
        books.length > 0 && (
          <Pagination page={page} setPage={setPage} />
        )}
    </div>
  );
}

export default App;

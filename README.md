# Book Finder 📚

This is a simple React-based Book Finder application built using the Open Library API.  
The main goal of this project was to handle search efficiently and provide a smooth user experience while dealing with real-world API behavior.

---

## What this project does

- Lets users search for books by title
- Shows results in pages (10 books per page)
- Handles loading, errors, and empty results properly
- Avoids unnecessary API calls while typing

---

## Key Features

- **Debounced Search**  
  API calls are triggered only after the user stops typing for a short time (500ms).

- **Pagination**  
  Only 10 books are shown on one page.  
  Users can move between pages using Next and Previous buttons.

- **Skeleton Loader**  
  While data is being fetched, skeleton cards are shown instead of a blank screen.

- **Race Condition Handling**  
  If the user types quickly or switches pages, old API requests are cancelled using `AbortController`.

- **Error Handling with Retry**  
  If a network error occurs, an error message is shown with a retry option.

- **Empty State Handling**  
  Displays a clear message when no results are found.

---

## Tech Stack

- React (Vite)
- JavaScript
- Open Library API
- CSS (no external UI library)

---

## Folder Structure
src/
├── components/
│ ├── BookCard.jsx
│ └── Pagination.jsx
├── hooks/
│ └── useBookSearch.js
├── App.jsx
├── main.jsx
└── index.css

---

## How the app works

1. User types a search query (minimum 3 characters).
2. Input is debounced to avoid excessive API calls.
3. Data is fetched from the Open Library API.
4. Skeleton loader is displayed while fetching.
5. Results are shown with pagination (10 items per page).
6. Errors and empty results are handled gracefully.

---

## Run the project locally

```bash
npm install
npm run dev
Then open:http://localhost:5174/
Live Demo:- 


Author
Aryan Mishra
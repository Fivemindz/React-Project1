import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Book from './Book';
import * as BooksAPI from "./BooksAPI";

const SearchPage = () => {

  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [showBooks, setShowBooks] = useState(false)
  
  useEffect(() => {

    const getSearchResults = async () => {
      const res = await BooksAPI.search(query);
      if (res.error === 'empty query') {
        setShowBooks(false)
        setBooks([])
      } else {
        setBooks(res)
        setShowBooks(true)
      }
    }

    if (query.length !== 0) {
      getSearchResults();
    } else {
      setShowBooks(false)
      setBooks([])
    }
    
    return setShowBooks(false);
    
    
  },[query])

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/" >Close</Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {showBooks && books.map((book) => (
            <li key={book.id}>
              <Book book={book} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default SearchPage
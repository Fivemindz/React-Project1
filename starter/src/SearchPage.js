import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Book from './Book';
import * as BooksAPI from "./BooksAPI";

const SearchPage = () => {

  const [books, setBooks] = useState([]);

  // useEffect(() => {
  //   console.log(books)
  // })
  
  const getSearchResults = async (query) => {     
    const res = BooksAPI.search(query)
    if (res.error !== 'empty query' && res !== undefined) {
      setBooks(res)
    } else {
      setBooks([])
    }
  }
  
  const updateQuery = async (e) => {
    const query = e.target.value
    if (query) {
      getSearchResults(query)
    } else {
      setBooks([])
    }
  }

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/" >Close</Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={(e) => updateQuery(e)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {books.map((book) => (
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
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Book from './Book';
import * as BooksAPI from "./BooksAPI";

const SearchPage = () => {

  const [books, setBooks] = useState();

  const navigate = useNavigate();

  const searchBooks = async (query) => { 
    const res = await BooksAPI.search(query.toLowerCase())
    setBooks(res);
  };



  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/" >Close</Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={(e) => searchBooks(e.target.value)}
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
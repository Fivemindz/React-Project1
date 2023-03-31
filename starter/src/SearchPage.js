import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from "./BooksAPI";

const SearchPage = () => {

  const [books, setBooks] = useState([]);
  const queryString = useRef();
    
  const updateShelves = async (queryBooks) => {
    let shelvedBooksIdArray = [];
    let queryBooksIdArray = [];
    
    const shelvedBooks = await BooksAPI.getAll();

    shelvedBooks.forEach((book) => {shelvedBooksIdArray.push(book.id)});
    queryBooks.forEach((book) => {queryBooksIdArray.push(book.id)});
    
    let x = 0;

    queryBooksIdArray.forEach((bookId) => {
      const bookIndex = shelvedBooksIdArray.indexOf(bookId);

      if(bookIndex !== -1) {
        queryBooks[x].shelf = shelvedBooks[bookIndex].shelf;
      } else {
        queryBooks[x].shelf = 'none';
      };

      x++;
    })
  };

  const getSearchResults = async (query) => {     
    const queryBooks = await BooksAPI.search(query);
    
    if (queryBooks.error !== 'empty query' && queryBooks !== undefined) {
      await updateShelves(queryBooks);
      setBooks(queryBooks);
    } else {
      setBooks([]);
    }
  };
  
  const updateQuery = async (e) => {
    const query = e.target.value
    if (query) {
      getSearchResults(query);
    } else {
      setBooks([]);
    }
  };

  const updateBook = async (book, shelf) => {
    await BooksAPI.update(book, shelf);
    getSearchResults(queryString.current.value);
  }

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/" >Close</Link>
        <div className="search-books-input-wrapper">
          <input
            ref={queryString}
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
              <Book book={book} updateBook={updateBook}/>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default SearchPage;
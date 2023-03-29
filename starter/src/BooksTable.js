import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'

const BooksTable = () => {
  
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks =  async () => {
      const res =  await BooksAPI.getAll();
      setBooks(res);
    };

    getBooks();
  }, [books]);

  const current = books.filter((book) => (
    book.shelf === "currentlyReading"
  ));

  const want = books.filter((book) => (
    book.shelf === "wantToRead"
  ));

  const read = books.filter((book) => (
    book.shelf === "read"
  ));    
  
  const updateBook = async (book, shelf) => {
    BooksAPI.update(book, shelf);
    const res = await BooksAPI.getAll();
    setBooks(res);
  };


  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf books={current} title={"Currently Reading"} updateBook={updateBook}/>
          <BookShelf books={want} title={"Want To Read"} updateBook={updateBook} />
          <BookShelf books={read} title={"Read"} updateBook={updateBook} />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search" className='close-search'>Add a Book</Link>
      </div>
    </div>
  )
}

export default BooksTable
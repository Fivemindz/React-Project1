import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'

const BooksTable = () => {
  
  const [books, setBooks] = useState([]);
  const [active, setActive] = useState(true);
  const categories = ["currentlyReading", "wantToRead", "read"]
  
  useEffect( () => {

    const getData = async () => {
      const res = await BooksAPI.getAll();
      setBooks(res);      
    };

    if(active) {
      getData();
    }    
    
    console.log('rerender')

    return () => {
      setActive(false)
    }
    
  },[active]);
  
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
          {categories.map(cat => (
            <BookShelf key={cat} shelf={cat} books={books.filter(book => book.shelf === cat)} updateBook={updateBook}/>
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search" className='close-search'>Add a Book</Link>
      </div>
    </div>
  )
}

export default BooksTable
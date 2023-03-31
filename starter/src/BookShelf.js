import React from 'react'
import Book from './Book'

const BookShelf = ({ shelf, books, updateBook }) => {

  const bookShelves = {
    "currentlyReading" : "Currently Reading",
    "wantToRead" : "Want To Read",
    "read" : "Read"
  }
  
  return (
    <div>      
      <div className="bookshelf">
        <h2 className="bookshelf-title">{bookShelves[shelf]}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id}>
                <Book book={book} updateBook={updateBook} />
              </li>
            ))}  
          </ol>
        </div>
      </div>
    </div>
  )
}

export default BookShelf
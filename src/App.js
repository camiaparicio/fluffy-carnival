import { useState, useEffect } from 'react';
import firebase from './firebase.js'

function App() {

  const [books, setBooks] = useState([]);
  const [userInput, setUserInput] = useState ('');

  const handleChange = (event) => {
    // console.log(event.target.value);

    // tell react to update our userInpit state to equal whatever the user types in 
    setUserInput(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const dbRef = firebase.database().ref();
    
    dbRef.push(userInput);

    setUserInput('');
  }

  useEffect( () => {
    // make reference to our database 
    // direct reference to our data firebase INSIDE our JavaScript
    const dbRef = firebase.database().ref();

    // add the event listener to watch for any changes to our database
    dbRef.on('value', (response) => {

      // variable to store new state
      const newState = [];

      const data = response.val();

      // iterate through the data object
      for (let property in data) {
        // push each book name into the new array
        newState.push ({
          bookTitle: data[property],
          bookId: property
        });
      }

      setBooks(newState);

    })

  }, [] )

  const removeBook = (whatToRemove) => {
    // get access to our database
    const dbRef = firebase.database().ref();
    // use a new firebase method to remove an item
    dbRef.child(whatToRemove).remove();
  }

  return (
    <div className="App">
      <h1>Bootcamp Bookshelf</h1>
      <ul>
        {
          books.map( (book) => {
            return (
              <li key={book.bookID}>
                <p>{book.bookTitle}</p>
                <button onClick={ () => removeBook(book.bookID) }>Remove</button>
              </li>
            )
          })
        }
      </ul>

      {/* this adds the form */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="newBook">Add a new book to your shelf!</label>
        <input 
        id="newBook" 
        type="text" 
        value={userInput} 
        onChange={handleChange} />
        <button>Add Book</button>
      </form>

    </div>
  );
}

export default App;

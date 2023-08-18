import React, { useEffect, useState } from 'react'
import NotesList from './Components/NotesList';
import { nanoid } from 'nanoid';
import Search from './Components/Search';
import Header from './Components/Header';

function App() {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "This is my first react note!",
      date: "8/10/2023"
    },
    {
      id: nanoid(),
      text: "This is my second react note!",
      date: "8/11/2023"
    },
    {
      id: nanoid(),
      text: "This is my third react note!",
      date: "8/12/2023"
    },
    {
      id: nanoid(),
      text: "This is my fourth react note!",
      date: "8/13/2023"
    },
    {
      id: nanoid(),
      text: "This is my fifth react note!",
      date: "8/14/2023"
    },
    {
      id: nanoid(),
      text: "This is my sixth react note!",
      date: "8/15/2023"
    },
    {
      id: nanoid(),
      text: "Ooh! Another note!",
      date: "8/16/2023"
    }
  ]);

  const [searchText, setSearchText] = useState('');

  const [darkMode, setDarkMode] = useState(false);
  //retrieving any notes saved to the local storage when app uploads
  useEffect(() => {
    const savedNotes = JSON.parse(
      localStorage.getItem('react-notes-app-data')
    );

    if(savedNotes){
      setNotes(savedNotes);
    }
  }, []);
  //saving notes to the local storage anytime the notes change
  useEffect(() => {
    localStorage.setItem('react-notes-app-data', 
     JSON.stringify(notes)
    );
  }, [notes]);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString()
    }
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  }

  const deleteNote =(id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  }

  return (
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className='container'>
      <Header handleToggleDarkMode={setDarkMode}/> 
      <Search handleSearchNote = {setSearchText}/>
      <NotesList 
        notes = {notes.filter((note) => 
          note.text.toLowerCase().includes(searchText)
          )} 
        handleAddNote = {addNote}
        handleDeleteNote = {deleteNote}
      />
      </div>
    </div>
  )
}

export default App;

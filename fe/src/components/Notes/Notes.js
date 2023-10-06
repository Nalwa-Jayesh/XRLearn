import React, { useState } from 'react';
import NotesContainer from './NotesContainer';
import NewNote from './NewNote';
import "./Notes.css";

const Notes = () => {

  const [ activeTab, setActiveTab ] = useState('notes');

  const addNoteHandle = () => {
    setActiveTab('new')
  }

  const allNotesHandle = () => {
    setActiveTab('notes')
  }

  return (
    <div className='notes__page__wrapper'>
      <h3>Notes</h3>
      <div className='notes__page__btn__wrapper'>
        <button onClick={allNotesHandle} className='button-33'>ALL NOTES</button>
        <button onClick={addNoteHandle} className='button-33'>NEW NOTE</button>
      </div>
      <div>
        {activeTab === 'notes' ? (
          <NotesContainer />) : 
          (
            <NewNote />
          )
        }
      </div>
    </div>
  )
}

export default Notes
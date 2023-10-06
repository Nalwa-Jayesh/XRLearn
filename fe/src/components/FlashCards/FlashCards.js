import React, { useState} from 'react';
import ObjectDetector from './ObjectDetector';
import FlashCardsContainer from './FlashCardsContainer';

const FlashCards = () => {

  const [ activeTab, setActiveTab ] = useState('cards');

  const showCardsHandle = () => {
    setActiveTab('cards')
  }

  const addCardsHandle = () => {
    setActiveTab('cam')
  }

  return (
    <div className='notes__page__wrapper' style={{overflowY: "auto"}}>
      <h1>Flash Cards</h1>
      <div className='notes__page__btn__wrapper'>
        <button onClick={showCardsHandle} className='button-33'>FLASHCARDS</button>
        <button onClick={addCardsHandle} className='button-33'>NEW CARD</button>
      </div>
      { activeTab === "cards" ? (
        <FlashCardsContainer />
      ) : (
        <ObjectDetector />
      )}
    </div>
  )
}

export default FlashCards
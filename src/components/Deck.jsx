import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

function CardGame() {
  const [deckData, setDeckData] = useState(null);
  const [drawnCards, setDrawnCards] = useState([]);
  const [isShufflingInProgress, setIsShufflingInProgress] = useState(false);
  const [isDeckEmpty, setIsDeckEmpty] = useState(false)
  useEffect(() => {
    async function initializeDeck() {
      const response = await axios.get(`${API_BASE_URL}/new/shuffle/`);
      setDeckData(response.data);
    }
    initializeDeck();
  }, []);


  async function handleCardDraw() {
    const response = await axios.get(`${API_BASE_URL}/${deckData.deck_id}/draw/`)
    if (response.data.success === false) {
      
      setIsDeckEmpty(true)
      return;
    }

    const card = response.data.cards[0];
    setDrawnCards((previousCards) => 
      [...previousCards, 
        {
          id: card.code,
          name: `${card.suit} ${card.value}`,
          image: card.image
      },
    ])

  }

  async function handleDeckShuffle() {
    setIsShufflingInProgress(true);
    await axios.get(`${API_BASE_URL}/${deckData.deck_id}/shuffle/`);
    setDrawnCards([]);
    setIsDeckEmpty(false);
    setIsShufflingInProgress(false);
  }

  function renderDrawButton() {
    if (!deckData) return null;
   
    return (
      <button
        onClick={handleCardDraw}
        disabled={isShufflingInProgress || isDeckEmpty}
      >
        Draw a Card
      </button>
    );
  }

  function renderShuffleButton() {
    if (!deckData) return null;
    

    return (
      <button
        onClick={handleDeckShuffle}
        disabled={isShufflingInProgress}
      >
        Shuffle Deck
      </button>
    );
  }

  return (
    <main>
      {renderDrawButton()}
      {renderShuffleButton()}

      {isDeckEmpty && <p>There are no cards left in the deck. Please shuffle to continue..</p>}

      <div>
        {drawnCards.map((card) => (
          <Card key={card.id} name={card.name} image={card.image} />
        ))}
      </div>
    </main>
  );
}

export default CardGame;

import React, { useState, useEffect} from 'react';
import Card from './Card';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios';

const FlashCardsContainer = () => {

    const [cards, setCards] = useState([]);

    const { user } = useAuthContext()

    useEffect(() => {
		async function fetchAllCards() {
			try{
				if(user) {
                    const config = {
                        headers : {
                            Authorization : user.accessToken
                        }
                    }
					const response = await axios.get(`http://localhost:4040/api/cards/all`, config)
					const data = response.data
					setCards(data.result)
				}
			}
			catch(error) {
				console.log(error)
			}
		}

		fetchAllCards()
	}, [user, cards])

  return (
    <div style={{marginTop: "1rem"}}>
        <div className="Home-container">
  {cards?.length > 0 ? (
    cards.map((card) => (
      <Card key={card._id} id={card._id} name={card.name} imageUrl={card.imageUrl} />
    ))
  ) : (
    <h1>No cards Present</h1>
  )}
</div>

    </div>
  )
}

export default FlashCardsContainer
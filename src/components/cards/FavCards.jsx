import { useState } from "react"
import { MyContext } from "../../App";
import { useContext } from "react";
import { useEffect } from "react";
import "./card.css";
export default function GetFavCards() {
    const [cards, setCards] = useState([]);

    const { snackbar, setIsLoader, setUser, user, search, setSearch, token, detoken } = useContext(MyContext);
    const getCards = async () => {
        setIsLoader(true);

        const res = await fetch('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards');
        if (res.ok) {
            const data = await res.json();
            const favorites = data.filter(card =>
                card.likes.includes(detoken._id)
            );

            const updated = favorites.map(card => ({
                ...card,
                favorite: true,
            }));

            setCards(updated);
        } else {
            snackbar("שגיאה בקבלת כרטיסים מועדפים");
        }

        setIsLoader(false);
    }
    const handleFavorite = async (id) => {
        const res = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`, {
            headers: {
                'x-auth-token': token,  // <-- send the token here
            },
            method: 'PATCH',
        });
        if (res.ok) {
            getCards();
            snackbar("מחקת/הוספת את הכרטיס ממיעודפים שלך");
        }
        else {
            snackbar("הפעולה נכשלה");
        }
    }
    useEffect(() => {
        getCards();
    }, []);
    function filterCards(card, search) {
        if (search !== null && search != "")
            return card.title.toLowerCase().includes(search?.toLowerCase()) ||
                card.description.toLowerCase().includes(search?.toLowerCase());
        else return true;
    }
    const filteredCards = cards.filter(card => filterCards(card, search));
    return (
        <div className="Cards">
            <h1>Cards Page</h1>
            <h2>Here you can find all your favorite busincess cards</h2>
            <hr />
            <div className="CardsContainer">
                {
                    filteredCards.map((card, i) =>
                        <div key={card._id} id={card._id}>
                            <div className="cardImage">
                                <img src={card.image.url} alt={card.image.alt} />
                            </div>
                            <li className="CardList">
                                <h3>{card.title}</h3>
                                <p>{card.description}</p>
                                <hr />
                                <span>Phone:{card.phone}</span>
                                <span>Address: {card.address.street} {card.address.houseNumber} {card.address.city} {card.address.state} {card.address.zip} {card.address.country}</span>
                                <span>Card Number:{card.bizNumber}</span>
                                <a href={`tel:${card.phone}`}>
                                    <i className="fas fa-phone"></i>
                                </a>
                                {
                                    user && <i
                                        className={`fas fa-heart ${card.favorite ? 'fav' : ''}`}
                                        onClick={() => handleFavorite(card._id)}
                                        style={{ cursor: 'pointer', marginLeft: '10px' }}
                                    ></i>
                                }
                            </li>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

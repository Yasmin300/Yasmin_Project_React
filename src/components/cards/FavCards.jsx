import { useState } from "react"
import { MyContext } from "../../App";
import { useContext } from "react";
import { useEffect } from "react";
import "./card.css";
import Pagination from "../pagination/Pagination";
export default function GetFavCards() {
    const [cards, setCards] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const cardPerPage = 15;
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
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
            snackbar("שגיאה בקבלת כרטיסים מועדפים", "error");
        }

        setIsLoader(false);
    }
    const handleFavorite = async (id) => {
        const res = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`, {
            headers: {
                'x-auth-token': token,
            },
            method: 'PATCH',
        });
        if (res.ok) {
            getCards();
            snackbar("מחקת/הוספת את הכרטיס ממיעודפים שלך", "success");
        }
        else {
            snackbar("הפעולה נכשלה", "error");
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
    useEffect(() => {
        if (search !== null && search !== "") {
            setCurrentPage(1);
        }
    }, [search]);

    const filteredCards = cards.filter(card => filterCards(card, search));
    const indexOfLastCard = currentPage * cardPerPage;
    const indexOfFirstCard = indexOfLastCard - cardPerPage;
    const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);
    return (
        <div className="Cards">
            <h1>Cards Page</h1>
            <h2>Here you can find all your favorite busincess cards</h2>
            <hr />
            <div className="CardsContainer">
                {
                    currentCards.map((card, i) =>
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
            <Pagination
                currentPage={currentPage}
                totalItems={filteredCards.length}
                itemsPerPage={cardPerPage}
                onPageChange={paginate}
            />
        </div>
    )
}

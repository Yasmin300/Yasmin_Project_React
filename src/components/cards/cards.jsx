import { useState } from "react"
import { MyContext } from "../../App";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../pagination/Pagination";
import "./card.css";
import "./cardHeader.css";
export default function GetCards() {
    const [cards, setCards] = useState([]);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const cardPerPage = 15;
    const { snackbar, setIsLoader, setUser, user, search, setSearch, token, detoken } = useContext(MyContext);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const getCards = async () => {
        const res = await fetch('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards', {
            method: 'GET',
        });
        if (res.ok) {
            const data = await res.json();
            const updated = data.map(card => ({
                ...card,
                favorite: user && card.likes.includes(detoken._id)
            }));

            setCards(updated);
        }

        setIsLoader(false);
    }
    const handleClick = (id) => {
        navigate(`/explainCard/${id}`);
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

    useEffect(() => {
        if (search !== null && search !== "") {
            setCurrentPage(1);
        }
    }, [search]);

    function filterCards(card, search) {
        if (search !== null && search != "")
            return card.title.toLowerCase().includes(search?.toLowerCase()) ||
                card.description.toLowerCase().includes(search?.toLowerCase());
        else return true;
    }
    const filteredCards = cards.filter(card => filterCards(card, search));
    const indexOfLastCard = currentPage * cardPerPage;
    const indexOfFirstCard = indexOfLastCard - cardPerPage;
    const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);
    return (
        <div className="Cards">
            <div className="cardsHeader">
                <h1>Welcome to the Business Card Hub</h1>
                <p>Discover professional business cards from all industries, all in one place.</p>
                <p><strong>Want to save your favorite cards?</strong> Create a free account and start building your personal collection of business contacts!</p>
                {
                    !user &&
                    <div className="registerPrompt">
                        <p>⭐ <strong>Register now</strong> to access features like:</p>
                        <ul>
                            <li>❤️ Marking and saving your favorite cards</li>
                            <li>🗂️ Easy access to your saved professionals</li>
                            <li>🔒 Personalized and secure experience</li>
                        </ul>
                        <button onClick={() => navigate('/register')} className="registerButton">Create Free Account</button>
                    </div>
                }
                <hr />
            </div>
            <hr />
            <div className="CardsContainer">
                {
                    currentCards.map((card, i) =>
                        <div key={card._id} id={card._id} onClick={() => { handleClick(card._id) }}>
                            <div className="cardImage">
                                <img src={card.image.url} alt={card.image.alt} />
                            </div>
                            <li className="CardList">
                                <h3>{card.title}</h3>
                                <p>{card.description}</p>
                                <hr />
                                <span>Phone:{card.phone}</span>
                                <span>Address:{card.address.street} , {card.address.houseNumber} , {card.address.city} , {card.address.state} , {card.address.zip} , {card.address.country}</span>
                                <span>Card Number:{card.bizNumber}</span>
                                <a href={`tel:${card.phone}`} onClick={(e) => e.stopPropagation()}>
                                    <i className="fas fa-phone"></i>
                                </a>
                                {
                                    detoken && <i
                                        className={`fas fa-heart ${card.favorite ? 'fav' : ''}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleFavorite(card._id);
                                        }}
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
        </div >
    )
}

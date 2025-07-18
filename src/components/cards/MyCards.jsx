import { useState } from "react"
import { MyContext } from "../../App";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./card.css";
import Pagination from "../pagination/Pagination";
export default function MyCards() {
    const [cards, setCards] = useState([]);
    const navigate = useNavigate();
    const { snackbar, setIsLoader, user, setSnackbarType, setLoaderType, search, token, detoken } = useContext(MyContext);
    const [currentPage, setCurrentPage] = useState(1);
    const cardPerPage = 15;
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const getCards = async () => {
        const res = await fetch('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards', {
            method: 'GET',
            headers: {
                'x-auth-token': token,
                'Content-Type': 'application/json'
            }
        });
        if (res.ok) {
            const data = await res.json();
            const updated = data.map(card => ({
                ...card,
                favorite: user && card.likes.includes(detoken._id)
            }));
            setCards(updated);
        }
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

    const handleEdit = (id) => {
        console.log("Edit card with id:", id);
        navigate(`/editCard/${id}`);
    };
    const addCard = () => {
        navigate('/addCard');
    }
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this card?")) return;
        setIsLoader(true);
        try {
            const res = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`, {
                headers: {
                    'x-auth-token': token,
                },
                method: 'DELETE',
            });

            if (res.ok) {
                snackbar("מחקת את הכרטיס בהצלחה", "success");
                await getCards();
            } else {
                snackbar("מחיקת הכרטיס נכשלה", "error");
            }

        } catch (err) {
            console.error("Delete error:", err);
            snackbar("שגיאה בעת מחיקת הכרטיס", "error");
        } finally {
            setIsLoader(false);
        }
    };
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
            <h1>My Cards Page</h1>
            <h2>Here you can find all your busincess cards</h2>
            <hr />
            <div className="CardsContainer">
                {
                    currentCards.map((card, i) =>
                        <div key={card._id} id={card._id}>
                            <div className="cardImage">
                                <img src={card.image.url} alt={card.image.alt} />
                            </div>
                            <div className="CardList">
                                <h3>{card.title}</h3>
                                <p>{card.description}</p>
                                <hr />
                                <span>Phone: {card.phone}</span>
                                <span>Address: {card.address.street} {card.address.houseNumber} {card.address.city} {card.address.state} {card.address.zip} {card.address.country}</span>
                                <span>Card Number:{card.bizNumber}</span>
                                <a href={`tel:${card.phone}`}>
                                    <i className="fas fa-phone"></i>
                                </a>
                                {
                                    detoken && <i
                                        className={`fas fa-heart ${card.favorite ? 'fav' : ''}`}
                                        onClick={() => handleFavorite(card._id)}
                                        style={{ cursor: 'pointer', marginLeft: '10px' }}
                                    ></i>
                                }
                                {detoken && (detoken?.isBusiness || detoken?.isAdmin) && (
                                    <div style={{ display: 'flex', gap: '10px', marginLeft: '10px' }}>
                                        <i
                                            className="fas fa-edit"
                                            onClick={() => handleEdit(card._id)}
                                            style={{ cursor: 'pointer', color: '#007bff' }}
                                        ></i>

                                        <i
                                            className="fas fa-trash"
                                            onClick={() => handleDelete(card._id)}
                                            style={{ cursor: 'pointer', color: '#dc3545' }}
                                        ></i>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                }
            </div>
            {detoken && (detoken?.isBusiness || detoken?.isAdmin) && (
                <button className="plus-button" onClick={addCard}>
                    +
                </button>
            )}
            <Pagination
                currentPage={currentPage}
                totalItems={filteredCards.length}
                itemsPerPage={cardPerPage}
                onPageChange={paginate}
            />
        </div>
    )
}

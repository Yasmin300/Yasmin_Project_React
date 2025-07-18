import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MyContext } from "../../App";
import "./ShowCard.css"; // Create styling here

export default function ShowCard() {
    const { cardId } = useParams();
    const [card, setCard] = useState({});
    const { snackbar, setIsLoader, user, detoken, token } = useContext(MyContext);

    const getCard = async id => {
        setIsLoader(true);
        try {
            const res = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`, {
                method: 'GET',
                redirect: 'follow'
            });

            if (!res.ok) {
                snackbar("לא ניתן לטעון את הכרטיס.", "error");
                setIsLoader(false);
                return;
            }

            const cardData = await res.json();
            const updatedCard = {
                ...cardData,
                favorite: user && cardData.likes.includes(detoken._id),
            };

            setCard(updatedCard);
        } catch (err) {
            snackbar("אירעה שגיאה בטעינת הכרטיס.", "error");
            console.error(err);
        } finally {
            setIsLoader(false);
        }
    };
    useEffect(() => {
        if (cardId) getCard(cardId);
    }, [cardId]);

    const fullAddress = `${card.address?.street || ''} ${card.address?.houseNumber || ''}, ${card.address?.city || ''}, ${card.address?.state || ''}, ${card.address?.zip || ''}, ${card.address?.country || ''}`;

    return (
        <div className="businessPage">
            <h1 className="businessTitle">{card.title}</h1>
            <h3 className="businessSubtitle">{card.subtitle}</h3>
            <div className="businessContent">
                <div className="businessImage">
                    <img src={card.image?.url} alt={card.image?.alt || 'Business Image'} />
                </div>
                <div className="businessDetails">
                    <p>{card.description}</p>
                    <p><strong>Created by:</strong> {card.user_id}</p>
                    <p><strong>Created on:</strong> {new Date(card.createdAt).toLocaleDateString()}</p>
                    <p><strong>Phone:</strong> <a href={`tel:${card.phone}`}>{card.phone}</a></p>
                    <p><strong>Email:</strong> <a href={`mailto:${card.email}`}>{card.email}</a></p>
                    <p><strong>Website:</strong> <a href={card.web} target="_blank" rel="noreferrer">{card.web}</a></p>
                    <p><strong>Address:</strong> {fullAddress}</p>
                    {user && (
                        <i
                            className={`fas fa-heart ${card.favorite ? "fav" : ""}`}
                            style={{ cursor: "pointer", marginTop: "10px", fontSize: "24px" }}
                        ></i>
                    )}
                </div>

            </div>

            {fullAddress && (
                <div className="mapContainer" style={{ marginTop: "30px" }}>
                    <h2>📍 Find Us on the Map</h2>
                    <iframe
                        title="Google Maps"
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`}
                    ></iframe>
                </div>
            )}
        </div>
    );
}

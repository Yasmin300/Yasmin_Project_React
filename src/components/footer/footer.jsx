import { MyContext } from "../../App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCircleInfo, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import './footer.css';
export default function Footer() {
    const { detoken } = useContext(MyContext);
    const navigate = useNavigate();

    return (
        <footer>
            <ul className="footerUl">
                <div className="IconsDiv" onClick={() => navigate('/about')}>
                    <FontAwesomeIcon
                        icon={faCircleInfo}
                        onClick={() => navigate('/about')}
                        className="icon-hover"
                        style={{ cursor: 'pointer', marginLeft: '10px' }}
                        title="About site"
                    />
                    <span>About</span>
                </div>

                {detoken && (
                    <div className="IconsDiv" onClick={() => navigate('/FavCards')}>
                        <FontAwesomeIcon
                            icon={faHeart}
                            onClick={() => navigate('/FavCards')}
                            className="icon-hover"
                            style={{ cursor: 'pointer', marginLeft: '10px' }}
                            title="Favorites"
                        />
                        <span>Favorite</span>
                    </div>

                )}

                {detoken && (detoken?.isBusiness || detoken?.isAdmin) && (
                    <div className="IconsDiv" onClick={() => navigate('/MyCards')}>
                        <FontAwesomeIcon
                            icon={faUserCircle}
                            onClick={() => navigate('/MyCards')}
                            className="icon-hover"
                            style={{ cursor: 'pointer', marginLeft: '10px' }}
                            title="My Business Cards"
                        />
                        <span>My Cards</span>
                    </div>
                )}

            </ul>
        </footer>
    )
}

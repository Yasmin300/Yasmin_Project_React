import { Link, useLocation } from "react-router-dom";
import { MyContext } from "../../App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

import './dark_nav.css'
import './light_nav.css'
import './nav.css'

export default function Navbar() {
    const path = useLocation().pathname;
    const { user, setUser, darkMode, setDarkMode, search, setSearch, token, detoken, setToken, setDetoken } = useContext(MyContext);
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState("");
    const [validImg, setValidImg] = useState("");
    const navbarRef = useRef();
    useEffect(() => {
        if (!user) {
            navigate('/');
            return;
        }
        if (!user.image || !user.image.url) return;
        const img = new Image();
        img.src = user.image.url;
        img.onload = () => setValidImg(true);
        img.onerror = () => setValidImg(false);

    }, [user]);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    const logout = () => {
        setUser(null);
        setToken(null);
        setDetoken(null);
        setSearch(null);        // 🔁 reset search if needed
        setValidImg(false);     // 🔁 clear old image state
        localStorage.removeItem('token');
        navigate('/');
    };

    const closeNavbar = () => {
        if (navbarRef.current && navbarRef.current.classList.contains('show')) {
            const collapseElement = new window.bootstrap.Collapse(navbarRef.current, {
                toggle: false,
            });
            collapseElement.hide();
        }
    };

    return (
        <nav className="navbar navbar-expand-lg px-4">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="mainNavbar" ref={navbarRef}>
                <div className="d-flex ham flex-column flex-lg-row justify-content-between w-100">

                    {/* LEFT SIDE nav items */}
                    <ul className="navbar-nav flex-column flex-lg-row">
                        <li className="nav-item">
                            <h3>
                                <Link to="/" className={`nav-link part1 ${path === '/' ? 'active' : ''}`} onClick={closeNavbar}>BCards</Link>
                            </h3>
                        </li>
                        <li className="nav-item">
                            <h3>
                                <Link to="/about" className={`nav-link part1 ${path === '/about' ? 'active' : ''}`} onClick={closeNavbar}>About Us</Link>
                            </h3>
                        </li>
                        {detoken && (
                            <li className="nav-item">
                                <h3>
                                    <Link to="/FavCards" className={`nav-link part1 ${path === '/FavCards' ? 'active' : ''}`} onClick={closeNavbar}>Fav Cards</Link>
                                </h3>
                            </li>
                        )}
                        {detoken?.isBusiness && (
                            <li className="nav-item">
                                <h3>
                                    <Link to="/MyCards" className={`nav-link part1 ${path === '/MyCards' ? 'active' : ''}`} onClick={closeNavbar}>My Cards</Link>
                                </h3>
                            </li>
                        )}
                        {detoken?.isAdmin && (
                            <li className="nav-item">
                                <h3>
                                    <Link to="/MyCards" className={`nav-link part1 ${path === '/MyCards' ? 'active' : ''}`} onClick={closeNavbar}>My Cards</Link>
                                </h3>
                            </li>
                        )}
                        {
                            detoken?.isAdmin && (
                                <li className="nav-item">
                                    <h3>
                                        <Link to="/admin" className={`nav-link part1 ${path === '/admin' ? 'active' : ''}`} onClick={closeNavbar}>SandBox</Link>
                                    </h3>
                                </li>
                            )
                        }
                    </ul>

                    {/* RIGHT SIDE nav items */}
                    <ul className="navbar-nav flex-column flex-lg-row align-items-lg-center mt-2 mt-lg-0">
                        <li className="nav-item d-flex align-items-center mb-2 mb-lg-0 searchCon">
                            <FontAwesomeIcon icon={faMagnifyingGlass} onClick={() => { closeNavbar(); setSearch(searchInput); }} className="searchIcon" />
                            <input type="search" className="form-control me-2 searchInput" placeholder="Search Cards" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    closeNavbar();
                                    setSearch(searchInput);
                                }
                            }} />
                        </li>
                        <li className="nav-item ">
                            <button onClick={toggleDarkMode} className=" nav-link">
                                {darkMode && (<FontAwesomeIcon icon={faSun} className="secPart toggle" onClick={closeNavbar} />
                                )}
                                {!darkMode && (<FontAwesomeIcon icon={faMoon} className="secPart toggle" onClick={closeNavbar} />
                                )}
                            </button>
                        </li>

                        {!detoken && (
                            <>
                                <li className="nav-item">
                                    <Link to="/register" className={`nav-link ${path === '/register' ? 'active' : ''} secPart`} onClick={closeNavbar}>Register</Link>
                                </li>
                                <li className="nav-item ">
                                    <Link to="/Login" className={`nav-link ${path === '/Login' ? 'active' : ''} secPart`} onClick={closeNavbar}>Login</Link>
                                </li>
                            </>
                        )}
                        {detoken && (
                            <li className="nav-item">
                                <div className="user-menu nav-link">
                                    {console.log(user)}
                                    {console.log(" valis")}
                                    {console.log(validImg)}

                                    {validImg && (<img src={user.image.url} alt={user.image.alt} className="imgAccount" />)}
                                    {!validImg && (<FontAwesomeIcon icon={faUser} />)}

                                    <div className="dropdown">
                                        <button onClick={() => { logout(); closeNavbar(); }} className="btn btn-link">
                                            <FontAwesomeIcon icon={faRightFromBracket} /> Logout
                                        </button>
                                        <button onClick={() => { navigate('Profile'); closeNavbar(); }} className="btn btn-link">
                                            <FontAwesomeIcon icon={faRightFromBracket} /> Edit Profile
                                        </button>
                                    </div>

                                </div>
                            </li>
                        )}
                    </ul>

                </div>
            </div>
        </nav>

    )
}

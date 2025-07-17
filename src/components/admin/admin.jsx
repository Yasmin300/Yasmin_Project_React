import { useState, useContext, useEffect } from "react";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import './AdminProfile.css';

export default function AdminProfile() {
    const [cards, setCards] = useState([]);
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    const navigate = useNavigate();
    const { snackbar, setIsLoader, token, detoken } = useContext(MyContext);

    const getCards = async () => {
        const res = await fetch('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards');
        if (res.ok) {
            const data = await res.json();
            setCards(data);
        }
        setIsLoader(false);
    };
    const getUsers = async () => {
        const res = await fetch('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users', {
            headers: { 'x-auth-token': token },
        });
        if (res.ok) {
            const data = await res.json();
            setUsers(data);
        }
        setIsLoader(false);
    };
    const deleteCard = async (id) => {
        try {
            const res = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`, {
                headers: { 'x-auth-token': token },
                method: 'DELETE',
            });
            if (res.ok) {
                snackbar("מחקת את הכרטיס בהצלחה");
                await getCards();
            } else {
                snackbar("מחיקת הכרטיס נכשלה");
            }
        } catch (err) {
            console.error("Delete error:", err);
            snackbar("שגיאה בעת מחיקת הכרטיס");
        } finally {
            setIsLoader(false);
        }
    };
    const handleDeleteUser = async (id) => {
        setIsLoader(true);
        const userCards = cards.filter(card => card.user_id === id);
        for (const card of userCards) {
            await deleteCard(card._id);
        }
        const res = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${id}`, {
            method: 'DELETE',
            headers: { 'x-auth-token': token },
        });
        if (res.ok) {
            snackbar("מחקת את המשתמש והכרטיסים בהצלחה");
            await getUsers();
        } else {
            snackbar("מחיקת המשתמש נכשלה");
        }
        setIsLoader(false);
    };
    const changeStatus = async (id) => {
        const res = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${id}`, {
            method: 'PATCH',
            headers: { 'x-auth-token': token },
        });
        if (res.ok) {
            snackbar("סטטוס המשתמש שונה בהצלחה");
            await getUsers();
        } else {
            snackbar("שינוי הסטטוס נכשל");
        }
    };
    useEffect(() => {
        if (!detoken?.isAdmin) navigate('/');
        getUsers();
        getCards();
    }, []);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(users.length / usersPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const getVisiblePages = () => {
        const maxPagesAround = window.innerWidth < 576 ? 1 : 2;
        const start = Math.max(currentPage - maxPagesAround, 2);
        const end = Math.min(currentPage + maxPagesAround, totalPages - 1);
        const visible = [];
        for (let i = start; i <= end; i++) {
            visible.push(i);
        }
        return visible;
    };
    const visiblePages = getVisiblePages();
    return (
        <div className="TableUsers mt-5">
            <div className="text-center mb-4">
                <h1 className="fw-bold">Welcome Admin to the Business Card Hub</h1>
                <p className="text-muted">Manage users and their cards from here</p>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-hover align-middle text-center">
                    <thead className="table-dark">
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((user) => (
                            <tr key={user._id}>
                                <td data-label="Image">
                                    <img src={user.image?.url} alt={user.image?.alt} className="rounded-circle" width="60" height="60" />
                                </td>
                                <td data-label="Name">
                                    {user.name.first} {user.name.middle} {user.name.last}
                                </td>
                                <td data-label="Email">{user.email}</td>
                                <td data-label="Phone">{user.phone}</td>
                                <td data-label="Address">
                                    {user.address.street} {user.address.houseNumber}, {user.address.city}, {user.address.state}, {user.address.zip}, {user.address.country}
                                </td>
                                <td data-label="Status">
                                    {user.isAdmin ? "Admin" : user.isBusiness ? "Business" : "Regular"}
                                </td>
                                <td data-label="Actions">
                                    {!user.isAdmin && (
                                        <>
                                            <button className="btn btn-danger btn-sm me-2" title="Delete User" onClick={() => handleDeleteUser(user._id)}>
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                            <button className="btn btn-warning btn-sm" title="Toggle Status" onClick={() => changeStatus(user._id)}>
                                                <i className="fas fa-sync-alt"></i>
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <nav className="UserPag">
                <ul className="pagination justify-content-center flex-wrap">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => paginate(1)}>« First</button>
                    </li>
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => paginate(currentPage - 1)}>‹ Prev</button>
                    </li>
                    <li className={`page-item ${currentPage === 1 ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => paginate(1)}>1</button>
                    </li>
                    {visiblePages[0] > 2 && (
                        <li className="page-item disabled">
                            <span className="page-link">...</span>
                        </li>
                    )}
                    {visiblePages.map(num => (
                        <li key={num} className={`page-item ${currentPage === num ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => paginate(num)}>{num}</button>
                        </li>
                    ))}
                    {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                        <li className="page-item disabled">
                            <span className="page-link">...</span>
                        </li>
                    )}
                    {totalPages > 1 && (
                        <li className={`page-item ${currentPage === totalPages ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => paginate(totalPages)}>{totalPages}</button>
                        </li>
                    )}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => paginate(currentPage + 1)}>Next ›</button>
                    </li>
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => paginate(totalPages)}>Last »</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
import { useState, useContext, useEffect } from "react";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from "../pagination/Pagination";
import './AdminProfile.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function UserImage({ user }) {
    const [validImg, setValidImg] = useState(true);

    return user.image?.url && validImg ? (
        <img
            src={user.image.url}
            alt={user.image.alt}
            className="rounded-circle"
            width="60"
            height="60"
            onError={() => setValidImg(false)}
        />
    ) : (
        <FontAwesomeIcon icon={faUser} className="text-secondary" size="2x" />
    );
}


export default function AdminProfile() {
    const [cards, setCards] = useState([]);
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;
    const [validImg, setValidImg] = useState(true);

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
                snackbar("מחקת את הכרטיס בהצלחה", "success");
                await getCards();
            } else {
                snackbar("מחיקת הכרטיס נכשלה", "error");
            }
        } catch (err) {
            snackbar("שגיאה בעת מחיקת הכרטיס", "error");
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
            snackbar("מחקת את המשתמש והכרטיסים בהצלחה", "success");
            await getUsers();
        } else {
            snackbar("מחיקת המשתמש נכשלה", "error");
        }
        setIsLoader(false);
    };
    const changeStatus = async (id) => {
        const res = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${id}`, {
            method: 'PATCH',
            headers: { 'x-auth-token': token },
        });
        if (res.ok) {
            snackbar("סטטוס המשתמש שונה בהצלחה", "success");
            await getUsers();
        } else {
            snackbar("שינוי הסטטוס נכשל", "error");
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
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                                    <UserImage user={user} />
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
            <Pagination
                currentPage={currentPage}
                totalItems={users.length}
                itemsPerPage={usersPerPage}
                onPageChange={paginate}
            />
        </div>
    );
}
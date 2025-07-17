import { Routes, Route } from 'react-router-dom';
import FavCards from './components/cards/FavCards';
import Register from './components/register';
import Login from './components/Login';
import Cards from './components/cards/cards';
import MyCards from './components/cards/MyCards';
import ExplainCard from './components/cards/explainBusiness';
import About from './components/about';
import EditProfile from './components/profileEdit';
import Admin from './components/admin/admin';
import CardForm from './components/cards/CardForm';


export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Cards />} />
            <Route path="/MyCards" element={<MyCards />} />
            <Route path="/AddCard" element={<CardForm />} />
            <Route path="/register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/FavCards" element={<FavCards />} />
            <Route path="/about" element={<About />} />
            <Route path="/Profile" element={<EditProfile />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/editCard/:cardId" element={<CardForm />} />
            <Route path="/explainCard/:cardId" element={<ExplainCard />} />

        </Routes>
    );
}


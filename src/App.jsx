import { createContext, useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/register';
import Nav from './components/navigation/nav';
import Cards from './components/cards/cards';
import Router from './Router';
import Footer from './components/footer/footer'
export const MyContext = createContext();
import { jwtDecode } from 'jwt-decode';

function App() {
  const [isSnackbar, setIsSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [isLoader, setIsLoader] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [detoken, setDetoken] = useState(null);
  const [search, setSearch] = useState(null);
  const [snackbarType, setSnackbarType] = useState("");
  const [loaderType, setLoaderType] = useState("");
  const [darkMode, setDarkMode] = useState(false); // ✅ Added dark mode state

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    }
  }, [darkMode]);

  const snackbar = (text, type = "") => {
    setSnackbarText(text);
    setSnackbarType(type);
    setIsSnackbar(true);
    setTimeout(() => setIsSnackbar(false), 3000);
  };

  useEffect(() => {
    getLoginStatus();
  }, []);

  const getLoginStatus = async () => {
    const token = localStorage.getItem("token");

    if (!token) return;
    const decoded = jwtDecode(token);

    setDetoken({
      _id: decoded._id,
      isBusiness: decoded.isBusiness,
      isAdmin: decoded.isAdmin,
    });
    setToken(token);
    const user = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${decoded._id}`, {
      method: 'GET',
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json'
      }
    });
    if (!user.ok) {
      const err = await user.text();
      snackbar(err);
      return;
    }
    else {
      const users = await user.json();
      setUser(users);
    }
  };

  return (
    <MyContext.Provider value={{
      snackbar,
      setIsLoader,
      setUser,
      user,
      darkMode,
      setDarkMode,
      search, setSearch,
      token, setToken,
      detoken, setDetoken,
    }}>
      <div className="page-container">
        <div className="content-wrap">
          <Nav />
          <Router />
          {isLoader && <div className="loaderFrame"><div className={`loader ${loaderType}`}></div></div>}
          {isSnackbar && <div className={`snackbar ${snackbarType}`}>{snackbarText}</div>}
        </div>
        <Footer />
      </div>
    </MyContext.Provider>
  );
}

export default App;

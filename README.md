
# Yasmin Project React

🌐 Live Demo: [Yasmin_Project_React on GitHub Pages](https://yasmin300.github.io/Yasmin_Project_React/)

A full-featured React web application built using Vite, focusing on user authentication, card management, and business user functionality. This project is designed to simulate a business card app where users can register, log in, and manage their cards.

---

## 🚀 Features

- 🔐 **Authentication**: Secure login and registration using JWT.
- 👤 **User Roles**: Admin, Business, and Regular users with different permissions.
- 📝 **Card Management**:
  - Business users can create, edit, and delete cards.
  - All users can view and favorite cards.
- 🔎 **Search Functionality**: Live filtering of cards by title or subtitle.
- 🌓 **Dark Mode Toggle**: Switch between light and dark themes.
- 📱 **Responsive Design**: Mobile-first and responsive layout.
- 🧪 **Form Validation**: Built-in Joi validation for clean user input.

---

## 🛠️ Technologies Used

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Bootstrap](https://getbootstrap.com/)
- [Font Awesome](https://fontawesome.com/)
- [Joi](https://joi.dev/) for validation
- [jwt-decode](https://github.com/auth0/jwt-decode)

---

## 📂 Project Structure

```
Yasmin_Project_React/
│
├── public/               # Static assets
├── src/
│   ├── components/       # Shared components (Navbar, Footer, etc.)
│   │    ├─── pages/   # Page components (Home, Login, Register, etc.)
│   │    └── Form/          # Form-specific components and styles  
│   │ 
│   ├── App.jsx           # Main app and routing logic
│   └── main.jsx          # ReactDOM entry
├── vite.config.js        # Vite configuration
└── README.md
```

---

## 🚧 Installation & Development

### Clone the repo

```bash
git clone https://github.com/Yasmin300/Yasmin_Project_React.git
cd Yasmin_Project_React
```

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

---

## 📦 Deployment

This project is deployed using GitHub Pages via the `gh-pages` branch.

### To build and deploy:

```bash
npm run build
npm run deploy
```

Make sure your `vite.config.js` contains:

```js
export default defineConfig({
  base: '/Yasmin_Project_React/',
  plugins: [react()],
});
```

---

## 📌 Notes

- This project uses JWT-based authentication. Tokens are stored in `localStorage`.
- React Context is used for global state (user, loader, snackbar).
- The backend API is hosted at: `https://bcard-ojqa.onrender.com`

---

## 👤 Author

**Yasmin Mesari**  
📧 [LinkedIn](#) | [GitHub](https://github.com/Yasmin300)

---

## 📝 License

This project is licensed for educational and demo purposes only.

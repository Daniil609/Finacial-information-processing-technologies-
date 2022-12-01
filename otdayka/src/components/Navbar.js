// Navbar.js
import "../styles/navbar.css"

export default function Navbar() {
    return (
      <nav className="navigation">
        <a href="/" className="brand-name">
          ОтдайКа
        </a>
        <div
          className="navigation-menu">
          <ul>
            <li>
              <a href="/login">Вход</a>
            </li>
            <li>
              <a href="/signup">Регистрация</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
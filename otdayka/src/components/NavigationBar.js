// Navbar.js
import "../styles/navbar.css"
import "../styles/navigationBar.css"
import logo from '../img/logo_white.png'

export default function NavigationBar() {
    return (
      <nav className="navigation">
        <a href="/" className="brand-name">
          ОтдайКа
        </a>
        <div
          className="navigation-menu">
          <ul>
            <li style={{display:"flex", justifyContent: "center", alignItems: "center"}}>
              <a href="/login" >Подать объявление</a>
            </li>
            <li>
                <div class="dropdown">
                    <img class="avatar" src={logo} width="40px" height="40px"></img>
                    <div class="dropdown-content">
                        <a href="/account" onclick="route()">Профиль</a>
                        <a href="/settings" onclick="route()">Настройки</a>     
                        <a href="/payment" onclick="route()">Платежи</a>         
                        <a href="/" onclick="logOut()">Выход</a>
                    </div>
                </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
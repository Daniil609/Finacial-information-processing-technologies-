// Navbar.js
import "../styles/navbar.css"
import "../styles/navigationBar.css"
import logo from '../img/avatar.webp'

export default function NavigationBar() {


  const logout = () => {
      localStorage.clear()
  }


    return (
      <nav className="navigation">
        <a href="/" className="brand-name">
          ОтдайКа
        </a>
        <div
          className="navigation-menu">
          <ul>
            <li style={{display:"flex", justifyContent: "center", alignItems: "center"}}>
              <a href="/send" >Подать объявление</a>
            </li>
            <li>
                <div class="dropdown">
                    <img class="avatar" src={logo} width="40px" height="40px"></img>
                    <div class="dropdown-content">
                        <a href="/account">Профиль</a>
                        {/* <a href="/settings">Настройки</a>      */}
                        <a href="/payment">Платежи</a>         
                        <a href="/" onClick={logout}>Выход</a>
                    </div>
                </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
import logo from '../img/logo_white.png'
import '../styles/login_register.css'


export default function LoginBar() {
    return (
      <div className="container">
        <img src={logo} alt=""></img>
        <form className="main_login_bar">
            <h1>Вход</h1>
            <br></br>
            <span>Электронная почта</span>
            <input type="text" placeholder="Email"></input>
            <br></br>
            <span>Пароль</span>
            <input type="password" placeholder="Пароль"></input>
            <input type="submit" className="submit_button" value="Вход"></input>
            <a href="/signup">У вас нет аккаунта Отдайка?</a>
        </form>

      </div>
    );
  }
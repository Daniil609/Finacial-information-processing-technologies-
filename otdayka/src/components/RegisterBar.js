import logo from '../img/logo_white.png'
import '../styles/login_register.css'


export default function RegisterBar() {
    return (
      <div className="container">
        <img src={logo} alt=""></img>
        <form className="main_login_bar">
            <h1>Регистрация</h1>
            <br></br>
            <span>Имя</span>
            <input type="text" placeholder="Имя"></input>
            <br></br>
            <span>Фамилия</span>
            <input type="text" placeholder="Фамилия"></input>
            <br></br>
            <span>Электронная почта</span>
            <input type="text" placeholder="Email"></input>
            <br></br>
            <span>Пароль</span>
            <input type="password" placeholder="Пароль"></input>
            <br></br>
            <span>Повторите пароль</span>
            <input type="password" placeholder="Повторите пароль"></input>
            <input type="submit" className="register_button" value="Register"></input>
        </form>

      </div>
    );
  }
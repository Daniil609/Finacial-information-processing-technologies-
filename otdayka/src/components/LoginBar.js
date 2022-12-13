import { useNavigate } from 'react-router-dom'
import logo from '../img/logo_white.png'
import '../styles/login_register.css'


export default function LoginBar() {

    let navigate = useNavigate()

    const onLogin = async (e) => {
        e.preventDefault()

        const data = {
            "username": e.target.username.value, 
            "password": e.target.password.value
        }

        const response = await fetch('/api/v1/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(response => response.json())


        console.log(response)

        if (!response.message) {
            localStorage.setItem('TOKEN', response.access_token)
            localStorage.setItem('ID', response.userId)
            navigate('/')
        }
        else {
            alert(response.message)
        }

    }

    return (
      <div className="container">
        <img src={logo} alt=""></img>
        <form className="main_login_bar" onSubmit={onLogin}>
            <h1>Вход</h1>
            <br></br>
            <span>Логин</span>
            <input type="text" name="username" placeholder="Username"></input>
            <br></br>
            <span>Пароль</span>
            <input type="password" name="password" placeholder="Пароль"></input>
            <input type="submit" className="submit_button" value="Вход"></input>
            <a href="/signup">У вас нет аккаунта Отдайка?</a>
        </form>

      </div>
    );
  }
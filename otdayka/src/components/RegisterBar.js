import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../img/logo_white.png'
import '../styles/login_register.css'
import { BACKEND_API_URL } from "../config/config"

export default function RegisterBar() {
  
    let navigate = useNavigate()
    let [region, setRegion] = useState('') 

    let [registered, setRegistered] = useState(false)

    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(e.target.regions.value)
        


        if (e.target.password.value !== e.target.repeat_password.value) {
           alert("Password do not match!!!")
           return
        }
        
        
        let data = {
            "email": e.target.email.value,
            "username": e.target.username.value,
            "password": e.target.password.value,
            "name": e.target.name.value,
            "phone": e.target.phone.value,
            "address":  e.target.regions.value + ", " + e.target.adress.value
        }



        const response = await fetch(`${BACKEND_API_URL}/v1/auth/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(response => response.json())


        console.log(response)

        if (response.message) {
            alert(response.message)

            const resultReg = document.getElementById('reg_result')
            resultReg.innerHTML = ""
            const text = document.createElement('p')
            text.innerHTML = response.message
            text.style.color = "red"
            resultReg.appendChild(text)
            
            setRegistered(false)

            return
        }
        else {
            const resultReg = document.getElementById('reg_result')
            resultReg.innerHTML = ""
            const text = document.createElement('p')
            text.innerHTML = `Пользоваеть ${response.username} зарегестрирован!`  
            text.style.color = "green"
            resultReg.appendChild(text)

            setRegistered(true)
            

        }
    }



    useEffect(() => {
        if (registered) {
          navigate("/login")
        }
    }, [registered])


    const takeRegion = (e) => {
      document.getElementById('dropdownMenuButton').innerHTML = e.target.innerHTML
      setRegion(e.target.innerHTML)
    }

    return (
      <div className="container">
        <img src={logo} alt=""></img>
        <form className="main_login_bar" onSubmit={onSubmit}>
            <h1>Регистрация</h1>
            <br></br>
            <span>ФИО</span>
            <input maxLength={50} type="text" name="name" placeholder="ФИО" required></input>
            <br></br>
            <span>Мобильный телефон</span>
            <input maxLength={15} type="text" name="phone" placeholder="Мобильный телефон" required></input>
            <br></br>
            <label for="pet-select" style={{fontSize: "30px"}}>Область</label>
            <select name="regions" id="pet-select" style={{color: "grey"}} required>
                <option value="">Выберите область</option>
                <option value="Минск">Минск</option>
                <option value="Минская">Минская</option>
                <option value="Гродненская">Гродненская</option>
                <option value="Брестская">Брестская</option>
                <option value="Гомельская">Гомельская</option>
                <option value="Могилевская">Могилевская</option>
                <option value="Витебская">Витебская</option>
            </select>
            <span>Адрес</span>
            <input maxLength={50} type="text" name="adress" required placeholder="Пример: 'Солигорск, ул.Понамарева, д.3'"></input>
            <br></br>
            <span>Имя пользователя</span>
            <input maxLength={20} type="text" name="username" placeholder="Ник" required></input>
            <br></br>
            <span>Электронная почта</span>
            <input maxLength={35} type="text" name="email" placeholder="Email" required></input>
            <br></br>
            <span>Пароль</span>
            <input required type="password" name="password" placeholder="Пароль"></input>
            <br></br>
            <span>Повторите пароль</span>
            <input type="password" required name="repeat_password" placeholder="Повторите пароль"></input>
            <input type="submit" className="register_button" value="Register"></input>
            <div id="reg_result">
            </div>
        </form>
      </div>
    );
  }
// Navbar.js
import "../styles/navbar.css"
import "../styles/navigationBar.css"
import logo from '../img/avatar.webp'
import { Navigate, useNavigate } from "react-router-dom"
import { useState } from "react"
import { BACKEND_API_URL } from "../config/config"

export default function NavigationBar() {

  let navigate = useNavigate()
  let [myProfileData, setMyProfileData] = useState()

  const logout = () => {
      localStorage.clear()
  }

  async function getMyProfileData () {
    const profileInfo =  await fetch(`${BACKEND_API_URL}/v1/profile/${localStorage.getItem("ID")}`,  {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('TOKEN')}`,
            'Content-Type': 'application/json',
        },  
    })
    .then(response => response.json())
    .catch(err => console.log(err)) 


    
    setMyProfileData(profileInfo)
  }

  const openChat = () => {
      console.log('Opening chat...')

      navigate('/chat', {state: {
          myUser: myProfileData
        }
      })

  }

  useState(() => {
    getMyProfileData()
  }, [])


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
                        <a href="/chat" onClick={openChat}>Чат</a>         
                        <a href="/" onClick={logout}>Выход</a>
                    </div>
                </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
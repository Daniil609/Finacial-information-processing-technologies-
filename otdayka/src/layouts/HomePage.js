 
// App.js
import LoginBar from "../components/LoginBar";
import Navbar from "../components/Navbar";
import "../index.css";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import NavigationBar from '../components/NavigationBar'
import { useNavigate } from "react-router-dom"
import '../styles/home.css'
import { useState } from "react";
import Select from 'react-select'
import logo from '../img/logo_white.png'
import AdBox from "../components/AdBox";
import age_count from "../utils/utils";
import { selectUnstyledClasses } from "@mui/base";

const options = [
    { value: 'По цене', label: 'По цене' },
    { value: 'По дате', label: 'По дате' },
  ]


function LoginPage() {

  let navigate = useNavigate()

  let [age, setAge] = useState('')
  let [sortType, setSortType] = useState('')
  let [formSubmitted, setFormSubmitted] = useState(false)
  

  let [priceFrom, setPriceFrom] = useState('')
  let [priceTo, setPriceTo] = useState('')
  let [region, setRegion] = useState('') 
  let [newness, setNewness] = useState('')
  let [type, setType] = useState('') 
  let [ageGroup, setAgeGroup] = useState('') 
  

    
  useEffect (() => {
        if (false) navigate('/signup')
  }, [region, newness, type, ageGroup]) 


  const takeRegion = (e) => {
        document.getElementById('dropdownMenuButton').innerHTML = e.target.innerHTML
        setRegion(e.target.innerHTML)
  }

  const takeNewness = (e) => {
        document.getElementById('newnessButton').innerHTML = e.target.innerHTML
        setNewness(e.target.innerHTML)
  }

  const takeType = (e) => {
        document.getElementById('typeButton').innerHTML = e.target.innerHTML
        setType(e.target.innerHTML)
  }

  const takeAgeGroup = (e) => {
        document.getElementById('ageGroupButton').innerHTML = e.target.innerHTML
        setAgeGroup(e.target.innerHTML)
  }


//   const handleChange = (event) => {
//     console.log(event.target.value);
//     setAge(event.target.value)
//   };


//   const underlineBoxOver = (event) => {
//     console.log('mouse_over')
//   }

//   const underlineBoxLeave = (event) => {
//     console.log('mouse_leave')
//   }


  const newnessObject = {
        "Меньше шести месяцев": 0.5,
        "Меньше года": 1,
        "Меньше двух лет": 2,
        "Меньше пяти лет": 5
  }

  const [json, setJson] = useState([
        {
            name: "Объявление",
            description: "Это текст объявленияasdhkasbdkjanskdnaskdnasdnkasndasndkansdjaskndkjandasndkasndkanskdnasdnkadnankdajkdasdashdasjkda" + 
            + "jasdnansdkasnkdsandjanskdnasdjnaksjdnkajdnansdkajsndkjasndakjsdnkasdnkasndjkasdjansdkasdklasmdkla",
            price: 150,
            date: "2022-08-18", 
            id: 1024,
            region: "Минская",
            type: "Одежда",
            ageGroup: "Дети (6-12 лет)",
            author: "Александр Смирнов",
            phone: "+375298873822",
            state: "Б/У"
        },
        {
            name: "Объявление",
            description: "Это текст объявленияasdhkasbdkjanskdnaskdnasdnkasndasndkansdjaskndkjandasndkasndkanskdnasdnkadnankdajkdasdashdasjkda" + 
            + "jasdnansdkasnkdsandjanskdnasdjnaksjdnkajdnansdkajsndkjasndakjsdnkasdnkasndjkasdjansdkasdklasmdkla",
            price: 300,
            date: "2022-08-19", 
            id: 123,
            region: "Брестская",
            type: "Детские игрушки",
            ageGroup: "Дети (0-6 лет)",
            author: "Александр Иванов",
            phone: "+375296236007",
            state: "Б/У"
        },

  ])

   const selectChange = (e) => {
        setSortType(e.value)
   }


   useEffect(() => {
        if (sortType === "По цене") {
            setJson(json.sort(function (a, b) {
                return a.price - b.price
             }))
        }
        else if (sortType === "По дате") {
            setJson(json.sort(function (a, b)  {
                return new Date(a.date) < new Date(b.date)
             }))        
        }    
   })

   const resetForm = (e) => {
        e.preventDefault()
        window.location.reload()
   }


   const handleSortForm = (e) => {
        e.preventDefault()
        setFormSubmitted(true)
        console.log(region, newness, type, ageGroup, priceFrom, priceTo)
   }


   const takePriceFrom = (e) => {
        setPriceFrom(e.target.value)
   }

   const takePriceTo = (e) => {
        setPriceTo(e.target.value)
   }


   const selectAd = (e) => {
       
   }

  return (
    <>
       <NavigationBar/>
       <div className="cont">
            <form className="sort_container" id="sort_form" onSubmit={handleSortForm}>
                <label><h1>Цена</h1></label>
                <div className="price_box">
                    <input type="text" placeholder="От" onChange={takePriceFrom}></input>
                    <input type="text" placeholder="До" onChange={takePriceTo}></input>
                </div>

                <br></br>
                <label><h1>Область</h1></label>
                <div className="dropdown">
                    <button className="btn btn-success  dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Выбрать область
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton"> 
                        <a className="dropdown-item" href="#" onClick={(e) => {takeRegion(e)}}>Минск</a>
                        <a className="dropdown-item" href="#" onClick={(e) => {takeRegion(e)}}>Минская</a>
                        <a className="dropdown-item" href="#" onClick={(e) => {takeRegion(e)}}>Гродненская</a>
                        <a className="dropdown-item" href="#" onClick={(e) => {takeRegion(e)}}>Брестская</a>
                        <a className="dropdown-item" href="#" onClick={(e) => {takeRegion(e)}}>Гомельская</a>
                        <a className="dropdown-item" href="#" onClick={(e) => {takeRegion(e)}}>Могилевская</a>
                        <a className="dropdown-item" href="#" onClick={(e) => {takeRegion(e)}}>Витебская</a>
                    </div>
                </div>

                <br></br>
                <label><h1>Новизна</h1></label>
                <div className="dropdown">
                    <button className="btn btn-success  dropdown-toggle" type="button" id="newnessButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Выбрать степень новизны
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton"> 
                        <a className="dropdown-item" href="#" onClick={(e) => {takeNewness(e)}}>Меньше шести месяцев</a>
                        <a className="dropdown-item" href="#" onClick={(e) => {takeNewness(e)}}>Меньше года</a>
                        <a className="dropdown-item" href="#" onClick={(e) => {takeNewness(e)}}>Меньше двух лет</a>
                        <a className="dropdown-item" href="#" onClick={(e) => {takeNewness(e)}}>Меньше пяти лет</a>
                    </div>
                </div>

                <br></br>
                <label><h1>Тип</h1></label>
                <div className="dropdown">
                    <button className="btn btn-success  dropdown-toggle" type="button" id="typeButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Тип
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton"> 
                        <a className="dropdown-item" href="#" onClick={(e) => {takeType(e)}}>Все</a>
                        <a className="dropdown-item" href="#" onClick={(e) => {takeType(e)}}>Одежда</a>
                        <a className="dropdown-item" href="#" onClick={(e) => {takeType(e)}}>Детские игрушки</a>
                        <a className="dropdown-item" href="#" onClick={(e) => {takeType(e)}}>Коляски</a>
                    </div>
                </div>

                <br></br>
                <label><h1>Подходящий возраст</h1></label>
                <div className="dropdown">
                    <button className="btn btn-success  dropdown-toggle" type="button" id="ageGroupButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Возраст
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton"> 
                        <a className="dropdown-item" href="#" onClick={(e) => {takeAgeGroup(e)}}>Все возраста</a>
                        <a className="dropdown-item" href="#" onClick={(e) => {takeAgeGroup(e)}}>Дети (0-6 лет)</a>
                        <a className="dropdown-item" href="#" onClick={(e) => {takeAgeGroup(e)}}>Дети (6-12 лет)</a>
                        <a className="dropdown-item" href="#" onClick={(e) => {takeAgeGroup(e)}}>Подростки (13 - 18 лет)</a>
                        <a className="dropdown-item" href="#" onClick={(e) => {takeAgeGroup(e)}}>Взрослые (18+)</a>
                    </div>
                </div>
                <br></br>
                <div className="sort_container_button">
                    <button className="btn btn-warning" type="submit" style={{display:"flex", alignSelf: "center", alignItems: "center", justifyContent: "center"}}>
                            Подтвердить
                    </button>
                    <button className="btn btn-warning" onClick={resetForm} type="button" style={{display:"flex", alignSelf: "center", alignItems: "center", justifyContent: "center"}}>
                            Очистить
                    </button>
                </div>             
            </form>
            <div className="ad_container">
                <h2>Все объявления в Беларуси</h2>
                <Select options={options} onChange={selectChange} className="sort_select" placeholder="Сортировка по"/>
                <div className="ad_wrapper">
                   {
                        formSubmitted? 
                        (
                            

                            json.filter(function (el) {
                                console.log(age_count(el.date))
                                console.log(newnessObject[newness])
                                return ((el.region === region || region === '') && (el.type === type || type === '') 
                                    && (newness === '' || age_count(el.date) < newnessObject[newness]) && (el.ageGroup === ageGroup || ageGroup === '') && (el.price < priceTo || priceTo === '') && 
                                    (el.price > priceFrom || priceFrom === '')    
                                ) 
                            }).map(object => {
                                return (<AdBox logo={logo} id={object.id} info={object} onClick={selectAd}></AdBox>)
                            }) 
                        ): 
                        (
                            sortType === 'По цене'? 
                            json.sort(function (a, b) {
                                return a.price - b.price
                            }).map(object => {
                                return (<AdBox logo={logo} id={object.id} info={object} onClick={selectAd}></AdBox>)
                            })
                            : 
                            json.sort(function (a, b) {
                                return new Date(a.date) - new Date(b.date)
                            }).map(object => {
                                return (<AdBox logo={logo} id={object.id} info={object} onClick={selectAd}></AdBox>)
                            })
                        )
                   }                 
                </div>
            </div>
       </div>
    </>
  );
}

export default LoginPage;
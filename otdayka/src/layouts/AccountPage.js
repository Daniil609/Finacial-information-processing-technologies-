 
// App.js
import LoginBar from "../components/LoginBar";
import Navbar from "../components/Navbar";
import { Routes, Route } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import '../styles/account.css'
import logo from '../img/logo.png'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AdBox from "../components/AdBox";
import Select from 'react-select'
import age_count from "../utils/utils";
import rangeCrossing from "../utils/checkAge";
import avatar from '../img/avatar.webp'
import { BACKEND_API_URL } from "../config/config"
import { BACKEND_URL } from "../config/config";
import AccountAddBox from "../components/AccountAdBox";

const options = [
    { value: 'По цене', label: 'По цене' },
    { value: 'По дате', label: 'По дате' },
  ]


function AccountPage() {

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
    let [productType, setProductType] = useState()  
    let [profile, setProfile] = useState()
  
  
    const [typeOptions, setTypeOptions] = useState([])
    const [json, setJson] = useState([])
  
    const newnessObject = {
      "Меньше шести месяцев": 0.5,
      "Меньше года": 1,
      "Меньше двух лет": 2,
      "Меньше пяти лет": 5
    }



    const getProfileInfo = async () => {
        const response = await fetch(`${BACKEND_API_URL}/v1/profile/${localStorage.getItem("ID")}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('TOKEN')}`,
                'Content-Type': 'application/json',
            },  
        })
        .then((response) => response.json())
        .catch(err => alert(err))

        console.log(response)
        setProfile(response)
    }


  
  
    const getTypes = async () => {
          const response = await fetch(`${BACKEND_API_URL}/v1/product-type`, {
              headers: {
                  "Authorization": `Bearer ${localStorage.getItem('TOKEN')}`,
                  'Content-Type': 'application/json',
              },  
          }).then((response) => response.json())
  
  
  
          let types = []
          
          for (let type of response) {
              types.push({value: type.id, label: type.name})
          } 
  
          setTypeOptions(types)
    }
  
  
  
  
    const getData = async () => {
              
      const response = await fetch(`${BACKEND_API_URL}/v1/product/${localStorage.getItem("ID")}`,  {
          headers: {
              "Authorization": `Bearer ${localStorage.getItem('TOKEN')}`,
              'Content-Type': 'application/json',
          },  
      })
      .then(response => response.json())
      .catch(err => console.log(err)) 
      
  
      let adInfo = []
      for (let ad of response) {
          
          if (ad.productInfo.buyer_user_id) {
                continue
          } 


          const address = await fetch(`${BACKEND_API_URL}/v1/product/address/${ad.productInfo.address_id}`,  {
              headers: {
                  "Authorization": `Bearer ${localStorage.getItem('TOKEN')}`,
              },  
          })
          .then(response => response.json())
          .catch(err => console.log(err))  
  
          const region = address.name.split(', ')[0]
          
  
  
  
          let ageGroup; 
  
          if (rangeCrossing(ad.productInfo.minAge, ad.productInfo.maxAge, 0, 6)) {
              ageGroup = "Дети (0-6 лет)"
          }
          else if (rangeCrossing(ad.productInfo.minAge, ad.productInfo.maxAge, 6, 12)) {
              ageGroup = "Дети (6-12 лет)"
          }
          else if (rangeCrossing(ad.productInfo.minAge, ad.productInfo.maxAge, 13, 18)) {
              ageGroup = "Подростки (13 - 18 лет)"
          }
          else {
              ageGroup = "Взрослые (18+)"
          }
  
  
  
          let typeProduct = typeOptions.find((el) => {
             return el.value == ad.productInfo.type_id
          })
  
          console.log(typeProduct)
         

          adInfo.push({
              name: ad.productInfo.name,
                  description: ad.productInfo.description,
                  price: ad.productInfo.price / 100 ,
                  date: ad.productInfo.manufactureDate.split("T")[0], 
                  id: ad.productInfo.id,
                  region: region,
                  address: address.name.replace(region + ",", ""),
                  type: typeProduct.label,
                  ageGroup: ageGroup,
                  state: ad.productInfo.condition,
                  user_id: ad.productInfo.user_id,
                  image:  `${BACKEND_URL}/${ad.productInfo.image}`,
                  own: true
          })
      }
  
      setJson(adInfo)
  
      
    }
      
  
  
    useEffect( () => {
    
          if (!localStorage.getItem("TOKEN")) {
            navigate("/signup", {replace: true})
          }
          getTypes()
          getProfileInfo()
    }, [])
  
  
    useEffect( () => {
          getData()
    }, [typeOptions])
  
   
  
  
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
  
  
    
  
     const selectChange = (e) => {
          setSortType(e.value)
     }
  
  
     useEffect(() => {
          if (!localStorage.getItem('TOKEN')) {
              navigate('/signup')
          }
  
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
       <div className="container">
          <div className="profile_container">
              <img src={avatar} style={{border: "1px solid black"}}></img>
              <div style={{marginTop: "20px"}}>
                <h1>Имя пользователя: {profile?.name}</h1>
                <h1>Дата регистрации: {(new Date(profile?.createdAt)).toLocaleDateString()}</h1>
                <h1>Контактный телефон: {profile?.phone}</h1>
              </div>     
          </div>
          <div className="profile_ad_container">
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
                        {
                            typeOptions.map(type => {
                                return <a className="dropdown-item" href="#" onClick={(e) => {takeType(e)}}>{type.label}</a>
                            })
                        }
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
            <div className="account_ad_container">
                <h2>Все объявления профиля</h2>
                <Select options={options} onChange={selectChange} className="sort_select" placeholder="Сортировка по"/>
                <div className="ad_wrapper">
                   {
                        formSubmitted? 
                        (
                            json.filter(function (el) {
                                // console.log(type, el.type)
                                return ((el.region === region || region === '') && (el.type === type || type === 'Все' || type === '') 
                                    && (newness === '' || age_count(el.date) < newnessObject[newness]) && (el.ageGroup === ageGroup || ageGroup === '' || ageGroup === 'Все возраста')
                                    && (el.price < priceTo || priceTo === '') && 
                                    (el.price > priceFrom || priceFrom === '')    
                                ) 
                            }).map(object => {
                                return (<AccountAddBox logo={logo} id={object.id} info={object} onClick={selectAd} ></AccountAddBox>)
                            }) 
                        ): 
                        (
                            sortType === 'По цене'? 
                            json.sort(function (a, b) {
                                return a.price - b.price
                            }).map(object => {
                                return (<AccountAddBox logo={logo} id={object.id} info={object} onClick={selectAd}></AccountAddBox>)
                            })
                            : 
                            json.sort(function (a, b) {
                                return new Date(a.date) - new Date(b.date)
                            }).map(object => {
                                return (<AccountAddBox logo={logo} id={object.id} info={object} onClick={selectAd}></AccountAddBox>)
                            })
                        )
                   }                 
                </div>
            </div>
          </div>       
       </div>
       
    </>
  );
}

export default AccountPage;
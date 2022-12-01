 
// App.js
import NavigationBar from "../components/NavigationBar";
import '../styles/add.css'
import logo from '../img/logo.png'
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function AdPage(props) {

  let location = useLocation() 

    useEffect ( () => {
        console.log(location.state)
    })

  return (
    <>
       <NavigationBar/>
       <div className="main_container">
            <div className="ad_info_container">
                <img src={logo}></img>
                <p>Характеристики</p>
                <div className="char_container">
                    <p>Тип</p>
                    <p>{location.state.type}</p>
                    <p>Состояние</p>
                    <p>{location.state.state}</p>
                </div>
                <br></br>
                <br></br>
                <p>{location.state.description}
                </p>
            </div>
            <div className="author_info_container">
                <p>Цена: {location.state.price}$</p>
                <p>{location.state.name}</p>
                <div className="author_img">
                    <figure>
                        <img src={logo}></img>
                        <figcaption>Телефон: {location.state.phone}</figcaption>
                    </figure>
                    <h2>{location.state.author}</h2>                   
                </div>
                <div> 
                        <br></br>
                        <button className="btn btn-warning" type="button">
                                Написать автору
                        </button>
                        <br></br>
                        <button className="btn btn-success" type="button">
                                Позвонить автору
                        </button>
                        <br></br>
                        <button className="btn btn-primary" type="button">
                                Оплатить онлайн
                        </button>
                </div> 
                
            </div>
       </div>
       <div style={{backgroundColor: "#A09998", width: '60%', minHeight: '50vh'}}>

        </div>
    </>
  );
}

export default AdPage;
 
// App.js
import NavigationBar from "../components/NavigationBar";
import '../styles/add.css'
import logo from '../img/logo.png'
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import avatar from '../img/avatar.webp'
import '../styles/commentary.css'
import CommentCard from "../components/CommentCard";


function AdPage(props) {

  let location = useLocation() 
  let navigate = useNavigate()



  let [comments, setComments] = useState()
  let [profileData, setProfileData] = useState()

    useEffect ( () => {

        if (!localStorage.getItem('TOKEN')) {
            navigate('/signup')
        }
        console.log(location.state)
    })

    


    async function getProfileData () {
        const profileInfo =  await fetch(`/api/v1/profile/${location.state.user_id}`,  {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('TOKEN')}`,
                'Content-Type': 'application/json',
            },  
        })
        .then(response => response.json())
        .catch(err => console.log(err)) 


        
        setProfileData(profileInfo)
    }

    useEffect(() => {
        getProfileData()
        getComments()
    }, [])


    const getComments = async () => {
        const comments = await fetch(`/api/v1/comments/${location.state.id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('TOKEN')}`,
            },  
        })
        .then(response => response.json())
        .catch(err => console.log(err))


        console.log(comments)
        setComments(comments.reverse())
    }

    

    const saveComment = async (e) => {
        e.preventDefault()
        
        const text = document.getElementById("addANote").value

        const comment = {
            "text": text,
            "productId": location.state.id,
            "userId": Number(localStorage.getItem("ID"))
        }

        const response = await fetch(`/api/v1/comments`,  {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('TOKEN')}`,
                'Content-Type': 'application/json',
            },  
            body: JSON.stringify(comment)
        })
        .then(response => response.json())
        .catch(err => console.log(err)) 


        console.log(response)
        getComments()
    }

  return (
    <>
       <NavigationBar/>
       <div className="main_container">
            <div className="ad_info_container">
                <img src={location.state.image}></img>
                <div className="ad_name">
                    <h1>{location.state.name}</h1>
                </div>
                <div className="ad_main_info">
                
                    <div className="char_container">
                        <p style={{fontSize: "x-large"}}><strong>Характеристики:</strong></p>
                        <br></br>
                        <p>Тип</p>
                        <p><strong>{location.state.type}</strong></p>
                        <p>Состояние</p>
                        <p><strong>{location.state.state}</strong></p>
                        <p>Цена</p>
                        <p><strong>{location.state.price} BYN</strong></p>
                    </div>
                    <div className="char_container">
                        <p style={{fontSize: "x-large"}}><strong>Сведения об авторе:</strong></p>
                        <br></br>
                        <p>Имя</p>
                        <p><strong>{profileData?.name}</strong></p>
                        <p>Моб. тел. </p>
                        <p><strong>+375296236007</strong></p>
                    </div>
                </div>      
                <br></br>
                <br></br>
                <p style={{fontSize: "x-large"}}><strong>Описание:</strong></p>
                <p>{location.state.description}
                </p>
            </div>
            <div className="author_info_container">
                <figure>
                    <img src={avatar}></img>  
                    <figcaption>{profileData?.name}</figcaption>
                </figure>

                <div> 
                        <br></br>
                        <button className="btn btn-warning" type="button">
                                Написать автору
                        </button>
                        <br></br>
                        <button className="btn btn-primary" type="button">
                                Оплатить онлайн
                        </button>
                </div> 
                
            </div>
       </div>
        <div class="row d-flex justify-content-center" style={{backgroundColor: "rgb(209, 197, 197)"}}>
                    <div class="w-100"  style={{minHeight: "100vh"}}>
                        <div class="card shadow-0 border">
                        <div class="card-body" style={{backgroundColor: "rgb(209, 197, 197)"}}>
                            <form class="mb-4" style={{width: "50rem"}} onSubmit={saveComment}>
                                <input type="text" id="addANote" class="form-control" placeholder="Написать комментарий..." />
                            </form>
                            {
                                comments?.map((comment) => {
                                    return <CommentCard info={comment} user_id={comment?.user_id}></CommentCard>
                                })
                            }
                        </div>
                        </div>
                    </div>
                </div>
    </>
  );
}

export default AdPage;
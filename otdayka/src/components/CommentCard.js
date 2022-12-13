import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import avatar from '../img/avatar.webp'
import { useState } from "react"

export default function CommentCard(props) {


    const [author, setAuthor] = useState()

    const getAuthor = async () => {
        const author = await fetch(`/api/v1/profile/${props.user_id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('TOKEN')}`,
            },  
        })
        .then(response => response.json())
        .catch(err => console.log(err))


        console.log(author)
        setAuthor(author)
    }

    useEffect(() => {
        getAuthor()
    }, [])

    return (
        <div class="card mb-4">
          <div class="card-body">
            <p className="h4">{props.info?.text}</p>

            <div class="d-flex justify-content-between">
              <div class="d-flex flex-row align-items-center">
                <img style={{minHeight: "150px", border: "5px solid black"}} src={avatar} alt="avatar" width="25"
                  height="25" />
                <p class="h4 mb-0 ms-2">{author?.name}</p>
              </div>

              <div class="d-flex flex-row align-items-center">
                <p class="display-6 text-muted mr-5 mb-0">{new Date(props.info?.created_at).toLocaleDateString()}   </p>
                <p class="display-6 text-muted mb-0">{new Date(props.info?.created_at).toLocaleTimeString()}</p>
              </div>
            </div>
            
          </div>

            
        </div>
    )

}



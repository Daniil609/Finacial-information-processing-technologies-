import Talk from 'talkjs';
import { useEffect, useState, useRef } from 'react';
import '../styles/chat.css'
import { useLocation } from 'react-router-dom';
import avatar from '../img/avatar.webp'
import NavigationBar from '../components/NavigationBar';
import { BACKEND_API_URL } from '../config/config';

export default function ChatRoom() {
  const chatboxEl = useRef();
  let location = useLocation()
  let [myId, setMyId] = useState()
  let [particId, setParticId] = useState()

  let [myParticipent, setMyParticipent] = useState(null)
  let [myUser, setMyUser] = useState()

  // wait for TalkJS to load
  const [talkLoaded, markTalkLoaded] = useState(false);


  useEffect(() => {
    Talk.ready.then(() => setUsers()).then(() => markTalkLoaded(true));

    if (talkLoaded) {
      const currentUser = new Talk.User(myUser);


      let otherUser 
      if (myParticipent) {
        otherUser = new Talk.User(myParticipent);
      }
    

      const session = new Talk.Session({
        appId: 'tRkw9pDe',
        me: currentUser,
      });



      let conversationId, conversation
      if (otherUser) {
            conversationId = Talk.oneOnOneId(currentUser, otherUser);
            conversation = session.getOrCreateConversation(conversationId);
            conversation.setParticipant(currentUser);
            conversation.setParticipant(otherUser);
      }
      else {
            conversationId = Talk.oneOnOneId(currentUser);
            conversation = session.getOrCreateConversation(conversationId);
            conversation.setParticipant(currentUser);
      }
     
   
      const inbox = session.createInbox({selected: conversation})
      inbox.mount(document.getElementById('inbox-container'));
      inbox.select(conversation);


      inbox.onSendMessage(async (data) => {

            const body = {
                "text": data.message.text,
                "userFromId": Number(myId),
                "userToId": Number(particId)
            }
            const response = await fetch(`${BACKEND_API_URL}/v1/messages`,  {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('TOKEN')}`,
                    'Content-Type': 'application/json',
                },  
                body: JSON.stringify(body)
            })
            .then(response => response.json())
            .catch(err => console.log(err)) 
      })


      inbox.onConversationSelected((data) => {
            setMyId(data.me?.id)
            setParticId(data.other?.id)
      })

      return () => session.destroy();
    }
  }, [talkLoaded]);


  const setUsers = async () => {

        if (location.state.myParticipent) {
            setMyParticipent({
                id: Number(location.state.myParticipent.user_id).toString(),
                name: location.state.myParticipent.name,
                photoUrl: avatar,
                role: 'default'
            })
        }
        

        setMyUser({
                id: Number(localStorage.getItem("ID")).toString(),
                name: location.state.myUser.name,
                photoUrl: avatar,
                role: 'default'
            }
        )
  }

  useEffect(() => {
    console.log(location.state)

  }, [])

  return (
    <>
        <NavigationBar/>
        <div className='chat_container'>    
            <div id="inbox-container"></div> 
        </div>
    </>
    )
    
}
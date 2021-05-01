import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import qs from 'query-string'
import io from 'socket.io-client'

import ChatFriend from '../../components/module/ChatFriend/ChatFriend'
import ProfileSide from '../../components/module/ProfileSide/ProfileSide'

import styles from '../../components/module/ChatScreen/ChatScreen.module.css'
import { profileMenu, faceIcon, squareIcon, plusIcon } from '../../assets/image'
import { showProfile } from '../../configs/redux/actions/toggle'
import axios from 'axios'



function ChatRoom({ location }) {
    const urlApi = process.env.REACT_APP_API_URL;
    const urlImg = process.env.REACT_APP_API_IMG;
    const portsocket = 'http://localhost:8000'
    const dispatch = useDispatch();

    const { profilePage } = useSelector((state) => state.togglePage);
    const [userSelected, setUserSelected] = useState([]);
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState("")
    const [comingMessage, setComingMessages] = useState([])

    useEffect(() => {
        const { id } = qs.parse(location.search)
        axios.get(`${urlApi}/users/find-byid/${id}`)
            .then((res) => {
                setUserSelected(res.data.data[0])
            })
            .catch((err) => {
                alert('cant get user selected')
            })

        const connectSocket = io(portsocket);
        setSocket(connectSocket);
        
        

    }, [])

    useEffect(()=>{
        if(socket){
            socket.on("receiveMessage", (data)=>{
                setComingMessages([...comingMessage, data])
            }) 
        }
    },[socket, comingMessage])

    const handleClick = () =>{
        socket.emit('sendMessage', {})
        setMessage("")
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className={[["col-sm-3"], styles["col-left"]].join(" ")}>
                    {profilePage === true ?
                        <ProfileSide />
                        :
                        <ChatFriend />
                    }
                </div>
                <div className={[["col-md-9"], styles["col-right"]].join(" ")}>
                    <div className={styles["head-chat"]}>
                        <div className={styles["gr-1"]}>
                            <img src={`${urlImg}${userSelected.image}`} alt="" />
                            <div className={styles["gr-1-pro"]}>
                                <h4>{userSelected.name}</h4>
                                <p>online</p>
                            </div>
                        </div>
                        <div className={styles["gr-2"]}>
                            <button onClick={(e) => dispatch(showProfile())}><img src={profileMenu} alt="" /></button>
                        </div>
                    </div>
                    <div className={styles["main-chat"]}>
                        <ul>
                        {comingMessage.map((item, index)=>{
                            return <li key={index}>{item}</li>
                        })}
                        </ul>
                    </div>
                    <div className={styles["foot-chat"]}>
                        <div className={styles["chat-text"]}>
                            <input type="text" value={message} name="messages" placeholder="Type your message.." onChange={(e)=>setMessage(e.target.value)} />
                            <button><img src={plusIcon} alt="" /></button>
                            <button><img src={faceIcon} alt="" /></button>
                            <button onClick={handleClick}><img src={squareIcon} alt="" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ChatRoom

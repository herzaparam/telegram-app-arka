import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import qs from 'query-string'
import { useLocation, useHistory } from 'react-router-dom'

import ChatFriend from '../../components/module/ChatFriend/ChatFriend'
import ProfileSide from '../../components/module/ProfileSide/ProfileSide'

import styles from '../../components/module/ChatScreen/ChatScreen.module.css'
import { profileMenu, faceIcon, squareIcon, plusIcon } from '../../assets/image'
import { showProfile } from '../../configs/redux/actions/toggle'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axiosApiInstance from '../../helpers/axios'
import Swal from 'sweetalert2'


function ChatRoom({ socket }) {
    const urlImg = process.env.REACT_APP_API_IMG;
    const urlApi = process.env.REACT_APP_API_URL;
    let location = useLocation()
    const history = useHistory()

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);
    const [newUser, setNewUser] = useState([]);
    const { profilePage } = useSelector((state) => state.togglePage);
    const [userSelected, setUserSelected] = useState([]);
    const [message, setMessage] = useState("")
    const [comingMessage, setComingMessage] = useState([])
    const [chatHistory, setChatHistory] = useState([])

    const notify = (senderName) => toast.info(`✅ You have unread message! from ${senderName}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const getChat = () => {
        
        axiosApiInstance.get(`${urlApi}/chat/history`)
            .then((result) => {
                setComingMessage(result.data.data)
            })
    }

    useEffect(() => {
        if (user.image === undefined) {
            axiosApiInstance.get(`${urlApi}/users/find-one`)
                .then((res) => {
                    const data = res.data.data[0]
                    setNewUser(data)
                })
                .catch((err) => {
                    console.log(err);
                })
        }

        const { id } = qs.parse(location.search)
        axios.get(`${urlApi}/users/find-byid/${id}`)
            .then((res) => {
                setUserSelected(res.data.data[0])
                getChat()
            })

    }, [location])

    useEffect(() => {
        if (socket) {
            socket.emit("initialUserLogin", localStorage.getItem("idLoggedIn"));
        }
    }, [socket]);

    useEffect(() => {
        if (socket) {
            socket.off("receiveMessage")
            socket.on("receiveMessage", (data) => {
                setComingMessage([...comingMessage, data])
                notify(data.senderName);
            })
        }
    }, [socket, comingMessage])

    useEffect(()=>{
        getChat()
    },[])

    const handleClick = (e) => {
        e.preventDefault();
        socket.emit('sendMessage', {
            id_receiver: userSelected.userID,
            id_sender: localStorage.getItem('idLoggedIn'),
            senderName: user.name || newUser.name,
            message: message
        }, (data) => {
            setComingMessage([...comingMessage, data])
        })
        setMessage("")
        axios.post(`${urlApi}/chat/insert`, {
            id_sender: localStorage.getItem('idLoggedIn'),
            id_receiver: userSelected.userID,
            message: message
        })

    };
    const deleteMessage = (id) => {
        const idMessage = id
        Swal.fire({
            title: 'Do you want to delete this message?',
            icon: 'warning',
            showConfirmButton: false,
            showDenyButton: true,
            showCancelButton: true,
            denyButtonText: `delete`,
        }).then(async (result) => {
            if (result.isDenied) {
                try {
                    const res = await axios.delete(`${urlApi}/chat/delete?idMessage=${idMessage}`)
                } catch {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'internal server error!',
                    })
                }
                getChat()
            }
        })
    }

    return (

        <div className="container-fluid">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
            />

            <div className="row">
                <div className={location.search ? [["col-sm-3"], styles["col-left"]].join(" ") : "col-sm-3"}>
                    {profilePage === true ?
                        <ProfileSide />
                        :
                        <ChatFriend />
                    }

                </div>
                {location.search &&
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
                                <button onClick={(e) => history.push("/chat-room")}><img src={profileMenu} alt="" /></button>
                            </div>
                        </div>
                        <div className={styles["main-chat"]}>
                            <ul>
                                {comingMessage.map((item, index) => {
                                    return item.id_receiver === userSelected.userID && item.id_sender === localStorage.getItem('idLoggedIn') ?
                                        <div className={styles["cont-msg-rec"]} key={index}>
                                            <li className={styles["msg-rec"]} > {item.message} <span className={styles.spanlist}><p>{item.createdAt} </p></span>  </li>
                                            {user.image === undefined ? <img src={`${urlImg}${newUser.image}`} alt="img profile"></img> : <img src={`${urlImg}${user.image}`} alt="img profile"></img>}
                                        </div>
                                        :
                                        item.id_receiver === localStorage.getItem('idLoggedIn') && userSelected.userID === item.id_sender ?
                                            <div className={styles["cont-msg-send"]} key={index}>
                                                <img src={`${urlImg}${userSelected.image}`} alt="img profile"></img>
                                                <li className={styles["msg-send"]} > {item.message} <span className={styles.spanlist}><p>{item.createdAt}</p></span>  </li>
                                            </div>
                                            :
                                            ""
                                })}
                            </ul>
                        </div>
                        <div className={styles["foot-chat"]}>
                            <div className={styles["chat-text"]}>
                                <input type="text" value={message} name="messages" placeholder="Type your message.." onChange={(e) => setMessage(e.target.value)} />
                                <button><img src={plusIcon} alt="" /></button>
                                <button><img src={faceIcon} alt="" /></button>
                                <button onClick={handleClick}><img src={squareIcon} alt="" /></button>
                            </div>
                        </div>
                    </div>}

            </div>
        </div>

    )
}


export default ChatRoom

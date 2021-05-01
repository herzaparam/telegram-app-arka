import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { showProfile } from '../../../configs/redux/actions/toggle'
import axiosApiInstance from '../../../helpers/axios'
import { Link } from 'react-router-dom'

import styles from './ChatFriend.module.css'
import { plusIcon, searchIcon, bugerMenu, settingIcon, callIcon, contactIcon, faqIcon, saveIcon, inviteIcon } from '../../../assets/image'
import { CardFriend } from '../../index'
import { useHistory } from 'react-router'


function ChatFriend() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [display, setDisplay] = useState(1);
    const [dispToggle, setDispToggle] = useState(false);
    const [keyword, setKeyword] = useState("")
    const [friends, setFriends] = useState([]);

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token")
        history.push("/")
    }

    useEffect(() => {
        const urlApi = process.env.REACT_APP_API_URL;
        axiosApiInstance.get(`${urlApi}/users/find-all?page=1&perPage=10&keyword=${keyword}`)
            .then((res) => {
                const newFriends = res.data.data;
                setFriends(newFriends)
            })
            .catch((err) => {

            });
    }, [keyword])

    return (
        <>
            <div className={styles["nav"]}>
                <h2>Telegram</h2>
                <button onClick={(e) => setDispToggle(true)}><img src={bugerMenu} alt="" /></button>
            </div>
            {dispToggle === true ?
                <ul className={styles["list"]}>
                    <button onClick={(e) => setDispToggle(false)}>x</button>
                    <li><img src={settingIcon} alt="" /><button onClick={(e) => dispatch(showProfile())}>Setting</button></li>
                    <li><img src={contactIcon} alt="" /><button>Contact</button></li>
                    <li><img src={callIcon} alt="" /><button>Calls</button></li>
                    <li><img src={saveIcon} alt="" /><button>Save Messages</button></li>
                    <li><img src={inviteIcon} alt="" /><button>Invite Friends</button></li>
                    <li><img src={faqIcon} alt="" /><button>Telegram FAQ</button></li>
                    <li className={styles.listItem}><button onClick={handleLogout}>Log out</button></li>
                </ul>
                :
                <></>
            }

            <div className={styles["search-group"]}>
                <div className={styles["search-group-inpt"]}>
                    <button><img src={searchIcon} alt="" /></button>
                    <input type="text" placeholder="Type your message" onChange={(e) => setKeyword(e.target.value)} />
                </div>
                <button><img src={plusIcon} alt="" /></button>
            </div>
            <div className={styles["tab-group"]}>
                <button className={display === 1 ? styles["btn-active"] : styles["btn"]} onClick={() => setDisplay(1)}>All</button>
                <button className={display === 2 ? styles["btn-active"] : styles["btn"]} onClick={() => setDisplay(2)}>Important</button>
                <button className={display === 3 ? styles["btn-active"] : styles["btn"]} onClick={() => setDisplay(3)}>Unread</button>
            </div>

            <div className={display === 1 ? styles["friend-group-active"] : styles["friend-group"]}>
                {friends.map((person) => {
                    return (
                        <Link onClick={e => (!person.userID || !person.name) ? e.preventDefault() : null} to={`/chat-room?id=${person.userID}`} key={person.userID}>
                            <CardFriend person={person}  />
                        </ Link>
                    )
                })}

            </div>
            <div className={display === 2 ? styles["friend-group-active"] : styles["friend-group"]}>
                <p>none</p>
            </div>
            <div className={display === 3 ? styles["friend-group-active"] : styles["friend-group"]}>

                <p>none</p>
            </div>
        </>
    )
}

export default ChatFriend

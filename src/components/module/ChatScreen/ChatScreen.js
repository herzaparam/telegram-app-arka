import React from 'react'
import { useDispatch } from 'react-redux'

import styles from './ChatScreen.module.css'
import { profileTest, profileMenu, faceIcon, squareIcon, plusIcon } from '../../../assets/image'
import { showProfile } from '../../../configs/redux/actions/toggle'

function ChatScreen() {

    const dispatch = useDispatch();

    return (
        <>
            <div className={styles["head-chat"]}>
                <div className={styles["gr-1"]}>
                    <img src={profileTest} alt="" />
                    <div className={styles["gr-1-pro"]}>
                        <h4>theressa alice</h4>
                        <p>online</p>
                    </div>
                </div>
                <div className={styles["gr-2"]}>
                    <button onClick={(e) => dispatch(showProfile())}><img src={profileMenu} alt="" /></button>
                </div>

            </div>
            <div className={styles["main-chat"]}>
                <p>ini yang pertama</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>ini yang terakhir</p>
            </div>
            <div className={styles["foot-chat"]}>
                <div className={styles["chat-text"]}>
                    <input type="text" placeholder="Type your message.." />
                    <button><img src={plusIcon} alt="" /></button>
                    <button><img src={faceIcon} alt="" /></button>
                    <button><img src={squareIcon} alt="" /></button>
                </div>
            </div>
        </>

    )
}

export default ChatScreen

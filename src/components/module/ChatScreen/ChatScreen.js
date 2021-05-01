import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import styles from './ChatScreen.module.css'
import { profileMenu, faceIcon, squareIcon, plusIcon } from '../../../assets/image'
import { showProfile } from '../../../configs/redux/actions/toggle'

function ChatScreen() {
 

    // const dispatch = useDispatch();
    // const { chatTab, chatDisplay } = useSelector((state) => state.togglePage);
    // const { userSelected } = chatTab;
  

    return (
        <>
            <div className={styles["head-chat"]}>
                <div className={styles["gr-1"]}>
                    <img src='' alt="" />
                    <div className={styles["gr-1-pro"]}>
                        <h4>name</h4>
                        <p>online</p>
                    </div>
                </div>
                <div className={styles["gr-2"]}>
                    {/* <button onClick={(e) => dispatch(showProfile())}><img src={profileMenu} alt="" /></button> */}
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

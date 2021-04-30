import React from 'react'
import { useSelector } from 'react-redux'

import ChatFriend from '../../components/module/ChatFriend/ChatFriend'
import ChatScreen from '../../components/module/ChatScreen/ChatScreen'
import ProfileSide from '../../components/module/ProfileSide/ProfileSide'

import styles from '../../styles/Chat.module.css'

function Chat() {

    const { profilePage } = useSelector((state) => state.togglePage)

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
                    <ChatScreen />
                </div>
            </div>
        </div>
    )
}

export default Chat

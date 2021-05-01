import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import {openTabChat} from '../../../configs/redux/actions/toggle'

import styles from './CardFriend.module.css'

function CardFriend({person}) {
    const urlImg = process.env.REACT_APP_API_IMG;
    const dispatch = useDispatch()

    const [dataRoom, setDataRoom] = useState({
        userSelected:{},
        room: "",
    })

    const handleRouteChat = ({person}) =>{

        setDataRoom({
            userSelected : person,
            room: "",
        })
        dispatch(openTabChat(dataRoom))
    }
    
    return (
        <div className={styles["group"]} >
            <div className={styles["group-1"]}>
            <img src={`${urlImg}${person.image}`} alt=""/>
            </div>
            <div className={styles["group-2"]}>
                <h4>{person.name}</h4>
                <p>this is chat</p>
            </div>
            <div className={styles["group-3"]}>
                <h5>15.02</h5>
                <div className={styles["group-3-p"]}><p>2</p></div>
            </div>
        </div>
    )
}

export default CardFriend

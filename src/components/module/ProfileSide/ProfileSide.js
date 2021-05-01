import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../../configs/redux/actions/user'
import { closeProfile } from '../../../configs/redux/actions/toggle'
import axiosApiInstance from '../../../helpers/axios'

import styles from './ProfileSide.module.css'
import { back, deviceIcon, graphIcon, chatIcon, bellIcon, lockIcon, settingIcon } from '../../../assets/image'
import Swal from 'sweetalert2'

function ProfileSide() {
    const dispatch = useDispatch();
    const apiUrl = process.env.REACT_APP_API_URL;
    const urlImage = process.env.REACT_APP_API_IMG;
    const { user } = useSelector((state) => state.user);

    const [update, setUpdate] = useState({
        name: "",
        phone_number: 0,
        username: "",
        bio: "",
        image: null
    })
    const [edit, setEdit] = useState(false);

    const handleEdit = (e) => {
        e.preventDefault();
        if (edit === false) {
            setEdit(true)
        } else {
            setEdit(false)
        }
    };

    const handleChange = (e) => {
        setUpdate({
            ...update,
            [e.target.name]: e.target.value
        })
    };

    const handleChangeImage = (e) => {
        setUpdate({
            ...update,
            image: e.target.files[0]
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", update.name)
        formData.append("username", update.username)
        formData.append("phone_number", update.phone_number)
        formData.append("bio", update.bio)
        formData.append("image", update.image)
        axiosApiInstance.put(`${apiUrl}/users/update-profile`, formData)
            .then(async (res) => {
                await Swal.fire({
                    title: "Success!",
                    text: "profile sucesssfully updated!",
                    icon: "success",
                    confirmButtonText: "Ok",
                    confirmButtonColor: "#7e98df",
                })
                setUpdate({
                    name: "",
                    phone_number: 0,
                    username: "",
                    bio: "",
                    image: null
                })
                setEdit(false)
                dispatch(updateUser())
            })
            .catch((err) => {
                Swal.fire({
                    title: "Error!",
                    text: err.message,
                    icon: "error",
                    confirmButtonText: "Ok",
                    confirmButtonColor: "#6a4029",
                });
            })
    }
    
    return (
        <div className={styles["pro"]}>
            <div className={styles["pro-head"]}>
                <button onClick={(e) => dispatch(closeProfile())}><img src={back} alt="" /></button>
                <button className={styles["setting-img"]} onClick={handleEdit}>
                    <img src={settingIcon} alt="" />
                </button>
            </div>

            {edit === true ?
                <form className={styles.form}>

                    <div className={styles["pro-info-1"]}>
                        <label className={styles["label"]}>
                            <img src={`${urlImage}${user.image}`} alt="" />
                            <input className={styles["disp"]} type="file" onChange={(e) => handleChangeImage(e)} />
                        </label>
                        <input className={styles["inpt-1"]} name="name" type="text" onChange={handleChange} placeholder={user.name} />
                        <p>username</p>
                    </div>
                    <div className={styles["pro-info-2"]}>
                        <h5>Account</h5>
                        <div className={styles["pro-info-2-card"]}>
                            <input className={styles["inpt"]} name="phone_number" type="numer" onChange={handleChange} placeholder={`+62 ${user.phone_number}`} />

                            <button>Tap to change phone number</button>
                        </div>
                        <div className={styles["pro-info-2-card"]}>
                            <input className={styles["inpt"]} name="username" type="text" onChange={handleChange} placeholder={user.username} />
                            <p>Username</p>
                        </div>
                        <div className={styles["pro-info-2-card"]}>
                            <input className={styles["inpt"]} name="bio" type="text" onChange={handleChange} placeholder={user.bio} />
                            <p>Bio</p>
                        </div>
                    </div>
                    <button onClick={handleSubmit}>Submit</button>
                </form>
                :
                <form className={styles["form"]}>
                    <div className={styles["pro-info-1"]}>
                        <img src={`${urlImage}${user.image}`} alt="" />
                        <h4>{user.name}</h4>
                        <p>username</p>
                    </div>
                    <div className={styles["pro-info-2"]}>
                        <h5>Account</h5>
                        <div className={styles["pro-info-2-card"]}>
                            <h5>+62 {user.phone_number}</h5>
                            <button>Tap to change phone number</button>
                        </div>
                        <div className={styles["pro-info-2-card"]}>
                            <h5>@{user.username}</h5>
                            <p>Username</p>
                        </div>
                        <div className={styles["pro-info-2-card"]}>
                            <h5>{user.bio}</h5>
                            <p>Bio</p>
                        </div>
                    </div>
                </form>
            }

            <div className={styles["pro-setting"]}>
                <h4>Settings</h4>
                <div className={styles["pro-setting-card"]}>
                    <img src={bellIcon} alt="" />
                    <h5>Notification and Sound</h5>
                </div>
                <div className={styles["pro-setting-card"]}>
                    <img src={lockIcon} alt="" />
                    <h5>Privacy and Security</h5>
                </div>
                <div className={styles["pro-setting-card"]}>
                    <img src={graphIcon} alt="" />
                    <h5>Data and Storage</h5>
                </div>
                <div className={styles["pro-setting-card"]}>
                    <img src={chatIcon} alt="" />
                    <h5>Chat Settings</h5>
                </div>
                <div className={styles["pro-setting-card"]}>
                    <img src={deviceIcon} alt="" />
                    <h5>Devices</h5>
                </div>
            </div>
        </div>
    )
}

export default ProfileSide

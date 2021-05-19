import React, { useState } from 'react'
import styles from '../../styles/Auth.module.css'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from "../../configs/redux/actions/user"

import { googleIcon } from '../../assets/image'
import Swal from 'sweetalert2'

function Login() {
    const history = useHistory();
    const dispatch = useDispatch();

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const dataNew = { ...data };
        dataNew[e.target.name] = e.target.value;
        setData(dataNew)
    };

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login(data))
            .then((res) => {
                Swal.fire({
                    title: "Success!",
                    text: res,
                    icon: "success",
                    confirmButtonText: "Ok",
                    confirmButtonColor: "#7e98df",
                }).then((result) => {
                    if (result.isConfirmed) {
                        history.push("/chat-room");
                    } else {
                        history.push("/chat-room");
                    }
                });
            })
            .catch((err) => {
                Swal.fire({
                    title: "Error!",
                    text: err,
                    icon: "error",
                    confirmButtonText: "Ok",
                    confirmButtonColor: "#6a4029",
                })
            })
    }


    return (
        <div className={[["container-fluid"], styles["cont-fluid"]].join(' ')}>
            <div className={styles["form"]}>
                <h2>login</h2>
                <h5>Hi, Welcome Back!</h5>
                <div className={styles["group-inpt"]}>
                    <label htmlFor="">Email</label>
                    <input type="text" name="email" placeholder="telegram@gmail.com" onChange={handleChange} />
                </div>
                <div className={styles["group-inpt"]}>
                    <label htmlFor="">Password</label>
                    <input type="password" name="password" onChange={handleChange} />
                </div>
                <Link to="/forgot-password">Forgot Password</Link>
                <button className={styles["blue"]} onClick={handleLogin}>Login</button>
                <div className={styles["line"]}>
                    <hr />
                    <p>Login with</p>
                    <hr />
                </div>
                <button className={styles["grey"]}> <img src={googleIcon} alt="" /> Google</button>
                <p>Don't have account? <Link to="/register">Sign Up</Link></p>
            </div>
        </div>

    )
}

export default Login

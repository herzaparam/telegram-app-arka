import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp, verify } from "../../configs/redux/actions/user";


import styles from '../../styles/Auth.module.css'
import { back, googleIcon } from '../../assets/image'
import Swal from 'sweetalert2'

function Register() {

    const history = useHistory();

    const useQuery = () => new URLSearchParams(useLocation().search);

    const query = useQuery();
    let email = query.get("email");
    let token = query.get("token");

    const dispatch = useDispatch();

    const [data, setData] = useState({
        email: "",
        password: "",
        name: ""
    });

    const handleFormChange = (event) => {
        const dataNew = { ...data };
        dataNew[event.target.name] = event.target.value;
        setData(dataNew);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(signUp(data))
            .then((res) => {
                setData({
                    email: "",
                    password: "",
                    name: ""
                });
                Swal.fire({
                    title: "Success!",
                    text: res,
                    icon: "success",
                    confirmButtonText: "Ok",
                    confirmButtonColor: "#7e98df",
                });
            })
            .catch((err) => {
                Swal.fire({
                    title: "Error!",
                    text: err.message,
                    icon: "error",
                    confirmButtonText: "Ok",
                    confirmButtonColor: "#7e98df",
                });
            });
    };

    useEffect(() => {
        if (email !== null && token !== null) {
            dispatch(verify(email, token))
                .then((res) => {
                    Swal.fire({
                        title: "Success!",
                        text: res,
                        icon: "success",
                        confirmButtonText: "Ok",
                        confirmButtonColor: "#7e98df",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            history.push("/login");
                        } else {
                            history.push("/login");
                        }
                    });
                })
                .catch((err) => {
                    Swal.fire({
                        title: "Error!",
                        text: err.message,
                        icon: "error",
                        confirmButtonText: "Ok",
                        confirmButtonColor: "#6a4029",
                    });
                });
        }
    }, [dispatch, email, token, history]);

    return (
        <div className={[["container-fluid"], styles["cont-fluid"]].join(' ')}>
            <div className={styles["form"]}>
                <button className={styles["btn-special"]} onClick={(e) => { history.goBack() }}>
                    <img src={back} alt="" />
                </button>
                <h2>Register</h2>
                <h5>Let's Create your account!</h5>
                <div className={styles["group-inpt"]}>
                    <label htmlFor="">Name</label>
                    <input type="text" name="name" placeholder="Telegram App" onChange={handleFormChange} />
                </div>
                <div className={styles["group-inpt"]}>
                    <label htmlFor="">Email</label>
                    <input type="text" name="email" placeholder="telegram@gmail.com" onChange={handleFormChange} />
                </div>
                <div className={styles["group-inpt"]}>
                    <label htmlFor="">Password</label>
                    <input type="password" name="password" onChange={handleFormChange} />
                </div>
                <button className={styles["blue"]} onClick={handleSubmit}>Register</button>
                <div className={styles["line"]}>
                    <hr />
                    <p>Register with</p>
                    <hr />
                </div>
                <button className={styles["grey"]}> <img src={googleIcon} alt="" /> Google</button>
            </div>
        </div>
    )
}

export default Register

import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { activate, reset } from '../../configs/redux/actions/user'

import Swal from 'sweetalert2'
import styles from '../../styles/Auth.module.css'
import { back } from '../../assets/image'

function ForgotPassword() {
    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();
    let email = query.get("email");
    let token = query.get("token");

    const dispatch = useDispatch();

    const history = useHistory();


    const [data, setData] = useState({
        email: "",
        password: "",
        confirmpassword: ""
    });
    const [step, setStep] = useState("send");
    const [hasError, setHasError] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);

    const handleFormChange = (event) => {
        const dataNew = { ...data };
        dataNew[event.target.name] = event.target.value;
        setData(dataNew);
    };

    const handleSend = (event) => {
        event.preventDefault();
        dispatch(activate(data))
            .then((res) => {
                setData({
                    email: "",
                    password: "",
                    confirmpassword: ""
                });
                setStep("reset");
                Swal.fire({
                    title: "Success!",
                    text: res,
                    icon: "success",
                    confirmButtonText: "Ok",
                    confirmButtonColor: "#ffba33",
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
    };

    const validate = (event) => {
        event.preventDefault();
        setHasError(false)
        setErrorPassword(false)
        if (data.password !== data.confirmpassword) {
            return setErrorPassword(true);
        }
        if (data.email !== email) {
            return setHasError(true);

        }
        handleReset();
    }

    const handleReset = () => {
        if (email !== null && token !== null) {
            dispatch(reset(email, token, data))
                .then((res) => {
                    setData({
                        email: "",
                        password: "",
                        confirmpassword: ""
                    });
                    Swal.fire({
                        title: "Success!",
                        text: res,
                        icon: "success",
                        confirmButtonText: "Ok",
                        confirmButtonColor: "#ffba33",
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
        } else {
            Swal.fire({
                title: "Error!",
                text: "Something wrong",
                icon: "error",
                confirmButtonText: "Ok",
                confirmButtonColor: "#6a4029",
            });
        }
    };
    useEffect(() => {
        if (email !== null && token !== null) {
            setStep("reset");
        }
    }, [dispatch, email, token]);

    return (
        <div className={[["container-fluid"], styles["cont-fluid"]].join(' ')}>
            <div className={styles["form"]}>
                <button className={styles["btn-special"]} onClick={(e) => history.goBack()}>
                    <img src={back} alt="" />
                </button>
                <h2>Forgot Password</h2>
                <h5>You'll get messages soon on your email</h5>
                {hasError === true ?
                    <>
                        <div className={styles["group-inpt-red"]}>
                            <label htmlFor="">Email</label>
                            <input type="text" name="email" placeholder="telegram@gmail.com" onChange={handleFormChange} />
                        </div>
                        <p className={styles["red"]}>invalid email</p>
                    </>
                    :
                    <>
                        <div className={styles["group-inpt"]}>
                            <label htmlFor="">Email</label>
                            <input type="text" name="email" placeholder="telegram@gmail.com" onChange={handleFormChange} />
                        </div>
                    </>
                }

                {step === "reset" ?
                    <>
                        <div className={styles["group-inpt"]}>
                            <label htmlFor="">password</label>
                            <input type="password" name="password" onChange={handleFormChange} />
                        </div>
                        {errorPassword === true ? <p className={styles["red"]}>invalid password confirmation</p> : ""}
                        <div className={styles["group-inpt"]}>
                            <label htmlFor="">confirmation password</label>
                            <input type="password" name="confirmpassword" onChange={handleFormChange} />
                        </div>
                        <button className={styles["blue"]} onClick={validate}>Reset</button>
                    </> :
                    <button className={styles["blue"]} onClick={handleSend}>Send</button>
                }
            </div>
        </div>
    )
}

export default ForgotPassword

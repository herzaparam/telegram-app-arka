import axios from "axios";
import axiosApiInstance from "../../../helpers/axios";

const signUpRequest = () => {
    return { type: "SIGN_UP_REQUEST" };
};

const signUpSuccess = (data) => {
    return { type: "SIGN_UP_SUCCESS", payload: data };
};

const signUpFailure = (error) => {
    return { type: "SIGN_UP_FAILURE", payload: error };
};
const resetRequest = () => {
    return { type: "RESET_REQUEST" };
};

const resetSuccess = () => {
    return { type: "RESET_SUCCESS" };
};

const resetFailure = (error) => {
    return { type: "RESET_FAILURE", payload: error };
};

export const signUp = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        const url = process.env.REACT_APP_API_URL;
        dispatch(signUpRequest());
        axios
            .post(`${url}/users/`, data)
            .then((res) => {
                dispatch(signUpSuccess(res.data.data));
                resolve(res.data.message);
            })
            .catch((err) => {
                dispatch(signUpFailure(err.response.data.message));
                reject(new Error(err.response.data.message));
            });
    });
};

export const login = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        const url = process.env.REACT_APP_API_URL;
        axios
            .post(`${url}/users/auth/login`, data)
            .then((res) => {
                dispatch({ type: "LOGIN", payload: res.data.data });
                localStorage.setItem("token", res.data.data.token);
                localStorage.setItem("idLoggedIn", res.data.data.userID)
                resolve(res.data.message);
            })
            .catch((err) => {
                reject(err.response.data.message);
            });
    });
};
export const getUserLogin = () => (dispatch) => {
    return new Promise((resolve, reject)=>{
        const apiUrl = process.env.REACT_APP_API_URL;
        axiosApiInstance.get(`${apiUrl}/users/find-one`)
                .then((res) => {
                    dispatch({ type: "GET_USER_LOGIN", payload: res.data.data})
                    resolve(res.data.message)
                })
                .catch((err) => {
                    reject(err.response.data.message);
                })
    })
}

export const verify = (email, token) => (dispatch) => {
    return new Promise((resolve, reject) => {
        const Url = process.env.REACT_APP_API_URL;
        axios
            .get(`${Url}/users/auth/verify/?email=${email}&token=${token}`)
            .then((res) => {
                resolve(res.data.message);
            })
            .catch((err) => {
                reject(new Error(err.response.data.message));
            });
    });
};

export const activate = ({ email }) => (dispatch) => {
    return new Promise((resolve, reject) => {
        const Url = process.env.REACT_APP_API_URL;
        dispatch(resetRequest());
        axios
            .post(`${Url}/users/auth/forgot-password`, { email })
            .then((res) => {
                dispatch(resetSuccess());
                resolve(res.data.message);
            })
            .catch((err) => {
                dispatch(resetFailure(err.response.data.message));
                reject(new Error(err.response.data.message));
            });
    });
};
export const reset = (email, token, { password }) => (dispatch) => {
    return new Promise((resolve, reject) => {
        const url = process.env.REACT_APP_API_URL;
        axios
            .put(`${url}/users/auth/reset-password/?email=${email}&token=${token}`, {
                password,
            })
            .then((res) => {
                resolve(res.data.message);
            })
            .catch((err) => {
                reject(err.response.data.message);
            });
    });
};
export const updateUser = () => (dispatch) => {
    return new Promise((resolve,reject)=>{
        const url = process.env.REACT_APP_API_URL;
        axiosApiInstance.get(`${url}/users/find-one`)
        .then((res)=>{
            dispatch({type:"UPDATE", payload:res.data.data[0]})
        })
        .catch((err)=>{
            reject(err.response.data.message)
        })
    })
}
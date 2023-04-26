import Cookies from "js-cookie"
import { api } from "../api/api"

export const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: "LoginRequest"
        })

        const { data } = await api.post("/login", { email, password }, {
            headers: {
                "Content-Type": "application/json",

            },
        })
        localStorage.setItem("auth-token", data.data);
        Cookies.set("authorization", data.data, { expires: 86400 });

        dispatch({
            type: "LoginSuccess",
            payload: data.data
        })


    } catch (error) {
        {
            dispatch({
                type: "LoginFailure",
                payload: error.response.data.message
            })
        }
    }
}

//Logout
export const logoutUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "LogoutUserRequest"
        })

        await api.post("/logout")


        dispatch({
            type: "LogoutUserSuccess",
        })


    } catch (error) {

        dispatch({
            type: "LogoutUserFailure",
            payload: error.response.data.message
        })
    }

}

//Register
export const registerUser = (name, email, password, company, secretQuestion, answer) => async (dispatch) => {
    try {
        dispatch({
            type: "RegisterRequest"
        })

        const { data } = await api.post("/register", { name, email, password, company, secretQuestion, answer }, {
            headers: {
                "Content-Type": "application/json",
            },
        })

        dispatch({
            type: "RegisterSuccess",
            payload: data.user
        })


    } catch (error) {

        dispatch({
            type: "RegisterFailure",
            payload: error.response.data.message
        })
    }

}
//Forgot Password
export const forgotPassword = (email, secretQuestion) => async (dispatch) => {
    try {
        dispatch({
            type: "forgotPasswordRequest"
        })

        const { data } = await api.post("/forgot", { email, secretQuestion }, {
            headers: {
                "Content-Type": "application/json",
            },
        })

        dispatch({
            type: "forgotPasswordSuccess",
            payload: data.data
        })


    } catch (error) {

        dispatch({
            type: "forgotPasswordFailure",
            payload: error.response.data.message
        })
    }

}

//Reset Password
export const resetPasswordRequest = (email, secretQuestion, answer, newPassword) => async (dispatch) => {
    try {
        dispatch({
            type: "resetPasswordRequest"
        })
        const { data } = await api.post("/reset", { email, secretQuestion, answer, newPassword }, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        dispatch({
            type: "resetPasswordSuccess",
            payload: data.message
        })
    } catch (error) {

        dispatch({
            type: "resetPasswordFailure",
            payload: error.response.data.message
        })
    }
}

// //Load User
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "LoadUserRequest"
        })


        const { data } = await api.get("/me")



        dispatch({
            type: "LoadUserSuccess",
            payload: data.users
        })


    } catch (error) {

        dispatch({
            type: "LoadUserFailure",
            payload: error.response.data.message
        })
    }

};

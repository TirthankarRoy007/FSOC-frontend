import axios from "axios"

export const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: "LoginRequest"
        })

        const { data } = await axios.post("https://silk-political-target.glitch.me/login", { email, password }, {
            headers: {
                "Content-Type": "application/json",

            },
        })

        dispatch({
            type: "LoginSuccess",
            payload: data.user
        })


    } catch (error) {
        if (error.response.data.message !== "TOKEN IS MISSING") {
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

        await axios.post("https://silk-political-target.glitch.me/logout")


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

        const { data } = await axios.post("https://silk-political-target.glitch.me/register", { name, email, password, company, secretQuestion, answer }, {
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

        const { data } = await axios.post("https://silk-political-target.glitch.me/forgot", { email, secretQuestion }, {
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
        const { data } = await axios.post("https://silk-political-target.glitch.me/reset", { email, secretQuestion, answer, newPassword }, {
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


        const { data } = await axios.get("https://silk-political-target.glitch.me/me")



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

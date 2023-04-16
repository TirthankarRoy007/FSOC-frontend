import { createReducer } from "@reduxjs/toolkit";
const initialState = {}

export const userReducer = createReducer(initialState,{
LoginRequest :(state)=>{
    state.loading = true;
    state.isLoggedIn = false;
},

LoginSuccess :(state,action)=>{
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
    state.isLoggedIn = true
},

LoginFailure :(state,action)=>{
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
    state.isLoggedIn = false
},
LogoutUserRequest :(state)=>{
    state.loading = true;
    state.isLoggedIn = true
},

LogoutUserSuccess :(state)=>{
    state.loading = false;
    state.user = null
    state.isAuthenticated = false;
    state.isLoggedIn = false
},

LogoutUserFailure :(state,action)=>{
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = true;
    state.isLoggedIn = true
},

RegisterRequest :(state)=>{
    state.loading = true;
},

RegisterSuccess :(state,action)=>{
    state.loading = false;
    state.user = action.payload;
    state.isRegistered = true
},

RegisterFailure :(state,action)=>{
    state.loading = false;
    state.error = action.payload;
    state.isRegistered = false;
},


LoadUserRequest :(state)=>{
    state.loading = true;
},
LoadUserSuccess :(state,action)=>{
    state.loading = false;
    state.users = action.payload;
    state.isAuthenticated = true;
},
LoadUserFailure :(state,action)=>{
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
},
forgotPasswordRequest:(state)=>{
    state.loading = true
},
forgotPasswordSuccess:(state,action)=>{
    state.loading = false
    state.data = action.payload
    state.gotData = true
},
forgotPasswordFailure:(state,action)=>{
    state.loading = false
    state.error = action.payload
},
resetPasswordRequest:(state)=>{
    state.loading = true
},
resetPasswordSuccess:(state,action)=>{
    state.loading = false
    state.message = action.payload
},
resetPasswordFailure:(state,action)=>{
    state.loading = false
    state.error = action.payload
},

clearErrors:(state) =>{
    state.error = null;
}
})
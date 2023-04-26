import {configureStore} from "@reduxjs/toolkit"
import {userReducer} from './Reducer/userStore'
import { projectReducer } from "./Reducer/project";
import { ticketReducer, ticketSlice } from "./Reducer/ticket";

const store =configureStore({
    reducer:{
        user:userReducer,
        projects: projectReducer.reducer,
        ticket1: ticketSlice.reducer,
        ticket2: ticketReducer.reducer
    }
})

export default store;

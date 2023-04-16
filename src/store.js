import {configureStore} from "@reduxjs/toolkit"
import {userReducer} from './Reducer/userStore'
import { projectReducer } from "./Reducer/project";

const store =configureStore({
    reducer:{
        user:userReducer,
        projects: projectReducer.reducer
}
})

export default store;

import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserStateType } from './useReducer.ts'

export type StateType = {
    user: UserStateType
}

export default configureStore({
    reducer: {
        user: userReducer
        // 分模块
    }
})
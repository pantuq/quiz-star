import { configureStore } from "@reduxjs/toolkit";
import userReducer from './useReducer.ts'

export default configureStore({
    reducer: {
        user: userReducer
        // 分模块
    }
})
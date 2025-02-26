import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserStateType } from './useReducer.ts'
import componentsReducer, { ComponentsStateType } from './componentsReducer/index.ts'

export type StateType = {
    user: UserStateType,
    components: ComponentsStateType
}

export default configureStore({
    reducer: {
        user: userReducer,
        components: componentsReducer
        // 分模块
    }
})
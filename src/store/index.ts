import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserStateType } from './useReducer.ts'
import componentsReducer, { ComponentsStateType } from './componentsReducer/index.ts'
import pageInfoReducer, { PageInfoType } from "./pageInfoReducer.tsx";

export type StateType = {
    user: UserStateType,
    components: ComponentsStateType,
    pageInfo: PageInfoType
}

export default configureStore({
    reducer: {
        user: userReducer,
        components: componentsReducer,
        pageInfo: pageInfoReducer
        // 分模块
    }
})